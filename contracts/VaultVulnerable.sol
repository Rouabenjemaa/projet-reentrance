// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// CONTRAT 1 : VAULT VULNÉRABLE ( 5azna moch securiseé)

contract VaultVulnerable {

    // koll address 9ada andha solde 

    mapping(address => uint256) public balances;
    
    // ysoub flouss 
    event Deposited(address indexed user, uint256 amount);
    
    // yijbid flouss 
    event Withdrawn(address indexed user, uint256 amount);
    
    // fonction bich tsoub flous 

    function deposit() public payable {
        require(msg.value > 0, "Must send some ETH");
        
        // tzid lflouss lil utilisateur
        balances[msg.sender] += msg.value;
        
        emit Deposited(msg.sender, msg.value); //tsajalha
    }
    
    //  hathy fonction fiha tha5ra moch securiseé 

    function withdraw() public {

        // 9ada ando flous fil compte 

        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw"); //mafamach flous 
        
        //  il tha4ra tab3ith flouss 9bal matamil mise a jour 

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");
        
        // Mise a jour en retard 
        // lattaquent yista3mil withdraw() ya5o flouss 

        balances[msg.sender] = 0;
        
        emit Withdrawn(msg.sender, amount);
    }
    
    // tchoff  solde total du contrat 

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}