// Données de simulation
let simulationData = {
    vulnerable: { balance: 10, attempts: 0, stolen: 0 },
    secure: { balance: 10, attempts: 0, blocked: 0 },
    honeypot: { balance: 5, traps: 0, confiscated: 0 },
    logs: [],
    totalGas: 0
};


// Graphiques
let balanceChart, gasChart;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    logMessage("Dashboard initialisé", "info");
    logMessage("Prêt à simuler les attaques", "success");
});

// Fonctions de simulation
function attackVulnerable() {
    const startTime = Date.now();
    
    simulationData.vulnerable.attempts++;
    const stolen = Math.min(simulationData.vulnerable.balance, 11);
    
    // Simulation de l'attaque
    simulationData.vulnerable.balance = 0;
    simulationData.vulnerable.stolen += stolen;
    
    // Gas utilisé (estimation)
    const gasUsed = 164913;
    simulationData.totalGas += gasUsed;
    
    // Mise à jour UI
    updateUI();
    
    // Logs
    logMessage(`⚔️ Attaque sur Vault Vulnérable lancée`, "danger");
    logMessage(`✅ ${stolen.toFixed(1)} ETH volés avec succès`, "danger");
    logMessage(`⛽ ${gasUsed.toLocaleString()} gas utilisé`, "info");
    logMessage(`💰 Attaquant a maintenant ${(2 + stolen).toFixed(1)} ETH`, "warning");
    
    // Animation
    animateBalanceChange('vulnBalance', 10, 0);
}

function testDefense() {
    const startTime = Date.now();
    
    simulationData.secure.attempts++;
    simulationData.secure.blocked++;
    
    // Gas utilisé (estimation - échoue rapidement)
    const gasUsed = 50000;
    simulationData.totalGas += gasUsed;
    
    // Mise à jour UI
    updateUI();
    
    // Logs
    logMessage(`🛡️ Test de défense sur Vault Sécurisé`, "info");
    logMessage(`✅ Attaque BLOQUÉE par le pattern Checks-Effects-Interactions`, "success");
    logMessage(`⛽ ${gasUsed.toLocaleString()} gas utilisé avant échec`, "info");
    logMessage(`💰 Solde protégé: ${simulationData.secure.balance.toFixed(1)} ETH`, "success");
}

function trapHacker() {
    const startTime = Date.now();
    
    simulationData.honeypot.traps++;
    simulationData.honeypot.confiscated += 1;
    simulationData.honeypot.balance += 1;
    
    // Gas utilisé (estimation)
    const gasUsed = 180000;
    simulationData.totalGas += gasUsed;
    
    // Mise à jour UI
    updateUI();
    
    // Logs
    logMessage(`🎣 Hacker tente d'exploiter le Honeypot`, "warning");
    logMessage(`🚨 ATTAQUE DÉTECTÉE! Hacker piégé`, "warning");
    logMessage(`👮 Fonds confisqués: 1.0 ETH`, "success");
    logMessage(`⛽ ${gasUsed.toLocaleString()} gas utilisé pour la détection`, "info");
    
    // Animation
    animateBalanceChange('honeypotBalance', simulationData.honeypot.balance - 1, simulationData.honeypot.balance);
}

function resetSimulation() {
    simulationData = {
        vulnerable: { balance: 10, attempts: 0, stolen: 0 },
        secure: { balance: 10, attempts: 0, blocked: 0 },
        honeypot: { balance: 5, traps: 0, confiscated: 0 },
        logs: [],
        totalGas: 0
    };
    
    updateUI();
    logMessage(`🔄 Simulation réinitialisée`, "info");
    logMessage(`Tous les soldes restaurés`, "success");
}

// Mise à jour de l'interface
function updateUI() {
    // Mettre à jour les balances
    document.getElementById('vulnBalance').textContent = simulationData.vulnerable.balance.toFixed(1) + ' ETH';
    document.getElementById('secureBalance').textContent = simulationData.secure.balance.toFixed(1) + ' ETH';
    document.getElementById('honeypotBalance').textContent = simulationData.honeypot.balance.toFixed(1) + ' ETH';
    
    // Mettre à jour les statistiques
    document.getElementById('attackCount').textContent = simulationData.vulnerable.attempts;
    document.getElementById('defenseCount').textContent = simulationData.secure.blocked;
    document.getElementById('trappedCount').textContent = simulationData.honeypot.traps;
    document.getElementById('totalGas').textContent = simulationData.totalGas.toLocaleString();
    
  
    
    // Mettre à jour les graphiques
    updateCharts();
}

