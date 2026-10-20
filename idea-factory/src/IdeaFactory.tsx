import { useEffect, useRef } from 'react';
import { Factory } from './Factory';
import { buildTimelines, LABELS, type FactoryTimelines } from './timeline';

declare global { interface Window { __factory?: FactoryTimelines['master'] } }

/** The object-only factory film: autoplays, loops, no controls. Reduced motion shows one still frame. */
export function IdeaFactory() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current; if (!svg) return;
    // phones get a shorter frame so the empty drop zone above the machines does not eat the screen
    const mq = window.matchMedia('(max-width: 760px)');
    const frame = () => svg.setAttribute('viewBox', mq.matches ? '150 -40 880 610' : '150 -230 880 800');
    frame(); mq.addEventListener('change', frame);
    const t = buildTimelines(svg);
    window.__factory = t.master;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      t.ambient.pause();
      t.master.pause(LABELS.product + 4.2); // the assembled phone, machines still
    } else {
      t.master.play();
    }
    return () => { t.kill(); mq.removeEventListener('change', frame); delete window.__factory; };
  }, []);

  return (
    <div className="if-root" aria-hidden="true">
      <div className="if-stage"><Factory ref={svgRef} /></div>
    </div>
  );
}
