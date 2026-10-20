import { forwardRef } from 'react';

// Brand palette (AI Քեզ Բան). The scene sits on the hero's ink background, so dark parts use navy/grey instead of ink.
export const C = {
  ink: '#1E1E21', navy: '#1E66EE', orange: '#FF5E16', sky: '#A2D4FF',
  cream: '#F5F5F5', amber: '#FFCA53', coral: '#FFB0E8', teal: '#00C4B1', lemon: '#ffe45c', grey: '#D1D1D1',
};

export const VIEW = { full: '0 30 1200 530' };

/** Gear outline: `teeth` rounded teeth between an outer and inner radius. */
export function gearPath(teeth: number, rOuter: number, rInner: number): string {
  const step = (Math.PI * 2) / teeth;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      [rInner, a - step * 0.5 + step * 0.08],
      [rOuter, a - step * 0.22],
      [rOuter, a + step * 0.22],
      [rInner, a + step * 0.5 - step * 0.08],
    ];
    pts.forEach(([r, t], k) => {
      const px = (r * Math.cos(t)).toFixed(2), py = (r * Math.sin(t)).toFixed(2);
      d += (i === 0 && k === 0 ? 'M' : 'L') + px + ' ' + py + ' ';
    });
  }
  return d + 'Z';
}

function Gear({ id, cx, cy, teeth, r, fill, hole = C.ink, className = 'gear', opacity = 1 }:
  { id?: string; cx: number; cy: number; teeth: number; r: number; fill: string; hole?: string; className?: string; opacity?: number }) {
  return (
    <g id={id} className={className} transform={`translate(${cx} ${cy})`} opacity={opacity}>
      <path d={gearPath(teeth, r, r * 0.78)} fill={fill} />
      <circle r={r * 0.5} fill={hole} opacity={0.9} />
      <circle r={r * 0.2} fill={fill} />
    </g>
  );
}

function Bulb({ id, scale = 1 }: { id: string; scale?: number }) {
  // origin at the bottom of the base
  return (
    <g id={id} transform={`scale(${scale})`}>
      <circle id={`${id}-glow`} cx={0} cy={-34} r={38} fill="url(#if-glow)" />
      <rect x={-9} y={-16} width={18} height={16} rx={4} fill={C.grey} />
      <rect x={-7} y={-13} width={14} height={2.5} rx={1} fill={C.ink} opacity={0.5} />
      <rect x={-7} y={-7} width={14} height={2.5} rx={1} fill={C.ink} opacity={0.5} />
      <circle cx={0} cy={-34} r={20} fill={C.amber} />
      <circle cx={0} cy={-34} r={20} fill="#fff" opacity={0.18} />
      <path d="M-5 -16 L-5 -28 Q0 -36 5 -28 L5 -16" stroke={C.orange} strokeWidth={2} fill="none" strokeLinecap="round" />
      <circle cx={-7} cy={-41} r={3} fill="#fff" opacity={0.7} />
    </g>
  );
}

function Card({ x, y, fill, w = 44, h = 28 }: { x: number; y: number; fill: string; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} />
      <rect x={x + 7} y={y + 8} width={w * 0.55} height={4} rx={2} fill={C.ink} opacity={0.75} />
      <rect x={x + 7} y={y + 16} width={w * 0.35} height={4} rx={2} fill={C.ink} opacity={0.4} />
    </g>
  );
}

