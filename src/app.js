// Pingas Health Optimization System - Game Logic
// import { supplementDatabase, getDosageLevel, calculatePersonalizedEffects } from './dosage-model.js';

// Temporary inline supplement database until import issue is resolved
const supplementDatabase = {
    'nmn': {
        name: 'NMN',
        dosages: { low: { amount: 250, unit: 'mg' }, medium: { amount: 500, unit: 'mg' }, high: { amount: 750, unit: 'mg' } },
        effects: { energy: { low: 10, medium: 20, high: 25 }, longevity: { low: 8, medium: 15, high: 19 }, focus: { low: 5, medium: 10, high: 13 } }
    },
    'creatine': {
        name: 'Creatine',
        dosages: { low: { amount: 2, unit: 'g' }, medium: { amount: 5, unit: 'g' }, high: { amount: 7.5, unit: 'g' } },
        effects: { strength: { low: 8, medium: 15, high: 19 }, energy: { low: 5, medium: 10, high: 13 } }
    }
};

function getDosageLevel(supplement, userDosage, userUnit) {
    return 'medium'; // Simplified for now
}

function calculatePersonalizedEffects(supplement, dosageLevel, userProfile, streak) {
    const suppData = supplementDatabase[supplement];
    if (!suppData) return {};
    return suppData.effects ? Object.fromEntries(
        Object.entries(suppData.effects).map(([stat, levels]) => [stat, levels[dosageLevel] || 0])
    ) : {};
}

// Game State
let gameState = {
    stats: {
        energy: 50,
        focus: 50,
        longevity: 50,
        mood: 50,
        strength: 50,
        immunity: 50,
        'heart-health': 50,
        'bone-health': 50,
        'skin-health': 50,
        'hair-health': 50,
        'joint-health': 50,
        'gut-health': 50,
        'liver-health': 50,
        'hormonal-balance': 50,
        vision: 50,
        'oral-health': 50,
        'anti-inflammatory': 50
    },
    level: 1,
    xp: 0,
    streak: 0,
    lastActivity: null,
    achievements: [],
    dailyQuests: {
        morning: false,
        perfect: false,
        streak: false
    },
    userProfile: {
        age: null,
        weight: null,
        activity: 'moderate',
        goals: []
    },
    regime: []
};

// Fallback supplement effects for non-regime supplements
const supplementEffects = {
    'vitamin d': { immunity: 3, mood: 2, 'bone-health': 4, energy: 1 },
    'vitamin c': { immunity: 4, 'skin-health': 3, 'anti-inflammatory': 2 },
    'vitamin b12': { energy: 4, focus: 2, mood: 2 },
    'multivitamin': { energy: 1, focus: 1, immunity: 1 },
    'fish oil': { 'heart-health': 4, focus: 3, mood: 2 },
    'magnesium': { energy: 2, mood: 3, 'heart-health': 2 }
};

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        gameState = JSON.parse(saved);
    }
    updateUI();
}

// Save game state
function saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Initialize the application
export function initializeApp() {
    loadGameState();
    setupEventListeners();
    loadTodayEntries();
    checkDailyReset();
    updateStreak();
    loadAchievements();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation with direct event delegation
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-btn')) {
            const btn = e.target.closest('.nav-btn');
            const view = btn.dataset.view;
            console.log('Nav button clicked:', view);
            
            if (view) {
                switchView(view);
                
                // Update active state
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        }
    });
    
    // Supplement form
    const supplementForm = document.getElementById('supplement-form');
    if (supplementForm) {
        supplementForm.addEventListener('submit', handleSupplementEntry);
    }
    
    // Regime form
    const regimeForm = document.getElementById('regime-form');
    if (regimeForm) {
        regimeForm.addEventListener('submit', handleRegimeEntry);
    }
    
    // Profile save button
    const saveProfileBtn = document.getElementById('save-profile');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', saveUserProfile);
    }
    
    // Expose functions to window
    window.deleteEntry = deleteEntry;
    window.deleteRegimeItem = deleteRegimeItem;
}

