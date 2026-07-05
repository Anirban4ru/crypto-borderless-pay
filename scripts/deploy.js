const hre = require("hardhat");

async function main() {
  const remittance = await hre.ethers.deployContract("Remittance");
  await remittance.waitForDeployment();

  console.log(`Remittance contract deployed to: ${remittance.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
