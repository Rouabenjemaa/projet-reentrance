const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TESTS DE SÉCURITÉ COMPLETS", function () {

  // ============ TEST 1 : CONTRAT VULNÉRABLE ============
  describe("1. Attaque sur contrat vulnérable", function () {
    let vault, attacker, owner, user1;
    
    beforeEach(async function () {
      [owner, user1] = await ethers.getSigners();
      
      // Déployer le vault vulnérable
      const VaultVulnerable = await ethers.getContractFactory("VaultVulnerable");
      vault = await VaultVulnerable.deploy();
      await vault.waitForDeployment();
      
      // Déployer l'attaquant
      const Attacker = await ethers.getContractFactory("Attacker");
      attacker = await Attacker.deploy(await vault.getAddress());
      await attacker.waitForDeployment();
    });
    
    it(" Doit vider le vault vulnérable", async function () {

      // 1. Le owner yab3ith 10 ETH

      await vault.connect(owner).deposit({ value: ethers.parseEther("10") });
      console.log("💰 Owner dépose 10 ETH");
      
      // 2. Un utilisateur normal yab3ith  1 ETH 

      await vault.connect(user1).deposit({ value: ethers.parseEther("1") });
      console.log("👤 User1 dépose 1 ETH");
      
      // 9bal l'attaque
      const balanceBefore = await ethers.provider.getBalance(await vault.getAddress());
      console.log("📊 Vault avant attaque:", ethers.formatEther(balanceBefore), "ETH");
      
      // 3. L'attaquant ylancer l'attaque b 1 ETH wahda
      await attacker.connect(user1).attack({ value: ethers.parseEther("1") });
      console.log("⚔️ Attaque lancée !");
      
      // ba3d lattaque  Nchoufou 9adeh fama flous fil vault ba3d ma el hacker khalas
      const balanceAfter = await ethers.provider.getBalance(await vault.getAddress());
      const attackerBalance = await attacker.getStolenBalance();
      
      console.log("📊 Vault après attaque:", ethers.formatEther(balanceAfter), "ETH");
      console.log("🦹 Attaquant a volé:", ethers.formatEther(attackerBalance), "ETH");
      
      // Vérifications
      expect(balanceAfter).to.be.lessThan(ethers.parseEther("1")); // Presque vide
      expect(attackerBalance).to.be.greaterThan(ethers.parseEther("10")); // > 10 ETH volés
      
      console.log("✅ ATTAQUE RÉUSSIE : Le vault a été vidé !");
    });
  });
  
  // ============ TEST 2 : CONTRAT SÉCURISÉ ============
  describe("2. Défense sur contrat sécurisé", function () {
    let secureVault, attacker;
    
    beforeEach(async function () {
      const VaultSecure = await ethers.getContractFactory("VaultSecure");
      secureVault = await VaultSecure.deploy();
      await secureVault.waitForDeployment();
      
      const Attacker = await ethers.getContractFactory("Attacker");
      attacker = await Attacker.deploy(await secureVault.getAddress());
      await attacker.waitForDeployment();
    });
    
    it("✅ Doit bloquer l'attaque de réentrance", async function () {
      // Dépôt initial
      await secureVault.deposit({ value: ethers.parseEther("10") });
      console.log("🛡️ Vault sécurisé : 10 ETH déposés");
      
      const balanceBefore = await secureVault.getContractBalance();
      console.log("📊 Balance avant:", ethers.formatEther(balanceBefore), "ETH");
      
      try {

        // Tentative d'attaque lzimha tifchill 
        await attacker.attack({ value: ethers.parseEther("1") });
        console.log("❌ L'attaque aurait dû échouer !");
        expect.fail("L'attaque devrait échouer");
      } catch (error) {
        console.log("✅ ATTAQUE BLOQUÉE :", error.reason || error.message);
      }
      
      const balanceAfter = await secureVault.getContractBalance();
      console.log("📊 Balance après:", ethers.formatEther(balanceAfter), "ETH");
      
      // Le vault doit toujours avoir ~10 ETH
      expect(balanceAfter).to.be.closeTo(ethers.parseEther("10"), ethers.parseEther("0.1"));
      console.log("✅ DÉFENSE RÉUSSIE : Les fonds sont protégés !");
    });
  });
  
 // ============ TEST 3 : HONEYPOT FONCTIONNEL ============
