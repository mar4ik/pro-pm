import gsap from 'gsap';

export const LABELS = { birth: 0, pm: 5, event: 12, product: 19, reveal: 26, end: 30 } as const;
export type StationKey = 'pm' | 'event' | 'product';

export interface FactoryTimelines {
  master: gsap.core.Timeline;
  ambient: gsap.core.Timeline;
  kill: () => void;
}

const VIEW = {
  full: '0 0 1200 640',
  birth: '0 40 820 437',
  pm: '140 150 637 340',
  event: '440 150 637 340',
  product: '563 140 637 340',
};

/** Builds the 30-second story (master) plus the never-ending machinery (ambient). */
export function buildTimelines(svg: SVGSVGElement): FactoryTimelines {
  const q = gsap.utils.selector(svg);
  const camera = (view: string, duration = 1.1) => gsap.to(svg, { attr: { viewBox: view }, duration, ease: 'power2.inOut' });

  // ---- initial state -------------------------------------------------------------------------
  const reset = () => {
    gsap.set(svg, { attr: { viewBox: VIEW.birth } });
    gsap.set(q('#bulb'), { x: 110, y: 92, scale: 1, opacity: 0, transformOrigin: '50% 100%' });
    gsap.set(q('#plan'), { x: 548, y: 466, scale: 0, opacity: 1, transformOrigin: '50% 100%' });
    gsap.set(q('#ticket'), { x: 738, y: 466, scale: 0, opacity: 1, transformOrigin: '50% 80%' });
    gsap.set(q('.mini-bulb'), { x: 40, y: 466, opacity: 0 });
    gsap.set(q('#stamp-head'), { y: 0 });
    gsap.set(q('.pm-card'), { scale: 0, x: 0, y: 0, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#pm-link'), { strokeDasharray: 400, strokeDashoffset: 400 });
    gsap.set(q('.pm-pin'), { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#pm-lever'), { rotation: -38, transformOrigin: '50% 100%' });
    gsap.set(q('#ev-stage'), { scaleY: 0, scaleX: 0.6, opacity: 1, transformOrigin: '50% 100%' });
    gsap.set(q('.ev-chair'), { x: -90, opacity: 0 });
    gsap.set(q('#ev-curtain-l'), { scaleX: 1, transformOrigin: '0% 0%' }); gsap.set(q('#ev-curtain-r'), { scaleX: 1, transformOrigin: '100% 0%' });
    gsap.set(q('.ev-beam'), { opacity: 0 });
    gsap.set(q('.ev-light'), { rotation: 0, transformOrigin: '50% 0%' });
    gsap.set(q('.ev-person'), { scale: 0, transformOrigin: '50% 100%' });
    gsap.set(q('#ev-button'), { y: 0 });
    gsap.set(q('#phone'), { y: 150, scale: 0.5, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#ui-nav, #ui-card-1, #ui-card-2, #ui-card-3, #ui-btn'), { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#ui-progress'), { scaleX: 0, transformOrigin: '0% 50%' });
    gsap.set(q('#phone-glow'), { opacity: 0, scale: 1, transformOrigin: '50% 50%' });
    gsap.set(q('#pr-feedback'), { scale: 0, opacity: 1, transformOrigin: '10% 100%' });
    gsap.set(q('#final-text'), { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' });
    gsap.set(q('#mgr-pm-arm-l, #mgr-pm-arm-r, #mgr-ev-arm-l, #mgr-ev-arm-r, #mgr-pr-arm-l, #mgr-pr-arm-r'), { rotation: 0, transformOrigin: '50% 0%' });
    gsap.set(q('#mgr-pm-head, #mgr-ev-head, #mgr-pr-head'), { rotation: 0, transformOrigin: '50% 100%' });
    gsap.set(q('#mgr-pm-body, #mgr-ev-body, #mgr-pr-body'), { y: 0 });
  };
  reset();

  // ---- ambient machinery: belts, rollers, gears, pulley, idle bodies, blinks -------------------
  const ambient = gsap.timeline({ repeat: -1 });
  ambient.to(q('.gear'), { rotation: '+=360', duration: 6, ease: 'none', transformOrigin: '50% 50%' }, 0);
  ambient.to(q('.gear--rev'), { rotation: '-=720', duration: 6, ease: 'none', transformOrigin: '50% 50%' }, 0);
  ambient.to(q('.gear--slow'), { rotation: '-=180', duration: 6, ease: 'none', transformOrigin: '50% 50%' }, 0);
  ambient.to(q('.roller'), { rotation: '+=360', duration: 1.5, ease: 'none', repeat: 3, transformOrigin: '50% 50%' }, 0);
  ambient.fromTo(q('#belt-stripes'), { x: 0 }, { x: 48, duration: 1, ease: 'none', repeat: 5 }, 0);
  ambient.to(q('#crate'), { y: 14, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
  ambient.to(q('#mgr-pm-body, #mgr-ev-body, #mgr-pr-body'), { y: -3, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: 3, stagger: 0.4 }, 0);
  ambient.to(q('#pm-light-1, #pm-light-2, #pm-light-3'), { opacity: 0.35, duration: 0.5, yoyo: true, repeat: 11, stagger: 0.17 }, 0);
  const blink = gsap.timeline({ repeat: -1, repeatDelay: 2.6 });
  blink.to(q('#mgr-pm-eyes, #mgr-ev-eyes, #mgr-pr-eyes'), { scaleY: 0.08, duration: 0.08, stagger: 0.35, transformOrigin: '50% 50%' })
    .to(q('#mgr-pm-eyes, #mgr-ev-eyes, #mgr-pr-eyes'), { scaleY: 1, duration: 0.12, stagger: 0.35 });

  // ---- the story ------------------------------------------------------------------------------
  const tl = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'power2.inOut' }, onRepeat: reset });

  // Scene 1 — the birth of an idea (0–5s)
  tl.addLabel('birth', LABELS.birth)
    .add(camera(VIEW.birth, 0.01), 0)
    .to(q('#bulb'), { opacity: 1, duration: 0.3 }, 0.2)
    .to(q('#bulb'), { y: 456, duration: 1.1, ease: 'bounce.out' }, 0.4)
    .to(q('#bulb'), { scaleY: 0.82, scaleX: 1.12, duration: 0.1, ease: 'power1.out' }, 1.0)
    .to(q('#bulb'), { scaleY: 1, scaleX: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' }, 1.1)
    .to(q('#bulb'), { x: 266, duration: 1.6, ease: 'none' }, 1.5)
    .to(q('#stamp-head'), { y: 118, duration: 0.22, ease: 'power3.in' }, 3.05)
    .to(q('#bulb'), { scaleY: 0.86, duration: 0.1 }, 3.25)
    .to(q('#bulb-glow'), { scale: 1.8, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 3.28)
    .to(q('#bulb'), { scaleY: 1, duration: 0.25, ease: 'back.out(2)' }, 3.35)
    .to(q('#stamp-head'), { y: 0, duration: 0.45, ease: 'power2.out' }, 3.35)
    .to(q('#bulb'), { x: 342, duration: 1.0, ease: 'none' }, 3.9)
    .to(q('#bulb'), { scale: 0, duration: 0.3, ease: 'power2.in' }, 4.7);

  // Scene 2 — project management (5–12s)
  tl.addLabel('pm', LABELS.pm)
    .add(camera(VIEW.pm), 5)
    .to(q('#pm-machine'), { x: 2, duration: 0.07, yoyo: true, repeat: 9, ease: 'none' }, 5.3)
    .to(q('#mgr-pm-head'), { rotation: -8, duration: 0.4 }, 5.3)
    .to(q('.pm-card'), { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)', stagger: 0.28 }, 5.9)
    .fromTo(q('.pm-card'), { y: 150, x: 40 }, { y: 0, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.28 }, 5.9)
    .to(q('#mgr-pm-arm-r'), { rotation: -110, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 7 }, 5.9)
    .to(q('#mgr-pm-arm-l'), { rotation: 60, duration: 0.35, yoyo: true, repeat: 5 }, 6.1)
    .to(q('#pm-link'), { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut' }, 7.6)
    .to(q('.pm-pin'), { scale: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.2 }, 7.9)
    .to(q('#mgr-pm-head'), { rotation: 0, duration: 0.4 }, 8.4)
    .to(q('#mgr-pm-arm-r'), { rotation: -150, duration: 0.5, ease: 'power2.out' }, 9.0)
    .to(q('#pm-lever'), { rotation: 36, duration: 0.35, ease: 'power3.in' }, 9.45)
    .to(q('#mgr-pm-arm-r'), { rotation: 0, duration: 0.6, ease: 'power2.inOut' }, 9.9)
    .to(q('#pm-machine'), { y: 3, duration: 0.08, yoyo: true, repeat: 5, ease: 'none' }, 9.8)
    .to(q('#plan'), { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, 10.0)
    .to(q('#pm-lever'), { rotation: -38, duration: 0.8 }, 10.6)
    .to(q('#plan'), { x: 640, duration: 1.8, ease: 'none' }, 10.4);

  // Scene 3 — event management (12–19s)
  tl.addLabel('event', LABELS.event)
    .add(camera(VIEW.event), 12)
    .to(q('#plan'), { x: 712, duration: 1.0, ease: 'none' }, 12.2)
    .to(q('#mgr-ev-arm-r'), { rotation: 95, duration: 0.5, ease: 'power2.out' }, 12.3)
    .to(q('#ev-button'), { y: 6, duration: 0.12, ease: 'power3.in' }, 12.85)
    .to(q('#ev-button-glow'), { opacity: 1, duration: 0.2, yoyo: true, repeat: 1 }, 12.9)
    .to(q('#ev-button'), { y: 0, duration: 0.3, ease: 'power2.out' }, 13.0)
    .to(q('#mgr-ev-arm-r'), { rotation: 0, duration: 0.6 }, 13.3)
    .to(q('#plan'), { scale: 0, duration: 0.3, ease: 'power2.in' }, 13.0)
    .to(q('#ev-stage'), { scaleY: 1, scaleX: 1, duration: 0.9, ease: 'back.out(1.3)' }, 13.1)
    .to(q('.ev-chair'), { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.08 }, 13.9)
    .to(q('#ev-curtain-l, #ev-curtain-r'), { scaleX: 0.14, duration: 0.9, ease: 'power2.inOut' }, 14.3)
    .to(q('.ev-beam'), { opacity: 1, duration: 0.4, stagger: 0.12 }, 14.6)
    .to(q('.ev-light'), { rotation: -22, duration: 0.5, ease: 'sine.inOut' }, 14.6)
    .to(q('.ev-light'), { rotation: 22, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 2 }, 15.1)
    .to(q('.ev-person'), { scale: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.09 }, 15.3)
    .to(q('#mgr-ev-head'), { rotation: 10, duration: 0.4 }, 16.2)
    .to(q('#mgr-ev-arm-l'), { rotation: -70, duration: 0.4, yoyo: true, repeat: 1 }, 16.3)
    .to(q('#mgr-ev-head'), { rotation: 0, duration: 0.4 }, 16.9)
    .to(q('#ev-stage'), { scale: 0.15, opacity: 0, duration: 0.6, ease: 'power3.in' }, 17.1)
    .to(q('#ticket'), { scale: 1, duration: 0.55, ease: 'back.out(2)' }, 17.45)
    .to(q('#ticket-glow'), { scale: 1.5, duration: 0.4, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 17.6)
    .to(q('#ticket'), { x: 870, duration: 1.5, ease: 'none' }, 18.0);

  // Scene 4 — product management (19–26s)
  tl.addLabel('product', LABELS.product)
    .add(camera(VIEW.product), 19)
    .to(q('#mgr-pr-arm-l'), { rotation: -120, duration: 0.5, ease: 'power2.out' }, 19.2)
    .to(q('#ticket'), { x: 931, y: 312, duration: 0.7, ease: 'power2.inOut' }, 19.6)
    .to(q('#mgr-pr-arm-l'), { rotation: 0, duration: 0.6 }, 20.3)
    .to(q('#ticket'), { scale: 0, duration: 0.3, ease: 'power2.in' }, 20.25)
    .to(q('#pr-indicator'), { fill: '#FF5E16', duration: 0.2, yoyo: true, repeat: 5 }, 20.3)
    .to(q('#pr-machine'), { x: -2, duration: 0.07, yoyo: true, repeat: 9, ease: 'none' }, 20.4)
    .to(q('#phone'), { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }, 20.9)
    .to(q('#ui-nav, #ui-card-1, #ui-card-2, #ui-card-3, #ui-btn'), { scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.22 }, 21.6)
    .to(q('#ui-progress'), { scaleX: 1, duration: 1.2, ease: 'power1.inOut' }, 22.2)
    .to(q('#pr-feedback'), { scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 23.3)
    .to(q('#mgr-pr-head'), { rotation: -12, duration: 0.4 }, 23.5)
    .to(q('#mgr-pr-arm-r'), { rotation: 100, duration: 0.45, ease: 'power2.out' }, 23.9)
    .to(q('#ui-card-2'), { fill: '#1E66EE', x: 2, duration: 0.3, ease: 'power2.out' }, 24.25)
    .to(q('#ui-card-3'), { fill: '#FFCA53', x: -2, duration: 0.3, ease: 'power2.out' }, 24.3)
    .to(q('#pr-feedback'), { scale: 0, duration: 0.3, ease: 'power2.in' }, 24.6)
    .to(q('#mgr-pr-arm-r'), { rotation: 0, duration: 0.5 }, 24.6)
    .to(q('#mgr-pr-head'), { rotation: 0, duration: 0.4 }, 24.7)
    .to(q('#phone-glow'), { opacity: 0.9, scale: 1.4, duration: 0.5, ease: 'power2.out' }, 25.0)
    .to(q('#phone-glow'), { opacity: 0, scale: 1.9, duration: 0.6, ease: 'power2.in' }, 25.5)
    .to(q('#phone'), { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, 25.0);

  // Scene 5 — the big reveal (26–30s) and loop
  tl.addLabel('reveal', LABELS.reveal)
    .add(camera(VIEW.full, 1.5), 26)
    .to(q('#mgr-pm-arm-l, #mgr-ev-arm-l, #mgr-pr-arm-l'), { rotation: 150, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.12 }, 26.5)
    .to(q('#mgr-pm-arm-r, #mgr-ev-arm-r, #mgr-pr-arm-r'), { rotation: -150, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.12 }, 26.5)
    .to(q('#mgr-pm-body, #mgr-ev-body, #mgr-pr-body'), { y: -22, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 3, stagger: 0.12 }, 26.7)
    .to(q('.mini-bulb'), { opacity: 1, duration: 0.2, stagger: 0.5 }, 26.6)
    .to(q('.mini-bulb'), { x: 1150, duration: 2.4, ease: 'none', stagger: 0.5 }, 26.6)
    .to(q('#final-text'), { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, 27.2)
    .to(q('#mgr-pm-arm-l, #mgr-ev-arm-l, #mgr-pr-arm-l, #mgr-pm-arm-r, #mgr-ev-arm-r, #mgr-pr-arm-r'), { rotation: 0, duration: 0.7 }, 28.6)
    .to(q('#final-text'), { opacity: 0, duration: 0.5 }, 29.4)
    .to(q('.mini-bulb'), { opacity: 0, duration: 0.3 }, 29.5)
    .add(camera(VIEW.birth, 0.5), 29.5)
    .addLabel('end', LABELS.end)
    .set({}, {}, 30);

  return {
    master: tl,
    ambient,
    kill: () => { tl.kill(); ambient.kill(); blink.kill(); },
  };
}
