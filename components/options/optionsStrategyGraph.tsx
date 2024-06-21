import React from 'react';
import { Svg, Line } from 'react-native-svg';
import { ThemedView } from '../ThemedView';

import { Calculated_Price_And_Profit } from "@/constants/optionstype";

type OptionsStrategyGraphProps = {
  options: Calculated_Price_And_Profit[];
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

  console.log(options)

  return (
    <ThemedView>
      <Svg height='200' width='300'>
        {options?.map(
          (point, index) =>
            index > 0 && (
              <Line
                key={index}
                x1={options[index - 1].price}
                y1={200 - options[index - 1].profit}
                x2={point.price}
                y2={200 - point.profit}
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
