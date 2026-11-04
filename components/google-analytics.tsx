"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args) => window.dataLayer.push(args);
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }, [measurementId]);

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;
      const eventName = target?.dataset.analyticsEvent;
      if (!target || !eventName) return;

      const link = target instanceof HTMLAnchorElement ? target : target.closest("a");
      window.gtag?.("event", eventName, {
        link_url: link?.href,
        project_name: target.dataset.projectName,
        project_link_type: target.dataset.projectLink,
      });
    };

    const onContactSuccess = () => window.gtag?.("event", "contact_form_submit");
    document.addEventListener("click", onClick);
    document.addEventListener("portfolio:contact-success", onContactSuccess);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("portfolio:contact-success", onContactSuccess);
    };
  }, []);

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="lazyOnload"
    />
  );
}