function switchView(viewName) {
    console.log('Switching to view:', viewName);
    
    // Hide all views
    const views = document.querySelectorAll('.view-container');
    console.log('Found views:', views.length);
    views.forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    
    // Show target view
    const targetView = document.getElementById(`${viewName}-view`);
    console.log('Target view found:', !!targetView);
    if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block';
        console.log('Activated view:', viewName);
    } else {
        console.error('View not found:', `${viewName}-view`);
        // List all available view IDs for debugging
        const allViews = document.querySelectorAll('[id$=\"-view\"]');
        console.log('Available views:', Array.from(allViews).map(v => v.id));
    }
}

function handleSupplementEntry(e) {
    e.preventDefault();
    
    const name = document.getElementById('supplement-name').value.toLowerCase();
    const dosage = document.getElementById('supplement-dosage').value;
    const time = document.getElementById('supplement-time').value;
    
    // Create entry
    const entry = {
        id: Date.now(),
        name: name,
        dosage: dosage,
        time: time,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    // Save to localStorage
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    
    // Apply stat boosts
    applySupplementEffects(name, time, dosage, 'mg');
    
    // Update quests
    updateQuests(time);
    
    // Reset form
    e.target.reset();
    
    // Update UI
    loadTodayEntries();
    showNotification(`+XP! ${name} tracked!`, 'success');
}

// Handle regime entry
function handleRegimeEntry(e) {
    e.preventDefault();
    
    const supplement = document.getElementById('regime-supplement').value;
    const dosage = parseFloat(document.getElementById('regime-dosage').value);
    const unit = document.getElementById('regime-unit').value;
    const timing = document.getElementById('regime-timing').value;
    const frequency = document.getElementById('regime-frequency').value;
    
    // Check if supplement already in regime
    const existingIndex = gameState.regime.findIndex(item => item.supplement === supplement);
    
    const regimeItem = {
        id: existingIndex >= 0 ? gameState.regime[existingIndex].id : Date.now(),
        supplement,
        dosage,
        unit,
        timing,
        frequency,
        addedDate: existingIndex >= 0 ? gameState.regime[existingIndex].addedDate : new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
        gameState.regime[existingIndex] = regimeItem;
        showNotification('Regime updated!', 'info');
    } else {
        gameState.regime.push(regimeItem);
        showNotification('Added to regime!', 'success');
    }
    
    // Reset form
    e.target.reset();
    
    // Update UI
    loadRegimeList();
    updateExpectedBoosts();
    saveGameState();
}

// Save user profile
function saveUserProfile() {
    const age = parseInt(document.getElementById('user-age').value);
    const weight = parseFloat(document.getElementById('user-weight').value);
    const activity = document.getElementById('user-activity').value;
    const goalsSelect = document.getElementById('user-goals');
    const goals = Array.from(goalsSelect.selectedOptions).map(option => option.value);
    
    gameState.userProfile = {
        age: age || null,
        weight: weight || null,
        activity,
        goals
    };
    
    saveGameState();
    updateExpectedBoosts();
    showNotification('Profile saved!', 'success');
}

function applySupplementEffects(supplementName, timing, dosage = 500, unit = 'mg') {
    // Check if supplement is in regime for dosage calculation
    const regimeItem = gameState.regime.find(item => 
        item.supplement === supplementName || 
        supplementDatabase[item.supplement]?.name.toLowerCase() === supplementName
    );
    
    let effects = {};
    let dosageLevel = 'medium';
    
    if (regimeItem) {
        // Use regime dosage for precise calculations
        dosageLevel = getDosageLevel(regimeItem.supplement, regimeItem.dosage, regimeItem.unit);
        effects = calculatePersonalizedEffects(
            regimeItem.supplement, 
            dosageLevel, 
            gameState.userProfile, 
            gameState.streak
        );
    } else {
        // Fallback to old system for supplements not in regime
        const oldEffects = supplementEffects[supplementName];
        if (oldEffects) {
            effects = oldEffects;
        } else {
            return; // No effects data available
        }
    }
    
    if (!effects || Object.keys(effects).length === 0) return;
    
    // Calculate timing multiplier
    let timingMultiplier = 1.0;
    const hour = new Date().getHours();
    
    if (timing === 'morning' && hour >= 6 && hour <= 10) {
        timingMultiplier = 1.2; // Perfect timing bonus
    } else if (timing === 'afternoon' && hour >= 12 && hour <= 14) {
        timingMultiplier = 1.1;
    } else if (timing === 'evening' && hour >= 17 && hour <= 19) {
        timingMultiplier = 1.1;
    } else if (timing === 'night' && hour >= 20 && hour <= 22) {
        timingMultiplier = 1.1;
    }
    
    // Apply effects to stats
    let totalXP = 0;
    for (const [stat, value] of Object.entries(effects)) {
        const boost = Math.round(value * timingMultiplier);
        gameState.stats[stat] = Math.min(100, gameState.stats[stat] + boost);
        totalXP += boost * 10;
    }
    
    // Add XP
    addXP(totalXP);
    
    // Update UI
    updateStats();
    saveGameState();
}

function addXP(amount) {
    gameState.xp += amount;
    
    // Check for level up
    const xpNeeded = gameState.level * 1000;
    if (gameState.xp >= xpNeeded) {
        gameState.level++;
        gameState.xp = gameState.xp - xpNeeded;
        showNotification(`Level Up! You're now level ${gameState.level}!`, 'levelup');
        unlockAchievement('levelup');
    }
    
    updateHeaderStats();
}

function updateStats() {
    // Update all stat cards
    for (const [statName, value] of Object.entries(gameState.stats)) {
        const card = document.querySelector(`[data-stat="${statName}"]`);
        if (card) {
            const fill = card.querySelector('.stat-fill');
            const valueText = card.querySelector('.stat-value');
            
            if (fill) {
                fill.style.width = `${value}%`;
                
                // Color based on tier
                if (value >= 80) {
                    fill.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)'; // Diamond
                } else if (value >= 60) {
                    fill.style.background = 'linear-gradient(90deg, #E5E4E2, #BCC6CC)'; // Platinum
                } else if (value >= 40) {
                    fill.style.background = 'linear-gradient(90deg, #FFD700, #FFED4E)'; // Gold
                } else if (value >= 20) {
                    fill.style.background = 'linear-gradient(90deg, #C0C0C0, #E5E4E2)'; // Silver
                } else {
                    fill.style.background = 'linear-gradient(90deg, #CD7F32, #B87333)'; // Bronze
                }
            }
            
            if (valueText) {
                valueText.textContent = `${value}/100`;
            }
        }
    }
    
    updateTotalScore();
}

