#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Oxide-Tech | Fresh Ubuntu 22.04/24.04 deployment
# Usage:
#   chmod +x deploy.sh
#   sudo ./deploy.sh                          # HTTP only (localhost preview)
#   sudo DOMAIN=oxide-tech.com ./deploy.sh     # Nginx + Let's Encrypt TLS
#   sudo DOMAIN=oxide-tech.com SKIP_TLS=1 ./deploy.sh  # Nginx, no TLS
# =============================================================================

set -euo pipefail

# ── Config ───────────────────────────────────────────────────────────────────
DOMAIN="${DOMAIN:-oxide-tech.com}"
SKIP_TLS="${SKIP_TLS:-0}"
APP_DIR="/var/www/oxide-tech"
REPO_URL="${REPO_URL:-}"          # optional: git clone source
NODE_VERSION="22"
PNPM_VERSION="9"
NGINX_SITE="oxide-tech"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-oxide.embedded@gmail.com}"

# ── Colors ───────────────────────────────────────────────────────────────────
BOLD="\033[1m"; GREEN="\033[32m"; YELLOW="\033[33m"; RED="\033[31m"; RESET="\033[0m"
step()  { echo -e "\n${BOLD}${GREEN}▶ $*${RESET}"; }
warn()  { echo -e "${YELLOW}⚠ $*${RESET}"; }
error() { echo -e "${RED}✖ $*${RESET}"; exit 1; }

[[ $EUID -ne 0 ]] && error "Run as root: sudo ./deploy.sh"

# ── 1. System packages ───────────────────────────────────────────────────────
step "Updating system packages"
apt-get update -qq
apt-get install -y -qq \
  curl git nginx certbot python3-certbot-nginx \
  build-essential ca-certificates gnupg lsb-release \
  unzip brotli gzip

# ── 2. Node.js via nvm ───────────────────────────────────────────────────────
step "Installing Node.js ${NODE_VERSION} via nvm"
export NVM_DIR="/root/.nvm"
if [[ ! -f "$NVM_DIR/nvm.sh" ]]; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi
# shellcheck source=/dev/null
source "$NVM_DIR/nvm.sh"
nvm install "$NODE_VERSION"
nvm alias default "$NODE_VERSION"
nvm use default

NODE_BIN=$(nvm which current)
NODE_PATH=$(dirname "$NODE_BIN")
echo "export PATH=$NODE_PATH:\$PATH" > /etc/profile.d/nodejs.sh
chmod +x /etc/profile.d/nodejs.sh
export PATH="$NODE_PATH:$PATH"

node --version
npm --version

# ── 3. pnpm ─────────────────────────────────────────────────────────────────
step "Installing pnpm ${PNPM_VERSION}"
npm install -g "pnpm@${PNPM_VERSION}" --quiet
pnpm --version

# ── 4. App source ────────────────────────────────────────────────────────────
step "Preparing application source in ${APP_DIR}"
if [[ -n "$REPO_URL" ]]; then
  if [[ -d "$APP_DIR/.git" ]]; then
    git -C "$APP_DIR" pull --rebase
  else
    git clone "$REPO_URL" "$APP_DIR"
  fi
else
  # Running from inside the project directory — rsync to APP_DIR
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  if [[ "$SCRIPT_DIR" != "$APP_DIR" ]]; then
    mkdir -p "$APP_DIR"
    rsync -a --exclude node_modules --exclude .git \
          --exclude dist --exclude .env.local \
          "$SCRIPT_DIR/" "$APP_DIR/"
  fi
fi

chown -R root:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"

# ── 5. Build ─────────────────────────────────────────────────────────────────
step "Installing dependencies and building"
cd "$APP_DIR"
pnpm install --frozen-lockfile
pnpm run build   # → dist/

# Pre-compress static assets for Nginx gzip_static / brotli_static
step "Pre-compressing assets (gzip + brotli)"
find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \
     -o -name "*.svg" -o -name "*.json" -o -name "*.wasm" \) | while read -r f; do
  gzip  -9 -k -f "$f"
  brotli -9 -k -f "$f" 2>/dev/null || true
done

chown -R www-data:www-data "$APP_DIR/dist"

# ── 6. Nginx config ──────────────────────────────────────────────────────────
step "Configuring Nginx"

