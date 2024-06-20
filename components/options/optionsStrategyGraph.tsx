import React from 'react';
import { Svg, Line } from 'react-native-svg';
import { ThemedView } from '../ThemedView';
// import { OptionsT } from '@/constants/optionstype';
// import { calculateStrategy } from './calculateStrategy';
import { calculateStrategy, OptionsT } from '@/constants/optionsStrategy';

type OptionsStrategyGraphProps = {
  options: OptionsT[];
};

const OptionsStrategyGraph: React.FC<OptionsStrategyGraphProps> = ({
  options,
}) => {
  // Define a range of stock prices to calculate the payoff for
  const stockPrices = Array.from({ length: 21 }, (_, i) => i * 10); // [0, 10, 20, ..., 200]

  const data = Array.from({ length: 400 }, (_, i) => {
    const top = Math.random() * 100;
    const bottom = Math.random() * -100;
    return i % 2 === 0 ? { x: i, y: top } : { x: i, y: bottom };
  });

  return (
    <ThemedView>
      <Svg height='200' width='300'>
        {data.map(
          (point, index) =>
            index > 0 && (
              <Line
                key={index}
                x1={data[index - 1].x}
                y1={200 - data[index - 1].y}
                x2={point.x}
                y2={200 - point.y}
                stroke='blue'
                strokeWidth='2'
              />
            )
        )}
      </Svg>
    </ThemedView>
  );
};

export default OptionsStrategyGraph;