function updateTotalScore() {
    const totalScore = Object.values(gameState.stats).reduce((sum, val) => sum + val, 0);
    const scoreElement = document.querySelector('.score-number');
    if (scoreElement) {
        scoreElement.textContent = totalScore;
    }
}

function updateHeaderStats() {
    // Update level
    const levelElement = document.querySelector('.level-number');
    if (levelElement) {
        levelElement.textContent = gameState.level;
    }
    
    // Update streak
    const streakElement = document.querySelector('.streak-number');
    if (streakElement) {
        streakElement.textContent = gameState.streak;
    }
    
    updateTotalScore();
}

function loadTodayEntries() {
    const todayEntries = document.getElementById('today-entries');
    if (!todayEntries) return;
    
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const today = new Date().toDateString();
    const todaysEntries = entries.filter(entry => 
        new Date(entry.date).toDateString() === today
    );
    
    if (todaysEntries.length === 0) {
        todayEntries.innerHTML = '<div class="empty-state">No supplements tracked today yet.</div>';
        return;
    }
    
    todayEntries.innerHTML = todaysEntries.map(entry => `
        <div class="entry-item">
            <div class="entry-info">
                <span class="entry-icon">💊</span>
                <span class="entry-name">${entry.name}</span>
                <span class="entry-dosage">${entry.dosage}mg</span>
                <span class="entry-time">${entry.time}</span>
            </div>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})">×</button>
        </div>
    `).join('');
}

function deleteEntry(entryId) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries = entries.filter(entry => entry.id !== entryId);
    localStorage.setItem('entries', JSON.stringify(entries));
    
    loadTodayEntries();
    showNotification('Entry removed', 'info');
}

