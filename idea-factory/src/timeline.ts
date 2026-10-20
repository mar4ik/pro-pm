import gsap from 'gsap';

export const LABELS = { lamp: 0, ideas: 2.9, event: 7.2, product: 11.4, end: 16 } as const;

export interface FactoryTimelines {
  master: gsap.core.Timeline;
  kill: () => void;
}

/** One object in the middle of the frame transforms into the next: lamp → idea bubbles → event → phone → (loop). */
export function buildTimelines(svg: SVGSVGElement): FactoryTimelines {
  const q = gsap.utils.selector(svg);
  const BULB = 4.2;
  const spots = [[-130, -120], [0, 0], [130, 120]];

  const reset = () => {
    gsap.set(q('#bulb'), { x: 300, y: -260, scale: BULB, opacity: 1, transformOrigin: '50% 100%' });
    gsap.set(q('.idea'), { x: 300, y: 340, scale: 0, opacity: 1, transformOrigin: '50% 50%' });
    gsap.set(q('.idea__label, .idea__check'), { opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#ev-stage'), { scaleY: 0, scaleX: 0.6, opacity: 1, transformOrigin: '50% 100%' });
    gsap.set(q('.ev-chair'), { x: -140, opacity: 0 });
    gsap.set(q('#ev-curtain-l'), { scaleX: 1, transformOrigin: '0% 0%' });
    gsap.set(q('#ev-curtain-r'), { scaleX: 1, transformOrigin: '100% 0%' });
    gsap.set(q('.ev-beam'), { opacity: 0 });
    gsap.set(q('.ev-light'), { rotation: 0, transformOrigin: '50% 0%' });
    gsap.set(q('.ev-person'), { scale: 0, transformOrigin: '50% 100%' });
    gsap.set(q('#phone'), { y: 120, scale: 0.4, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#ui-nav, #ui-card-1, #ui-card-2, #ui-card-3, #ui-btn'), { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(q('#phone-glow'), { opacity: 0, scale: 1, transformOrigin: '50% 50%' });
  };
  reset();

  const tl = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'power2.inOut' }, onRepeat: reset });

  // 1 — a huge lamp drops in
  tl.addLabel('lamp', LABELS.lamp)
    .to(q('#bulb'), { y: 470, duration: 1.3, ease: 'bounce.out' }, 0.2)
    .to(q('#bulb'), { scaleY: BULB * 0.84, scaleX: BULB * 1.1, duration: 0.1, ease: 'power1.out' }, 0.95)
    .to(q('#bulb'), { scaleY: BULB, scaleX: BULB, duration: 0.35, ease: 'elastic.out(1,0.5)' }, 1.05)
    .to(q('#bulb-glow'), { scale: 1.22, duration: 0.35, yoyo: true, repeat: 3, transformOrigin: '50% 50%' }, 1.6)
    .to(q('#bulb'), { scale: 0, y: 340, duration: 0.4, ease: 'power3.in' }, 2.8);

  // 2 — it becomes three chat boxes: plan, in progress, done
  tl.addLabel('ideas', LABELS.ideas);
  spots.forEach(([dx, dy], i) => {
    const at = 3.0 + i * 0.55;
    tl.to(q(`#idea-${i + 1}`), { scale: 1, x: 300 + dx, y: 340 + dy, duration: 0.7, ease: 'back.out(1.8)' }, at)
      .to(q(`#idea-${i + 1} .idea__label`), { opacity: 1, duration: 0.35 }, at + 0.4)
      .to(q(`#idea-${i + 1}`), { y: `+=${i % 2 ? 10 : -10}`, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 4.8 + i * 0.1)
      .to(q(`#idea-${i + 1}`), { x: 300, y: 400, scale: 0.15, opacity: 0, duration: 0.6, ease: 'power3.in' }, 6.7 + i * 0.07);
  });
  tl.fromTo(q('#idea-3 .idea__check'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(3)' }, 4.9);

  // 3 — the gathered ideas become an event
  tl.addLabel('event', LABELS.event)
    .to(q('#ev-stage'), { scaleY: 1, scaleX: 1, duration: 0.9, ease: 'back.out(1.3)' }, 7.25)
    .to(q('.ev-chair'), { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.07 }, 8.0)
    .to(q('#ev-curtain-l, #ev-curtain-r'), { scaleX: 0.12, duration: 0.9, ease: 'power2.inOut' }, 8.35)
    .to(q('.ev-beam'), { opacity: 1, duration: 0.4, stagger: 0.12 }, 8.7)
    .to(q('.ev-light'), { rotation: -20, duration: 0.5, ease: 'sine.inOut' }, 8.7)
    .to(q('.ev-light'), { rotation: 20, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 9.2)
    .to(q('.ev-person'), { scale: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.08 }, 9.3)
    .to(q('#ev-stage'), { scale: 0.15, opacity: 0, duration: 0.6, ease: 'power3.in' }, 10.9);

  // 4 — the event becomes a product
  tl.addLabel('product', LABELS.product)
    .to(q('#phone'), { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }, 11.4)
    .to(q('#ui-nav, #ui-card-1, #ui-card-2, #ui-card-3, #ui-btn'), { scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.2 }, 12.1)
    .to(q('#phone-glow'), { opacity: 0.9, scale: 1.1, duration: 0.5, ease: 'power2.out' }, 13.6)
    .to(q('#phone-glow'), { opacity: 0, scale: 1.2, duration: 0.6, ease: 'power2.in' }, 14.1)
    .to(q('#phone'), { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, 13.6)
    .to(q('#phone'), { y: -60, scale: 0.85, opacity: 0, duration: 0.6, ease: 'power2.in' }, 15.1)
    .addLabel('end', LABELS.end)
    .set({}, {}, LABELS.end);

  return { master: tl, kill: () => tl.kill() };
}
