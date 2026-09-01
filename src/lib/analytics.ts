// Lightweight privacy-first client-side analytics and telemetry event bus

export interface AnalyticsEvent {
  event: string;
  category: 'cta' | 'whitepaper' | 'module_view' | '3d_interaction' | 'opensource_click' | 'portal_view' | 'navigation';
  label?: string;
  value?: number | string;
  timestamp?: number;
}

class TelemetryTracker {
  private events: AnalyticsEvent[] = [];
  private listeners: ((event: AnalyticsEvent) => void)[] = [];

  public track(event: string, category: AnalyticsEvent['category'], label?: string, value?: number | string) {
    const payload: AnalyticsEvent = {
      event,
      category,
      label,
      value,
      timestamp: Date.now()
    };
    
    this.events.push(payload);
    
    // In dev, log to console
    if (import.meta.env.DEV) {
      console.log(`[Telemetry] ${category.toUpperCase()} :: ${event}`, label ? `(${label})` : '', value ?? '');
    }

    // Dispatch to registered listeners
    this.listeners.forEach(fn => fn(payload));
  }

  public subscribe(listener: (event: AnalyticsEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(fn => fn !== listener);
    };
  }

  public getRecentEvents(): AnalyticsEvent[] {
    return [...this.events];
  }
}

export const telemetry = new TelemetryTracker();