// Load regime list
function loadRegimeList() {
    const regimeList = document.getElementById('regime-list');
    if (!regimeList) return;
    
    if (gameState.regime.length === 0) {
        regimeList.innerHTML = '<div class="empty-state">No supplements in your regime yet.</div>';
        return;
    }
    
    regimeList.innerHTML = gameState.regime.map(item => {
        const suppData = supplementDatabase[item.supplement];
        const dosageLevel = getDosageLevel(item.supplement, item.dosage, item.unit);
        
        return `
            <div class="regime-item">
                <div class="regime-info">
                    <h4>${suppData?.name || item.supplement}</h4>
                    <div class="regime-details">
                        <span class="dosage">${item.dosage}${item.unit}</span>
                        <span class="timing">${item.timing}</span>
                        <span class="frequency">${item.frequency}</span>
                        <span class="level level-${dosageLevel}">${dosageLevel.toUpperCase()}</span>
                    </div>
                    ${suppData?.basis ? `<p class="basis">${suppData.basis}</p>` : ''}
                </div>
                <button class="delete-regime-btn" onclick="deleteRegimeItem(${item.id})">×</button>
            </div>
        `;
    }).join('');
}

// Delete regime item
function deleteRegimeItem(itemId) {
    gameState.regime = gameState.regime.filter(item => item.id !== itemId);
    saveGameState();
    loadRegimeList();
    updateExpectedBoosts();
    showNotification('Removed from regime', 'info');
}

// Update expected boosts display
function updateExpectedBoosts() {
    const expectedBoosts = document.getElementById('expected-boosts');
    if (!expectedBoosts) return;
    
    const totalBoosts = {};
    
    // Calculate total expected boosts from regime
    gameState.regime.forEach(item => {
        const dosageLevel = getDosageLevel(item.supplement, item.dosage, item.unit);
        const effects = calculatePersonalizedEffects(
            item.supplement, 
            dosageLevel, 
            gameState.userProfile, 
            gameState.streak
        );
        
        for (const [stat, boost] of Object.entries(effects)) {
            totalBoosts[stat] = (totalBoosts[stat] || 0) + boost;
        }
    });
    
    if (Object.keys(totalBoosts).length === 0) {
        expectedBoosts.innerHTML = '<div class="empty-state">Add supplements to see expected boosts.</div>';
        return;
    }
    
    // Sort by boost value
    const sortedBoosts = Object.entries(totalBoosts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8); // Show top 8
    
    expectedBoosts.innerHTML = sortedBoosts.map(([stat, boost]) => `
        <div class="boost-item">
            <span class="stat-name">${stat.replace('-', ' ')}</span>
            <span class="boost-value">+${boost}</span>
        </div>
    `).join('');
}

// Load user profile
function loadUserProfile() {
    if (gameState.userProfile.age) {
        const ageInput = document.getElementById('user-age');
        if (ageInput) ageInput.value = gameState.userProfile.age;
    }
    if (gameState.userProfile.weight) {
        const weightInput = document.getElementById('user-weight');
        if (weightInput) weightInput.value = gameState.userProfile.weight;
    }
    if (gameState.userProfile.activity) {
        const activitySelect = document.getElementById('user-activity');
        if (activitySelect) activitySelect.value = gameState.userProfile.activity;
    }
    if (gameState.userProfile.goals && gameState.userProfile.goals.length > 0) {
        const goalsSelect = document.getElementById('user-goals');
        if (goalsSelect) {
            Array.from(goalsSelect.options).forEach(option => {
                option.selected = gameState.userProfile.goals.includes(option.value);
            });
        }
    }
}

function checkDailyReset() {
    const today = new Date().toDateString();
    if (gameState.lastActivity !== today) {
        // Check if streak should continue
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (gameState.lastActivity === yesterday.toDateString()) {
            const entries = JSON.parse(localStorage.getItem('entries')) || [];
            const yesterdayEntries = entries.filter(entry => 
                new Date(entry.date).toDateString() === yesterday.toDateString()
            );
            
            if (yesterdayEntries.length > 0) {
                gameState.streak++;
            } else {
                gameState.streak = 0;
            }
        } else if (gameState.lastActivity) {
            gameState.streak = 0;
        }
        
        // Reset daily quests
        gameState.dailyQuests = {
            morning: false,
            perfect: false,
            streak: false
        };
        
        gameState.lastActivity = today;
        saveGameState();
        updateUI();
    }
}

