export enum CHAINID {
  ETH_MAINNET = 1,
  ETH_KOVAN = 42,
  AVAX_MAINNET = 43114,
  AVAX_FUJI = 43113,
}

// Must be 1 day from current time
export const BLOCK_NUMBER = {
  [CHAINID.ETH_MAINNET]: 14087600,
  [CHAINID.AVAX_MAINNET]: 12042353,
  [CHAINID.AVAX_FUJI]: 2823963,
};

export const NULL_ADDR = "0x0000000000000000000000000000000000000000";
export const PLACEHOLDER_ADDR = "0x0000000000000000000000000000000000000001";

/**
 * Assets
 */
export const WETH_ADDRESS = {
  [CHAINID.ETH_MAINNET]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  [CHAINID.ETH_KOVAN]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
  [CHAINID.AVAX_MAINNET]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // NOTE: Wrapped AVAX token address, not ETH
  [CHAINID.AVAX_FUJI]: "0xD9D01A9F7C810EC035C0e42cB9E80Ef44D7f8692", // NOTE: Wrapped AVAX token address, not ETH
};

export const USDC_ADDRESS = {
  [CHAINID.ETH_MAINNET]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [CHAINID.ETH_KOVAN]: "0x7e6edA50d1c833bE936492BF42C1BF376239E9e2",
  [CHAINID.AVAX_MAINNET]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
  [CHAINID.AVAX_FUJI]: "0x6275B63A4eE560004c34431e573314426906cee9",
};

export const AGGREGATOR_ADDRESS = {
  [CHAINID.ETH_KOVAN]: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  [CHAINID.AVAX_MAINNET]: "0x0A77230d17318075983913bC2145DB16C7366156",
};