import React, {FC} from 'react';

interface Props {
    size: number
    color: string
}

const GameEnemyCircleLinePartial: FC<Props> = ({size, color}) =>
    <svg height={size}
         width={size}
         style={{
             position: "absolute",
             zIndex: -1
         }}
    >
        {/* Middle */}
        <circle cx={size / 2} cy={size / 2} r={size * 0.025} style={{fill: color}}/>

        {/* First Line */}
        <line x1={size / 2} y1="0"
              x2={size / 2} y2={size}
              style={{
                  stroke: color,
                  strokeWidth: 2,
                  strokeDasharray: 4
              }}/>

        {/* Second Line */}
        <line x1="0" y1={size / 2}
              x2={size} y2={size / 2}
              style={{
                  stroke: color,
                  strokeWidth: 2,
                  strokeDasharray: 4
              }}/>
    </svg>

export default GameEnemyCircleLinePartial;
