# 🌍 Crypto Borderless Pay

![Global Remittances UI](https://bchain-six.vercel.app/)

A highly efficient, non-custodial decentralized application (dApp) built to facilitate instant global crypto remittances. Featuring a striking light-mode Neo-Brutalist UI with glassmorphic accents, this application allows users to securely transfer funds across borders with near-zero friction.

---

## ⚡ Features

- **Instant Cross-Border Transfers:** Send crypto directly to any valid wallet address across the globe.
- **Neo-Brutalist Aesthetic:** A raw, stark, high-contrast light-mode design optimized for maximum usability and impact.
- **Glassmorphism Elements:** Subtle frosted-glass panels juxtaposed against hard brutalist shadows.
- **Non-Custodial Security:** Built purely on smart contracts. We never hold your funds.
- **Automated Developer Fees:** Hardcoded smart contract logic to safely route a minimal 0.5% protocol fee to the developer wallet.

## 🛠 Tech Stack

- **Frontend:** Vanilla HTML, JavaScript, Tailwind CSS (Custom Neo-Brutalist styles).
- **Web3 Integration:** Ethers.js (v6).
- **Smart Contract:** Solidity (^0.8.20).
- **Development Environment:** Hardhat.
- **Deployment:** Vercel (Frontend), Sepolia Testnet (Smart Contract).

## 🚀 Live Demo

Check out the live application hosted on Vercel:
**[Launch Global Remittances](https://bchain-six.vercel.app)**

## 💻 Local Development

If you want to run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anirban4ru/crypto-borderless-pay.git
   cd crypto-borderless-pay
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory (never commit this file) and add:
   ```env
   PRIVATE_KEY=your_metamask_private_key
   SEPOLIA_RPC_URL=your_alchemy_or_infura_url
   ```

4. **Deploy the Smart Contract (Optional):**
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network sepolia
   ```
   *Remember to update the `CONTRACT_ADDRESS` in `app.js` if you deploy your own instance!*

5. **Run the Frontend:**
   Simply open `index.html` in your browser, or use a tool like Live Server.

## 🔒 Security

- The smart contract (`Remittance.sol`) has been verified and tested on the Sepolia network. 
- All sensitive keys (like `.env` and `node_modules`) are strictly ignored via `.gitignore` to prevent accidental leakage.

---
*Built with ❤️ for a borderless world.*
