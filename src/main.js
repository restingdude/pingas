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
                <div class="days-alive-indicator">
                    <span class="days-alive-icon">🌱</span>
                    <span class="days-alive-number">-</span>
                    <span class="days-alive-label">alive</span>
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
            <button class="nav-btn" data-view="stats">
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
            <button class="nav-btn" data-view="achievements">
                <span class="nav-icon">🏆</span>
                <span class="nav-text">Achievements</span>
            </button>
        </nav>

        <main class="game-main">
            <!-- Stats View -->
            <div id="stats-view" class="view-container">
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
                                <label>Date of Birth</label>
                                <input type="date" id="user-dob" placeholder="Select your birth date">
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
                    <div class="regime-header">
                        <h2 class="view-title">My Daily Protocol</h2>
                        <button id="add-supplement-btn" class="add-supplement-btn">
                            <span class="btn-icon">+</span>
                            <span class="btn-text">Add Supplement</span>
                        </button>
                    </div>

                    <!-- Daily Timeline -->
                    <div class="daily-timeline">
                        <!-- Morning Stack -->
                        <div class="time-block" data-timing="morning">
                            <div class="time-header">
                                <div class="time-icon">🌅</div>
                                <div class="time-info">
                                    <h3>Morning Stack</h3>
                                    <span class="time-label">Upon waking • 6:00-8:00 AM</span>
                                </div>
                                <div class="stack-count">
                                    <span id="morning-count">0</span> supplements
                                </div>
                            </div>
                            <div class="supplements-grid" id="morning-supplements">
                                <!-- Morning supplements will be populated here -->
                            </div>
                        </div>

                        <!-- Evening Stack -->
                        <div class="time-block" data-timing="night">
                            <div class="time-header">
                                <div class="time-icon">🌙</div>
                                <div class="time-info">
                                    <h3>Evening Stack</h3>
                                    <span class="time-label">Before bed • 8:00-10:00 PM</span>
                                </div>
                                <div class="stack-count">
                                    <span id="night-count">0</span> supplements
                                </div>
                            </div>
                            <div class="supplements-grid" id="night-supplements">
                                <!-- Evening supplements will be populated here -->
                            </div>
                        </div>
                    </div>

                    <!-- Protocol Stats -->
                    <div class="protocol-stats">
                        <h3>Daily Impact</h3>
                        <div id="expected-boosts" class="boosts-grid">
                            <!-- Expected stat boosts will be shown here -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add Supplement Modal -->
            <div id="add-supplement-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add Supplement</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <div id="regime-wizard" class="regime-wizard">
                            <!-- Step 1: Search -->
                            <div class="wizard-step active" data-step="1">
                                <div class="step-header">
                                    <span class="step-number">1</span>
                                    <h4>Search Supplements & Nutrients</h4>
                                </div>
                                <div class="step-content">
                                    <div class="supplement-search-container">
                                        <input type="text" id="regime-supplement-search" placeholder="Type to search... (e.g., Vitamin D, NMN, Magnesium)" autocomplete="off">
                                        <div id="supplement-suggestions" class="supplement-suggestions"></div>
                                        <input type="hidden" id="regime-supplement" name="supplement">
                                    </div>
                                </div>
                            </div>

                            <!-- Step 2: Dosage -->
                            <div class="wizard-step" data-step="2">
                                <div class="step-header">
                                    <span class="step-number">2</span>
                                    <h4>Set Dosage</h4>
                                </div>
                                <div class="step-content">
                                    <div class="dosage-input-group">
                                        <input type="number" id="regime-dosage" placeholder="1000" step="any">
                                        <select id="regime-unit">
                                            <option value="mg">mg</option>
                                            <option value="g">g</option>
                                            <option value="IU">IU</option>
                                            <option value="mcg">mcg</option>
                                        </select>
                                    </div>
                                    <small class="form-hint">Enter the exact amount per serving/capsule</small>
                                </div>
                            </div>

                            <!-- Step 3: Timing -->
                            <div class="wizard-step" data-step="3">
                                <div class="step-header">
                                    <span class="step-number">3</span>
                                    <h4>When do you take it?</h4>
                                </div>
                                <div class="step-content">
                                    <div class="timing-options">
                                        <button type="button" class="timing-btn" data-timing="morning">
                                            <span class="timing-icon">🌅</span>
                                            <span class="timing-label">Morning</span>
                                        </button>
                                        <button type="button" class="timing-btn" data-timing="night">
                                            <span class="timing-icon">🌙</span>
                                            <span class="timing-label">Night</span>
                                        </button>
                                    </div>
                                    <input type="hidden" id="regime-timing">
                                </div>
                            </div>

                            <!-- Step 4: Final Details -->
                            <div class="wizard-step" data-step="4">
                                <div class="step-header">
                                    <span class="step-number">4</span>
                                    <h4>Final Details</h4>
                                </div>
                                <div class="step-content">
                                    <div class="final-details">
                                        <div class="detail-group">
                                            <label>Servings per day</label>
                                            <input type="number" id="regime-servings" placeholder="1" value="1" min="1" max="10">
                                        </div>
                                        <div class="detail-group">
                                            <label>Frequency</label>
                                            <select id="regime-frequency">
                                                <option value="daily">Daily</option>
                                                <option value="5-days-week">5 days/week</option>
                                                <option value="3-days-month">3 days/month (cycled)</option>
                                                <option value="loading">Loading phase</option>
                                            </select>
                                        </div>
                                        <div class="detail-group">
                                            <label>Notes (Optional)</label>
                                            <input type="text" id="regime-notes" placeholder="e.g., Take with fat for absorption">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Navigation -->
                            <div class="wizard-nav">
                                <button type="button" id="prev-step" class="nav-btn prev-btn" style="display: none;">
                                    <span>← Previous</span>
                                </button>
                                <button type="button" id="next-step" class="nav-btn next-btn">
                                    <span>Next →</span>
                                </button>
                                <button type="button" id="add-regime" class="nav-btn add-btn" style="display: none;">
                                    <span>Add to Regime</span>
                                </button>
                            </div>

                            <!-- Hidden fields for optional data -->
                            <input type="hidden" id="regime-brand-key" name="brandKey">
                            <input type="hidden" id="regime-product-name" name="productName">
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

        <!-- Stat Details Modal -->
        <div id="stat-details-modal" class="stat-modal">
            <div class="stat-modal-content">
                <div class="stat-modal-header">
                    <h3 id="stat-modal-title">Stat Details</h3>
                    <button class="stat-modal-close">&times;</button>
                </div>
                <div class="stat-modal-body">
                    <div class="stat-current-value">
                        <span class="current-label">Current Value:</span>
                        <span id="stat-current-display">--</span>
                    </div>
                    <div class="affecting-supplements">
                        <h4>Supplements Affecting This Stat:</h4>
                        <div id="affecting-supplements-list" class="supplements-list">
                            <!-- Supplements will be populated here -->
                        </div>
                    </div>
                    <div class="stat-explanation">
                        <h4>About This Stat:</h4>
                        <p id="stat-description">Stat description will appear here.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dosage Edit Modal -->
        <div id="dosage-edit-modal" class="modal">
            <div class="modal-content small">
                <div class="modal-header">
                    <h3>Edit Dosage</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="supplement-info">
                        <div class="supplement-name" id="edit-supplement-name">Supplement Name</div>
                        <div class="current-dosage" id="current-dosage-display">Current: --</div>
                    </div>
                    <div class="form-group">
                        <label for="edit-dosage">Dosage</label>
                        <div class="dosage-input-group">
                            <input type="number" id="edit-dosage" step="0.1" min="0">
                            <select id="edit-unit">
                                <option value="mg">mg</option>
                                <option value="g">g</option>
                                <option value="mcg">mcg</option>
                                <option value="IU">IU</option>
                                <option value="ml">ml</option>
                                <option value="capsules">capsules</option>
                                <option value="tablets">tablets</option>
                                <option value="drops">drops</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit-servings">Servings per day</label>
                        <input type="number" id="edit-servings" min="1" value="1">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancel-dosage-edit">Cancel</button>
                    <button type="button" class="btn btn-primary" id="save-dosage-edit">Save</button>
                </div>
            </div>
        </div>

        <!-- Sweet AI FAB Button -->
        <button id="sweet-fab" class="sweet-fab">
            <span class="fab-icon">🤖</span>
        </button>

        <!-- Sweet AI Chat Window -->
        <div id="sweet-chat-window" class="sweet-chat-window">
            <div class="sweet-window-header">
                <div class="sweet-window-title">
                    <span class="sweet-avatar">🤖</span>
                    <span class="sweet-title-text">Sweet AI</span>
                </div>
                <div class="sweet-status">
                    <span class="status-dot development"></span>
                    <span class="status-text">Development Mode</span>
                </div>
                <div class="sweet-window-controls">
                    <button class="sweet-clear" id="sweet-clear" title="Clear chat">🗑️</button>
                    <button class="sweet-close" id="sweet-close" title="Close">&times;</button>
                </div>
            </div>
            <div class="sweet-chat-container">
                <div class="sweet-messages" id="sweet-messages">
                    <!-- Messages will be populated by JavaScript -->
                </div>
                <div class="sweet-input-container">
                    <input type="text" id="sweet-input" class="sweet-input" placeholder="Ask about supplements or your regime...">
                    <button id="sweet-send" class="sweet-send-btn">
                        <span class="send-icon">➤</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

// Initialize the app after DOM is loaded
console.log('DOM loaded, initializing...');
setTimeout(() => {
    initializeApp();
}, 500);