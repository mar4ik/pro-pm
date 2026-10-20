import { forwardRef } from 'react';

// Brand palette (AI Քեզ Բան). Everything sits on the hero's ink background.
export const C = {
  ink: '#1E1E21', navy: '#1E66EE', orange: '#FF5E16', sky: '#A2D4FF',
  cream: '#F5F5F5', amber: '#FFCA53', coral: '#FFB0E8', teal: '#00C4B1', lemon: '#ffe45c', grey: '#D1D1D1',
};

export const VIEW = { full: '30 30 540 540' };

/** A brand speech bubble, 130×84, origin at its centre, tail bottom-left. */
function IdeaBubble({ id, fill }: { id: string; fill: string }) {
  return (
    <g id={id} className="idea">
      <rect x={-65} y={-42} width={130} height={84} rx={20} fill={fill} />
      <path d="M-44 40 L-54 62 L-18 40 Z" fill={fill} />
      <rect x={-40} y={-6} width={72} height={12} rx={6} fill={C.ink} opacity={0.55} />
    </g>
  );
}

export const Factory = forwardRef<SVGSVGElement>(function Factory(_props, ref) {
  const ideas = [C.amber, C.coral, C.teal, C.sky, C.orange];
  return (
    <svg ref={ref} id="factory-svg" viewBox={VIEW.full} xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="An idea turns into idea bubbles, then an event, then a product">
      <defs>
        <radialGradient id="if-glow">
          <stop offset="0" stopColor={C.amber} stopOpacity={0.9} />
          <stop offset="1" stopColor={C.amber} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="if-spot">
          <stop offset="0" stopColor="#fff" stopOpacity={0.85} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="if-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor={C.cream} />
        </linearGradient>
      </defs>

      {/* ---------- 1. the lamp (origin: bottom of the base) ---------- */}
      <g id="bulb">
        <circle id="bulb-glow" cx={0} cy={-34} r={44} fill="url(#if-glow)" />
        <rect x={-9} y={-16} width={18} height={16} rx={4} fill={C.grey} />
        <rect x={-7} y={-13} width={14} height={2.5} rx={1} fill={C.ink} opacity={0.5} />
        <rect x={-7} y={-7} width={14} height={2.5} rx={1} fill={C.ink} opacity={0.5} />
        <circle cx={0} cy={-34} r={20} fill={C.amber} />
        <circle cx={0} cy={-34} r={20} fill="#fff" opacity={0.18} />
        <path d="M-5 -16 L-5 -28 Q0 -36 5 -28 L5 -16" stroke={C.orange} strokeWidth={2} fill="none" strokeLinecap="round" />
        <circle cx={-7} cy={-41} r={3} fill="#fff" opacity={0.7} />
      </g>

      {/* ---------- 2. idea bubbles (all start at the centre) ---------- */}
      <g id="ideas">
        {ideas.map((c, i) => <IdeaBubble key={i} id={`idea-${i + 1}`} fill={c} />)}
      </g>

      {/* ---------- 3. the event stage (bottom centre at 300,470) ---------- */}
      <g transform="translate(300 470) scale(1.3) translate(-300 -470)"><g id="ev-stage">
        <rect x={170} y={440} width={260} height={30} rx={10} fill={C.grey} />
        <rect x={180} y={250} width={240} height={190} rx={14} fill={C.navy} />
        <rect x={170} y={238} width={260} height={20} rx={8} fill={C.grey} />
        <g id="ev-lights">
          {[230, 300, 370].map((x, i) => (
            <g key={x} className="ev-light">
              <path d={`M${x - 10} 258 L${x + 10} 258 L${x + 44} 430 L${x - 44} 430 Z`} fill="url(#if-spot)" opacity={0} className="ev-beam" />
              <rect x={x - 11} y={256} width={22} height={16} rx={5} fill={C.ink} />
              <circle cx={x} cy={276} r={6} fill={[C.amber, C.coral, C.teal][i]} />
            </g>
          ))}
        </g>
        <rect id="ev-curtain-l" x={180} y={258} width={120} height={182} fill={C.orange} />
        <rect id="ev-curtain-r" x={300} y={258} width={120} height={182} fill={C.orange} />
        <g id="ev-chairs">
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} className="ev-chair" x={190 + i * 38} y={448} width={28} height={18} rx={5} fill={C.cream} />)}
        </g>
        <g id="ev-audience">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} className="ev-person">
              <circle cx={204 + i * 38} cy={440} r={10} fill={['#E8B48F', '#D9A077', '#F1C5A5', '#E8B48F', '#D9A077', '#F1C5A5'][i]} />
              <rect x={195 + i * 38} y={449} width={18} height={10} rx={4} fill={[C.coral, C.teal, C.amber, C.cream, C.orange, C.sky][i]} />
            </g>
          ))}
        </g>
      </g></g>

      {/* ---------- 4. the phone (centred) ---------- */}
      <g id="phone">
        <circle id="phone-glow" cx={300} cy={340} r={260} fill="url(#if-glow)" opacity={0} />
        <rect x={190} y={150} width={220} height={390} rx={40} fill={C.navy} />
        <rect x={205} y={168} width={190} height={354} rx={28} fill="url(#if-screen)" />
        <rect id="ui-nav" x={222} y={190} width={156} height={28} rx={14} fill={C.navy} />
        <rect id="ui-card-1" x={222} y={238} width={156} height={94} rx={18} fill={C.amber} />
        <rect id="ui-card-2" x={222} y={352} width={72} height={72} rx={18} fill={C.coral} />
        <rect id="ui-card-3" x={306} y={352} width={72} height={72} rx={18} fill={C.teal} />
        <rect id="ui-btn" x={222} y={452} width={156} height={46} rx={23} fill={C.orange} />
        <rect x={270} y={471} width={60} height={9} rx={4.5} fill="#fff" />
      </g>
    </svg>
  );
});
