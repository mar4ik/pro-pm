// One illustrated manager. Origin = centre of the feet; the body is drawn upward (negative y).
// Every movable part has an id derived from the character id so the GSAP timeline can drive it:
//   {id}-body, {id}-head, {id}-eyes, {id}-brow-l, {id}-brow-r, {id}-mouth, {id}-arm-l, {id}-arm-r

export type HairStyle = 'short' | 'curly' | 'long';

export interface CharacterProps {
  id: string;
  x: number;
  y: number;
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  shirt: string;
  pants: string;
  shoes?: string;
  glasses?: boolean;
  earrings?: boolean;
  facing?: 1 | -1;
  scale?: number;
}

const SKIN_SHADOW = 'rgba(30,30,33,.12)';

function HairBack({ style, color }: { style: HairStyle; color: string }) {
  if (style !== 'long') return null;
  // long hair falling behind the shoulders
  return (
    <path
      d="M-42 -252 C-50 -215 -48 -185 -40 -160 C-30 -150 -12 -152 -8 -168 L8 -168 C12 -152 30 -150 40 -160 C48 -185 50 -215 42 -252 C30 -286 -30 -286 -42 -252 Z"
      fill={color}
    />
  );
}

function HairFront({ style, color }: { style: HairStyle; color: string }) {
  if (style === 'short') {
    return (
      <path
        d="M-36 -254 C-40 -282 -24 -296 0 -296 C24 -296 40 -282 36 -254 C28 -262 14 -266 0 -264 C-14 -266 -28 -262 -36 -254 Z"
        fill={color}
      />
    );
  }
  if (style === 'curly') {
    const curls = [-30, -18, -6, 6, 18, 30].map((cx, i) => (
      <circle key={i} cx={cx} cy={-278 - (i % 2 ? 6 : 0)} r={13} fill={color} />
    ));
    return (
      <g>
        <path d="M-37 -250 C-40 -276 -22 -292 0 -292 C22 -292 40 -276 37 -250 Z" fill={color} />
        {curls}
        <circle cx={-38} cy={-262} r={9} fill={color} />
        <circle cx={38} cy={-262} r={9} fill={color} />
      </g>
    );
  }
  // long: fringe sweeping to one side
  return (
    <path
      d="M-40 -252 C-42 -282 -22 -296 2 -296 C28 -296 42 -280 40 -254 C34 -268 22 -274 6 -270 C-4 -268 -14 -258 -24 -250 C-30 -246 -36 -246 -40 -252 Z"
      fill={color}
    />
  );
}

export function Character({
  id, x, y, skin, hair, hairStyle, shirt, pants, shoes = '#F5F5F5', glasses, earrings, facing = 1, scale = 1,
}: CharacterProps) {
  const armSleeve = shirt;
  return (
    <g id={id} transform={`translate(${x} ${y}) scale(${facing * scale} ${scale})`}>
      <g id={`${id}-body`}>
        {/* legs + shoes */}
        <rect x={-24} y={-96} width={20} height={96} rx={9} fill={pants} />
        <rect x={4} y={-96} width={20} height={96} rx={9} fill={pants} />
        <ellipse cx={-14} cy={0} rx={17} ry={7} fill={shoes} />
        <ellipse cx={14} cy={0} rx={17} ry={7} fill={shoes} />
        <ellipse cx={-14} cy={2} rx={17} ry={4} fill={SKIN_SHADOW} />
        <ellipse cx={14} cy={2} rx={17} ry={4} fill={SKIN_SHADOW} />

        {/* hair behind the head (long style) */}
        <HairBack style={hairStyle} color={hair} />

        {/* arms: pivot at the shoulder so rotation reads as a real arm swing */}
        <g transform="translate(-34 -176)"><g id={`${id}-arm-l`}>
          <rect x={-11} y={-4} width={22} height={76} rx={11} fill={armSleeve} />
          <circle cx={0} cy={70} r={12} fill={skin} />
        </g></g>
        <g transform="translate(34 -176)"><g id={`${id}-arm-r`}>
          <rect x={-11} y={-4} width={22} height={76} rx={11} fill={armSleeve} />
          <circle cx={0} cy={70} r={12} fill={skin} />
        </g></g>

        {/* torso */}
        <path d="M-38 -186 C-38 -202 -22 -206 0 -206 C22 -206 38 -202 38 -186 L36 -96 L-36 -96 Z" fill={shirt} />
        <path d="M-10 -206 L0 -190 L10 -206 Z" fill={skin} />
        <rect x={-2} y={-190} width={4} height={60} rx={2} fill="rgba(30,30,33,.14)" />

        {/* neck + head */}
        <rect x={-10} y={-214} width={20} height={26} rx={8} fill={skin} />
        <g id={`${id}-head`}>
          <circle cx={-35} cy={-238} r={8} fill={skin} />
          <circle cx={35} cy={-238} r={8} fill={skin} />
          <path d="M-36 -242 C-36 -272 -20 -284 0 -284 C20 -284 36 -272 36 -242 C36 -214 20 -200 0 -200 C-20 -200 -36 -214 -36 -242 Z" fill={skin} />
          <HairFront style={hairStyle} color={hair} />
          {/* brows */}
          <path id={`${id}-brow-l`} d="M-22 -254 Q-14 -259 -6 -255" stroke={hair} strokeWidth={3} strokeLinecap="round" fill="none" />
          <path id={`${id}-brow-r`} d="M6 -255 Q14 -259 22 -254" stroke={hair} strokeWidth={3} strokeLinecap="round" fill="none" />
          {/* eyes */}
          <g id={`${id}-eyes`}>
            <ellipse cx={-13} cy={-242} rx={7} ry={8} fill="#fff" />
            <ellipse cx={13} cy={-242} rx={7} ry={8} fill="#fff" />
            <circle cx={-12} cy={-241} r={3.6} fill="#1E1E21" />
            <circle cx={14} cy={-241} r={3.6} fill="#1E1E21" />
            <circle cx={-10.5} cy={-243} r={1.3} fill="#fff" />
            <circle cx={15.5} cy={-243} r={1.3} fill="#fff" />
          </g>
          {glasses && (
            <g stroke="#1E1E21" strokeWidth={2.2} fill="none">
              <circle cx={-13} cy={-242} r={10.5} />
              <circle cx={13} cy={-242} r={10.5} />
              <path d="M-2.5 -242 L2.5 -242 M-23.5 -244 L-33 -248 M23.5 -244 L33 -248" strokeLinecap="round" />
            </g>
          )}
          {/* nose, mouth, blush */}
          <path d="M0 -236 L-3 -228 L2 -227" stroke="rgba(30,30,33,.35)" strokeWidth={2} strokeLinecap="round" fill="none" />
          <path id={`${id}-mouth`} d="M-10 -220 Q0 -211 10 -220" stroke="#1E1E21" strokeWidth={2.6} strokeLinecap="round" fill="none" />
          <circle cx={-24} cy={-226} r={5} fill="#FFB0E8" opacity={0.45} />
          <circle cx={24} cy={-226} r={5} fill="#FFB0E8" opacity={0.45} />
          {earrings && (
            <g fill="#FFCA53">
              <circle cx={-36} cy={-228} r={3} />
              <circle cx={36} cy={-228} r={3} />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}
