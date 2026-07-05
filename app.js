// Configuration: Replace with your deployed contract address!
const CONTRACT_ADDRESS = "0x24282a4CD652DF25cA3044a959c09c0B7108caf4";

// The minimal ABI required to call the sendRemittance function
const CONTRACT_ABI = [
    "function sendRemittance(address payable recipient) external payable",
    "event RemittanceSent(address indexed sender, address indexed recipient, uint256 totalAmount, uint256 timestamp)"
];

let provider;
let signer;
let contract;

// DOM Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressText = document.getElementById('walletAddressText');
const remittanceForm = document.getElementById('remittanceForm');
const recipientAddressInput = document.getElementById('recipientAddress');
const amountInput = document.getElementById('amount');
const sendBtn = document.getElementById('sendBtn');
const statusArea = document.getElementById('statusArea');

// Helper to show status messages
function showStatus(message, type = 'info') {
    statusArea.classList.remove('hidden', 'brutal-status-info', 'brutal-status-error', 'brutal-status-success');
    
    if (type === 'info') {
        statusArea.classList.add('brutal-status-info');
    } else if (type === 'error') {
        statusArea.classList.add('brutal-status-error');
    } else if (type === 'success') {
        statusArea.classList.add('brutal-status-success');
    }
    
    statusArea.textContent = message;
}

// Connect Wallet Function
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            showStatus("Connecting to MetaMask...", "info");
            
            // Initialize ethers provider using v6 syntax
            provider = new ethers.BrowserProvider(window.ethereum);
            
            // Request account access
            await provider.send("eth_requestAccounts", []);
            
            // Get the signer
            signer = await provider.getSigner();
            const address = await signer.getAddress();
            
            // Update UI
            walletAddressText.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
            sendBtn.disabled = false;
            
            // Initialize contract instance
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            
            showStatus("Wallet connected successfully! You are ready to send.", "success");
        } catch (error) {
            console.error(error);
            showStatus(error.message || "Failed to connect wallet.", "error");
        }
    } else {
        showStatus("MetaMask is not installed. Please install it to use this app.", "error");
    }
}

// Handle Form Submission
async function handleSendRemittance(e) {
    e.preventDefault();
    
    if (!signer) {
        showStatus("Please connect your wallet first.", "error");
        return;
    }

    const recipient = recipientAddressInput.value.trim();
    const amount = amountInput.value.trim();

    if (!ethers.isAddress(recipient)) {
        showStatus("Invalid recipient address format.", "error");
        return;
    }

    if (amount <= 0) {
        showStatus("Amount must be greater than 0.", "error");
        return;
    }

    if (CONTRACT_ADDRESS === "0xYourDeployedContractAddressHere") {
        showStatus("DEVELOPER ERROR: Please update CONTRACT_ADDRESS in app.js after deploying the smart contract.", "error");
        return;
    }

    try {
        // Parse the amount into Wei (ethers v6 syntax)
        const amountInWei = ethers.parseEther(amount.toString());
        
        showStatus("Please confirm the transaction in MetaMask...", "info");
        sendBtn.disabled = true;
        sendBtn.textContent = "Processing...";

        // Call the smart contract
        const tx = await contract.sendRemittance(recipient, {
            value: amountInWei
        });

        showStatus(`Transaction submitted! Waiting for confirmation... (Tx Hash: ${tx.hash.substring(0, 10)}...)`, "info");

        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        if (receipt.status === 1) {
            showStatus(`Transfer Successful! Sent ${amount} to ${recipient.substring(0, 6)}...`, "success");
            remittanceForm.reset();
        } else {
            showStatus("Transaction failed on the network.", "error");
        }
    } catch (error) {
        console.error(error);
        
        // Handle user rejection specifically to provide a better message
        if (error.code === 'ACTION_REJECTED' || (error.info && error.info.error && error.info.error.code === 4001)) {
            showStatus("Transaction was rejected by the user.", "error");
        } else {
            showStatus(error.reason || error.message || "An error occurred during the transaction.", "error");
        }
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Money Globally";
    }
}

// Event Listeners
connectWalletBtn.addEventListener('click', connectWallet);
remittanceForm.addEventListener('submit', handleSendRemittance);

// Listen for account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            connectWallet(); // Re-connect with new account
        } else {
            // Disconnected
            walletAddressText.textContent = "Connect Wallet";
            sendBtn.disabled = true;
            signer = null;
            showStatus("Wallet disconnected.", "info");
        }
    });
}
