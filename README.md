# 🔐 Reentrancy Attack Simulation in Ethereum Smart Contracts

## 📌 Project Overview

This project demonstrates one of the most critical vulnerabilities in Ethereum smart contracts: the **Reentrancy Attack**.

The objective is to understand how the attack works, exploit a vulnerable smart contract, implement secure countermeasures, and compare the behavior of different contract implementations using Hardhat.

This project was developed as part of a blockchain security assignment.

---

## 👥 Authors

* **Roua Ben Jemaa**
* **Mohamed Mahdi Dkhil**

Class: **4-ING-J-SSIRF-B**

---

## 🎯 Objectives

* Build a vulnerable smart contract.
* Develop an attacker contract that exploits the vulnerability.
* Secure the vulnerable contract using best security practices.
* Implement a Honeypot contract capable of detecting attackers.
* Compare gas consumption between implementations.
* Create a dashboard for visualizing attack scenarios and contract behavior.

---

## 🛠 Technologies Used

* Solidity
* Hardhat
* Node.js
* JavaScript
* Ethers.js
* HTML
* CSS
* Ganache (optional)

---

## 📂 Project Structure

```text
project/
│
├── contracts/
│   ├── VulnerableVault.sol
│   ├── SecureVault.sol
│   ├── Attacker.sol
│   └── Honeypot.sol
│
├── scripts/
│   ├── deploy.js
│   └── analyze-gas-details.js
│
├── test/
│   └── SecurityTests.js
│
├── dashboard/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── hardhat.config.js
├── package.json
└── README.md
```

---

## ⚙ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/project-name.git
cd project-name
```

Install dependencies:

```bash
npm install
```

Compile the smart contracts:

```bash
npx hardhat compile
```

---

## ▶ Running Tests

Run all tests:

```bash
npx hardhat test
```

Run a specific test:

```bash
npx hardhat test --grep "Vulnerable"
```

```bash
npx hardhat test --grep "Secure"
```

```bash
npx hardhat test --grep "Honeypot"
```

---

## ⛽ Gas Analysis

Run the gas analysis script:

```bash
npx hardhat run scripts/analyze-gas-details.js
```

This script compares:

* Deposit gas cost
* Withdrawal gas cost
* Security overhead
* Honeypot detection cost

---

## 🖥 Dashboard

The dashboard provides an interactive interface for:

* Simulating a Reentrancy Attack
* Testing the Secure Contract
* Demonstrating the Honeypot mechanism
* Monitoring balances
* Viewing gas consumption
* Displaying transaction history
* Visualizing security statistics

---

## 🔍 Attack Scenario

### Vulnerable Contract

1. User deposits ETH.
2. The attacker deposits a small amount.
3. The attacker calls `withdraw()`.
4. Before the balance is updated, the attacker re-enters the function.
5. Funds are repeatedly withdrawn.
6. The contract is drained.

---

## 🛡 Secure Contract

The secure version follows the **Checks → Effects → Interactions** pattern:

1. Verify balance.
2. Update internal state.
3. Transfer Ether.

This prevents recursive withdrawals.

---

## 🍯 Honeypot

The Honeypot contract intentionally appears vulnerable.

When malicious behavior is detected:

* The attacker is flagged.
* Funds can be confiscated by the owner.
* The attack is logged for analysis.

---

## 📊 Expected Results

| Test             | Expected Result            |
| ---------------- | -------------------------- |
| Vulnerable Vault | Attack succeeds            |
| Secure Vault     | Attack blocked             |
| Honeypot         | Attacker detected          |
| Gas Analysis     | Security overhead measured |

---

## 📚 Learning Outcomes

Through this project you will understand:

* Ethereum smart contract vulnerabilities
* Reentrancy attacks
* Solidity security best practices
* Smart contract testing with Hardhat
* Gas optimization
* Blockchain security analysis

---

## 📄 Project Deliverables

* ✅ Vulnerable Smart Contract
* ✅ Attacker Smart Contract
* ✅ Secure Smart Contract
* ✅ Honeypot Contract
* ✅ Hardhat Test Suite
* ✅ Gas Analysis
* ✅ Interactive Dashboard
* ✅ Project Report
* ✅ Presentation

---

## 📖 References

* Ethereum Documentation
* Solidity Documentation
* Hardhat Documentation
* OpenZeppelin Contracts

---

## 📜 License

This project is intended for **educational and research purposes only**.

