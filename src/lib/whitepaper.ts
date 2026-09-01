// Whitepaper metadata and document definitions

export interface WhitepaperMeta {
  id: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  pages: number;
  format: string;
  size: string;
  version: string;
  topics: string[];
}

export const OXIDE_WHITEPAPER: WhitepaperMeta = {
  id: 'oxide-iiot-edge-ai-2026',
  titleFa: 'معماری اینترنت اشیاء صنعتی (IIoT) و هوش مصنوعی در لبه: راهکارهای بومی برای صنایع نسل چهارم',
  titleEn: 'Industrial IoT (IIoT) & Edge AI Architecture: Sovereign Solutions for Industry 4.0',
  subtitleFa: 'اصول طراحی سیستم‌های نهفته قطعی با Rust، کلاینت‌های بدون هیپ MQTT، استنتاج محلی YOLOv8 و کنترل‌کننده‌های چندسکویی Slint',
  subtitleEn: 'Principles of deterministic embedded systems with Rust, Heap-Free MQTT, local YOLOv8 inference, and multi-platform Slint HMIs',
  pages: 28,
  format: 'PDF (A4 High-Res)',
  size: '4.8 MB',
  version: 'v2.4.0 (2026 Release)',
  topics: [
    'RTIC v2 & Embassy Async Kernel Coexistence',
    'Zero-Copy DMA Pipelines in Industrial Imaging',
    'Heap-Free MQTT 5.0 State Machines on embassy-net',
    'State-Space MPC & Distributed PLL Synchronization',
    'Deterministic YOLOv8 Edge NPU Inference',
    'No-std Slint Graphic Pipelines for Embedded Displays'
  ]
};
