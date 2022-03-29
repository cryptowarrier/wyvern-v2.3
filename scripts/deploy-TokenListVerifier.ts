import { ethers } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();

  const bytesUtils = await ethers
    .getContractFactory("BytesUtils", deployer)
    .then((factory) => factory.deploy());
  console.log(`"BytesUtils" was deployed at address ${bytesUtils.address}`);

  const tokenListVerifier = await ethers
    .getContractFactory("TokenListVerifier", {
      signer: deployer,
      libraries: {
        BytesUtils: bytesUtils.address,
      },
    })
    .then((factory) => factory.deploy());
  console.log(
    `"TokenListVerifier" was deployed at address ${tokenListVerifier.address}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
