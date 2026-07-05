# High-Fee-Free Migrant Remittances - Deployment Guide

This guide will walk you through how to deploy your application completely for **free**, ensuring you start earning your 0.5% developer fee from every transaction.

## Part 1: Deploying the Smart Contract (Free)

We will use Remix IDE to deploy to a free test network.

1. **Get a Crypto Wallet:** Install the [MetaMask browser extension](https://metamask.io/) and create an account if you haven't already.
2. **Switch to a Testnet:** Open MetaMask, go to Network settings, enable "Show test networks", and select **Sepolia** (Ethereum Testnet) or **Polygon Amoy**.
3. **Get Free Test Tokens:** Go to a free faucet like [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) or [Alchemy Faucet](https://sepoliafaucet.com/) and request some free test ETH for your wallet address.
4. **Open Remix IDE:** Go to [remix.ethereum.org](https://remix.ethereum.org/).
5. **Create the Contract File:**
   - In the "File Explorer" tab (left sidebar), create a new file named `Remittance.sol`.
   - Copy the entire contents of your `Remittance.sol` file and paste it in.
6. **⚠️ CRITICAL STEP - SET YOUR ADDRESS ⚠️:**
   - In `Remittance.sol`, locate **Line 6**:
     `address payable public developerAddress = payable(0x0000000000000000000000000000000000000000);`
   - **Replace** the `0x000...` address with your actual MetaMask wallet address. This ensures you get paid the 0.5% fee!
7. **Compile the Contract:**
   - Go to the "Solidity Compiler" tab (the "S" icon).
   - Ensure the compiler version is set to `0.8.20` (or greater).
   - Click **"Compile Remittance.sol"**.
8. **Deploy the Contract:**
   - Go to the "Deploy & Run Transactions" tab (the Ethereum logo icon).
   - Under "Environment", select **"Injected Provider - MetaMask"**. MetaMask will pop up; approve the connection.
   - Click the orange **"Deploy"** button.
   - MetaMask will ask you to confirm a transaction to pay for the (free testnet) gas fees. Click Confirm.
9. **Copy Your Contract Address:**
   - Once deployed, it will appear under "Deployed Contracts" at the bottom left.
   - Click the "Copy" icon next to the contract name to copy your new Smart Contract Address.

## Part 2: Connecting the Frontend

1. **Update `app.js`:**
   - Open your `app.js` file.
   - Locate **Line 2**:
     `const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";`
   - **Replace** `0xYourDeployedContractAddressHere` with the Smart Contract Address you just copied from Remix.
   - Save the file.

## Part 3: Free Hosting (Vercel or GitHub Pages)

Now you will host your `index.html` and `app.js` files so anyone can use them.

### Option A: Vercel (Easiest)
1. Put your `index.html` and `app.js` in a single folder on your computer.
2. Go to [Vercel.com](https://vercel.com/) and sign up for a free account.
3. You can either drag and drop your folder directly into the Vercel dashboard to deploy, or use the Vercel CLI. 
4. Vercel will give you a free `.vercel.app` live link to share with users immediately.

### Option B: GitHub Pages
1. Create a free account on [GitHub](https://github.com/).
2. Create a new public repository (e.g., `remittance-app`).
3. Upload `index.html` and `app.js` to this repository.
4. Go to the repository **Settings** -> **Pages** (on the left sidebar).
5. Under "Source", select **"Deploy from a branch"**, choose the `main` branch, and click Save.
6. Wait 1-2 minutes, and GitHub will provide you with a free live link (e.g., `https://yourusername.github.io/remittance-app`).

You are now live! Users can connect their wallets and send funds globally, and you will passively collect 0.5% of every transaction!
