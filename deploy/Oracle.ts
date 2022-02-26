import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
   ethers,
}: HardhatRuntimeEnvironment) {
    console.log("Running Oracle deploy script");
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const {address} = await deploy("Oracle", {
        from: deployer,
        log: true,
        deterministicDeployment: false,
    });

    console.log("Oracle deployed at ", address);

    // set stable price
    const oracleContract = await ethers.getContractAt("Oracle", address);

    console.log("Oracle setStablePrice");
    await (
        await oracleContract.setStablePrice(
            '0x7e6edA50d1c833bE936492BF42C1BF376239E9e2', // usdc
            100000000
        )
    ).wait();

    await (
        await oracleContract.setAssetPricer(
            '0xd0A1E359811322d97991E03f863a0C30C2cF029C', // weth
            (await deployments.get("ChainlinkPricer")).address,
        )
    ).wait();

};

export default deployFunction;

deployFunction.dependencies = [
    "ChainlinkPricer"
];

deployFunction.tags = ["Oracle"];
