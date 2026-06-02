"use client";

import { useState, useEffect } from "react";
import type { MainLayoutProps } from "../../../types";

const ulosBg = {
  backgroundImage: `
    linear-gradient(45deg, rgba(212,168,75,0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,168,75,0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.04) 75%)
  `,
  backgroundSize: "60px 60px",
  backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
};

export function MainLayout({ children, config }: MainLayoutProps) {
  const [showContent, setShowContent] = useState(false);

  // Expose function to show content (will be called from OpeningScreen)
  useEffect(() => {
    (window as any).__batakShowContent = () => setShowContent(true);
    return () => {
      delete (window as any).__batakShowContent;
    };
  }, []);

  return (
    <div
      className="batak-layout"
      style={{
        fontFamily: config.fonts.body,
        color: config.colors.text,
        background: config.colors.background,
      }}
    >
      <style jsx>{`
        .batak-layout {
          min-height: 100vh;
          width: 100%;
        }

        /* Mobile: Full screen vertical scroll */
        @media (max-width: 1023px) {
          .batak-layout {
            display: block;
          }
          .batak-primary-pane {
            display: ${showContent ? 'none' : 'block'};
            min-height: 100vh;
          }
          .batak-secondary-pane {
            display: ${showContent ? 'block' : 'none'};
          }
        }

        /* Desktop: Split screen */
        @media (min-width: 1024px) {
          .batak-layout {
            display: flex;
            height: 100vh;
            overflow: hidden;
          }
          .batak-primary-pane {
            width: 45%;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            overflow: hidden;
          }
          .batak-secondary-pane {
            width: 55%;
            margin-left: 45%;
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
          }
        }

        .batak-primary-pane,
        .batak-secondary-pane {
          position: relative;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none" style={ulosBg} />
      
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
