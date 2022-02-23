import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    console.log("Running Otoken deploy script");
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const {address} = await deploy("Otoken", {
        from: deployer,
        log: true,
        deterministicDeployment: false,
    });

    console.log("Otoken deployed at ", address);
};

export default deployFunction;

deployFunction.dependencies = [
    "AddressBook"
];

deployFunction.tags = ["Otoken"];
