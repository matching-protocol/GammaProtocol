import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    console.log("Running OtokenFactory deploy script");
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const {address} = await deploy("OtokenFactory", {
        from: deployer,
        log: true,
        deterministicDeployment: false,
        args: [
            (await deployments.get("AddressBook")).address,
        ],
    });

    console.log("OtokenFactory deployed at ", address);
};

export default deployFunction;

deployFunction.dependencies = [
    "AddressBook"
];

deployFunction.tags = ["OtokenFactory"];
