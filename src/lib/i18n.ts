export const t = (text: string, lang: string): string => {
  if (lang === 'en') {
    return dictEn[text] || text;
  }
  return dictFa[text] || text;
};

const dictEn: Record<string, string> = {
  // Navigation
  "NAV_HOME": "HOME",
  "NAV_MANIFESTO": "PHILOSOPHY",
  "NAV_PHILOSOPHY": "PHILOSOPHY",
  "NAV_TECH": "TECHNOLOGY",
  "NAV_PRODUCTS": "MODULES",
  "NAV_ARCHITECTS": "ARCHITECTS",
  "NAV_OPENSOURCE": "OPEN SOURCE",
  "NAV_PORTAL": "DEV PORTAL",
  "NAV_CONTACT": "CONTACT",
  "NAV_GET_LICENSE": "REQUEST ACCESS",
  "NAV_WHITEPAPER": "WHITEPAPER",

  // Hero Section
  "HERO_STATUS": "[ SYSTEM UPDATE: v2.4.0 // EDGE AI & IIoT INTEGRATED ]",
  "HERO_TITLE_H1": "Next-Gen Industrial & Embedded Systems:",
  "HERO_TITLE_H1_CONT": "From Edge Computing to Autonomous AI",
  "HERO_SUBTEXT": "Combining 23 years of hardware engineering wisdom with the safety and performance of Rust. We build systems that are intelligent, deterministic, ultra-fast, and designed for 24/7 continuous operation in mission-critical environments.",
  "HERO_QUOTE_CEO": "“If the compiler agrees, the hardware will agree. We write firmware where even silence on the data bus is intentional.”",
  "HERO_QUOTE_CEO_AUTHOR": "Monib Mokhtari, Chief Systems Architect",
  "HERO_CTA_PRIMARY": "EXPLORE TECHNICAL SOLUTIONS",
  "HERO_CTA_SECONDARY": "REQUEST CONSULTATION",
  "HERO_3D_PAUSE_HINT": "Hover to pause telemetry model",
  "HERO_3D_ACTIVE": "PBR 3D VIEWPORT // INTERACTIVE",

  // Typewriter Words
  "Rust": "Rust (no_std)",
  "Silicon": "Silicon & FPGA",
  "Safety": "Memory Safety",
  "Reliability": "RTIC v2 / Embassy",

  // Manifesto (6 Pillars)
  "MAN_SUB": "// OUR PHILOSOPHY & VALUES",
  "MAN_TITLE": "Core Engineering Principles",
  "MAN_QUOTE_CTO": "“Performance and correctness are not tradeoffs.”",
  "MAN_QUOTE_CTO_AUTHOR": "Faez Barghasa, Chief Technology Officer",

  "PIL_1_TITLE": "Absolute Precision & Correctness",
  "PIL_1_SUB": "Formal Verification",
  "PIL_1_DESC": "We eliminate bugs at compile time, not during runtime validation. Static analysis and formal code verification are the foundation of all our hardware interactions.",

  "PIL_2_TITLE": "On-Device Intelligence (Edge AI)",
  "PIL_2_SUB": "Edge Vision & AI",
  "PIL_2_DESC": "Computer vision (like YOLO) and language models run directly on local hardware. This delivers real-time decisions with zero cloud latency and absolute industrial data privacy.",

  "PIL_3_TITLE": "Smart & Unified Connectivity",
  "PIL_3_SUB": "IIoT & Telemetry",
  "PIL_3_DESC": "Our distributed architecture is built on MQTT and robust wireless protocols (Wi-Fi/BLE) for live telemetry and remote control with enterprise-grade cybersecurity.",

  "PIL_4_TITLE": "Inherent Safety with Rust",
  "PIL_4_SUB": "Memory Safety & RTIC",
  "PIL_4_DESC": "By leveraging Rust's ownership model, we permanently eliminate entire classes of memory bugs. Systems engineered for guaranteed 24/7 reliability across decades.",

  "PIL_5_TITLE": "Seamless Multi-Platform UI",
  "PIL_5_SUB": "Slint Framework",
  "PIL_5_DESC": "Using the Slint framework, we create modern, consistent UX spanning small embedded touchscreens, industrial tablets, and web dashboards with zero rendering penalty.",

  "PIL_6_TITLE": "Technical Sovereignty & Localization",
  "PIL_6_SUB": "Bare Metal to Cloud",
  "PIL_6_DESC": "We manage the entire engineering pipeline from bare-metal silicon registers to cloud backends. Free from bloated third-party dependencies and optimized for local infrastructure.",

  // Tech Stack (4 Vertical Layers)
  "TECH_SUB": "// VERTICAL INTEGRATION STACK",
  "TECH_TITLE": "Silicon to Cloud: Multi-Layer Architecture",
  "TECH_DESC": "A vertically integrated stack built for security, deterministic speed, and multi-decade maintainability. Zero undefined behavior.",
  "TECH_LATENCY": "Bus Latency",
  "TECH_LIVE": "LIVE_TELEMETRY",
  "TECH_LIVE_SHORT": "LIVE",

  "LAYER_1_TITLE": "Layer 1: Compute & Control (Hardware)",
  "LAYER_1_DESC": "STM32 High-End (Cortex-M4/M7 with RTIC v2), Orange Pi / RPi 5 compute nodes, and ESP32-S3 wireless mesh nodes.",
  
  "LAYER_2_TITLE": "Layer 2: Intelligence & Data (Edge AI)",
  "LAYER_2_DESC": "Deterministic YOLOv8 automated visual quality inspection and On-Device SLMs (Llama.cpp/Rust) for predictive maintenance.",

  "LAYER_3_TITLE": "Layer 3: Connectivity & IIoT",
  "LAYER_3_DESC": "Heap-Free MQTT 3.1.1/5.0 protocol stack, Zero-Copy DMA buffers, and high-concurrency Actix / SurrealDB backends.",

  "LAYER_4_TITLE": "Layer 4: Industrial Experience (HMI)",
  "LAYER_4_DESC": "Slint native declarative GUI running without standard library bloat across embedded displays, tablets, and Linux HMI.",

  // Products & Modules (9 Modules)
  "INV_SUB": "// INDUSTRIAL MODULE CATALOG",
  "INV_TITLE": "Sovereign Hardware & Modules",
  "INV_SEARCH": "Search by module ID, MCU architecture, or protocol...",
  "INV_PROJECT_3D": "3D View",
  "INV_ACTIVE": "Active In-Production",
  "INV_SPECS": "Technical Specifications",
  "INV_TECH_STACK": "Tech Stack",

  "MOD_01_ID": "MODULE_01 // LAMINAR-CTRL",
  "MOD_01_NAME": "Laminar Airflow Control Unit",
  "MOD_01_DESC": "Ultra-low latency airflow control system with redundant differential sensor feedback loops and ISO-5 cleanroom compliance.",
  "MOD_01_SPECS": "Latency: < 500μs | Target: STM32F407 | Safety: Interlocked Relays",
  "MOD_01_STACK": "STM32 / RUST NO_STD / EMBASSY / RS-485",

  "MOD_02_ID": "MODULE_02 // ROTATOR-BLDC",
  "MOD_02_NAME": "Precision Lab Mixer Rotator",
  "MOD_02_DESC": "Jitter-free angular velocity management with field-oriented brushless DC motor control and Slint-driven tactile touchscreen HMI.",
  "MOD_02_SPECS": "Speed Accuracy: ±0.1 RPM | Dynamic Torque | Slint UI 60 FPS",
  "MOD_02_STACK": "CORTEX-M4 / SLINT / HARDWARE-PWM / EMBEDDED-HAL",

  "MOD_03_ID": "MODULE_03 // MPC-THERMAL",
  "MOD_03_NAME": "State-Space MPC Thermal Controller",
  "MOD_03_DESC": "State-Space MPC controller with integrated Kalman Filter for unprecedented thermal stability and distributed sub-microsecond multi-MCU PLL sync.",
  "MOD_03_SPECS": "Temp Stability: ±0.01°C | Multi-MCU Sync: < 1μs | Dual PT1000 RTD",
  "MOD_03_STACK": "STM32F4 / RTIC v2 / STATE-SPACE MPC / KALMAN FILTER",

  "MOD_04_ID": "MODULE_04 // OVEN-CHAMBER",
  "MOD_04_NAME": "High-Uniformity Industrial Incubator Oven",
  "MOD_04_DESC": "Multi-zone thermal chamber controller with dual PT1000 RTD sensors, hardware-level overtemperature cut-offs, and PID heating loops.",
  "MOD_04_SPECS": "Range: +5°C to 250°C | Uniformity: ±0.3°C | Dual Safety Limiters",
  "MOD_04_STACK": "STM32 / DUAL PT1000 / RTIC / MODBUS-RTU",

  "MOD_05_ID": "MODULE_05 // REFRIG-INCUB",
  "MOD_05_NAME": "Refrigerated Biological Incubator",
  "MOD_05_DESC": "Low-vibration biological cooling chamber controller with cascade inverter compressor control and sub-zero precision thermal regulation.",
  "MOD_05_SPECS": "Range: -10°C to +60°C | Inverter Modulation | Anti-Freeze Lock",
  "MOD_05_STACK": "STM32 / EMBASSY / INVERTER-FOC / SLINT",

  "MOD_06_ID": "MODULE_06-B // AUTOCLAVE-SAFE",
  "MOD_06_NAME": "Safety-Critical Laboratory Autoclave Controller",
  "MOD_06_DESC": "High-pressure steam sterilization controller with multi-stage pneumatic interlocks, double pressure transducer validation, and audited cycle logging.",
  "MOD_06_SPECS": "Pressure Rating: 4.5 Bar | Dual Transducers | ISO-13485 Spec",
  "MOD_06_STACK": "STM32F7 / RTIC v2 / DUAL TRANSDUCERS / ENCRYPTED LOGS",

  "MOD_07_ID": "MODULE_07 // EDGE-VISION",
  "MOD_07_NAME": "Smart Edge AI Vision Node (Edge Vision)",
  "MOD_07_DESC": "Automated quality inspection system powered by Orange Pi and YOLO models. Real-time visual anomaly detection without sending data to cloud servers, featuring near-zero latency.",
  "MOD_07_SPECS": "Compute: 6 TOPS NPU | Latency: Real-time YOLOv8 | Zero Cloud Dependency",
  "MOD_07_STACK": "Orange Pi / YOLOv8 / Rust Bindings",

  "MOD_08_ID": "MODULE_08 // IOT-MESH",
  "MOD_08_NAME": "Wireless IoT Telemetry Mesh (IoT Mesh)",
  "MOD_08_DESC": "Distributed industrial sensor architecture powered by ESP32. Real-time monitoring of temperature, vibration, and power via MQTT. Built for retrofitting legacy production lines without costly recabling.",
  "MOD_08_SPECS": "Mesh Latency: < 20ms | Low Power | Long Range",
  "MOD_08_STACK": "ESP32-S3 / Embassy / MQTT",

  "MOD_09_ID": "MODULE_09 // COGNITIVE-CORE",
  "MOD_09_NAME": "On-Device Cognitive SLM Analyzer (On-Device LLM)",
  "MOD_09_DESC": "Local execution of Small Language Models (SLM) on hardware like Raspberry Pi 5. Autonomous parsing of error logs and predictive maintenance suggestions without data privacy risks.",
  "MOD_09_SPECS": "Model Capacity: Up to 7B Quantized | Llama.cpp Rust Bridge | Local Processing",
  "MOD_09_STACK": "RPi 5 / Llama.cpp / Rust",

  // Meet the Architects
  "ARCH_SUB": "// ENGINEERING LEADERSHIP",
  "ARCH_TITLE": "Meet the System Architects",
  "ARCH_DESC": "Direct engineering leadership with deep expertise spanning physical silicon design, kernel internals, and modern full-stack Rust systems.",

  "ARCH_1_NAME": "Monib Mokhtari",
  "ARCH_1_ROLE": "CEO & Embedded Systems Architect",
  "ARCH_1_BIO": "“My focus is on hardware-software co-design; where the boundary between the two dissolves. From schematic and PCB layout strictly following EMI/EMC principles, to implementing real-time algorithms with RTIC and guaranteeing functional safety in industrial microcontrollers.”",
  "ARCH_1_TAGS": "Hardware-Software Co-Design, RTIC v2, EMI/EMC, Functional Safety, Analog/Digital",

  "ARCH_2_NAME": "Faez Barghasa",
  "ARCH_2_ROLE": "CTO & Lead Systems Engineer",
  "ARCH_2_BIO": "“I steer development from the lowest hardware layer (no_std) up to cloud backends. My specialization includes Zero-Copy DMA pipelines, optimized communication protocols, and integrating Edge AI with modern declarative user interfaces.”",
  "ARCH_2_TAGS": "Full-Stack Rust, Zero-Copy DMA, Embassy Async, Edge AI, Slint HMI, Redox OS Research",

  // Open Source Showcase
  "OSS_SUB": "// OPEN SOURCE & RESEARCH",
  "OSS_TITLE": "Battle-Tested Open Source Repositories",
  "OSS_DESC": "We do not simply consume open-source tools; we actively shape the future of embedded Rust and deterministic robotics.",
  "OSS_VIEW_GITHUB": "VIEW REPOSITORY ON GITHUB",

  "OSS_1_NAME": "mqtt-async-embedded",
  "OSS_1_DESC": "Real-time, 100% heap-free MQTT client library designed for mission-critical industrial embedded applications with zero dynamic allocations.",
  "OSS_1_TAG": "RUST / NO_STD / EMBASSY",

  "OSS_2_NAME": "Rotary_Library",
  "OSS_2_DESC": "High-performance no_std rotary encoder driver with embedded-hal 4.x support, hardware debouncing, and velocity calculation.",
  "OSS_2_TAG": "EMBEDDED-HAL / DRIVERS",

  "OSS_3_NAME": "r_klipp",
  "OSS_3_DESC": "Safe, real-time motion control rewrite for multi-axis CNC machines and industrial 3D printers featuring PH Corner Blending trajectory algorithms.",
  "OSS_3_TAG": "MOTION CONTROL / KINEMATICS",

  "OSS_4_NAME": "omid",
  "OSS_4_DESC": "Modular embedded robotics and industrial automation subsystem framework for distributed multi-controller architectures.",
  "OSS_4_TAG": "ROBOTICS / ACTUATION",

  // Lead Magnet / Whitepaper
  "WP_SUB": "// INDUSTRIAL WHITEPAPER",
  "WP_TITLE": "Industrial IoT & Edge AI Architecture Document",
  "WP_DESC": "Download our comprehensive 28-page technical specification covering sovereign architectures, heap-free telemetry, and edge machine vision.",
  "WP_BUTTON": "DOWNLOAD TECHNICAL WHITEPAPER",
  "WP_MODAL_TITLE": "Request Industrial Whitepaper",
  "WP_MODAL_DESC": "Fill in your corporate technical details to instantly receive the PDF document.",
  "WP_FORM_NAME": "Full Name",
  "WP_FORM_COMPANY": "Company / Organization",
  "WP_FORM_PHONE": "Phone Number",
  "WP_FORM_EMAIL": "Corporate Email",
  "WP_FORM_SUBMIT": "DOWNLOAD WHITEPAPER (PDF)",
  "WP_SUCCESS": "Access Granted: Whitepaper specification downloaded successfully.",

  // Developer Portal
  "DEV_MODAL_TITLE": "Developer Portal & Hardware Specs",
  "DEV_MODAL_DESC": "Explore code samples, MQTT wire protocols, and Slint component architecture.",
  "DEV_TAB_SLINT": "Slint HMI Blueprint",
  "DEV_TAB_MQTT": "Heap-Free MQTT Schema",
  "DEV_TAB_EMBASSY": "Embassy DMA Driver",

  // Footer
  "FOOT_TITLE": "oxide-tech",
  "FOOT_DESC": "Sovereign industrial embedded systems, Edge AI vision, and high-reliability wireless telemetry engineered with mathematical certainty in Rust.",
  "FOOT_ORIGIN": "DESIGNED & ENGINEERED IN IRAN",
  "FOOT_RESOURCES": "TECHNICAL DOMAINS",
  "FOOT_COMPLIANCE": "GOVERNANCE & SECURITY",
  "FOOT_UPDATES": "TECHNICAL TELEMETRY DISPATCH",
  "FOOT_COPYRIGHT": "© 2026 OXIDE TECH INDUSTRIAL SYSTEMS. ALL RIGHTS RESERVED."
};

