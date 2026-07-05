// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Remittance {
    // 0xYourDeveloperWalletAddressHere - Replace with your actual wallet address
    address payable public developerAddress = payable(0x6217fD22D5cbC6cD6aCd84422f8FE9ec2862A633); 
    
    // 5 represents 0.5% when divided by 1000
    uint256 public constant DEVELOPER_FEE_PERCENTAGE = 5; 
    uint256 public constant PERCENTAGE_DENOMINATOR = 1000;

    event RemittanceSent(address indexed sender, address indexed recipient, uint256 totalAmount, uint256 timestamp);

    function sendRemittance(address payable recipient) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient address");

        uint256 developerFee = (msg.value * DEVELOPER_FEE_PERCENTAGE) / PERCENTAGE_DENOMINATOR;
        uint256 recipientAmount = msg.value - developerFee;

        // Send fee to developer
        (bool feeSuccess, ) = developerAddress.call{value: developerFee}("");
        require(feeSuccess, "Developer fee transfer failed");

        // Send main amount to recipient
        (bool recipientSuccess, ) = recipient.call{value: recipientAmount}("");
        require(recipientSuccess, "Recipient transfer failed");

        emit RemittanceSent(msg.sender, recipient, msg.value, block.timestamp);
    }
}
