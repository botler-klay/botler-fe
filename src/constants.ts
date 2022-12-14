export const CYPRESS_NETWORK_VERSION = 8217;
export const BAOBAB_NETWORK_VERSION = 1001;

export const REGISTRY_CONTRACT_ADDRESS =
  "0xF433a85d41f703F3D87Cb0C6Be7366fb5e351656";
export const REWARD_CONTRACT_ADDRESS =
  "0x9ab47A06C45C6AF1Fc6DAb36313261DC2C3309eD";

export enum GAS_LIMIT {
  default = 8000000,
}

export enum REFRESH_INTERVAL {
  jobs = 5000,
  balance = 5000,
  default = 10000,
  registryStatus = 30000,
}
