import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Factory } from './Factory';
import { buildTimelines, LABELS, type FactoryTimelines, type StationKey } from './timeline';

const STATIONS: { key: StationKey; label: string }[] = [
  { key: 'pm', label: 'Project' },
  { key: 'event', label: 'Event' },
  { key: 'product', label: 'Product' },
];

declare global { interface Window { __factory?: gsap.core.Timeline } }

export function IdeaFactory() {
  const svgRef = useRef<SVGSVGElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<FactoryTimelines | null>(null);
  const [playing, setPlaying] = useState(false);
  const [station, setStation] = useState<StationKey | null>(null);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const svg = svgRef.current; if (!svg) return;
    const t = buildTimelines(svg);
    tlRef.current = t;
    window.__factory = t.master;
    t.master.eventCallback('onUpdate', () => {
      const p = t.master.progress();
      if (fillRef.current) fillRef.current.style.width = (p * 100).toFixed(2) + '%';
      const s = t.master.time();
      setStation(s >= LABELS.reveal ? null : s >= LABELS.product ? 'product' : s >= LABELS.event ? 'event' : s >= LABELS.pm ? 'pm' : null);
    });
    if (reduced) {
      // Reduced motion: show the finished factory, no machinery running; play is still available on request.
      t.ambient.pause();
      t.master.progress(LABELS.reveal / LABELS.end + 0.05).pause();
      gsap.set(svg, { attr: { viewBox: '0 0 1200 640' } });
    } else {
      t.master.play();
      setPlaying(true);
    }
    return () => { t.kill(); delete window.__factory; };
  }, [reduced]);

  const toggle = () => {
    const t = tlRef.current; if (!t) return;
    if (t.master.paused()) { t.master.play(); t.ambient.play(); setPlaying(true); }
    else { t.master.pause(); t.ambient.pause(); setPlaying(false); }
  };
  const restart = () => {
    const t = tlRef.current; if (!t) return;
    t.master.restart(); t.ambient.play(); setPlaying(true);
  };
  const jump = (key: StationKey) => {
    const t = tlRef.current; if (!t) return;
    t.master.play(key); t.ambient.play(); setPlaying(true);
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = tlRef.current; if (!t) return;
    const r = e.currentTarget.getBoundingClientRect();
    t.master.progress((e.clientX - r.left) / r.width);
  };

  return (
    <div className="if-root">
      <div className="if-stage"><Factory ref={svgRef} /></div>
      <div className="if-controls" role="group" aria-label="Animation controls">
        <button className="if-btn if-btn--icon" type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing
            ? <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="4" height="12" rx="1" /><rect x="9" y="2" width="4" height="12" rx="1" /></svg>
            : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>}
        </button>
        <button className="if-btn if-btn--icon" type="button" onClick={restart} aria-label="Restart">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3a5 5 0 1 1-4.6 3H1.9A6.5 6.5 0 1 0 8 1.5V0L4.5 3 8 6z" /></svg>
        </button>
        <div className="if-stations">
          {STATIONS.map((s) => (
            <button key={s.key} className="if-btn" type="button" onClick={() => jump(s.key)} aria-pressed={station === s.key}>{s.label}</button>
          ))}
        </div>
        <div className="if-progress" onClick={seek} role="slider" aria-label="Timeline" aria-valuemin={0} aria-valuemax={100} tabIndex={0}>
          <div className="if-progress__fill" ref={fillRef} />
          <div className="if-progress__marks">
            {(['pm', 'event', 'product', 'reveal'] as const).map((k) => <i key={k} style={{ left: (LABELS[k] / LABELS.end) * 100 + '%' }} />)}
          </div>
        </div>
      </div>
      {reduced && <p className="if-note">Reduced motion is on: the factory is shown finished. Press play to run the film.</p>}
    </div>
  );
}
