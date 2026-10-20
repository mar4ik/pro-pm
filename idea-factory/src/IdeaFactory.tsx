import { useEffect, useRef } from 'react';
import { Factory } from './Factory';
import { buildTimelines, LABELS, type FactoryTimelines } from './timeline';

declare global { interface Window { __factory?: FactoryTimelines['master'] } }

/** The object-only factory film: autoplays, loops, no controls. Reduced motion shows one still frame. */
export function IdeaFactory() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current; if (!svg) return;
    const t = buildTimelines(svg);
    window.__factory = t.master;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      t.ambient.pause();
      t.master.pause(LABELS.product + 4.2); // the assembled phone, machines still
    } else {
      t.master.play();
    }
    return () => { t.kill(); delete window.__factory; };
  }, []);

  return (
    <div className="if-root" aria-hidden="true">
      <div className="if-stage"><Factory ref={svgRef} /></div>
    </div>
  );
}
