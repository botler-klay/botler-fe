import BigNumber from "bignumber.js";

export function compareBigNumber(a: BigNumber, b: BigNumber) {
  return a.minus(b).div(a.minus(b).abs()).toNumber();
}

export function formatTokenAmount(amount: BigNumber) {
  return amount.div(new BigNumber(10).pow(18)).toString();
}
