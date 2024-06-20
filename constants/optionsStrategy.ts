export type OptionsT = {
  type: 'call' | 'put';
  strikePrice: number;
  premium: number;
};

export const calculateStrategy = (
  options: OptionsT[],
  stockPrices: number[]
) => {
  return stockPrices.map((price) => {
    let payoff = 0;
    options.forEach((option) => {
      if (option.type === 'call') {
        payoff += Math.max(
          price - option.strikePrice - option.premium,
          -option.premium
        );
      } else if (option.type === 'put') {
        payoff += Math.max(
          option.strikePrice - price - option.premium,
          -option.premium
        );
      }
    });
    return { x: price, y: payoff };
  });
};
