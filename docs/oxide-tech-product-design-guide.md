# oxide-tech Product Design Guide
### UI/UX Standards & Component Library v1.0

> *"Build firmware so correct, the hardware never lies."*
> — Monib Mokhtari, CEO

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design Principles](#2-design-principles)
3. [User Experience Guidelines](#3-user-experience-guidelines)
4. [Component Library](#4-component-library)
5. [Layout Patterns](#5-layout-patterns)
6. [Interaction Design](#6-interaction-design)
7. [Motion Design](#7-motion-design)
8. [Responsive Design](#8-responsive-design)
9. [Data Visualization](#9-data-visualization)
10. [Forms & Inputs](#10-forms--inputs)
11. [Feedback & States](#11-feedback--states)
12. [Accessibility](#12-accessibility)
13. [Performance](#13-performance)
14. [Implementation Standards](#14-implementation-standards)
15. [Testing & QA](#15-testing--qa)

---

## 1. Design Philosophy

### 1.1 The oxide-tech Product Experience

oxide-tech products should feel like operating **million-dollar industrial machinery**. Every interaction should convey:
- **Precision**: Exact, deliberate, no ambiguity
- **Reliability**: Trustworthy, consistent, predictable
- **Craftsmanship**: Attention to detail, quality in every pixel
- **Technical depth**: Respect for the user's expertise

### 1.2 Design Metaphor

**"The Control Room"**

Our products should feel like the control room of a high-tech facility:
- Dark, focused environment
- Clear information hierarchy
- Critical data always visible
- Controls are precise and intentional
- Status is always unambiguous

### 1.3 Target Users

**Primary Users**:
- Embedded systems engineers
- Hardware designers
- Technical managers
- Laboratory technicians
- Medical device operators

**User Characteristics**:
- Highly technical
- Detail-oriented
- Value precision over speed
- Prefer keyboard shortcuts
- Expect professional tools

### 1.4 Design Goals

1. **Clarity**: Information is immediately understandable
2. **Efficiency**: Common tasks require minimal steps
3. **Precision**: Controls allow exact input and adjustment
4. **Safety**: Critical actions require confirmation
5. **Transparency**: System state is always visible

---

## 2. Design Principles

### 2.1 The Five Pillars of oxide-tech Product Design

#### 1. Precision Over Convenience
Every control should allow exact input. No approximations. No "close enough."

**Example**:
```
❌ Temperature: [====●=====] ~37°C
✅ Temperature: [37.2°C] ▲▼
```

#### 2. Information Density
Technical users can handle (and prefer) high information density. Don't oversimplify.

**Example**:
```
❌ Single metric per screen
✅ Dashboard with 12+ metrics, all visible
```

#### 3. Progressive Disclosure
Show essential information first, details on demand.

**Example**:
```
┌─────────────────────┐
│ CPU: 72MHz          │ ← Always visible
│ TEMP: 42°C          │
│ [Details ▼]         │ ← Expandable
└─────────────────────┘
```

#### 4. Feedback Everywhere
Every action should have immediate, clear feedback.

**Example**:
```
Button click → Visual press + haptic + sound (optional)
Data change → Smooth transition + value highlight
Error → Red border + error message + suggestion
```

#### 5. Safety by Design
Critical actions should be hard to trigger accidentally.

**Example**:
```
❌ [DELETE] button next to [SAVE]
✅ [DELETE] requires:
   1. Confirmation dialog
   2. Type "DELETE" to confirm
   3. 3-second countdown
```

### 2.2 Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | oxide-tech Alternative |
|--------------|--------------|------------------------|
| Excessive whitespace | Wastes screen space | Dense, information-rich layouts |
| Large touch targets | Imprecise for technical work | Small, precise controls |
| Simplified labels | Loses technical meaning | Use correct terminology |
| Hidden navigation | Hard to discover | Always-visible navigation |
| Modal overload | Interrupts workflow | Inline editing, side panels |
| Gamification | Unprofessional | Clear progress indicators |
| Onboarding tours | Patronizing | Contextual help, documentation |

---

## 3. User Experience Guidelines

### 3.1 Information Architecture

#### Navigation Structure
```
├── Dashboard (overview)
├── Products
│   ├── Product 1
│   │   ├── Overview
│   │   ├── Specifications
│   │   ├── Configuration
│   │   └── Documentation
│   └── Product 2
├── Technology
│   ├── Stack
│   ├── Capabilities
│   └── Open Source
├── Company
│   ├── About
│   ├── Leadership
│   └── Contact
└── Resources
    ├── Documentation
    ├── Downloads
    └── Support
```

#### Page Hierarchy
1. **Landing/Hero**: Primary value proposition
2. **Overview**: High-level summary
3. **Details**: Deep dive into specifics
4. **Actions**: What the user can do
5. **Related**: Next steps, additional info

### 3.2 User Flows

#### Product Discovery Flow
```
Landing → Products → Product Detail → Specifications → Contact/Download
```

#### Technical Documentation Flow
```
Documentation → Category → Article → Code Example → Related Articles
```

#### Support Flow
```
Support → Search/Category → Article → Contact (if not resolved)
```

### 3.3 Cognitive Load Management

#### Chunking
Break complex information into digestible chunks:
```
❌ 50 specifications in one list
✅ 5 categories, 10 specs each
```

#### Progressive Disclosure
Show essential info first, details on demand:
```
┌─────────────────────┐
│ STM32F103           │ ← Essential
│ 72MHz, 64KB Flash   │
│ [Full Specs ▼]      │ ← Expandable
└─────────────────────┘
```

#### Visual Hierarchy
Use size, color, and spacing to guide attention:
```
H1 (largest, boldest) → Main topic
H2 (medium) → Subtopic
Body (smallest) → Details
```

### 3.4 Error Prevention

#### Input Validation
Validate as the user types, not on submit:
```
✅ Real-time validation
✅ Clear error messages
✅ Suggestions for correction
❌ Submit → Error → Fix → Resubmit
```

#### Confirmation Dialogs
For destructive actions:
```
┌─────────────────────────┐
│ ⚠️ Confirm Deletion     │
│                         │
│ This will permanently   │
│ delete the configuration│
│ "PID_Controller_v2.1"   │
│                         │
│ Type "DELETE" to confirm│
│ [________]              │
│                         │
│ [Cancel] [Delete in 3s] │
└─────────────────────────┘
```

#### Undo Support
Allow users to reverse actions:
```
✅ Undo delete (5 seconds)
✅ Undo configuration change
❌ No undo for critical operations
```

---

## 4. Component Library

### 4.1 Buttons

#### Primary Button
**Usage**: Main call-to-action, primary actions
```css
padding: 16px 36px;
background: linear-gradient(135deg, #00d4ff, #2563eb);
border: none;
color: #07070a;
font-family: 'JetBrains Mono', monospace;
font-size: 0.8rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.1em;
border-radius: 0;
cursor: pointer;
transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
```

**States**:
- **Default**: Gradient background
- **Hover**: Translate Y -3px, shadow glow
- **Active**: Translate Y -1px, reduced shadow
- **Disabled**: 50% opacity, no pointer

**Interactive Effects**:
- Shimmer animation on hover
- Magnetic effect (follows cursor slightly)
- Glow shadow on hover

#### Secondary Button
**Usage**: Secondary actions, alternative options
```css
padding: 16px 36px;
background: transparent;
border: 1px solid rgba(0, 212, 255, 0.12);
color: #f8fafc;
font-family: 'JetBrains Mono', monospace;
font-size: 0.8rem;
text-transform: uppercase;
letter-spacing: 0.1em;
```

**States**:
- **Default**: Transparent with border
- **Hover**: Border color changes to cyan, subtle background
- **Active**: Background fill
- **Disabled**: 50% opacity

#### Icon Button
**Usage**: Compact actions, toolbars
```css
width: 40px;
height: 40px;
padding: 0;
display: flex;
align-items: center;
justify-content: center;
background: transparent;
border: 1px solid rgba(0, 212, 255, 0.12);
border-radius: 8px;
```

### 4.2 Cards

#### TechBox (Product Card)
**Usage**: Product showcase, feature highlights
```html
<div class="techbox">
  <div class="techbox-image-wrapper">
    <img class="techbox-image" src="..." alt="...">
  </div>
  <div class="techbox-content">
    <div class="techbox-tag">Category</div>
    <h3 class="techbox-title">Product Name</h3>
    <p class="techbox-desc">Description</p>
    <div class="techbox-specs">
      <span class="spec-tag">Spec 1</span>
      <span class="spec-tag">Spec 2</span>
    </div>
  </div>
</div>
```

**Styling**:
```css
.techbox {
  background: #111118;
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.techbox:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 30px 80px rgba(0, 212, 255, 0.12);
}

.techbox::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00d4ff, #00ff9f);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.techbox:hover::before {
  opacity: 1;
}
```

**Image Treatment**:
- Gradient fade at bottom
- Scale up on hover (1.08x)
- Smooth transition (0.6s)

#### Feature Card
**Usage**: Capability highlights, feature descriptions
```css
.feature-card {
  padding: 36px;
  background: #111118;
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover {
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-4px);
}
```

#### Leader Card
**Usage**: Team member profiles
```css
.leader-card {
  padding: 44px;
  background: #111118;
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: 16px;
}

.leader-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #a855f7, #00d4ff);
}
```

### 4.3 Navigation

#### Header Navigation
**Structure**:
```html
<header class="header">
  <div class="logo-container">
    <svg class="logo-svg">...</svg>
    <div class="logo-text">oxide-tech</div>
  </div>
  <nav>
    <ul class="nav-links">
      <li><a href="#section1">Link 1</a></li>
      <li><a href="#section2">Link 2</a></li>
      <li><a href="#contact" class="nav-cta">Contact</a></li>
    </ul>
  </nav>
  <button class="mobile-toggle">...</button>
</header>
```

**Behavior**:
- Fixed position (sticky)
- Blur backdrop on scroll
- Height: 76px
- Border bottom on scroll
- Logo rotates 180° on hover

#### Mobile Navigation
**Structure**:
```html
<button class="mobile-toggle">
  <span></span>
  <span></span>
  <span></span>
</button>
```

**Animation**:
- Hamburger → X transformation
- Full-screen overlay
- Slide-in animation
- Backdrop blur

### 4.4 HologramViewer

**Purpose**: Showcase products with 3D holographic effect

**Structure**:
```html
<div class="hologram-viewer">
  <img class="hologram-image" src="..." alt="...">
  <div class="hologram-ring"></div>
  <div class="hologram-ring-2"></div>
  <div class="hologram-ring-3"></div>
  <div class="hologram-scanline"></div>
  <div class="hologram-data top-left">...</div>
  <div class="hologram-data top-right">...</div>
  <div class="hologram-data bottom-left">...</div>
  <div class="hologram-data bottom-right">...</div>
</div>
```

**Animations**:
- **Float**: 8s ease-in-out infinite
  - Y: 0 to -20px
  - RotateY: ±5°
  - RotateX: ±2°
- **Glow**: 4s ease-in-out infinite alternate
  - Drop-shadow: 30-50px
  - Hue-rotate: 0-15°
- **Rings**: 3 concentric rings
  - Ring 1: 10s rotation
  - Ring 2: 14s reverse rotation
  - Ring 3: 20s rotation (dashed)
- **Scanline**: 3.5s linear infinite
- **Parallax**: Mouse movement affects rotation

**Data Overlays**:
```css
.hologram-data {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #00d4ff;
  opacity: 0.8;
  letter-spacing: 0.1em;
}
```

### 4.5 PCBBackground

**Purpose**: Animated PCB trace pattern background

**Implementation**:
```javascript
// Canvas-based animation
const canvas = document.getElementById('pcb-background');
const ctx = canvas.getContext('2d');

// Trace generation
function createTraces() {
  const numTraces = Math.floor((width * height) / 45000);
  for (let i = 0; i < numTraces; i++) {
    // Generate random trace with 3-8 segments
    // Each segment: 20-100px, 90° angles
    // Colors: 50% cyan, 50% green
    // Opacity: 0.1-0.4
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);
  drawTraces(); // Progressive drawing
  drawParticles(); // Floating particles
  requestAnimationFrame(animate);
}
```

**Performance**:
- Throttle to 60fps
- Reduce trace count on mobile
- Pause when not visible
- Use offscreen canvas for complex scenes

### 4.6 Form Elements

#### Text Input
```css
input[type="text"] {
  padding: 12px 16px;
  background: #111118;
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: 8px;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

input[type="text"]:focus {
  outline: none;
  border-color: #00d4ff;
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
}

input[type="text"]:invalid {
  border-color: #ef4444;
}
```

#### Select Dropdown
```css
select {
  padding: 12px 16px;
  background: #111118;
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: 8px;
  color: #f8fafc;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Custom arrow */
}
```

#### Checkbox/Radio
```css
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  background: #111118;
  border: 1px solid rgba(0, 212, 255, 0.12);
  border-radius: 4px;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background: #00d4ff;
  border-color: #00d4ff;
}
```

### 4.7 Data Display

#### Stat Card
```html
<div class="stat-item">
  <div class="stat-value" data-target="23">0</div>
  <div class="stat-label">Years of Operation</div>
</div>
```

**Animation**:
- Counter animation on scroll into 
<truncated 17743 bytes>

NOTE: The output was truncated because it was too long. Use a more targeted query or a smaller range to get the information you need.