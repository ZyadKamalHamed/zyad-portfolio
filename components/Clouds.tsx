const clouds = [
  { top: "8%", w: 460, dur: 48, delay: -30, op: 0.85 },
  { top: "22%", w: 300, dur: 70, delay: -95, op: 0.6 },
  { top: "46%", w: 560, dur: 80, delay: -60, op: 0.75 },
  { top: "66%", w: 340, dur: 58, delay: -15, op: 0.65 },
  { top: "80%", w: 240, dur: 42, delay: -70, op: 0.5 },
];

/** Soft clouds drifting left to right on a slow loop, over the sky photo. */
export default function Clouds() {
  return (
    <div className="absolute! inset-0 overflow-hidden" aria-hidden>
      {clouds.map((c, i) => (
        <svg
          key={i}
          className="cloud"
          style={{ top: c.top, width: c.w, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`, opacity: c.op }}
          viewBox="-20 -20 240 120"
          overflow="visible"
        >
          <defs>
            <filter id={`cloud-blur-${i}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          <g filter={`url(#cloud-blur-${i})`} fill="#fff">
            <ellipse cx="58" cy="54" rx="50" ry="24" />
            <ellipse cx="104" cy="40" rx="44" ry="30" />
            <ellipse cx="148" cy="56" rx="42" ry="22" />
            <ellipse cx="100" cy="62" rx="76" ry="18" />
          </g>
        </svg>
      ))}
    </div>
  );
}
