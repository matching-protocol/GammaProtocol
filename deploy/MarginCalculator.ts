import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    console.log("Running MarginCalculator deploy script");
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const {address} = await deploy("MarginCalculator", {
        from: deployer,
        log: true,
        deterministicDeployment: false,
        args: [
            (await deployments.get("Oracle")).address,
        ],
    });

    console.log("MarginCalculator deployed at ", address);
};

export default deployFunction;

deployFunction.dependencies = [
    "Oracle"
];

deployFunction.tags = ["MarginCalculator"];
