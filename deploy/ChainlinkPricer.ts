import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    console.log("Running ChainlinkPricer deploy script");
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    const bot = deployer;
    const asset = '0xd0A1E359811322d97991E03f863a0C30C2cF029C'; // weth
    const aggregator = '0x9326BFA02ADD2366b30bacB125260Af641031331'; // https://docs.chain.link/docs/ethereum-addresses/

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
};

export default deployFunction;

deployFunction.dependencies = [];

deployFunction.tags = ["ChainlinkPricer"];
