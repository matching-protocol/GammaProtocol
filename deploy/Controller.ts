import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deployFunction: DeployFunction = async function ({
   deployments,
   getNamedAccounts,
   ethers,
}: HardhatRuntimeEnvironment) {
    console.log("Running Controller deploy script");
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    const owner = deployer;
    const addressBook = (await deployments.get("AddressBook")).address;

    const addressBookContract = await ethers.getContractAt("AddressBook", addressBook);
    console.log("AddressBook setOtokenFactory");
    await (
        await addressBookContract.setOtokenFactory(
            (await deployments.get("OtokenFactory")).address,
        )
    ).wait();

    console.log("AddressBook setOtokenImpl");
    await (
        await addressBookContract.setOtokenImpl(
            (await deployments.get("Otoken")).address,
        )
    ).wait();

    console.log("AddressBook setWhitelist");
    await (
        await addressBookContract.setWhitelist(
            (await deployments.get("Whitelist")).address,
        )
    ).wait();

    console.log("AddressBook setOracle");
    await (
        await addressBookContract.setOracle(
            (await deployments.get("Oracle")).address,
        )
    ).wait();

    console.log("AddressBook setMarginPool");
    await (
        await addressBookContract.setMarginPool(
            (await deployments.get("MarginPool")).address,
        )
    ).wait();

    console.log("AddressBook setMarginCalculator");
    await (
        await addressBookContract.setMarginCalculator(
            (await deployments.get("MarginCalculator")).address,
        )
    ).wait();

    const {address} = await deploy("Controller", {
        from: deployer,
        log: true,
        deterministicDeployment: false,
        libraries: {
            MarginVault: (await deployments.get("MarginVault")).address
        },
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            execute: {
                init: {
                    methodName: "initialize",
                    args: [
                        addressBook,
                        owner,
                    ],
                },
            },
        },
    });

    console.log("Controller deployed at ", address);

    console.log("AddressBook setController");
    await (
        await addressBookContract.setController(
            (await deployments.get("Controller")).address,
        )
    ).wait();

    console.log("Deployment done");
};

export default deployFunction;

deployFunction.dependencies = [
    "AddressBook",
    "OtokenFactory",
    "Otoken",
    "Whitelist",
    "Oracle",
    "MarginCalculator",
    "MarginPool",
    "MarginVault",
];

deployFunction.tags = ["Controller"];
