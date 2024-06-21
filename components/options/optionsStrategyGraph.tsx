import React from 'react';
import { Svg, Line } from 'react-native-svg';
import { ThemedView } from '../ThemedView';

import { Calculated_Price_And_Profit } from '@/constants/optionstype';
import { Dimensions } from "react-native";

type OptionsStrategyGraphProps = {
  options: Calculated_Price_And_Profit[];
};

const OptionsStrategyGraph: React.FC<OptionsStrategyGraphProps> = ({ options }) => {
  const { minPrice, maxPrice, minProfit, maxProfit } = findMinMax(options);

  const getScreenSize = () => {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  };

  const height = 200;
  const width = getScreenSize().width > 465 ? 465 : getScreenSize().width;

  return (
    <ThemedView>
      <Svg height={height} width={width} style={{backgroundColor: 'grey', marginTop: 20}}>
        {options?.map(
          (point, index) =>
            index > 0 && (
              <Line
                key={index}
                x1={normalize(options[index - 1].price, minPrice, maxPrice, width)}
                y1={height - normalize(options[index - 1].profit, minProfit, maxProfit, height)}
                x2={normalize(point.price, minPrice, maxPrice, width)}
                y2={height - normalize(point.profit, minProfit, maxProfit, height)}
                stroke='blue'
                strokeWidth='2'
              />
            )
        )}
      </Svg>
    </ThemedView>
  );
};

const findMinMax = (options : Calculated_Price_And_Profit[]) => {
  let minPrice = Number.POSITIVE_INFINITY;
  let maxPrice = Number.NEGATIVE_INFINITY;
  let minProfit = Number.POSITIVE_INFINITY;
  let maxProfit = Number.NEGATIVE_INFINITY;

  options.forEach(option => {
    if (option.price < minPrice) minPrice = option.price;
    if (option.price > maxPrice) maxPrice = option.price;
    if (option.profit < minProfit) minProfit = option.profit;
    if (option.profit > maxProfit) maxProfit = option.profit;
  });

  return { minPrice, maxPrice, minProfit, maxProfit };
};

const normalize = (value: number, min: number, max: number, size: number) => {
  return ((value - min) / (max - min)) * size;
};

export default OptionsStrategyGraph;