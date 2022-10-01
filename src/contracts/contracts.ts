import Caver, { AbiItem } from "caver-js";
import RegistryABI from "./abis/Registry.abi.json";
import RewardABI from "./abis/Reward.abi.json";

export const caver = new Caver(window.klaytn);

export const registryContract = new caver.contract(
  RegistryABI as AbiItem[],
  ""
);
export const rewardContract = new caver.contract(RewardABI as AbiItem[], "");
