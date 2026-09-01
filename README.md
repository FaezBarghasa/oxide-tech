# oxide-tech

High-performance web portal and telemetry dashboard for **Oxide Industrial** embedded systems. Built with modern, premium aesthetics (glassmorphism, vibrant industrial accent colors, micro-animations) to showcase and monitor mission-critical hardware deployments.

## 🛠️ Technology Stack
- **Frontend Core:** React 19 (TypeScript)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 & custom variables (with dark mode and scanline/PCB overlays)
- **Data Visualization:** Recharts
- **Animations:** Motion (Framer Motion) & CSS keyframes
- **Production Server:** Express.js (ES Module format)

## 📡 Key Features
- **Critical Status Dashboard:** Real-time thermal and voltage warnings with Lucide indicators. Telemetry updates dynamically, and alerts link directly to the inventory items.
- **Interactive Inventory Grid & Pinout Tooltips:** View hardware module descriptions, compatible equipment, and custom hover tooltips showing pinout names and types (comm/power/io).
- **Vite-integrated Hologram Viewer:** Interactive 3D component projections corresponding to the selected hardware model.
- **Floating Search & Filter:** Sticky query bar filtering inventory models in real-time by category, spec, or name (fully localization-aware).
- **Telemetry Charts:** Recharts Line Charts displaying real-time power consumption levels per hardware unit.
- **Multi-language Support:** Complete English (LTR) and Persian (RTL) localization handling.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- `pnpm` package manager

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Development Mode
Run the local hot-reloading development server:
```bash
pnpm dev
```
The application will be accessible at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
Compile the TypeScript and package the assets into the `dist/` directory:
```bash
pnpm build
```

### 4. Run the Production Server
Start the Express server to serve the compiled client-side assets:
```bash
pnpm start
```
The server will bind to `0.0.0.0` and listen on port `3000` (or `process.env.PORT` if set).
