import './styles.css';
import { initializeApp } from './app-simple.js';

// Create the HTML structure
document.getElementById('app').innerHTML = `
    <div class="game-container">
        <header class="game-header">
            <div class="logo-section">
                <h1 class="game-title">PINGAS</h1>
                <span class="subtitle">Health Optimization System</span>
            </div>
            <div class="header-stats">
                <div class="streak-indicator">
                    <span class="streak-fire">🔥</span>
                    <span class="streak-number">0</span>
                    <span class="streak-label">day streak</span>
                </div>
                <div class="level-badge">
                    <span class="level-label">Level</span>
                    <span class="level-number">1</span>
                </div>
                <div class="total-score">
                    <span class="score-number">0</span>
                    <span class="score-label">/ 1700</span>
                </div>
            </div>
        </header>

        <nav class="game-nav">
            <button class="nav-btn active" data-view="stats">
                <span class="nav-icon">📊</span>
                <span class="nav-text">Stats</span>
            </button>
            <button class="nav-btn" data-view="personal">
                <span class="nav-icon">👤</span>
                <span class="nav-text">Personal</span>
            </button>
            <button class="nav-btn" data-view="regime">
                <span class="nav-icon">📋</span>
                <span class="nav-text">Regime</span>
            </button>
            <button class="nav-btn" data-view="quests">
                <span class="nav-icon">🎯</span>
                <span class="nav-text">Quests</span>
            </button>
            <button class="nav-btn" data-view="achievements">
                <span class="nav-icon">🏆</span>
                <span class="nav-text">Achievements</span>
            </button>
        </nav>

        <main class="game-main">
            <!-- Stats View -->
            <div id="stats-view" class="view-container active">
                <div class="stats-grid">
                    <!-- Primary Stats -->
                    <div class="stat-category">
                        <h2 class="category-title">Core Stats</h2>
                        <div class="stats-row">
                            <div class="stat-card" data-stat="energy">
                                <div class="stat-icon">⚡</div>
                                <div class="stat-info">
                                    <div class="stat-name">Energy</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="focus">
                                <div class="stat-icon">🎯</div>
                                <div class="stat-info">
                                    <div class="stat-name">Focus</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="longevity">
                                <div class="stat-icon">♾️</div>
                                <div class="stat-info">
                                    <div class="stat-name">Longevity</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="mood">
                                <div class="stat-icon">☀️</div>
                                <div class="stat-info">
                                    <div class="stat-name">Mood</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Performance Stats -->
                    <div class="stat-category">
                        <h2 class="category-title">Performance</h2>
                        <div class="stats-row">
                            <div class="stat-card" data-stat="strength">
                                <div class="stat-icon">💪</div>
                                <div class="stat-info">
                                    <div class="stat-name">Strength</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="immunity">
                                <div class="stat-icon">🛡️</div>
                                <div class="stat-info">
                                    <div class="stat-name">Immunity</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="heart-health">
                                <div class="stat-icon">❤️</div>
                                <div class="stat-info">
                                    <div class="stat-name">Heart Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Body Systems -->
                    <div class="stat-category">
                        <h2 class="category-title">Body Systems</h2>
                        <div class="stats-row">
                            <div class="stat-card" data-stat="bone-health">
                                <div class="stat-icon">🦴</div>
                                <div class="stat-info">
                                    <div class="stat-name">Bone Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="gut-health">
                                <div class="stat-icon">🌿</div>
                                <div class="stat-info">
                                    <div class="stat-name">Gut Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="liver-health">
                                <div class="stat-icon">🫀</div>
                                <div class="stat-info">
                                    <div class="stat-name">Liver Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="joint-health">
                                <div class="stat-icon">🦵</div>
                                <div class="stat-info">
                                    <div class="stat-name">Joint Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Beauty & Wellness -->
                    <div class="stat-category">
                        <h2 class="category-title">Beauty & Wellness</h2>
                        <div class="stats-row">
                            <div class="stat-card" data-stat="skin-health">
                                <div class="stat-icon">✨</div>
                                <div class="stat-info">
                                    <div class="stat-name">Skin Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="hair-health">
                                <div class="stat-icon">💇</div>
                                <div class="stat-info">
                                    <div class="stat-name">Hair Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="vision">
                                <div class="stat-icon">👁️</div>
                                <div class="stat-info">
                                    <div class="stat-name">Vision</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="oral-health">
                                <div class="stat-icon">🦷</div>
                                <div class="stat-info">
                                    <div class="stat-name">Oral Health</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Balance -->
                    <div class="stat-category">
                        <h2 class="category-title">Balance</h2>
                        <div class="stats-row">
                            <div class="stat-card" data-stat="hormonal-balance">
                                <div class="stat-icon">⚖️</div>
                                <div class="stat-info">
                                    <div class="stat-name">Hormonal Balance</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                            <div class="stat-card" data-stat="anti-inflammatory">
                                <div class="stat-icon">🔥</div>
                                <div class="stat-info">
                                    <div class="stat-name">Anti-Inflammatory</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 0%"></div>
                                    </div>
                                    <div class="stat-value">0/100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Quests View -->
            <div id="quests-view" class="view-container">
                <div class="quests-container">
                    <h2 class="view-title">Daily Quests</h2>
                    <div id="daily-quests" class="quests-list">
                        <div class="quest-card">
                            <div class="quest-icon">🌅</div>
                            <div class="quest-info">
                                <h3>Morning Foundation</h3>
                                <p>Take your morning supplements before 9 AM</p>
                                <div class="quest-progress">
                                    <div class="quest-bar">
                                        <div class="quest-fill" style="width: 0%"></div>
                                    </div>
                                    <span class="quest-xp">+50 XP</span>
                                </div>
                            </div>
                        </div>
                        <div class="quest-card">
                            <div class="quest-icon">🎯</div>
                            <div class="quest-info">
                                <h3>Perfect Timing</h3>
                                <p>Take all supplements within optimal windows</p>
                                <div class="quest-progress">
                                    <div class="quest-bar">
                                        <div class="quest-fill" style="width: 0%"></div>
                                    </div>
                                    <span class="quest-xp">+100 XP</span>
                                </div>
                            </div>
                        </div>
                        <div class="quest-card">
                            <div class="quest-icon">🔥</div>
                            <div class="quest-info">
                                <h3>Keep the Streak</h3>
                                <p>Don't break your daily streak</p>
                                <div class="quest-progress">
                                    <div class="quest-bar">
                                        <div class="quest-fill" style="width: 0%"></div>
                                    </div>
                                    <span class="quest-xp">+75 XP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Personal View -->
            <div id="personal-view" class="view-container">
                <div class="personal-container">
                    <h2 class="view-title">Personal Health Profile</h2>
                    
                    <!-- Basic Info Section -->
                    <div class="personal-section">
                        <h3>Basic Information</h3>
                        <div class="personal-grid">
                            <div class="personal-card">
                                <label>Full Name</label>
                                <input type="text" id="user-name" placeholder="Enter your name">
                            </div>
                            <div class="personal-card">
                                <label>Age</label>
                                <input type="number" id="user-age" placeholder="30" min="18" max="120">
                            </div>
                            <div class="personal-card">
                                <label>Gender</label>
                                <select id="user-gender">
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="personal-card">
                                <label>Weight (kg)</label>
                                <input type="number" id="user-weight" placeholder="70" min="30" max="200" step="0.1">
                            </div>
                            <div class="personal-card">
                                <label>Height (cm)</label>
                                <input type="number" id="user-height" placeholder="175" min="100" max="250">
                            </div>
                            <div class="personal-card">
                                <label>Activity Level</label>
                                <select id="user-activity">
                                    <option value="sedentary">Sedentary</option>
                                    <option value="light">Light</option>
                                    <option value="moderate" selected>Moderate</option>
                                    <option value="high">High</option>
                                    <option value="extreme">Extreme</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Health Goals Section -->
                    <div class="personal-section">
                        <h3>Health Goals</h3>
                        <div class="goals-grid">
                            <label class="goal-checkbox">
                                <input type="checkbox" value="longevity">
                                <span class="checkmark">♾️</span>
                                <span class="goal-text">Longevity & Anti-Aging</span>
                            </label>
                            <label class="goal-checkbox">
                                <input type="checkbox" value="performance">
                                <span class="checkmark">💪</span>
                                <span class="goal-text">Athletic Performance</span>
                            </label>
                            <label class="goal-checkbox">
                                <input type="checkbox" value="cognitive">
                                <span class="checkmark">🧠</span>
                                <span class="goal-text">Cognitive Enhancement</span>
                            </label>
                            <label class="goal-checkbox">
                                <input type="checkbox" value="recovery">
                                <span class="checkmark">🔄</span>
                                <span class="goal-text">Recovery & Sleep</span>
                            </label>
                            <label class="goal-checkbox">
                                <input type="checkbox" value="aesthetic">
                                <span class="checkmark">✨</span>
                                <span class="goal-text">Aesthetic & Beauty</span>
                            </label>
                            <label class="goal-checkbox">
                                <input type="checkbox" value="immunity">
                                <span class="checkmark">🛡️</span>
                                <span class="goal-text">Immune System</span>
                            </label>
                        </div>
                    </div>

                    <!-- Biomarkers Section -->
                    <div class="personal-section">
                        <h3>Key Biomarkers (Optional)</h3>
                        <div class="biomarkers-grid">
                            <div class="biomarker-card">
                                <label>Vitamin D (ng/mL)</label>
                                <input type="number" id="biomarker-vitd" placeholder="40" step="0.1">
                                <span class="biomarker-range">Optimal: 40-60</span>
                            </div>
                            <div class="biomarker-card">
                                <label>hsCRP (mg/L)</label>
                                <input type="number" id="biomarker-hscrp" placeholder="1.0" step="0.1">
                                <span class="biomarker-range">Optimal: <1.0</span>
                            </div>
                            <div class="biomarker-card">
                                <label>HbA1c (%)</label>
                                <input type="number" id="biomarker-hba1c" placeholder="5.0" step="0.1">
                                <span class="biomarker-range">Optimal: <5.0</span>
                            </div>
                            <div class="biomarker-card">
                                <label>Total Cholesterol (mg/dL)</label>
                                <input type="number" id="biomarker-cholesterol" placeholder="180">
                                <span class="biomarker-range">Optimal: <200</span>
                            </div>
                            <div class="biomarker-card">
                                <label>Resting HR (bpm)</label>
                                <input type="number" id="biomarker-rhr" placeholder="60">
                                <span class="biomarker-range">Optimal: 50-70</span>
                            </div>
                            <div class="biomarker-card">
                                <label>Sleep Quality (1-10)</label>
                                <input type="number" id="biomarker-sleep" placeholder="8" min="1" max="10">
                                <span class="biomarker-range">Optimal: 8-10</span>
                            </div>
                        </div>
                    </div>

                    <!-- Medical History Section -->
                    <div class="personal-section">
                        <h3>Health Conditions (Optional)</h3>
                        <div class="conditions-grid">
                            <label class="condition-checkbox">
                                <input type="checkbox" value="diabetes">
                                <span class="condition-text">Diabetes/Pre-diabetes</span>
                            </label>
                            <label class="condition-checkbox">
                                <input type="checkbox" value="hypertension">
                                <span class="condition-text">High Blood Pressure</span>
                            </label>
                            <label class="condition-checkbox">
                                <input type="checkbox" value="cholesterol">
                                <span class="condition-text">High Cholesterol</span>
                            </label>
                            <label class="condition-checkbox">
                                <input type="checkbox" value="anxiety">
                                <span class="condition-text">Anxiety/Stress</span>
                            </label>
                            <label class="condition-checkbox">
                                <input type="checkbox" value="depression">
                                <span class="condition-text">Depression/Mood</span>
                            </label>
                            <label class="condition-checkbox">
                                <input type="checkbox" value="insomnia">
                                <span class="condition-text">Sleep Issues</span>
                            </label>
                            <label class="condition-checkbox">
                                <input type="checkbox" value="inflammation">
                                <span class="condition-text">Chronic Inflammation</span>
                            </label>
                            <label class="condition-checkbox">
                                <input type="checkbox" value="digestive">
                                <span class="condition-text">Digestive Issues</span>
                            </label>
                        </div>
                    </div>

                    <!-- Notes Section -->
                    <div class="personal-section">
                        <h3>Additional Notes</h3>
                        <textarea id="personal-notes" placeholder="Any additional health information, allergies, medications, or specific concerns..." rows="4"></textarea>
                    </div>

                    <div class="personal-actions">
                        <button id="save-personal" class="save-personal-btn">Save Personal Profile</button>
                        <button id="clear-personal" class="clear-personal-btn">Clear All Data</button>
                    </div>
                </div>
            </div>

            <!-- Regime View -->
            <div id="regime-view" class="view-container">
                <div class="regime-container">
                    <h2 class="view-title">My Supplement Regime</h2>

                    <!-- Add Supplement to Regime -->
                    <div class="add-regime-section">
                        <h3>Add to Regime</h3>
                        <form id="regime-form" class="regime-form">
                            <div class="form-group">
                                <label>Supplement</label>
                                <select id="regime-supplement" required>
                                    <option value="">Select supplement...</option>
                                    
                                    <optgroup label="Anti-Aging & Longevity">
                                        <option value="nmn">NMN (Nicotinamide Mononucleotide)</option>
                                        <option value="fisetin">Fisetin</option>
                                        <option value="ca-akg">Calcium Alpha-Ketoglutarate</option>
                                    </optgroup>
                                    
                                    <optgroup label="Brain & Focus">
                                        <option value="lions-mane">Lion's Mane Mushroom</option>
                                    </optgroup>
                                    
                                    <optgroup label="Stress & Adaptation">
                                        <option value="ashwagandha">Ashwagandha</option>
                                        <option value="rhodiola">Rhodiola Rosea</option>
                                    </optgroup>
                                    
                                    <optgroup label="Performance & Recovery">
                                        <option value="creatine">Creatine Monohydrate</option>
                                        <option value="taurine">Taurine</option>
                                    </optgroup>
                                    
                                    <optgroup label="Essential Nutrients">
                                        <option value="vitamin-d3">Vitamin D3</option>
                                        <option value="magnesium">Magnesium Glycinate</option>
                                        <option value="omega-3">Omega-3 (EPA/DHA)</option>
                                    </optgroup>
                                    
                                    <optgroup label="Antioxidants">
                                        <option value="curcumin">Curcumin (Turmeric)</option>
                                        <option value="quercetin">Quercetin</option>
                                        <option value="nac">N-Acetyl Cysteine (NAC)</option>
                                    </optgroup>
                                    
                                    <optgroup label="Beauty & Aesthetics">
                                        <option value="collagen">Collagen Peptides</option>
                                        <option value="hyaluronic-acid">Hyaluronic Acid</option>
                                    </optgroup>
                                    
                                    <optgroup label="Heart & Circulation">
                                        <option value="coq10">Coenzyme Q10</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Daily Dosage</label>
                                <input type="number" id="regime-dosage" placeholder="500" required>
                                <select id="regime-unit">
                                    <option value="mg">mg</option>
                                    <option value="g">g</option>
                                    <option value="iu">IU</option>
                                    <option value="mcg">mcg</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Timing</label>
                                <select id="regime-timing" required>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">Evening</option>
                                    <option value="night">Night</option>
                                    <option value="with-meals">With Meals</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Frequency</label>
                                <select id="regime-frequency">
                                    <option value="daily">Daily</option>
                                    <option value="3-days-month">3 days/month (cycled)</option>
                                    <option value="5-days-week">5 days/week</option>
                                    <option value="loading">Loading phase</option>
                                </select>
                            </div>
                            <button type="submit" class="add-regime-btn">Add to Regime</button>
                        </form>
                    </div>

                    <!-- Current Regime -->
                    <div class="current-regime-section">
                        <h3>Current Regime</h3>
                        <div id="regime-list" class="regime-list">
                            <!-- Regime items will be populated here -->
                        </div>
                        <div class="regime-stats">
                            <h4>Expected Daily Boosts</h4>
                            <div id="expected-boosts" class="expected-boosts-grid">
                                <!-- Expected stat boosts will be shown here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Achievements View -->
            <div id="achievements-view" class="view-container">
                <div class="achievements-container">
                    <h2 class="view-title">Achievements</h2>
                    <div id="achievements-list" class="achievements-grid">
                        <!-- Achievements will be populated here -->
                    </div>
                </div>
            </div>
        </main>
    </div>
`;

// Initialize the app after DOM is loaded
console.log('DOM loaded, initializing...');
setTimeout(() => {
    initializeApp();
}, 500);