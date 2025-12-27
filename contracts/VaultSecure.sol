// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// CONTRAT 3 : VAULT SÉCURISÉ ( 5azna securisée )

contract VaultSecure {

    // chitsajil 9ada fama flous 3and kol had 

    mapping(address => uint256) public balances;
    
    event Deposited(address indexed user, uint256 amount); //sab flous
    event Withdrawn(address indexed user, uint256 amount); // kharej flous 

    // fonction bich tsoub flous 
    
    function deposit() public payable {
        require(msg.value > 0, "Must send some ETH");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }
    
    //  securite bil methode "CHECKS-EFFECTS-INTERACTIONS"
    // tverifier ba3d tamil mise a jour ba3d tab3ith 

    function withdraw() public {

        //  CHECK : Vérifier les conditions

        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw"); //famach flous 
        
        // EFFECT : Mettre à jour 
        // hathy zayda al contract 1 

        balances[msg.sender] = 0; // mise a 0 hathy ili tsecurisee 9bal mayab3ith 
        
        //  Envoyer l'argent 
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed"); // donc echouée  fin dattaque 
        
        emit Withdrawn(msg.sender, amount); 
    }

    // chitra 9ada andik flous b9aw fil contract  
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}