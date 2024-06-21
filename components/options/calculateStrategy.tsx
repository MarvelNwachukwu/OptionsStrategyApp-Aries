import { optionsContractT } from "@/constants/optionsStrategy";

export const calculateRiskReward = (optionsContracts : optionsContractT[]) => {
  let data = [];

  // Generate data points for underlying price range
  for (let price = 50; price <= 150; price += 5) {
    let profit = 0;

    optionsContracts.forEach(contract => {
      if (contract.type === 'call') {
        profit += Math.max(0, price - contract.strikePrice) * contract?.quantity - contract.premium * contract?.quantity;
      } else {
        profit += Math.max(0, contract.strikePrice - price) * contract?.quantity - contract.premium * contract?.quantity;
      }
    });

    data.push({ price, profit });
  }

  return data;
};