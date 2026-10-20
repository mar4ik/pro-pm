import gsap from 'gsap';

export const LABELS = { birth: 0, pm: 4.6, event: 11.4, product: 18, exit: 24, end: 28 } as const;

export interface FactoryTimelines {
  master: gsap.core.Timeline;
  ambient: gsap.core.Timeline;
  kill: () => void;
}

/** Builds the 28-second object story (master) plus the never-ending machinery (ambient). No people, no camera. */
export function buildTimelines(svg: SVGSVGElement): FactoryTimelines {
  const q = gsap.utils.selector(svg);
  const BULB = 2.6; // "a big idea"

  // ---- initial state -------------------------------------------------------------------------
  const reset = () => {
    gsap.set(q('#bulb'), { x: 400, y: -300, scale: BULB, opacity: 1, transformOrigin: '50% 100%' });
    gsap.set(q('#plan'), { x: 548, y: 466, scale: 0, opacity: 1, transformOrigin: '50% 100%' });
    gsap.set(q('#ticket'), { x: 702, y: 466, scale: 0, opacity: 1, transformOrigin: '50% 80%' });
    gsap.set(q('.pm-card'), { scale: 0, x: 0, y: 0, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#pm-lever'), { rotation: -38, transformOrigin: '50% 100%' });
    gsap.set(q('#ev-stage'), { scaleY: 0, scaleX: 0.6, opacity: 1, transformOrigin: '50% 100%' });
    gsap.set(q('.ev-chair'), { x: -90, opacity: 0 });
    gsap.set(q('#ev-curtain-l'), { scaleX: 1, transformOrigin: '0% 0%' });
    gsap.set(q('#ev-curtain-r'), { scaleX: 1, transformOrigin: '100% 0%' });
    gsap.set(q('.ev-beam'), { opacity: 0 });
    gsap.set(q('.ev-light'), { rotation: 0, transformOrigin: '50% 0%' });
    gsap.set(q('.ev-person'), { scale: 0, transformOrigin: '50% 100%' });
    gsap.set(q('#phone'), { x: 0, y: 260, scale: 0.4, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#ui-nav, #ui-card-1, #ui-card-2, #ui-card-3, #ui-btn'), { scale: 0, x: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#ui-card-2'), { fill: '#FFB0E8' });
    gsap.set(q('#ui-card-3'), { fill: '#00C4B1' });
    gsap.set(q('#phone-glow'), { opacity: 0, scale: 1, transformOrigin: '50% 50%' });
    gsap.set(q('#pr-feedback'), { scale: 0, opacity: 1, transformOrigin: '10% 100%' });
  };
  reset();

  // ---- ambient machinery: belt, rollers, gears, pulley, blinking lights -----------------------
  const ambient = gsap.timeline({ repeat: -1 });
  ambient.to(q('.gear'), { rotation: '+=360', duration: 6, ease: 'none', transformOrigin: '50% 50%' }, 0);
  ambient.to(q('.gear--rev'), { rotation: '-=720', duration: 6, ease: 'none', transformOrigin: '50% 50%' }, 0);
  ambient.to(q('.gear--slow'), { rotation: '-=180', duration: 6, ease: 'none', transformOrigin: '50% 50%' }, 0);
  ambient.to(q('.roller'), { rotation: '+=360', duration: 1.5, ease: 'none', repeat: 3, transformOrigin: '50% 50%' }, 0);
  ambient.to(q('#pm-light-1, #pm-light-2, #pm-light-3'), { opacity: 0.35, duration: 0.5, yoyo: true, repeat: 11, stagger: 0.17 }, 0);

  // ---- the story ------------------------------------------------------------------------------
  const tl = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'power2.inOut' }, onRepeat: reset });

  // Scene 1 — a big idea drops (0–4.6s)
  tl.addLabel('birth', LABELS.birth)
    .to(q('#bulb'), { y: 460, duration: 1.5, ease: 'bounce.out' }, 0.3)
    .to(q('#bulb'), { scaleY: BULB * 0.82, scaleX: BULB * 1.12, duration: 0.1, ease: 'power1.out' }, 1.05)
    .to(q('#bulb'), { scaleY: BULB, scaleX: BULB, duration: 0.3, ease: 'elastic.out(1,0.5)' }, 1.15)
    .to(q('#bulb-glow'), { scale: 1.8, duration: 0.4, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 2.0)
    .to(q('#bulb'), { x: 436, duration: 1.4, ease: 'none' }, 2.6)
    .to(q('#bulb'), { y: 300, scale: 0, duration: 0.4, ease: 'power2.in' }, 4.0);

  // Scene 2 — the plan machine (4.6–11.4s): cards burst out, fan, then pack into a plan
  tl.addLabel('pm', LABELS.pm)
    .to(q('#pm-machine'), { x: 2, duration: 0.07, yoyo: true, repeat: 9, ease: 'none' }, 4.8)
    .fromTo(q('.pm-card'), { y: 220, x: 30 }, { y: 0, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.22 }, 5.3)
    .to(q('.pm-card'), { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)', stagger: 0.22 }, 5.3)
    .to(q('.pm-card'), { y: '+=6', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: 0.1 }, 6.6)
    .to(q('#pm-card-1'), { x: 223, y: 291, scale: 0.2, opacity: 0, duration: 0.6, ease: 'power3.in' }, 8.2)
    .to(q('#pm-card-2'), { x: 135, y: 341, scale: 0.2, opacity: 0, duration: 0.6, ease: 'power3.in' }, 8.3)
    .to(q('#pm-card-3'), { x: 43, y: 361, scale: 0.2, opacity: 0, duration: 0.6, ease: 'power3.in' }, 8.4)
    .to(q('#pm-card-4'), { x: -49, y: 341, scale: 0.2, opacity: 0, duration: 0.6, ease: 'power3.in' }, 8.5)
    .to(q('#pm-card-5'), { x: -137, y: 291, scale: 0.2, opacity: 0, duration: 0.6, ease: 'power3.in' }, 8.6)
    .to(q('#pm-lever'), { rotation: 36, duration: 0.35, ease: 'power3.in' }, 8.9)
    .to(q('#pm-machine'), { y: 3, duration: 0.08, yoyo: true, repeat: 5, ease: 'none' }, 9.2)
    .to(q('#plan'), { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, 9.3)
    .to(q('#pm-lever'), { rotation: -38, duration: 0.8 }, 9.9)
    .to(q('#plan'), { x: 676, duration: 2.2, ease: 'none' }, 9.8);

  // Scene 3 — the stage machine (11.4–18s): button, stage unfolds, becomes a ticket
  tl.addLabel('event', LABELS.event)
    .to(q('#plan'), { scale: 0, duration: 0.3, ease: 'power2.in' }, 12.1)
    .to(q('#ev-stage'), { scaleY: 1, scaleX: 1, duration: 0.9, ease: 'back.out(1.3)' }, 12.2)
    .to(q('.ev-chair'), { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.08 }, 13.0)
    .to(q('#ev-curtain-l, #ev-curtain-r'), { scaleX: 0.14, duration: 0.9, ease: 'power2.inOut' }, 13.4)
    .to(q('.ev-beam'), { opacity: 1, duration: 0.4, stagger: 0.12 }, 13.7)
    .to(q('.ev-light'), { rotation: -22, duration: 0.5, ease: 'sine.inOut' }, 13.7)
    .to(q('.ev-light'), { rotation: 22, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 2 }, 14.2)
    .to(q('.ev-person'), { scale: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.09 }, 14.4)
    .to(q('#ev-stage'), { scale: 0.15, opacity: 0, duration: 0.6, ease: 'power3.in' }, 16.2)
    .to(q('#ticket'), { scale: 1, duration: 0.55, ease: 'back.out(2)' }, 16.55)
    .to(q('#ticket-glow'), { scale: 1.5, duration: 0.4, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 16.7)
    .to(q('#ticket'), { x: 891, duration: 1.6, ease: 'none' }, 17.0);

  // Scene 4 — the product machine (18–24s): ticket goes in, a phone comes out and assembles
  tl.addLabel('product', LABELS.product)
    .to(q('#ticket'), { y: 330, scale: 0.7, duration: 0.6, ease: 'power2.inOut' }, 18.7)
    .to(q('#ticket'), { scale: 0, duration: 0.3, ease: 'power2.in' }, 19.25)
    .to(q('#pr-indicator'), { fill: '#FF5E16', duration: 0.2, yoyo: true, repeat: 5 }, 19.3)
    .to(q('#pr-machine'), { x: -2, duration: 0.07, yoyo: true, repeat: 9, ease: 'none' }, 19.4)
    .to(q('#phone'), { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }, 19.9)
    .to(q('#ui-nav, #ui-card-1, #ui-card-2, #ui-card-3, #ui-btn'), { scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.2 }, 20.6)
    .to(q('#pr-feedback'), { scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 22.1)
    .to(q('#ui-card-2'), { fill: '#1E66EE', x: 2, duration: 0.3, ease: 'power2.out' }, 22.8)
    .to(q('#ui-card-3'), { fill: '#FFCA53', x: -2, duration: 0.3, ease: 'power2.out' }, 22.85)
    .to(q('#pr-feedback'), { scale: 0, duration: 0.3, ease: 'power2.in' }, 23.2)
    .to(q('#phone-glow'), { opacity: 0.9, scale: 1.4, duration: 0.5, ease: 'power2.out' }, 23.3)
    .to(q('#phone-glow'), { opacity: 0, scale: 1.9, duration: 0.6, ease: 'power2.in' }, 23.8)
    .to(q('#phone'), { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, 23.3);

  // Scene 5 — the product rides out and the loop restarts (24–28s)
  tl.addLabel('exit', LABELS.exit)
    .to(q('#phone'), { x: 140, y: 168, scale: 0.85, duration: 0.9, ease: 'power2.inOut' }, 24.2)
    .to(q('#phone'), { x: 420, duration: 2.0, ease: 'none' }, 25.1)
    .to(q('#phone'), { opacity: 0, duration: 0.5, ease: 'power2.in' }, 26.7)
    .addLabel('end', LABELS.end)
    .set({}, {}, LABELS.end);

  return {
    master: tl,
    ambient,
    kill: () => { tl.kill(); ambient.kill(); },
  };
}
