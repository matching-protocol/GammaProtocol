import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
    WETH_ADDRESS,
    USDC_ADDRESS,
    AGGREGATOR_ADDRESS,
} from "../constants/constants";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
   ethers,
   network,
}: HardhatRuntimeEnvironment) {
    console.log("Running ChainlinkPricer deploy script");
    const {deploy} = deployments;

    const chainId: number = network.config.chainId as number;

    const {deployer} = await getNamedAccounts();
    const bot = deployer;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const asset = WETH_ADDRESS[chainId];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const usdc = USDC_ADDRESS[chainId];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const aggregator = AGGREGATOR_ADDRESS[chainId];

    const {address} = await deploy("ChainlinkPricer", {
        from: deployer,
        log: true,
        deterministicDeployment: false,
        args: [
            bot,
            asset,
            aggregator,
            (await deployments.get("Oracle")).address,
        ]
    });

    console.log("ChainlinkPricer deployed at ", address);

    // set stable price
    console.log("Oracle setStablePrice");
    const oracle = (await deployments.get("Oracle")).address;
    const oracleContract = await ethers.getContractAt("Oracle", oracle);
    await (
        await oracleContract.setStablePrice(
            usdc,
            100000000
        )
    ).wait();
    await (
        await oracleContract.setAssetPricer(
            asset, // weth
            (await deployments.get("ChainlinkPricer")).address,
        )
    ).wait();
};

export default deployFunction;

deployFunction.dependencies = [
    "Oracle"
];

deployFunction.tags = ["ChainlinkPricer"];