# Detect brotli module availability
NGINX_BROTLI_BLOCK=""
if nginx -V 2>&1 | grep -q brotli; then
  NGINX_BROTLI_BLOCK=$(cat <<'BROTLI'
  brotli on;
  brotli_static on;
  brotli_comp_level 6;
  brotli_types text/plain text/css application/json application/javascript
               text/xml application/xml image/svg+xml;
BROTLI
)
fi

cat > "/etc/nginx/sites-available/${NGINX_SITE}" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN:-_};

    root ${APP_DIR}/dist;
    index index.html;

    # ── Security headers ──────────────────────────────────────────────────
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # ── Compression ───────────────────────────────────────────────────────
    gzip on;
    gzip_vary on;
    gzip_static on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml image/svg+xml font/woff2;

${NGINX_BROTLI_BLOCK}

    # ── SPA fallback (React Router) ───────────────────────────────────────
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # ── Hashed assets: 1-year immutable cache ─────────────────────────────
    location ~* \.(js|css|woff2?|png|jpg|jpeg|gif|ico|svg|webp|avif|wasm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ── HTML: always fresh ────────────────────────────────────────────────
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # ── Deny dotfiles ─────────────────────────────────────────────────────
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
NGINX

ln -sf "/etc/nginx/sites-available/${NGINX_SITE}" "/etc/nginx/sites-enabled/${NGINX_SITE}"
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
nginx -t && systemctl reload nginx

# ── 7. TLS via Certbot ───────────────────────────────────────────────────────
if [[ -n "$DOMAIN" && "$SKIP_TLS" != "1" ]]; then
  step "Provisioning TLS certificate for ${DOMAIN}"
  certbot --nginx \
    --non-interactive \
    --agree-tos \
    --email "$CERTBOT_EMAIL" \
    -d "$DOMAIN" \
    --redirect

  # Auto-renewal
  systemctl enable --now certbot.timer 2>/dev/null || \
    { crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'"; } | crontab -

  echo -e "\n${GREEN}TLS active → https://${DOMAIN}${RESET}"
elif [[ -n "$DOMAIN" ]]; then
  warn "SKIP_TLS=1: skipping Certbot. Available at http://${DOMAIN}"
else
  warn "No DOMAIN set. Available at http://$(hostname -I | awk '{print $1}')"
fi

# ── 8. Firewall (ufw) ────────────────────────────────────────────────────────
if command -v ufw &>/dev/null; then
  step "Opening firewall ports"
  ufw allow 'Nginx Full' --quiet 2>/dev/null || true
  ufw allow OpenSSH      --quiet 2>/dev/null || true
fi

# ── 9. Enable Nginx on boot ──────────────────────────────────────────────────
systemctl enable --now nginx

# ── 10. oxide-deploy shortcut ────────────────────────────────────────────────
cat > /usr/local/bin/oxide-deploy <<'UPDATE'
#!/usr/bin/env bash
# Quick re-deploy after source update
set -euo pipefail
APP_DIR="/var/www/oxide-tech"
NODE_PATH="$(ls -d /root/.nvm/versions/node/*/bin 2>/dev/null | tail -1)"
export PATH="$NODE_PATH:$PATH"
cd "$APP_DIR"
[[ -d .git ]] && git pull --rebase
pnpm install --frozen-lockfile
pnpm run build
find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" \) | while read -r f; do
  gzip -9 -k -f "$f"
  brotli -9 -k -f "$f" 2>/dev/null || true
done
chown -R www-data:www-data dist/
systemctl reload nginx
echo "oxide-tech redeployed at $(date)"
UPDATE
chmod +x /usr/local/bin/oxide-deploy

# ── Done ─────────────────────────────────────────────────────────────────────
echo -e "\n${BOLD}${GREEN}══════════════════════════════════════${RESET}"
echo -e "${BOLD}  oxide-tech deployed!${RESET}"
echo -e "${BOLD}${GREEN}══════════════════════════════════════${RESET}"
echo -e "  App:     ${APP_DIR}/dist"
echo -e "  Nginx:   $(systemctl is-active nginx)"
if [[ -n "$DOMAIN" && "$SKIP_TLS" != "1" ]]; then
  echo -e "  URL:     https://${DOMAIN}"
else
  echo -e "  URL:     http://$(hostname -I | awk '{print $1}')"
fi
echo -e "  Update:  sudo oxide-deploy"
echo ""
