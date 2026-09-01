export const translations = {
  en: {
    // Brand & Navigation
    "BRAND_NAME": "OXIDE-TECH",
    "BRAND_TAGLINE": "SOVEREIGN EMBEDDED SYSTEMS & INDUSTRIAL AI",
    "NAV_MANIFESTO": "Philosophy",
    "NAV_TECH": "Architecture",
    "NAV_PRODUCTS": "Hardware Modules",
    "NAV_ARCHITECTS": "Leadership",
    "NAV_OPENSOURCE": "Open Source",
    "NAV_CONTACT": "Direct Contact",
    "NAV_GET_LICENSE": "Contact Engineering",

    // Hero Section
    "HERO_STATUS": "[ SYSTEM STATUS: DEPLOYED // NO_STD RUST & RTIC v2 ]",
    "HERO_TITLE_H1": "Next-Generation Embedded & Industrial Systems;",
    "HERO_TITLE_H1_CONT": "From Edge Computing to Autonomous AI",
    "HERO_SUBTEXT": "Combining 23+ years of hardware co-design with Rust's memory safety. We build deterministic, ultra-fast embedded systems engineered for 24/7 mission-critical operation in industrial and laboratory environments.",
    "HERO_QUOTE_CEO": "“If the compiler agrees, the hardware will agree. We write firmware where even silence on the data bus is intentional.”",
    "HERO_QUOTE_CEO_AUTHOR": "Monib Mokhtari, Embedded Systems Architect & CEO",
    "HERO_CTA_PRIMARY": "Explore Solutions",
    "HERO_CTA_SECONDARY": "Direct Contact",
    "HERO_3D_PAUSE_HINT": "Hover to pause telemetry model rotation",
    "HERO_3D_ACTIVE": "PBR 3D Telemetry Viewport // Interactive",

    // Typewriter Words
    "Rust": "Rust (no_std)",
    "Silicon": "Silicon & Multi-Layer PCB",
    "Safety": "Compile-Time Memory Safety",
    "Reliability": "RTIC v2 / Embassy Determinism",

    // Core Engineering Principles (6 Pillars)
    "MAN_SUB": "// CORE ENGINEERING PRINCIPLES",
    "MAN_TITLE": "Our Engineering Philosophy & Rigor",
    "MAN_QUOTE_CTO": "“Performance, memory safety, and determinism are non-negotiable.”",
    "MAN_QUOTE_CTO_AUTHOR": "Faez Barghasa, Chief Technology Officer",

    "MAN_P1_TITLE": "Complete Vertical Ownership",
    "MAN_P1_SUB": "Altium to 60FPS Slint HMI",
    "MAN_P1_DESC": "Full-stack ownership from blank Altium schematics and multi-layer PCBs to no_std Rust firmware, DMA telemetry, and 60FPS capacitive touchscreen Slint interfaces without third-party integration friction.",

    "MAN_P2_TITLE": "Compile-Time Determinism & RTIC v2",
    "MAN_P2_SUB": "Hardware Task Binding & Deadlock Freedom",
    "MAN_P2_DESC": "Eliminating bugs at compile time. Utilizing RTIC v2 for priority inversion prevention, hardware-bound tasks, and compile-time deadlock-free shared resources with zero RTOS overhead on Cortex-M.",

    "MAN_P3_TITLE": "Mathematical & Physical Rigor",
    "MAN_P3_SUB": "Fixed-Point Math & Kalman MPC",
    "MAN_P3_DESC": "Replacing floating-point jitter with I32F32 fixed-point DSP, deploying Kalman-filtered Model Predictive Control (MPC), and applying continuous-curvature Pythagorean-Hodograph (PH) trajectories.",

    "MAN_P4_TITLE": "Zero Dynamic Allocation Purity",
    "MAN_P4_SUB": "Heap-Free Stack FSM & Zero-Copy DMA",
    "MAN_P4_DESC": "Strict #![forbid(unsafe_code)] bare-metal networking and DMA drivers with static buffer guarantees via heapless, preventing runtime panics and heap fragmentation permanently.",

    "MAN_P5_TITLE": "Sovereign Microkernel & Cross-Platform HMI",
    "MAN_P5_SUB": "Redox OS IPC & Slint Engine",
    "MAN_P5_DESC": "Pioneering microkernel IPC drivers on Redox OS alongside declarative Slint HMI running natively across Raspberry Pi 5, ESP32, and bare-metal framebuffers.",

    "MAN_P6_TITLE": "Industrial Hardware-Software Co-Design",
    "MAN_P6_SUB": "EMI/EMC Compliance & Functional Safety",
    "MAN_P6_DESC": "Design of analog/digital sensor front-ends, power regulation, and multi-layer layouts adhering strictly to industrial EMI/EMC standards and IEC safety-critical fault-detection state machines.",

    // Tech Stack (4 Vertical Layers)
    "TECH_SUB": "// VERTICAL INTEGRATION STACK",
    "TECH_TITLE": "Silicon to Cloud: Multi-Layer Architecture",
    "TECH_DESC": "A vertically integrated stack built for safety, deterministic speed, and multi-decade maintainability. Zero undefined behavior.",
    "TECH_LATENCY": "Bus Latency",
    "TECH_LIVE": "LIVE_TELEMETRY",
    "TECH_LIVE_SHORT": "LIVE",

    "TECH_L1_TITLE": "Layer 1: Compute & Control (Hardware)",
    "TECH_L1_DESC": "STM32 High-End (Cortex-M4/M7 with RTIC v2), Orange Pi / RPi 5 compute nodes, and ESP32-S3 wireless mesh nodes.",
    
    "TECH_L2_TITLE": "Layer 2: Intelligence & Vision (Edge AI)",
    "TECH_L2_DESC": "Deterministic YOLOv8 automated visual quality inspection and On-Device SLMs (Llama.cpp/Rust) for predictive maintenance.",

    "TECH_L3_TITLE": "Layer 3: Connectivity & Protocols (IIoT)",
    "TECH_L3_DESC": "Heap-Free MQTT 3.1.1/5.0 protocol stack, Zero-Copy DMA buffers, and high-concurrency Actix / SurrealDB backends.",

    "TECH_L4_TITLE": "Layer 4: Industrial Experience (HMI)",
    "TECH_L4_DESC": "Slint native declarative GUI running without standard library bloat across embedded displays, tablets, and Linux HMI.",

    // Products & Modules (9 Modules)
    "INV_SUB": "// INDUSTRIAL MODULE CATALOG",
    "INV_TITLE": "Sovereign Hardware & Modules",
    "INV_SEARCH": "Search by module ID, MCU architecture, or protocol...",
    "INV_PROJECT_3D": "3D View",
    "INV_ACTIVE": "Active In-Production",
    "INV_SPECS": "Technical Specifications",
    "INV_TECH_STACK": "Tech Stack",

    "MOD_01_NAME": "Laminar Airflow Control Unit",
    "MOD_01_DESC": "Ultra-low latency airflow control system with redundant differential sensor feedback loops and ISO-5 cleanroom compliance.",
    "MOD_01_SPECS": "Latency: < 500μs | Target: STM32F407 | Safety: Interlocked Relays",
    "MOD_01_STACK": "STM32 / RUST NO_STD / EMBASSY / RS-485",

    "MOD_02_NAME": "Precision Lab Mixer Rotator",
    "MOD_02_DESC": "Jitter-free angular velocity management with field-oriented brushless DC motor control and Slint-driven tactile touchscreen HMI.",
    "MOD_02_SPECS": "Speed Accuracy: ±0.1 RPM | Dynamic Torque | Slint UI 60 FPS",
    "MOD_02_STACK": "CORTEX-M4 / SLINT / HARDWARE-PWM / EMBEDDED-HAL",

    "MOD_03_NAME": "State-Space MPC Thermal Controller",
    "MOD_03_DESC": "State-Space MPC controller with integrated Kalman Filter for unprecedented thermal stability and distributed sub-microsecond multi-MCU PLL sync.",
    "MOD_03_SPECS": "Temp Stability: ±0.01°C | Multi-MCU Sync: < 1μs | Dual PT1000 RTD",
    "MOD_03_STACK": "STM32F4 / RTIC v2 / STATE-SPACE MPC / KALMAN FILTER",

    "MOD_04_NAME": "High-Uniformity Industrial Incubator Oven",
    "MOD_04_DESC": "Multi-zone thermal chamber controller with dual PT1000 RTD sensors, hardware-level overtemperature cut-offs, and PID heating loops.",
    "MOD_04_SPECS": "Range: +5°C to 250°C | Uniformity: ±0.3°C | Dual Safety Limiters",
    "MOD_04_STACK": "STM32 / DUAL PT1000 / RTIC / MODBUS-RTU",

    "MOD_05_NAME": "Refrigerated Biological Incubator",
    "MOD_05_DESC": "Low-vibration biological cooling chamber controller with cascade inverter compressor control and sub-zero precision thermal regulation.",
    "MOD_05_SPECS": "Range: -10°C to +60°C | Inverter Modulation | Anti-Freeze Lock",
    "MOD_05_STACK": "STM32 / EMBASSY / INVERTER-FOC / SLINT",

    "MOD_06_NAME": "Safety-Critical Laboratory Autoclave Controller",
    "MOD_06_DESC": "High-pressure steam sterilization controller with multi-stage pneumatic interlocks, double pressure transducer validation, and audited cycle logging.",
    "MOD_06_SPECS": "Pressure Rating: 4.5 Bar | Dual Transducers | ISO-13485 Spec",
    "MOD_06_STACK": "STM32F7 / RTIC v2 / DUAL TRANSDUCERS / ENCRYPTED LOGS",

    "MOD_07_NAME": "Smart Edge AI Vision Node (Edge Vision)",
    "MOD_07_DESC": "Automated quality inspection system powered by Orange Pi and YOLO models. Real-time visual anomaly detection without cloud dependencies.",
    "MOD_07_SPECS": "Compute: 6 TOPS NPU | Latency: Real-time YOLOv8 | Zero Cloud Dependency",
    "MOD_07_STACK": "Orange Pi / YOLOv8 / Rust Bindings",

    "MOD_08_NAME": "Wireless Industrial Telemetry Mesh (IoT Mesh)",
    "MOD_08_DESC": "Distributed sensor network powered by ESP32-S3 and heap-free MQTT. Real-time monitoring of vibration, temperature, and energy without cabling overhead.",
    "MOD_08_SPECS": "Latency: < 20ms Mesh | Stack: Heap-Free MQTT | TLS 1.3",
    "MOD_08_STACK": "ESP32-S3 / Embassy / MQTT v5",

    "MOD_09_NAME": "On-Device Cognitive Diagnostic Core (SLM)",
    "MOD_09_DESC": "Local small language model deployment on Raspberry Pi 5. Automated error log diagnosis and predictive maintenance with zero data leakage.",
    "MOD_09_SPECS": "Model Capacity: Up to 7B Quantized | Privacy: 100% On-Premise",
    "MOD_09_STACK": "RPi 5 / Llama.cpp / Rust / Slint",

    // Architects / Leadership Section
    "ARCH_SUB": "// LEADERSHIP & SYSTEMS ARCHITECTS",
    "ARCH_TITLE": "The Architects Behind Oxide Tech",
    "ARCH_DESC": "Direct engineering leadership combining deep hardware intuition with modern systems programming and formal mathematical rigor.",
    "ARCH_MONIB_NAME": "Monib Mokhtari",
    "ARCH_MONIB_ROLE": "CEO & Embedded Systems Architect",
    "ARCH_MONIB_BIO": "Focusing on hardware-software co-design where the physical and digital boundaries dissolve. From Altium schematic capture and PCB layout adhering strictly to EMI/EMC standards, to deterministic RTIC v2 real-time firmware and functional safety for mission-critical microcontrollers.",
    "ARCH_FAEZ_NAME": "Faez Barghasa",
    "ARCH_FAEZ_ROLE": "CTO & Lead Systems Engineer",
    "ARCH_FAEZ_BIO": "Leading the complete vertical development chain from bare-metal silicon (no_std) to sovereign cloud infrastructure. Specializing in zero-copy DMA streaming pipelines, heap-free async protocols, edge AI integration (YOLO), and 60FPS Slint native interfaces.",

    // Open Source Section
    "OSS_SUB": "// OPEN SOURCE ECOSYSTEM",
    "OSS_TITLE": "Core Open-Source Contributions",
    "OSS_DESC": "Production-grade, zero-cost libraries and systems tools developed and open-sourced for the embedded Rust ecosystem.",
    "OSS_VIEW_GITHUB": "View on GitHub",

    // Direct Contact Section
    "CONTACT_SUB": "// DIRECT CONTACT & INQUIRY",
    "CONTACT_TITLE": "Direct Lines to Engineering Leadership",
    "CONTACT_DESC": "Connect directly with our Chief Architect and CTO via phone or Gmail for project scoping, technical consultations, or custom hardware contracts.",

    // Footer
    "FOOT_TITLE": "oxide-tech",
    "FOOT_DESC": "Precision hardware-software co-design, deterministic real-time systems, and sovereign edge intelligence engineered in Rust.",
    "FOOT_ORIGIN": "DESIGNED & ENGINEERED IN IRAN",
    "FOOT_RESOURCES": "Navigation",
    "FOOT_DIRECT": "Direct Contacts",
    "FOOT_COPYRIGHT": "© 2026 Oxide Tech Industrial Systems. All rights reserved."
  },

  fa: {
    // Brand & Navigation
    "BRAND_NAME": "اکساید تک",
    "BRAND_TAGLINE": "سیستم‌های نهفته صنعتی و هوش مصنوعی لبه",
    "NAV_MANIFESTO": "اصول مهندسی",
    "NAV_TECH": "معماری فنی",
    "NAV_PRODUCTS": "ماژول‌های سخت‌افزاری",
    "NAV_ARCHITECTS": "تیم رهبری",
    "NAV_OPENSOURCE": "متن‌باز",
    "NAV_CONTACT": "ارتباط مستقیم",
    "NAV_GET_LICENSE": "تماس با تیم فنی",

    // Hero Section
    "HERO_STATUS": "[ وضعیت سیستم: مستقر در خط تولید // RUST NO_STD & RTIC v2 ]",
    "HERO_TITLE_H1": "نسل جدید سیستم‌های نهفته و صنعتی؛",
    "HERO_TITLE_H1_CONT": "از پردازش لبه‌ای (Edge) تا هوش مصنوعی مستقل",
    "HERO_SUBTEXT": "ترکیب ۲۳ سال تجربه در طراحی سخت‌افزار با ایمنی و کارایی زبان Rust. ما سیستم‌هایی می‌سازیم که هوشمند، فوق‌العاده سریع و برای کارکرد دائمی در حساس‌ترین محیط‌های صنعتی و آزمایشگاهی طراحی شده‌اند.",
    "HERO_QUOTE_CEO": "“اگر کامپایلر تأیید کند، سخت‌افزار نیز تأیید خواهد کرد. ما فریموری می‌نویسیم که در آن حتی سکوت در باس داده نیز عمدی است.”",
    "HERO_QUOTE_CEO_AUTHOR": "منیب مختاری، معمار سیستم‌های نهفته و مدیرعامل",
    "HERO_CTA_PRIMARY": "مشاهده راهکارهای فنی",
    "HERO_CTA_SECONDARY": "ارتباط مستقیم با مهندسان",
    "HERO_3D_PAUSE_HINT": "شناور کردن ماوس برای توقف چرخش مدل تله‌متری",
    "HERO_3D_ACTIVE": "درگاه سه‌بعدی تله‌متری PBR // تعاملی",

    // Typewriter Words
    "Rust": "زبان Rust (no_std)",
    "Silicon": "طراحی سیلیکون و برد چندلایه",
    "Safety": "ایمنی تضمین‌شده در کامپایل",
    "Reliability": "معماری RTIC v2 / Embassy",

    // Core Engineering Principles (اصول بنیادین مهندسی)
    "MAN_SUB": "// اصول بنیادین مهندسی",
    "MAN_TITLE": "رویکرد و فلسفه مهندسی ما",
    "MAN_QUOTE_CTO": "“کارایی، ایمنی حافظه و قطعیت، قابل مصالحه نیستند.”",
    "MAN_QUOTE_CTO_AUTHOR": "فائز برق‌آسا، مدیر ارشد فناوری",

    "MAN_P1_TITLE": "تسلط کامل بر زنجیره عمودی توسعه",
    "MAN_P1_SUB": "Altium to 60FPS Slint HMI",
    "MAN_P1_DESC": "طراحی صفر تا صد از شماتیک و بردهای چندلایه در Altium تا فریمورک no_std در Rust، تله‌متری DMA و رابط کاربری لمسی ۶۰ فریم Slint بدون کوچک‌ترین وابستگی به ابزارهای متفرقه.",

    "MAN_P2_TITLE": "قطعیت در زمان کامپایل با RTIC v2",
    "MAN_P2_SUB": "Hardware Task Binding & Deadlock Freedom",
    "MAN_P2_DESC": "حذف باگ‌ها در مرحله کامپایل. بهره‌گیری از فریمورک RTIC v2 برای جلوگیری سخت‌افزاری از وارونگی اولویت، مدیریت منابع بدون بن‌بست و اجرای بی‌درنگ وظایف بدون اورهد RTOS در پردازنده‌های Cortex-M.",

    "MAN_P3_TITLE": "دقت ریاضیاتی و کنترل حرکت قطعی",
    "MAN_P3_SUB": "Fixed-Point Math & Kalman MPC",
    "MAN_P3_DESC": "حذف خطاهای ممیز شناور با استفاده از محاسبات I32F32، پیاده‌سازی کنترل‌کننده‌های پیش‌بین مدل (MPC) با فیلتر کالمن و تولید منحنی‌های حرکت پیوسته با ریاضیات Pythagorean-Hodograph.",

    "MAN_P4_TITLE": "خلوص در عدم تخصیص حافظه پویا",
    "MAN_P4_SUB": "Heap-Free Stack FSM & Zero-Copy DMA",
    "MAN_P4_DESC": "توسعه پروتکل‌ها با تگ #![forbid(unsafe_code)] و بافرهای ایستا بر پایه heapless. تضمین عدم رخداد خطا یا Panic در حافظه و ارسال استریم داده مستقیم از رجیسترهای سخت‌افزاری به بافر DMA.",

    "MAN_P5_TITLE": "سیستم‌عامل ریزهسته و رابط کاربری صنعتی",
    "MAN_P5_SUB": "Redox OS IPC & Slint Engine",
    "MAN_P5_DESC": "پژوهش و پیاده‌سازی درایورهای IPC در سیستم‌عامل ریزهسته‌ای Redox OS به همراه توسعه رابط‌های مدرن کاربری با موتور Slint روی رزبری پای ۵، ESP32 و نمایشگرهای صنعتی.",

    "MAN_P6_TITLE": "طراحی همزمان سخت‌افزار و نرم‌افزار",
    "MAN_P6_SUB": "EMI/EMC Compliance & Functional Safety",
    "MAN_P6_DESC": "طراحی دقیق مدارهای آنالوگ/دیجیتال، فیلترهای نویزگیر و بردهای چندلایه با رعایت الزامات استانداردهای صنعتی EMI/EMC و ماشین‌های حالت ایمنی عملکردی (Functional Safety).",

    // Tech Stack (4 Vertical Layers)
    "TECH_SUB": "// معماری پشته یکپارچه",
    "TECH_TITLE": "از سطح تراشه تا ابر: پشته فنی یکپارچه",
    "TECH_DESC": "پشته‌ای عمودی، بدون واسطه‌های زائد و مهندسی‌شده برای سرعت قطعی، امنیت داده و کارکرد بدون وقفه چنددهه‌ای.",
    "TECH_LATENCY": "تاخیر تبادل داده در باس",
    "TECH_LIVE": "تله‌متری زنده",
    "TECH_LIVE_SHORT": "زنده",

    "TECH_L1_TITLE": "لایه ۱: محاسبات و کنترل (سخت‌افزار)",
    "TECH_L1_DESC": "میکروکنترلرهای STM32 صنعتی (Cortex-M4/M7 با RTIC v2)، بردهای پردازش تصویر Orange Pi / RPi 5 و گره‌های بی‌سیم کم‌مصرف ESP32-S3.",

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

    "MOD_01_NAME": "برد کنترل هود لامینار جریان خطی",
    "MOD_01_DESC": "سامانه کنترل جریان هوای آرام با تاخیر فوق‌العاده کم، حلقه‌های فیدبک سنسورهای دیفرانسیلی فشار و انطباق کامل با استاندارد ISO-5 اتاق تمیز.",
    "MOD_01_SPECS": "تاخیر کنترل: کمتر از ۵۰۰ میکروثانیه | کنترلر: STM32F407 | رله‌های محافظتی سخت‌افزاری",
    "MOD_01_STACK": "STM32 / RUST NO_STD / EMBASSY / RS-485",

    "MOD_02_NAME": "میکسر روتاتور دقیق آزمایشگاهی",
    "MOD_02_DESC": "مدیریت سرعت زاویه‌ای بدون لغزش با موتورهای براشلس (BLDC) و رابط کاربری لمسی مدرن طراحی شده با فریمورک Slint با نرخ فریم ۶۰.",
    "MOD_02_SPECS": "دقت سرعت: ±۰.۱ دور در دقیقه | کنترل گشتاور دینامیکی | رابط Slint 60 FPS",
    "MOD_02_STACK": "CORTEX-M4 / SLINT / HARDWARE-PWM / EMBEDDED-HAL",

    "MOD_03_NAME": "کنترلر حرارتی فوق‌دقیق State-Space MPC",
    "MOD_03_DESC": "کنترل‌کننده پیش‌بین مدل فضای حالت مجهز به فیلتر کالمن برای ثبات دمایی بی‌نظیر و همگام‌سازی کلاک زیر میکروثانیه‌ای چند پردازنده.",
    "MOD_03_SPECS": "پایداری دما: ±۰.۰۱ درجه سانتی‌گر | همگام‌سازی چند میکرو: کمتر از ۱ میکروثانیه | سنسورهای دوگانه PT1000",
    "MOD_03_STACK": "STM32F4 / RTIC v2 / STATE-SPACE MPC / KALMAN FILTER",

    "MOD_04_NAME": "کنترلر چمبر و آون انکوباتور با یکنواختی بالا",
    "MOD_04_DESC": "سامانه مدیریت دمای محفظه‌های چندناحیه‌ای با سنسورهای دوگانه PT1000، قطع‌کننده سخت‌افزاری حرارت مازاد و حلقه‌های دقیق PID.",
    "MOD_04_SPECS": "محدوده کاری: +۵ تا ۲۵۰ درجه | یکنواختی دما: ±۰.۳ درجه | مدارهای قطع‌کننده ایمنی دوگانه",
    "MOD_04_STACK": "STM32 / DUAL PT1000 / RTIC / MODBUS-RTU",

    "MOD_05_NAME": "کنترلر انکوباتور بیولوژیکی یخچال‌دار",
    "MOD_05_DESC": "سیستم سرمایش و گرمایش محفظه‌های آزمایشگاهی با کنترل فرکانسی اینورتر کمپرسور، بدون لرزش مکانیکی و پایداری دمایی زیر صفر.",
    "MOD_05_SPECS": "محدوده کاری: -۱۰ تا +۶۰ درجه سانتی‌گر | مدولاسیون اینورتر | محافظت ضد یخ‌زدگی",
    "MOD_05_STACK": "STM32 / EMBASSY / INVERTER-FOC / SLINT",

    "MOD_06_NAME": "کنترلر ایمنی اتوکلاو استریلیزاسیون پزشکی",
    "MOD_06_DESC": "سامانه کنترل بخار تحت فشار با اینترلاک‌های پنوماتیک چندمرحله‌ای، اعتبارسنجی دوگانه ترنسدیوسرهای فشار و لاگینگی چرخه‌های استریل.",
    "MOD_06_SPECS": "تحمل فشار: ۴.۵ بار | ترنسدیوسرهای دوگانه متقاطع | استاندارد ISO-13485",
    "MOD_06_STACK": "STM32F7 / RTIC v2 / DUAL TRANSDUCERS / ENCRYPTED LOGS",

    "MOD_07_NAME": "گره هوشمند بینایی ماشین (Edge Vision)",
    "MOD_07_DESC": "سیستم بازرسی کیفیت خودکار بر پایه‌ی Orange Pi و الگوریتم‌های YOLO. تشخیص آنی ناهنجاری‌ها و کنترل کیفیت بصری، بدون نیاز به ارسال داده به سرور ابری و با تاخیر نزدیک به صفر.",
    "MOD_07_SPECS": "توان پردازشی: 6 TOPS | پشته فناوری: Orange Pi / YOLOv8 / Rust Bindings",
    "MOD_07_STACK": "Orange Pi / YOLOv8 / Rust Bindings",

    "MOD_08_NAME": "شبکه تله‌متری بی‌سیم صنعتی (IoT Mesh)",
    "MOD_08_DESC": "معماری توزیع‌شده‌ی سنسورهای صنعتی با ESP32. پایش لحظه‌ای دما، ارتعاش و مصرف انرژی از طریق پروتکل MQTT بدون نیاز به کابل‌کشی‌های پرهزینه.",
    "MOD_08_SPECS": "تاخیر شبکه: کمتر از 20ms | پشته فناوری: ESP32-S3 / Embassy / MQTT",
    "MOD_08_STACK": "ESP32-S3 / Embassy / MQTT v5",

    "MOD_09_NAME": "هسته تحلیلگر شناختی محلی (On-Device SLM)",
    "MOD_09_DESC": "اجرای مدل‌های زبانی کوچک (SLM) به‌صورت محلی روی سخت‌افزارهایی مثل Raspberry Pi 5. تحلیل خودکار لاگ‌های خطا و پیشنهاد تعمیرات پیشگیرانه بدون نگرانی از نشت اطلاعات.",
    "MOD_09_SPECS": "پشتیبانی از مدل‌ها: تا 7B پارامتر (Quantized) | حریم خصوصی: ۱۰۰٪ درون‌سازمانی",
    "MOD_09_STACK": "RPi 5 / Llama.cpp / Rust / Slint",

    // Architects / Leadership Section
    "ARCH_SUB": "// تیم رهبری و معماران ارشد سیستم",
    "ARCH_TITLE": "معماران فنی اکساید تک",
    "ARCH_DESC": "ترکیب درک عمیق از سخت‌افزار با مهندسی سیستم‌های پیشرفته و دقت ریاضیاتی.",
    "ARCH_MONIB_NAME": "منیب مختاری",
    "ARCH_MONIB_ROLE": "مدیرعامل و معمار سیستم‌های نهفته",
    "ARCH_MONIB_BIO": "تمرکز من روی طراحی همزمان سخت‌افزار و نرم‌افزار است؛ جایی که مرز بین این دو از بین می‌رود. از طراحی شماتیک و PCB با رعایت دقیق اصول EMI/EMC، تا پیاده‌سازی الگوریتم‌های بلادرنگ با فریمورک RTIC v2 و تضمین ایمنی عملکردی در میکروکنترلرهای صنعتی.",
    "ARCH_FAEZ_NAME": "فائز برق‌آسا",
    "ARCH_FAEZ_ROLE": "مدیر ارشد فناوری (CTO) و مهندس سیستم",
    "ARCH_FAEZ_BIO": "مسیر توسعه را از پایین‌ترین سطح سخت‌افزار (no_std) تا بالاترین لایه‌های ابری در دست می‌گیرم. تخصص من پیاده‌سازی پایپلاین‌های DMA با کپی صفر (Zero-Copy)، پروتکل‌های ارتباطی بدون هیپ و یکپارچه‌سازی هوش مصنوعی لبه‌ای (Edge AI) با رابط‌های کاربری مدرن Slint است.",

    // Open Source Section
    "OSS_SUB": "// اکوسیستم متن‌باز",
    "OSS_TITLE": "مخازن و مشارکت‌های متن‌باز",
    "OSS_DESC": "ابزارها و کتابخانه‌های سطح سیستم که برای ارتقای جامعه توسعه‌دهندگان سیستم‌های نهفته به صورت متن‌باز منتشر شده‌اند.",
    "OSS_VIEW_GITHUB": "مشاهده در گیت‌هاب",

    // Direct Contact Section
    "CONTACT_SUB": "// ارتباط مستقیم با معماران فنی",
    "CONTACT_TITLE": "راه‌های ارتباط مستقیم با تیم مهندسی",
    "CONTACT_DESC": "جهت مشاوره فنی، سفارش طراحی بردهای اختصاصی صنعتی یا پیاده‌سازی فریمورک‌های بلادرنگ، مستقیماً از طریق شماره تماس یا جیمیل با ما در ارتباط باشید.",

    // Footer
    "FOOT_TITLE": "اکساید تک",
    "FOOT_DESC": "طراحی سیستم‌های نهفته با کارایی بالا، سیستم‌های بلادرنگ قطعی و هوش مصنوعی لبه با زبان برنامه‌نویسی Rust.",
    "FOOT_ORIGIN": "طراحی و مهندسی شده در ایران",
    "FOOT_RESOURCES": "بخش‌های سایت",
    "FOOT_DIRECT": "راه‌های ارتباط مستقیم",
    "FOOT_COPYRIGHT": "© ۲۰۲۶ شرکت مهندسی اکساید تک (Oxide Tech). تمامی حقوق محفوظ است."
  }
};

export const t = (key: string, lang: 'fa' | 'en'): string => {
  const dict = translations[lang] || translations.fa;
  // @ts-ignore
  return dict[key] || key;
};