const dictFa: Record<string, string> = {
  // Navigation
  "NAV_HOME": "خانه",
  "NAV_MANIFESTO": "رویکرد ما",
  "NAV_PHILOSOPHY": "رویکرد ما",
  "NAV_TECH": "پشته فناوری",
  "NAV_PRODUCTS": "محصولات و ماژول‌ها",
  "NAV_ARCHITECTS": "تیم رهبری",
  "NAV_OPENSOURCE": "پروژه‌های منبع‌باز",
  "NAV_PORTAL": "پورتال مهندسی",
  "NAV_CONTACT": "ارتباط با ما",
  "NAV_GET_LICENSE": "درخواست همکاری",
  "NAV_WHITEPAPER": "مستندات فنی",

  // Hero Section
  "HERO_STATUS": "[ به‌روزرسانی سیستم: نسخه ۲.۴.۰ // Edge AI & IIoT ]",
  "HERO_TITLE_H1": "نسل جدید سیستم‌های نهفته و صنعتی؛",
  "HERO_TITLE_H1_CONT": "از پردازش لبه‌ای (Edge) تا هوش مصنوعی مستقل",
  "HERO_SUBTEXT": "ترکیب ۲۳ سال تجربه در طراحی سخت‌افزار با ایمنی و کارایی زبان Rust. ما سیستم‌هایی می‌سازیم که هوشمند، فوق‌العاده سریع و برای کارکرد دائمی در حساس‌ترین محیط‌های صنعتی و آزمایشگاهی طراحی شده‌اند.",
  "HERO_QUOTE_CEO": "“اگر کامپایلر تأیید کند، سخت‌افزار نیز تأیید خواهد کرد. ما فریموری می‌نویسیم که در آن حتی سکوت در باس داده نیز عمدی است.”",
  "HERO_QUOTE_CEO_AUTHOR": "منیب مختاری، معمار سیستم‌های نهفته",
  "HERO_CTA_PRIMARY": "مشاهده راهکارهای فنی",
  "HERO_CTA_SECONDARY": "درخواست مشاوره تخصصی",
  "HERO_3D_PAUSE_HINT": "شناور کردن ماوس برای توقف چرخش مدل تله‌متری",
  "HERO_3D_ACTIVE": "درگاه سه‌بعدی تله‌متری PBR // تعاملی",

  // Typewriter Words
  "Rust": "زبان Rust (no_std)",
  "Silicon": "طراحی سیلیکون و FPGA",
  "Safety": "ایمنی تضمین‌شده حافظه",
  "Reliability": "معماری RTIC v2 / Embassy",

  // Manifesto / Philosophy (فلسفه و رویکرد ما)
  "MAN_SUB": "// ارزش‌ها و اصول فنی",
  "MAN_TITLE": "فلسفه و رویکرد مهندسی ما",
  "MAN_QUOTE_CTO": "“کارایی و صحت، مصالحه نیستند.”",
  "MAN_QUOTE_CTO_AUTHOR": "فائز برغسا، مدیر ارشد فناوری",

  "PIL_1_TITLE": "دقت و اطمینان مطلق",
  "PIL_1_SUB": "Formal Verification",
  "PIL_1_DESC": "ما خطا را در مرحله کامپایل حذف می‌کنیم، نه در زمان تست. تحلیل ایستا و راستی‌آزمایی کد، پایه‌ی تمام تعاملات ما با سخت‌افزار است.",

  "PIL_2_TITLE": "هوش مصنوعی روی خود دستگاه (Edge AI)",
  "PIL_2_SUB": "Edge Vision & AI",
  "PIL_2_DESC": "پردازش بینایی ماشین (مثل YOLO) و مدل‌های زبانی مستقیماً روی سخت‌افزار محلی انجام می‌شود. این یعنی تصمیم‌گیری بلادرنگ (Real-time)، بدون وابستگی به اینترنت و با حفظ کامل امنیت داده‌های صنعتی.",

  "PIL_3_TITLE": "اتصال هوشمند و یکپارچه",
  "PIL_3_SUB": "IIoT & Telemetry",
  "PIL_3_DESC": "معماری توزیع‌شده‌ی ما بر پایه‌ی MQTT و پروتکل‌های بی‌سیم (Wi-Fi/BLE) بنا شده تا تله‌متری و کنترل از راه دور، با بالاترین سطح امنیت سایبری انجام شود.",

  "PIL_4_TITLE": "ایمنی ذاتی با Rust",
  "PIL_4_SUB": "Memory Safety & RTIC",
  "PIL_4_DESC": "با بهره‌گیری از مدل مالکیت (Ownership) زبان Rust، دسته‌ی بزرگی از باگ‌های حافظه را برای همیشه حذف کرده‌ایم. سیستم‌هایی که برای دهه‌ها کارکرد ۲۴/۷ تضمین شده‌اند.",

  "PIL_5_TITLE": "رابط کاربری روان و چندسکویی",
  "PIL_5_SUB": "Slint Framework",
  "PIL_5_DESC": "با استفاده از فریمورک Slint، یک تجربه‌ی کاربری (UX) مدرن و یکپارچه می‌سازیم که از نمایشگرهای کوچک تعبیه‌شده (Embedded) تا تبلت‌های صنعتی و داشبوردهای وب، بدون افت کیفیت اجرا می‌شود.",

  "PIL_6_TITLE": "استقلال فنی و بومی‌سازی واقعی",
  "PIL_6_SUB": "Bare Metal to Cloud",
  "PIL_6_DESC": "ما زنجیره‌ی توسعه را از سطح تراشه (Bare Metal) تا سرور ابری، خودمان مدیریت می‌کنیم. بدون وابستگی به کتابخانه‌های سنگین خارجی و کاملاً منطبق با نیازهای زیرساختی ایران.",

  // Tech Stack (4 Vertical Layers)
  "TECH_SUB": "// معماری پشته یکپارچه",
  "TECH_TITLE": "از سطح تراشه تا ابر: پشته فنی یکپارچه",
  "TECH_DESC": "پشته‌ای عمودی، بدون واسطه‌های زائد و مهندسی‌شده برای سرعت قطعی، امنیت داده و کارکرد بدون وقفه چنددهه‌ای.",
  "TECH_LATENCY": "تاخیر تبادل داده در باس",
  "TECH_LIVE": "تله‌متری زنده",
  "TECH_LIVE_SHORT": "زنده",

  "LAYER_1_TITLE": "لایه ۱: محاسبات و کنترل (سخت‌افزار)",
  "LAYER_1_DESC": "میکروکنترلرهای STM32 صنعتی (Cortex-M4/M7 با RTIC v2)، بردهای پردازش تصویر Orange Pi / RPi 5 و گره‌های بی‌سیم کم‌مصرف ESP32-S3.",

  "LAYER_2_TITLE": "لایه ۲: پردازش داده و هوش لبه‌ای (Edge AI)",
  "LAYER_2_DESC": "کنترل کیفیت و بازرسی بصری آنی با YOLOv8 و اجرای مدل‌های زبانی محلی (SLM) برای تحلیل لاگ‌های خطا و نگهداری پیشگیرانه.",

  "LAYER_3_TITLE": "لایه ۳: اتصال و اینترنت اشیاء صنعتی (IIoT)",
  "LAYER_3_DESC": "پروتکل MQTT بدون تخصیص حافظه پویا (Heap-Free)، بافرهای DMA بدون کپی (Zero-Copy) و سرویس‌های سریع ابری با Actix و دیتابیس SurrealDB.",

  "LAYER_4_TITLE": "لایه ۴: رابط کاربری صنعتی (HMI)",
  "LAYER_4_DESC": "رابط گرافیکی مدرن Slint با اجرای مستقل از کتابخانه استاندارد روی نمایشگرهای لمسی، پنل‌های تعبیه‌شده و سیستم‌های عامل صنعتی.",

  // Products & Modules (9 Modules)
  "INV_SUB": "// کاتالوگ محصولات و ماژول‌ها",
  "INV_TITLE": "ماژول‌ها و راهکارهای سخت‌افزاری صنعتی",
  "INV_SEARCH": "جستجو بر اساس نام ماژول، پردازنده یا پروتکل...",
  "INV_PROJECT_3D": "مشاهده ۳D",
  "INV_ACTIVE": "فعال در خط تولید",
  "INV_SPECS": "مشخصات فنی",
  "INV_TECH_STACK": "پشته فناوری",

  "MOD_01_ID": "MODULE_01 // LAMINAR-CTRL",
  "MOD_01_NAME": "برد کنترل هود لامینار جریان خطی",
  "MOD_01_DESC": "سامانه کنترل جریان هوای آرام با تاخیر فوق‌العاده کم، حلقه‌های فیدبک سنسورهای دیفرانسیلی فشار و انطباق کامل با استاندارد ISO-5 اتاق تمیز.",
  "MOD_01_SPECS": "تاخیر کنترل: کمتر از ۵۰۰ میکروثانیه | کنترلر: STM32F407 | رله‌های محافظتی سخت‌افزاری",
  "MOD_01_STACK": "STM32 / RUST NO_STD / EMBASSY / RS-485",

  "MOD_02_ID": "MODULE_02 // ROTATOR-BLDC",
  "MOD_02_NAME": "میکسر روتاتور دقیق آزمایشگاهی",
  "MOD_02_DESC": "مدیریت سرعت زاویه‌ای بدون لغزش با موتورهای براشلس (BLDC) و رابط کاربری لمسی مدرن طراحی شده با فریمورک Slint با نرخ فریم ۶۰.",
  "MOD_02_SPECS": "دقت سرعت: ±۰.۱ دور بر دقیقه | گشتاور پایدار دینامیک | رابط لمسی Slint",
  "MOD_02_STACK": "CORTEX-M4 / SLINT / HARDWARE-PWM / EMBEDDED-HAL",

  "MOD_03_ID": "MODULE_03 // MPC-THERMAL",
  "MOD_03_NAME": "کنترل‌کننده حرارتی پیشرفته State-Space MPC",
  "MOD_03_DESC": "بهره‌گیری از کنترل‌کننده MPC فضای حالت (State-Space MPC) با فیلتر کالمن برای پایداری حرارتی بی‌نظیر، و همگام‌سازی چند میکروکنترلری با تاخیر زیر میکروثانیه (Distributed PLL).",
  "MOD_03_SPECS": "پایداری دما: ±۰.۰۱ درجه سانتی‌گراد | همگام‌سازی: کمتر از ۱ میکروثانیه | سنسور دوگانه PT1000",
  "MOD_03_STACK": "STM32F4 / RTIC v2 / STATE-SPACE MPC / KALMAN FILTER",

  "MOD_04_ID": "MODULE_04 // OVEN-CHAMBER",
  "MOD_04_NAME": "فور و انکوباتور حرارتی صنعتی",
  "MOD_04_DESC": "محفظه حرارتی با یکنواختی دمایی فوق‌العاده، سنسورهای دوگانه پلاتینیومی PT1000 RTD، قطع‌کننده سخت‌افزاری اورتمپ و حلقه‌های PID صنعتی.",
  "MOD_04_SPECS": "بازه دمایی: ۵+ تا ۲۵۰+ درجه سانتی‌گراد | یکنواختی: ±۰.۳ درجه | فیوز حرارتی مستقل",
  "MOD_04_STACK": "STM32 / DUAL PT1000 / RTIC / MODBUS-RTU",

  "MOD_05_ID": "MODULE_05 // REFRIG-INCUB",
  "MOD_05_NAME": "انکوباتور بیولوژیکی یخچال‌دار",
  "MOD_05_DESC": "واحد انکوباسیون برودتی با حداقل ارتعاش، مدیریت اینورتر کمپرسورهای آبشاری و کنترل دقیق دما در زیر نقطه انجماد.",
  "MOD_05_SPECS": "بازه دمایی: ۱۰- تا ۶۰+ درجه سانتی‌گراد | کنترل دور اینورتر | سامانه ضدیخ زدگی هوشمند",
  "MOD_05_STACK": "STM32 / EMBASSY / INVERTER-FOC / SLINT",

  "MOD_06_ID": "MODULE_06-B // AUTOCLAVE-SAFE",
  "MOD_06_NAME": "کنترلر اتوکلاو استریلیزاسیون فشار بالا",
  "MOD_06_DESC": "کنترل‌کننده استریلیزاسیون بخار با ایمنی بحرانی، اینترلاک‌های پنوماتیک چندمرحله‌ای، اعتبارسنجی دوگانه مبدل‌های فشار و لاگین انکریپت‌شده سیکل.",
  "MOD_06_SPECS": "فشار مجاز: ۴.۵ بار صنعتی | ترنسدیوسر فشار دوگانه | گواهی استاندارد تجهیزات حساس",
  "MOD_06_STACK": "STM32F7 / RTIC v2 / DUAL TRANSDUCERS / ENCRYPTED LOGS",

  "MOD_07_ID": "MODULE_07 // EDGE-VISION",
  "MOD_07_NAME": "گره هوشمند بینایی ماشین (Edge Vision)",
  "MOD_07_DESC": "سیستم بازرسی کیفیت خودکار بر پایه‌ی Orange Pi و الگوریتم‌های YOLO. تشخیص آنی ناهنجاری‌ها و کنترل کیفیت بصری، بدون نیاز به ارسال داده به سرور ابری و با تاخیر نزدیک به صفر.",
  "MOD_07_SPECS": "توان پردازشی: 6 TOPS | تاخیر استنتاج: بلادرنگ با YOLOv8 | بدون وابستگی ابری",
  "MOD_07_STACK": "Orange Pi / YOLOv8 / Rust Bindings",

  "MOD_08_ID": "MODULE_08 // IOT-MESH",
  "MOD_08_NAME": "شبکه تله‌متری بی‌سیم (IoT Mesh)",
  "MOD_08_DESC": "معماری توزیع‌شده‌ی سنسورهای صنعتی با ESP32. پایش لحظه‌ای دما، ارتعاش و مصرف انرژی از طریق پروتکل MQTT. این راهکار برای هوشمندسازی خطوط تولید قدیمی (Retrofit) بدون نیاز به کابل‌کشی‌های پرهزینه طراحی شده است.",
  "MOD_08_SPECS": "تاخیر شبکه: کمتر از 20ms | مصرف انرژی بهینه | برد بالا",
  "MOD_08_STACK": "ESP32-S3 / Embassy / MQTT",

  "MOD_09_ID": "MODULE_09 // COGNITIVE-CORE",
  "MOD_09_NAME": "هسته تحلیلگر شناختی (On-Device LLM)",
  "MOD_09_DESC": "اجرای مدل‌های زبانی کوچک (SLM) به‌صورت محلی روی سخت‌افزارهایی مثل Raspberry Pi 5. این ماژول امکان تحلیل خودکار لاگ‌های خطا و پیشنهاد تعمیرات پیشگیرانه (Predictive Maintenance) را بدون نگرانی از نشت اطلاعات فراهم می‌کند.",
  "MOD_09_SPECS": "پشتیبانی مدل‌ها: تا 7B پارامتر (Quantized) | موتور Llama.cpp Rust | پردازش محلی",
  "MOD_09_STACK": "RPi 5 / Llama.cpp / Rust",

  // Meet the Architects
  "ARCH_SUB": "// تیم فنی و مهندسی",
  "ARCH_TITLE": "معماران ارشد سیستم",
  "ARCH_DESC": "تیم مهندسی ما با تسلط کامل بر طراحی فیزیکی سخت‌افزار، معماری کرنل و توسعه سیستم‌های مدرن با زبان Rust فعالیت می‌کند.",

  "ARCH_1_NAME": "منیب مختاری",
  "ARCH_1_ROLE": "مدیرعامل و معمار سیستم‌های نهفته",
  "ARCH_1_BIO": "«تمرکز من روی طراحی همزمان سخت‌افزار و نرم‌افزار است؛ جایی که مرز بین این دو از بین می‌رود. از طراحی شماتیک و PCB با رعایت دقیق اصول EMI/EMC، تا پیاده‌سازی الگوریتم‌های بلادرنگ (Real-time) با فریمورک RTIC و تضمین ایمنی عملکردی در میکروکنترلرهای صنعتی.»",
  "ARCH_1_TAGS": "طراحی همزمان سخت‌افزار/نرم‌افزار، RTIC v2، استاندارد EMI/EMC، ایمنی عملکردی، الکترونیک آنالوگ/دیجیتال",

  "ARCH_2_NAME": "فائز برغسا",
  "ARCH_2_ROLE": "مدیر فنی (CTO) و مهندس ارشد سیستم",
  "ARCH_2_BIO": "«مسیر توسعه را از پایین‌ترین سطح سخت‌افزار (no_std) تا بالاترین لایه‌های ابری در دست می‌گیرم. تخصص من پیاده‌سازی پایپلاین‌های DMA با کپی صفر (Zero-Copy)، پروتکل‌های ارتباطی بهینه و یکپارچه‌سازی هوش مصنوعی لبه‌ای (Edge AI) با رابط‌های کاربری مدرن است.»",
  "ARCH_2_TAGS": "فول‌استک Rust، کپی صفر DMA، فریمورک Embassy Async، هوش مصنوعی لبه، رابط Slint، پژوهش کرنل Redox OS",

  // Open Source Showcase
  "OSS_SUB": "// پروژه‌ها و پژوهش‌های منبع‌باز",
  "OSS_TITLE": "کدها و ابزارهای آزموده‌شده",
  "OSS_DESC": "ما صرفاً مصرف‌کننده ابزارهای متن‌باز نیستیم؛ بلکه در حال ساختن آینده سیستم‌های نهفته و رباتیک دقیق با زبان Rust هستیم.",
  "OSS_VIEW_GITHUB": "مشاهده در گیت‌هاب",

  "OSS_1_NAME": "mqtt-async-embedded",
  "OSS_1_DESC": "کلاینت MQTT بلادرنگ و بدون تخصیص حافظه پویا (Heap-Free)، طراحی‌شده برای محیط‌های بحرانی صنعتی و سیستم‌های no_std.",
  "OSS_1_TAG": "RUST / NO_STD / EMBASSY",

  "OSS_2_NAME": "Rotary_Library",
  "OSS_2_DESC": "درایور no_std بهینه برای انکودرهای چرخشی با پشتیبانی از embedded-hal 4.x، شامل تشخیص سرعت و حذف نویز سخت‌افزاری.",
  "OSS_2_TAG": "EMBEDDED-HAL / DRIVERS",

  "OSS_3_NAME": "r_klipp",
  "OSS_3_DESC": "بازنویسی بلادرنگ و ایمن سیستم‌های کنترل حرکت (Motion Control) برای ماشین‌آلات صنعتی CNC و پرینترهای سه‌بعدی با الگوریتم‌های PH Corner Blending.",
  "OSS_3_TAG": "MOTION CONTROL / KINEMATICS",

  "OSS_4_NAME": "omid",
  "OSS_4_DESC": "چارچوب زیرسیستم‌های تعبیه‌شده رباتیک و اتوماسیون صنعتی برای معماری‌های توزیع‌شده چندکنترلری.",
  "OSS_4_TAG": "ROBOTICS / ACTUATION",

  // Lead Magnet / Whitepaper
  "WP_SUB": "// مستندات و گزارش فنی",
  "WP_TITLE": "سند معماری اینترنت اشیاء صنعتی و هوش مصنوعی لبه‌ای",
  "WP_DESC": "دانلود وایت‌پیپر تخصصی ۲۸ صفحه‌ای در خصوص راهکارهای بومی، تله‌متری بدون هیپ و بینایی ماشین صنعتی در خطوط تولید پیشرفته.",
  "WP_BUTTON": "دانلود مستندات فنی (PDF)",
  "WP_MODAL_TITLE": "دریافت وایت‌پیپر فنی صنایع پیشرفته",
  "WP_MODAL_DESC": "اطلاعات سازمانی خود را وارد کنید تا نسخه کامل مستندات فنی بلافاصله برای شما آماده شود.",
  "WP_FORM_NAME": "نام و نام خانوادگی",
  "WP_FORM_COMPANY": "سازمان / شرکت صنعتی",
  "WP_FORM_PHONE": "شماره تماس مستقیم",
  "WP_FORM_EMAIL": "ایمیل سازمانی",
  "WP_FORM_SUBMIT": "دانلود مستقیم سند فنی (PDF)",
  "WP_SUCCESS": "درخواست تأیید شد: فایل سند فنی با موفقیت در دسترس قرار گرفت.",

  // Developer Portal
  "DEV_MODAL_TITLE": "پورتال مهندسی و مشخصات پشته فنی",
  "DEV_MODAL_DESC": "مشاهده نمونه کدهای واقعی، ساختار بسته‌های MQTT و معماری کامپوننت‌های Slint.",
  "DEV_TAB_SLINT": "طرح کامپوننت Slint HMI",
  "DEV_TAB_MQTT": "ساختار پیام‌های MQTT بدون هیپ",
  "DEV_TAB_EMBASSY": "درایور سخت‌افزاری Embassy DMA",

  // Footer
  "FOOT_TITLE": "اکساید تک (oxide-tech)",
  "FOOT_DESC": "طراحی و توسعه سیستم‌های نهفته صنعتی، هوش مصنوعی لبه‌ای و شبکه‌های تله‌متری بی‌سیم با تکیه بر ایمنی و کارایی زبان Rust.",
  "FOOT_ORIGIN": "طراحی و مهندسی شده در ایران",
  "FOOT_RESOURCES": "بخش‌های فنی",
  "FOOT_COMPLIANCE": "امنیت و استانداردها",
  "FOOT_UPDATES": "خبرنامه فنی و انتشارات مهندسی",
  "FOOT_COPYRIGHT": "© ۲۰۲۶ شرکت مهندسی اکساید تک. تمامی حقوق محفوظ است."
};