import { OptionsT } from "@/constants/optionstype";

export function calculateStrategy(options: OptionsT[]) {
  const maxProfit = 1000;
  const maxLoss = -500;
  const breakEvenPoints = [50, 100];

  return { maxProfit, maxLoss, breakEvenPoints };
}