function updateStreak() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const today = new Date().toDateString();
    const todaysEntries = entries.filter(entry => 
        new Date(entry.date).toDateString() === today
    );
    
    if (todaysEntries.length > 0 && !gameState.dailyQuests.streak) {
        gameState.dailyQuests.streak = true;
        updateQuests();
    }
}

function updateQuests(timing) {
    const hour = new Date().getHours();
    
    // Morning quest
    if (timing === 'morning' && hour <= 9) {
        gameState.dailyQuests.morning = true;
        addXP(50);
        showNotification('Morning Foundation Quest Complete! +50 XP', 'quest');
    }
    
    // Perfect timing quest
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const today = new Date().toDateString();
    const todaysEntries = entries.filter(entry => 
        new Date(entry.date).toDateString() === today
    );
    
    if (todaysEntries.length >= 3) {
        gameState.dailyQuests.perfect = true;
        addXP(100);
        showNotification('Perfect Timing Quest Complete! +100 XP', 'quest');
    }
    
    // Update quest UI
    const questCards = document.querySelectorAll('.quest-card');
    questCards.forEach((card, index) => {
        const fill = card.querySelector('.quest-fill');
        if (fill) {
            if (index === 0 && gameState.dailyQuests.morning) {
                fill.style.width = '100%';
            } else if (index === 1 && gameState.dailyQuests.perfect) {
                fill.style.width = '100%';
            } else if (index === 2 && gameState.dailyQuests.streak) {
                fill.style.width = '100%';
            }
        }
    });
}

function loadAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    if (!achievementsList) return;
    
    const achievements = [
        { id: 'first', name: 'First Steps', desc: 'Track your first supplement', icon: '🌱', unlocked: gameState.achievements.includes('first') },
        { id: 'streak7', name: 'Week Warrior', desc: '7 day streak', icon: '🔥', unlocked: gameState.streak >= 7 },
        { id: 'streak30', name: 'Monthly Master', desc: '30 day streak', icon: '💪', unlocked: gameState.streak >= 30 },
        { id: 'levelup', name: 'Level Up', desc: 'Reach level 2', icon: '⬆️', unlocked: gameState.level >= 2 },
        { id: 'maxstat', name: 'Peak Performance', desc: 'Max out any stat', icon: '💯', unlocked: Object.values(gameState.stats).some(v => v >= 100) },
        { id: 'balanced', name: 'Balanced', desc: 'All stats above 50', icon: '⚖️', unlocked: Object.values(gameState.stats).every(v => v >= 50) },
        { id: 'regime', name: 'Protocol Master', desc: 'Set up a complete regime', icon: '📋', unlocked: gameState.regime.length >= 5 }
    ];
    
    achievementsList.innerHTML = achievements.map(ach => `
        <div class="achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-info">
                <h3>${ach.name}</h3>
                <p>${ach.desc}</p>
            </div>
        </div>
    `).join('');
}

function unlockAchievement(id) {
    if (!gameState.achievements.includes(id)) {
        gameState.achievements.push(id);
        saveGameState();
        loadAchievements();
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function updateUI() {
    updateStats();
    updateHeaderStats();
    updateQuests();
    loadAchievements();
    loadRegimeList();
    updateExpectedBoosts();
    loadUserProfile();
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #00C851, #00A846);
    }
    
    .notification-info {
        background: linear-gradient(135deg, #33B5E5, #0099CC);
    }
    
    .notification-warning {
        background: linear-gradient(135deg, #FFB300, #FF8800);
    }
    
    .notification-quest {
        background: linear-gradient(135deg, #AA66CC, #9933CC);
    }
    
    .notification-levelup {
        background: linear-gradient(135deg, #FFD700, #FFA500);
    }
    
    .notification.fade-out {
        animation: slideOut 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);