// Logs
function logMessage(message, type = 'info') {
    const logElement = document.getElementById('logOutput');
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    
    const typeClass = `log-${type}`;
    const logEntry = `<span class="${typeClass}">[${timestamp}] ${message}</span><br>`;
    
    // Ajouter en haut
    logElement.innerHTML = logEntry + logElement.innerHTML;
    
    // Garder seulement les 15 dernières entrées
    const entries = logElement.innerHTML.split('<br>');
    if (entries.length > 15) {
        logElement.innerHTML = entries.slice(0, 15).join('<br>');
    }
}

// Animation des changements de balance
function animateBalanceChange(elementId, start, end) {
    const element = document.getElementById(elementId);
    const duration = 1000;
    const steps = 60;
    const stepValue = (end - start) / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        const currentValue = start + (stepValue * currentStep);
        element.textContent = currentValue.toFixed(1) + ' ETH';
        
        if (currentStep >= steps) {
            clearInterval(interval);
            element.textContent = end.toFixed(1) + ' ETH';
        }
    }, duration / steps);
}

// Initialisation des graphiques
function initializeCharts() {
    // Graphique des soldes
    const balanceCtx = document.getElementById('balanceChart').getContext('2d');
    balanceChart = new Chart(balanceCtx, {
        type: 'line',
        data: {
            labels: ['Début', 'Attaque', 'Après'],
            datasets: [
                {
                    label: 'Vault Vulnérable',
                    data: [10, 5, 0],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3,
                    borderWidth: 3
                },
                {
                    label: 'Vault Sécurisé',
                    data: [10, 10, 10],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3,
                    borderWidth: 3
                },
                {
                    label: 'Honeypot',
                    data: [5, 5, 5],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.3,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#e2e8f0',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' ETH';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Balance (ETH)',
                        color: '#94a3b8'
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function(value) {
                            return value + ' ETH';
                        }
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#94a3b8'
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    }
                }
            }
        }
    });
    
    // Graphique du gas
    const gasCtx = document.getElementById('gasChart').getContext('2d');
    gasChart = new Chart(gasCtx, {
        type: 'bar',
        data: {
            labels: ['Dépôt', 'Retrait normal', 'Attaque', 'Honeypot'],
            datasets: [{
                label: 'Gas utilisé',
                data: [45226, 30321, 164913, 180000],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(245, 158, 11, 0.7)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(239, 68, 68)',
                    'rgb(245, 158, 11)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#e2e8f0'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const gas = context.raw;
                            const costETH = (gas * gasPrice * 0.000000001).toFixed(6);
                            const costUSD = (costETH * ethPrice).toFixed(2);
                            return `${gas.toLocaleString()} gas ($${costUSD})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#94a3b8',
                        callback: function(value) {
                            return value.toLocaleString() + ' gas';
                        }
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Gas utilisé',
                        color: '#94a3b8'
                    }
                },
                x: {
                    ticks: {
                        color: '#94a3b8'
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    }
                }
            }
        }
    });
}

// Mise à jour des graphiques
function updateCharts() {
    // 1. Mettre à jour le graphique des soldes
    if (balanceChart && balanceChart.data && balanceChart.data.datasets) {
        // Vault Vulnérable (rouge)
        balanceChart.data.datasets[0].data = [
            10,
            simulationData.vulnerable.balance > 0 ? 5 : 0,
            simulationData.vulnerable.balance
        ];
        
        // Vault Sécurisé (vert) - Toujours 10
        balanceChart.data.datasets[1].data = [10, 10, 10];
        
        // Honeypot (orange) - Change après confiscation
        balanceChart.data.datasets[2].data = [
            5,  // Début
            5,  // Pendant
            simulationData.honeypot.balance  // Après (6 si confiscation)
        ];
        
        // Changer la couleur du honeypot si gains
        if (simulationData.honeypot.balance > 5) {
            balanceChart.data.datasets[2].borderColor = '#c54b22ff'; // Vert
            balanceChart.data.datasets[2].backgroundColor = 'rgba(34, 197, 94, 0.1)';
        } else {
            balanceChart.data.datasets[2].borderColor = '#f59e0b'; // Orange
            balanceChart.data.datasets[2].backgroundColor = 'rgba(245, 158, 11, 0.1)';
        }
        
        balanceChart.update();
    }
    
    // 2. Mettre à jour le graphique de gas (optionnel)
    if (gasChart && gasChart.data && gasChart.data.datasets) {
       
        const attackGas = 164913 * simulationData.vulnerable.attempts;
        const honeypotGas = 180000 * simulationData.honeypot.traps;
        
        gasChart.data.datasets[0].data[2] = Math.min(attackGas, 500000); // Limite pour le graphique
        gasChart.data.datasets[0].data[3] = Math.min(honeypotGas, 500000);
        
        gasChart.update();
    }
}

