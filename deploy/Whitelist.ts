import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    console.log("Running Whitelist deploy script");
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const {address} = await deploy("Whitelist", {
        from: deployer,
        log: true,
        deterministicDeployment: false,
        args: [
            (await deployments.get("AddressBook")).address,
        ],
    });

    console.log("Whitelist deployed at ", address);
};

export default deployFunction;

deployFunction.dependencies = [
    "AddressBook"
];

deployFunction.tags = ["Whitelist"];