export const Factory = forwardRef<SVGSVGElement>(function Factory(_props, ref) {
  const rollers = Array.from({ length: 19 }, (_, i) => 70 + i * 60);
  const stripes = Array.from({ length: 26 }, (_, i) => 40 + i * 48);
  const cardColors = [C.amber, C.coral, C.teal, C.orange, C.sky];
  // cards fan out above the machine, then converge into the plan
  const cardSlots = [
    { x: 340, y: 210 }, { x: 395, y: 170 }, { x: 452, y: 158 }, { x: 508, y: 176 }, { x: 556, y: 214 },
  ];

  return (
    <svg ref={ref} id="factory-svg" viewBox={VIEW.full} xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="An idea travels along a conveyor and turns into a project plan, an event ticket and a product">
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

      {/* ---------- soft gears behind everything ---------- */}
      <g id="bg-gears" opacity={0.16}>
        <Gear cx={120} cy={120} teeth={14} r={92} fill={C.cream} hole={C.ink} className="gear gear--slow" />
        <Gear cx={250} cy={70} teeth={10} r={52} fill={C.cream} hole={C.ink} className="gear gear--rev" />
        <Gear cx={1010} cy={120} teeth={12} r={70} fill={C.cream} hole={C.ink} className="gear gear--rev" />
        <Gear cx={830} cy={60} teeth={9} r={40} fill={C.cream} hole={C.ink} className="gear" />
        <Gear cx={640} cy={110} teeth={11} r={56} fill={C.cream} hole={C.ink} className="gear gear--slow" />
      </g>

      {/* ---------- overhead pulley with a drifting crate ---------- */}
      <g id="pulley">
        <rect x={1098} y={36} width={44} height={16} rx={6} fill={C.navy} />
        <circle cx={1120} cy={76} r={22} fill={C.cream} stroke={C.navy} strokeWidth={5} />
        <circle id="pulley-wheel" className="gear gear--rev" cx={1120} cy={76} r={9} fill={C.navy} />
        <g id="crate">
          <line x1={1120} y1={76} x2={1120} y2={160} stroke={C.grey} strokeWidth={3} />
          <rect x={1096} y={160} width={48} height={40} rx={6} fill={C.amber} stroke={C.navy} strokeWidth={3} />
          <path d="M1100 180 L1140 180 M1120 164 L1120 196" stroke={C.navy} strokeWidth={3} />
        </g>
      </g>

      {/* ---------- hopper: where the idea is born ---------- */}
      <g id="hopper">
        <path d="M52 76 L168 76 L140 150 L80 150 Z" fill={C.cream} stroke={C.navy} strokeWidth={5} strokeLinejoin="round" />
        <rect x={42} y={60} width={136} height={22} rx={9} fill={C.navy} />
        <rect x={80} y={148} width={60} height={24} rx={7} fill={C.grey} />
      </g>

      {/* ---------- stamp arm ---------- */}
      <g id="stamp">
        <rect x={198} y={250} width={26} height={220} rx={8} fill={C.navy} />
        <rect x={198} y={250} width={90} height={22} rx={8} fill={C.navy} />
        <g id="stamp-head">
          <rect x={262} y={268} width={10} height={34} fill={C.grey} />
          <rect x={246} y={300} width={42} height={30} rx={8} fill={C.orange} />
          <rect x={252} y={330} width={30} height={8} rx={3} fill={C.grey} />
        </g>
        <Gear id="stamp-gear" cx={211} cy={300} teeth={8} r={26} fill={C.amber} className="gear" />
      </g>

      {/* ---------- station 1: the plan machine ---------- */}
      <g id="station-pm">
        <g id="pm-machine">
          <rect x={330} y={300} width={212} height={168} rx={22} fill={C.cream} stroke={C.navy} strokeWidth={5} />
          <rect x={352} y={318} width={168} height={46} rx={10} fill={C.navy} />
          <rect id="pm-light-1" x={364} y={330} width={22} height={22} rx={11} fill={C.amber} />
          <rect id="pm-light-2" x={396} y={330} width={22} height={22} rx={11} fill={C.coral} />
          <rect id="pm-light-3" x={428} y={330} width={22} height={22} rx={11} fill={C.teal} />
          <rect x={470} y={334} width={40} height={14} rx={7} fill={C.cream} opacity={0.9} />
          <rect x={330} y={420} width={34} height={38} rx={8} fill={C.ink} />
          <rect x={508} y={420} width={34} height={38} rx={8} fill={C.ink} />
          <Gear id="pm-gear-1" cx={395} cy={412} teeth={9} r={30} fill={C.orange} className="gear" />
          <Gear id="pm-gear-2" cx={450} cy={420} teeth={11} r={24} fill={C.navy} className="gear gear--rev" />
          <rect x={440} y={290} width={34} height={16} rx={5} fill={C.grey} />
          <g id="pm-lever">
            <rect x={543} y={330} width={8} height={60} rx={4} fill={C.grey} />
            <circle cx={547} cy={330} r={13} fill={C.orange} stroke={C.cream} strokeWidth={3} />
          </g>
          <circle cx={546} cy={388} r={8} fill={C.grey} />
        </g>
        <g id="pm-cards">
          {cardSlots.map((s, i) => (
            <g key={i} id={`pm-card-${i + 1}`} className="pm-card">
              <Card x={s.x} y={s.y} fill={cardColors[i]} />
            </g>
          ))}
        </g>
      </g>

      {/* ---------- station 2: the stage machine ---------- */}
      <g id="station-event">
        <g id="ev-pedestal">
          <rect x={596} y={396} width={56} height={74} rx={10} fill={C.navy} />
          <rect x={590} y={388} width={68} height={16} rx={8} fill={C.grey} />
          <g id="ev-button">
            <circle cx={624} cy={386} r={22} fill={C.cream} />
            <circle cx={624} cy={382} r={16} fill={C.orange} />
            <circle id="ev-button-glow" cx={624} cy={382} r={30} fill="url(#if-glow)" opacity={0} />
          </g>
        </g>
        <g id="ev-stage">
          <rect x={660} y={438} width={156} height={30} rx={8} fill={C.grey} />
          <rect x={668} y={290} width={140} height={150} rx={10} fill={C.navy} />
          <rect x={660} y={280} width={156} height={18} rx={6} fill={C.grey} />
          <g id="ev-lights">
            {[700, 738, 776].map((x, i) => (
              <g key={x} id={`ev-light-${i + 1}`} className="ev-light">
                <path d={`M${x - 8} 298 L${x + 8} 298 L${x + 30} 430 L${x - 30} 430 Z`} fill="url(#if-spot)" opacity={0} className="ev-beam" />
                <rect x={x - 9} y={296} width={18} height={14} rx={4} fill={C.ink} />
                <circle cx={x} cy={312} r={5} fill={[C.amber, C.coral, C.teal][i]} />
              </g>
            ))}
          </g>
          <rect id="ev-curtain-l" x={668} y={298} width={70} height={142} fill={C.orange} />
          <rect id="ev-curtain-r" x={738} y={298} width={70} height={142} fill={C.orange} />
          <g id="ev-chairs">
            {[0, 1, 2, 3, 4].map((i) => <rect key={i} className="ev-chair" x={676 + i * 26} y={448} width={18} height={14} rx={4} fill={C.cream} />)}
          </g>
          <g id="ev-audience">
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} className="ev-person">
                <circle cx={685 + i * 26} cy={444} r={7} fill={['#E8B48F', '#D9A077', '#F1C5A5', '#E8B48F', '#D9A077'][i]} />
                <rect x={679 + i * 26} y={450} width={12} height={8} rx={3} fill={[C.coral, C.teal, C.amber, C.cream, C.orange][i]} />
              </g>
            ))}
          </g>
        </g>
      </g>

      {/* ---------- station 3: the product machine ---------- */}
      <g id="station-product">
        <g id="pr-machine">
          <rect x={856} y={300} width={150} height={168} rx={22} fill={C.cream} stroke={C.navy} strokeWidth={5} />
          <rect x={900} y={290} width={62} height={18} rx={6} fill={C.grey} />
          <rect x={874} y={326} width={114} height={60} rx={10} fill={C.navy} />
          <rect x={886} y={340} width={60} height={8} rx={4} fill={C.cream} opacity={0.8} />
          <rect x={886} y={356} width={38} height={8} rx={4} fill={C.cream} opacity={0.5} />
          <circle id="pr-indicator" cx={968} cy={356} r={9} fill={C.teal} />
          <Gear id="pr-gear-1" cx={898} cy={424} teeth={10} r={26} fill={C.amber} className="gear gear--rev" />
          <Gear id="pr-gear-2" cx={952} cy={428} teeth={8} r={20} fill={C.orange} className="gear" />
          <rect x={856} y={420} width={30} height={38} rx={8} fill={C.ink} />
        </g>
      </g>

      {/* ---------- conveyor belt ---------- */}
      <g id="belt">
        {[160, 480, 800, 1100].map((x) => <rect key={x} x={x} y={496} width={16} height={64} rx={4} fill={C.navy} />)}
        <rect x={40} y={468} width={1120} height={34} rx={17} fill={C.navy} />
        <g id="belt-stripes">
          {stripes.map((x) => <rect key={x} x={x} y={481} width={22} height={8} rx={4} fill={C.cream} opacity={0.55} />)}
        </g>
        <g id="rollers">
          {rollers.map((x) => (
            <g key={x} className="roller">
              <circle cx={x} cy={503} r={12} fill={C.cream} stroke={C.navy} strokeWidth={3} />
              <line x1={x - 7} y1={503} x2={x + 7} y2={503} stroke={C.navy} strokeWidth={3} strokeLinecap="round" />
            </g>
          ))}
        </g>
      </g>

      {/* ---------- the travelling idea and its transformations ---------- */}
      <g id="objects">
        <Bulb id="bulb" />
        <g id="plan">
          <rect x={-30} y={-44} width={60} height={44} rx={8} fill={C.navy} />
          <rect x={-22} y={-52} width={18} height={14} rx={4} fill={C.amber} />
          <rect x={-2} y={-52} width={18} height={14} rx={4} fill={C.coral} />
          <rect x={-20} y={-30} width={40} height={5} rx={2.5} fill="#fff" opacity={0.85} />
          <rect x={-20} y={-20} width={26} height={5} rx={2.5} fill="#fff" opacity={0.5} />
        </g>
        <g id="ticket">
          <circle id="ticket-glow" cx={0} cy={-20} r={40} fill="url(#if-glow)" opacity={0.7} />
          <path d="M-36 -40 L36 -40 A6 6 0 0 0 36 -28 L36 -12 A6 6 0 0 0 36 0 L-36 0 A6 6 0 0 0 -36 -12 L-36 -28 A6 6 0 0 0 -36 -40 Z" fill={C.lemon} stroke={C.navy} strokeWidth={3} />
          <rect x={-26} y={-30} width={30} height={5} rx={2.5} fill={C.ink} />
          <rect x={-26} y={-20} width={20} height={5} rx={2.5} fill={C.ink} opacity={0.5} />
          <line x1={14} y1={-34} x2={14} y2={-6} stroke={C.ink} strokeWidth={2} strokeDasharray="3 3" />
        </g>
        <g id="phone">
          <circle id="phone-glow" cx={931} cy={236} r={110} fill="url(#if-glow)" opacity={0} />
          <rect x={886} y={154} width={90} height={164} rx={18} fill={C.navy} />
          <rect x={893} y={162} width={76} height={148} rx={12} fill="url(#if-screen)" />
          <rect id="ui-nav" x={899} y={168} width={64} height={12} rx={6} fill={C.navy} />
          <rect id="ui-card-1" x={899} y={188} width={64} height={28} rx={6} fill={C.amber} />
          <rect id="ui-card-2" x={899} y={222} width={30} height={30} rx={6} fill={C.coral} />
          <rect id="ui-card-3" x={933} y={222} width={30} height={30} rx={6} fill={C.teal} />
          <rect x={899} y={260} width={64} height={6} rx={3} fill={C.grey} />
          <rect id="ui-progress" x={899} y={260} width={64} height={6} rx={3} fill={C.navy} />
          <rect id="ui-btn" x={899} y={276} width={64} height={22} rx={11} fill={C.orange} />
          <rect x={918} y={285} width={26} height={4} rx={2} fill="#fff" />
        </g>
        <g id="pr-feedback">
          <rect x={984} y={176} width={76} height={44} rx={12} fill={C.coral} />
          <path d="M992 218 L986 232 L1006 218 Z" fill={C.coral} />
          <rect x={996} y={188} width={44} height={6} rx={3} fill={C.ink} opacity={0.8} />
          <rect x={996} y={200} width={28} height={6} rx={3} fill={C.ink} opacity={0.45} />
          <circle cx={1050} cy={190} r={6} fill={C.orange} />
        </g>
      </g>
    </svg>
  );
});