describe("3. Honeypot - Contrat fonctionnel", function () {
  let honeypot, owner, attacker;
  
  beforeEach(async function () {
    [owner, attacker] = await ethers.getSigners();
    
    const HoneypotVault = await ethers.getContractFactory("HoneypotVault");
    honeypot = await HoneypotVault.deploy();
    await honeypot.waitForDeployment();
  });
  
  it("✅ Doit fonctionner comme un vault avec mécanisme anti-hack", async function () {
    console.log("🧪 TEST COMPLET DU HONEYPOT");
    
    // 1. Test de base
    console.log("\n1. Tests de base du vault:");
    
    await honeypot.connect(owner).deposit({ value: ethers.parseEther("10") });
    console.log("   ✅ Dépôt owner: 10 ETH");
    
    const balance = await honeypot.getContractBalance();
    console.log(`   📊 Solde total: ${ethers.formatEther(balance)} ETH`);
    
    expect(balance).to.equal(ethers.parseEther("10"));
    
    // 2. Retrait normal
    console.log("\n2. Retrait normal:");
    
    await honeypot.connect(owner).withdraw();
    console.log("   ✅ Retrait réussi");
    
    const balanceAfter = await honeypot.getContractBalance();
    console.log(`   📊 Nouveau solde: ${ethers.formatEther(balanceAfter)} ETH`);
    
    expect(balanceAfter).to.be.lessThan(ethers.parseEther("0.1")); // Presque vide
    
    // 3. Test de détection simulée
    console.log("\n3. Simulation de détection d'attaque:");
    
    // Redéposer pour les tests
    await honeypot.connect(owner).deposit({ value: ethers.parseEther("5") });
    
    // Simuler la détection d'un attaquant
    await honeypot.connect(owner).simulateAttackDetection(attacker.address);
    
    const isAttacker = await honeypot.isAttacker(attacker.address);
    console.log(`   🎯 ${attacker.address} est attaquant: ${isAttacker ? "✅ OUI" : "❌ NON"}`);
    
    expect(isAttacker).to.be.true;
    
    // 4. Test de confiscation
    console.log("\n4. Confiscation des fonds:");
    
    const attackerBalanceBefore = await honeypot.balances(attacker.address);
    console.log(`   💰 Solde attaquant avant: ${ethers.formatEther(attackerBalanceBefore)} ETH`);
    
    await honeypot.connect(owner).confiscateAttackerFunds(attacker.address);
    
    const attackerBalanceAfter = await honeypot.balances(attacker.address);
    console.log(`   💰 Solde attaquant après: ${ethers.formatEther(attackerBalanceAfter)} ETH`);
    
    expect(attackerBalanceAfter).to.equal(0);
    
    // 5. Vérification finale
    console.log("\n5. Vérifications finales:");
    
    const ownerBalance = await ethers.provider.getBalance(await honeypot.getAddress());
    console.log(`   📊 Solde final honeypot: ${ethers.formatEther(ownerBalance)} ETH`);
    
    console.log("\n✅✅✅ HONEYPOT VALIDÉ AVEC SUCCÈS !");
    console.log("   - ✅ Vault basique fonctionnel");
    console.log("   - ✅ Détection d'attaquants");
    console.log("   - ✅ Confiscation des fonds");
    console.log("   - ✅ Toutes les fonctions testées");
  });
});
  // ============ TEST 4 : COMPARAISON DES GAS ============
  describe("4. Analyse des coûts en gas", function () {
    it("✅ Compare le gas utilisé par chaque version", async function () {
      console.log("\n📊 COMPARAISON DES COÛTS EN GAS");
      console.log("================================");
      
      // Déployer les 3 versions
      const VaultVulnerable = await ethers.getContractFactory("VaultVulnerable");
      const VaultSecure = await ethers.getContractFactory("VaultSecure");
      const HoneypotVault = await ethers.getContractFactory("HoneypotVault");
      
      const vuln = await VaultVulnerable.deploy();
      const secure = await VaultSecure.deploy();
      const honeypot = await HoneypotVault.deploy();
      
      await vuln.waitForDeployment();
      await secure.waitForDeployment();
      await honeypot.waitForDeployment();
      
      // Tester le dépôt (même fonction pour tous)
      const [user] = await ethers.getSigners();
      
      console.log("\n1. Coût du DÉPÔT (1 ETH):");
      
      let tx = await vuln.connect(user).deposit({ value: ethers.parseEther("1") });
      let receipt = await tx.wait();
      console.log("   Vault vulnérable:", receipt.gasUsed.toString(), "gas");
      
      tx = await secure.connect(user).deposit({ value: ethers.parseEther("1") });
      receipt = await tx.wait();
      console.log("   Vault sécurisé:", receipt.gasUsed.toString(), "gas");
      
      tx = await honeypot.connect(user).deposit({ value: ethers.parseEther("1") });
      receipt = await tx.wait();
      console.log("   Honeypot:", receipt.gasUsed.toString(), "gas");
      
      console.log("\n2. Coût du RETRAIT (sans attaque):");
      console.log("   (Note: Le honeypot a un surcoût pour la détection)");
      
      // Pour tester le retrait, il faut d'abord déposer
      await vuln.connect(user).deposit({ value: ethers.parseEther("0.1") });
      await secure.connect(user).deposit({ value: ethers.parseEther("0.1") });
      await honeypot.connect(user).deposit({ value: ethers.parseEther("0.1") });
      
      tx = await vuln.connect(user).withdraw();
      receipt = await tx.wait();
      console.log("   Vault vulnérable:", receipt.gasUsed.toString(), "gas");
      
      tx = await secure.connect(user).withdraw();
      receipt = await tx.wait();
      console.log("   Vault sécurisé:", receipt.gasUsed.toString(), "gas");
      
      tx = await honeypot.connect(user).withdraw();
      receipt = await tx.wait();
      console.log("   Honeypot:", receipt.gasUsed.toString(), "gas");
      
      console.log("\n✅ ANALYSE DES COÛTS EN GAS TERMINÉE");
          
    });
  });
});