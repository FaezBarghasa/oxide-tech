import React from 'react';

interface OxideLogoProps {
  className?: string;
  size?: number | string;
  traceColor?: string;
  viaBg?: string;
  viaRing?: string;
  animated?: boolean;
}

export const OxideLogo: React.FC<OxideLogoProps> = ({
  className = 'w-10 h-10',
  size,
  traceColor = '#C1552C',
  viaBg = '#0B0908',
  viaRing = '#C1552C',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      style={{
        // @ts-ignore
        '--trace-color': traceColor,
        '--via-bg': viaBg,
        '--via-ring': viaRing,
      }}
    >
      <title>Oxide-Tech Symbol</title>
      <desc>
        Octagon-O + X Cross: an octagonal pad standing in for the letter O,
        crossed by two 45-degree diagonal traces forming the letter X, with
        vias at all four corners and at the center junction. Built entirely
        from standard PCB pad, trace, and via primitives.
      </desc>

      <defs>
        <style>{`
          .trace {
            stroke: var(--trace-color, ${traceColor});
            stroke-width: 4.5;
            stroke-linecap: round;
            fill: none;
          }
          .via-outer {
            fill: var(--via-bg, ${viaBg});
            stroke: var(--via-ring, ${viaRing});
          }
          .via-inner {
            fill: var(--via-ring, ${viaRing});
          }
        `}</style>

        {/* Reusable via, positioned via <use> */}
        <g id="oxide-via-lg">
          <circle className="via-outer" r="6" strokeWidth="3" />
          <circle className="via-inner" r="2.2" />
        </g>
      </defs>

      {/* X: full 45° diagonals of the bounding box */}
      <line x1="20" y1="20" x2="80" y2="80" className="trace" />
      <line x1="80" y1="20" x2="20" y2="80" className="trace" />

      {/* O: standard octagon pad shape (chamfered square) */}
      <polygon
        points="43,35 57,35 65,43 65,57 57,65 43,65 35,57 35,43"
        fill="var(--via-bg, #0B0908)"
        stroke="var(--trace-color, #C1552C)"
        strokeWidth="4"
      />

      {/* Corner vias where X legs terminate */}
      <use href="#oxide-via-lg" x="20" y="20" />
      <use href="#oxide-via-lg" x="80" y="20" />
      <use href="#oxide-via-lg" x="80" y="80" />
      <use href="#oxide-via-lg" x="20" y="80" />

      {/* Center via where X crosses, inside the O */}
      <g transform="translate(50,50)">
        <circle className="via-outer" r="4" strokeWidth="2" />
        <circle className="via-inner" r="1.4" />
      </g>
    </svg>
  );
};

export default OxideLogo;
