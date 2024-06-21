export type optionsContractT = {
  type: 'call' | 'put';
  strikePrice: number;
  premium: number;
  quantity: number;
};

export const calculateStrategy = (
  options: optionsContractT[],
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
