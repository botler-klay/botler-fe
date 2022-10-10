import Caver from "caver-js";
import {
  REGISTRY_CONTRACT_ADDRESS,
  REWARD_CONTRACT_ADDRESS,
} from "../constants";
import RegistryABI from "./abis/Registry.abi.json";
import RewardABI from "./abis/Reward.abi.json";

export const caver = new Caver(window.klaytn);

export const registryContract = new caver.klay.Contract(
  RegistryABI as any,
  REGISTRY_CONTRACT_ADDRESS
);
export const rewardContract = new caver.klay.Contract(
  RewardABI as any,
  REWARD_CONTRACT_ADDRESS
);
