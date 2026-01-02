// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HoneypotVault {

    // dictionners chi5arij laddress 

    mapping(address => uint256) public balances;
    mapping(address => bool) public isAttacker;
    
    address public owner; // Propriétaire (sahb l7anout)
    bool private locked; // msakir anti-réentrance
    
    event Deposited(address indexed user, uint256 amount); // ki ysoub had flous 
    event Withdrawn(address indexed user, uint256 amount); // ki hadd yijbid flous 
    event AttackDetected(address indexed attacker); // ydetecter sara9
    event FundsConfiscated(address indexed attacker, uint256 amount); //chitraja3 alih lattaque w ya5olo il 1 ETH MTA3O 
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    // Modifier anti-réentrance SIMPLE 3IBARA CHISAKIR AL SARA9 

    modifier noReentrancy() {
        require(!locked, "No reentrancy");
        locked = true;  // ysakir
        _;
        locked = false; // y3awid yithal 
    }
    
    constructor() {
        owner = msg.sender;
    }

    //ysoub les ETH 
    
    function deposit() public payable {
        require(msg.value > 0, "Need ETH"); 
        balances[msg.sender] += msg.value;  // zad il floss
        emit Deposited(msg.sender, msg.value); // sajalha
    }
    
    // Retrait AVEC DÉTECTION D'ATTAQUE

    function withdraw() public noReentrancy {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");
        
        // Sauvegarder l'adresse  

        address user = msg.sender;
        
        // Mettre à jour l'état D'ABORD securisé kima contract secure (Check-Effects-Interactions)

        balances[user] = 0;
        
        // chyab3ith il floss 

        (bool success, ) = user.call{value: amount}("");
        require(success, "Transfer failed");
        //===========================================================
        // DÉTECTION: Si après l'envoi, il y a encore un solde → ATTAQUE!
        // (un appel récursif aurait remis un solde) 

        if (balances[user] > 0) {
            isAttacker[user] = true;
            emit AttackDetected(user);

            // Garder les fonds de l'attaquant

            balances[user] = amount;
        }
        
        emit Withdrawn(user, amount);
    }
    
    // Fonction pour tester la détection stamaltha ligne 139 fil test 

    function simulateAttackDetection(address _attacker) public onlyOwner {
        isAttacker[_attacker] = true;
        balances[_attacker] = 1 ether;  // Donner un solde pour test
        emit AttackDetected(_attacker);
    }
    
    
     //chta5o flous lattaquant 

    function confiscateAttackerFunds(address _attacker) public onlyOwner {
        require(isAttacker[_attacker], "Not attacker");
        
        uint256 amount = balances[_attacker];
        require(amount > 0, "No funds");
        
        balances[_attacker] = 0;
        
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FundsConfiscated(_attacker, amount);
    }

    // bich tra 9ada min ETH fil contract stamalnah fil test barcha w mawjoda fil les contact lo5rina 
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
     // receive t3ayit lil depo 
    receive() external payable {
        deposit();
    }
}