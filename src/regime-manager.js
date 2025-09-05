// Regime Management System
import { SUPPLEMENT_DATABASE, calculateSupplementEffects, getSupplementByKey, getRecommendedDosage } from './supplement-database.js';
import { BRAND_DATABASE, getBrandsBySupplementType, getProductByKey } from './brand-database.js';
import { MICRONUTRIENT_DATABASE, calculateStatBoosts, searchNutrients, validateDosage, calculateXP } from './micronutrient-database.js';
import APIClient from './api-client.js';
import { updateStatsDisplay } from './app-simple.js';

const apiClient = new APIClient();

class RegimeManager {
    constructor() {
        this.regime = [];
        this.expectedBoosts = {};
    }

    // Initialize regime manager
    async init() {
        await this.loadRegime();
        this.setupEventListeners();
        this.setupDosageEditListeners();
    }

    // Load regime from database
    async loadRegime() {
        try {
            const result = await apiClient.getRegime();
            this.regime = result.regime || [];
            this.updateRegimeDisplay();
            this.calculateExpectedBoosts();
        } catch (error) {
            console.error('Error loading regime:', error);
            // Fallback to localStorage for offline mode
            const saved = localStorage.getItem('regime');
            if (saved) {
                this.regime = JSON.parse(saved);
                this.updateRegimeDisplay();
                this.calculateExpectedBoosts();
            }
        }
    }

    // Add supplement to regime
    async addSupplement(supplementData) {
        
        const { supplement, dosage, unit, timing, frequency, brandKey, productName, servings, notes } = supplementData;
        
        // Try both supplement database and micronutrient database
        let supplementInfo = getSupplementByKey(supplement);
        let nutrientInfo = null;
        
        
        // If not found in supplement database, try micronutrient database
        if (!supplementInfo) {
            nutrientInfo = MICRONUTRIENT_DATABASE[supplement];
            if (!nutrientInfo) {
                throw new Error('Invalid supplement selected');
            }
        }
        
        // Validate dosage safety if using micronutrient database
        if (nutrientInfo) {
            const validation = validateDosage(supplement, dosage, unit);
            if (!validation.valid) {
                throw new Error(validation.message);
            }
        }

        // Check if supplement already exists at the same timing
        const exists = this.regime.find(item => item.supplement === supplement && item.timing === timing);
        if (exists) {
            throw new Error(`${supplementInfo?.name || nutrientInfo?.name || supplement} is already in your ${timing} stack`);
        }

        // Get brand product info if selected
        let brandProduct = null;
        if (brandKey) {
            brandProduct = getProductByKey(brandKey);
        }

        const newItem = {
            id: Date.now().toString(),
            supplement,
            dosage: parseFloat(dosage),
            unit: unit || 'mg',
            servings: parseInt(servings) || 1,
            dailyTotal: parseFloat(dosage) * (parseInt(servings) || 1),
            frequency: frequency || 'daily',
            brandKey,
            brandProduct,
            productName: productName || brandProduct?.productName || supplementInfo?.name || nutrientInfo?.name,
            notes,
            addedAt: new Date().toISOString(),
            xpEarned: nutrientInfo ? calculateXP(supplement, dosage, unit) : 0,
            ...(supplementInfo || nutrientInfo), // Include supplement/nutrient info for offline access
            // User selections override database defaults
            timing,  // This ensures user-selected timing always wins
        };

        try {
            const result = await apiClient.addToRegime(newItem);
            this.regime = result.regime;
            
            // Update localStorage as backup
            localStorage.setItem('regime', JSON.stringify(this.regime));
        } catch (error) {
            console.error('Error adding to regime, using local storage:', error);
            this.regime.push(newItem);
            localStorage.setItem('regime', JSON.stringify(this.regime));
        }

        this.updateRegimeDisplay();
        this.calculateExpectedBoosts();
        return newItem;
    }

    // Update existing supplement in regime
    async updateSupplement(itemId, supplementData) {
        const { supplement, dosage, unit, timing, frequency, brandKey, productName, servings, notes } = supplementData;
        
        // Find the existing item
        const existingItemIndex = this.regime.findIndex(item => item.id === itemId);
        if (existingItemIndex === -1) {
            throw new Error('Supplement not found in regime');
        }
        
        // Check if supplement already exists at the same timing (excluding the current item)
        const exists = this.regime.find(item => 
            item.supplement === supplement && 
            item.timing === timing && 
            item.id !== itemId
        );
        if (exists) {
            const supplementInfo = getSupplementByKey(supplement);
            const nutrientInfo = MICRONUTRIENT_DATABASE[supplement];
            throw new Error(`${supplementInfo?.name || nutrientInfo?.name || supplement} is already in your ${timing} stack`);
        }
        
        // Create updated item
        const updatedItem = {
            ...this.regime[existingItemIndex], // Keep existing properties like id and dateAdded
            supplement,
            dosage: parseFloat(dosage),
            unit,
            timing,
            frequency: frequency || 'daily',
            servings: parseInt(servings) || 1,
            notes: notes || '',
            brandKey: brandKey || '',
            productName: productName || '',
            dateModified: new Date().toISOString()
        };
        
        try {
            // Update in database
            const result = await apiClient.updateInRegime(itemId, updatedItem);
            this.regime = result.regime;
            
            // Update localStorage as backup
            localStorage.setItem('regime', JSON.stringify(this.regime));
        } catch (error) {
            console.error('Error updating supplement in regime, using local storage:', error);
            // Update in local array
            this.regime[existingItemIndex] = updatedItem;
            localStorage.setItem('regime', JSON.stringify(this.regime));
        }

        this.updateRegimeDisplay();
        this.calculateExpectedBoosts();
        return updatedItem;
    }

    // Remove supplement from regime
    async removeSupplement(itemId) {
        try {
            const result = await apiClient.removeFromRegime(itemId);
            this.regime = result.regime;
            
            // Update localStorage as backup
            localStorage.setItem('regime', JSON.stringify(this.regime));
        } catch (error) {
            console.error('Error removing from regime, using local storage:', error);
            this.regime = this.regime.filter(item => item.id !== itemId);
            localStorage.setItem('regime', JSON.stringify(this.regime));
        }

        this.updateRegimeDisplay();
        this.calculateExpectedBoosts();
    }

    // Edit supplement dosage
    editSupplement(itemId) {
        const item = this.regime.find(supplement => supplement.id === itemId);
        if (!item) {
            console.error('Supplement not found in regime');
            return;
        }

        this.openDosageEditModal(item);
    }

    // Open dosage edit modal
    openDosageEditModal(item) {
        const modal = document.getElementById('dosage-edit-modal');
        const nameDisplay = document.getElementById('edit-supplement-name');
        const currentDosageDisplay = document.getElementById('current-dosage-display');
        const dosageInput = document.getElementById('edit-dosage');
        const unitSelect = document.getElementById('edit-unit');
        const servingsInput = document.getElementById('edit-servings');

        if (!modal || !nameDisplay || !dosageInput || !unitSelect || !servingsInput) {
            console.error('Dosage edit modal elements not found');
            return;
        }

        // Get supplement info for display
        const supplementInfo = getSupplementByKey(item.supplement);
        const nutrientInfo = MICRONUTRIENT_DATABASE[item.supplement];
        const displayName = item.productName || supplementInfo?.name || nutrientInfo?.name || item.supplement;

        // Calculate daily total for display with robust error handling
        console.log('Raw item data:', item);
        
        // Handle different possible data formats
        let dosage = parseFloat(item.dosage) || parseFloat(item.dailyTotal) || 0;
        let servings = parseInt(item.servings) || 1;
        let unit = item.unit || 'mg';
        
        // If we have dailyTotal but no individual dosage, calculate backwards
        if (!item.dosage && item.dailyTotal && servings > 1) {
            dosage = parseFloat(item.dailyTotal) / servings;
        } else if (!item.dosage && item.dailyTotal) {
            dosage = parseFloat(item.dailyTotal);
        }
        
        const dailyTotal = dosage * servings;
        const servingsText = servings > 1 ? ` × ${servings}` : '';
        const currentDosageText = dosage > 0 ? `Current: ${dailyTotal} ${unit}${servingsText}` : 'Current: Not set';

        // Populate the form
        console.log('Processed data:', { name: displayName, dosage, unit, servings, dailyTotal, currentDosageText });
        nameDisplay.textContent = displayName;
        if (currentDosageDisplay) {
            currentDosageDisplay.textContent = currentDosageText;
            console.log('Set current dosage display to:', currentDosageText);
        } else {
            console.error('Current dosage display element not found');
        }
        
        dosageInput.value = dosage || '';
        unitSelect.value = unit;
        servingsInput.value = servings;

        // Store item ID for saving
        modal.dataset.editId = item.id;

        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Focus the dosage input and select all text for easy editing
        setTimeout(() => {
            dosageInput.focus();
            dosageInput.select();
        }, 100);
    }

    // Setup dosage edit modal listeners
    setupDosageEditListeners() {
        const modal = document.getElementById('dosage-edit-modal');
        const cancelBtn = document.getElementById('cancel-dosage-edit');
        const saveBtn = document.getElementById('save-dosage-edit');
        const closeBtn = modal?.querySelector('.modal-close');

        if (!modal) return;

        // Close modal function
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            delete modal.dataset.editId;
        };

        // Cancel button
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModal);
        }

        // Close button (X)
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });

        // Save button
        if (saveBtn) {
            saveBtn.addEventListener('click', async () => {
                await this.saveDosageEdit();
            });
        }

        // Enter key to save
        const dosageInput = document.getElementById('edit-dosage');
        const servingsInput = document.getElementById('edit-servings');
        
        [dosageInput, servingsInput].forEach(input => {
            if (input) {
                input.addEventListener('keypress', async (e) => {
                    if (e.key === 'Enter') {
                        await this.saveDosageEdit();
                    }
                });
            }
        });
    }

    // Save dosage edit
    async saveDosageEdit() {
        const modal = document.getElementById('dosage-edit-modal');
        const dosageInput = document.getElementById('edit-dosage');
        const unitSelect = document.getElementById('edit-unit');
        const servingsInput = document.getElementById('edit-servings');

        const editId = modal?.dataset.editId;
        if (!editId) return;

        const newDosage = parseFloat(dosageInput.value);
        const newUnit = unitSelect.value;
        const newServings = parseInt(servingsInput.value) || 1;

        if (!newDosage || newDosage <= 0) {
            this.showNotification('Please enter a valid dosage', 'error');
            return;
        }

        try {
            // Find the item and create updated data
            const existingItem = this.regime.find(item => item.id === editId);
            if (!existingItem) {
                throw new Error('Supplement not found');
            }

            const updatedItem = {
                ...existingItem,
                dosage: newDosage,
                unit: newUnit,
                servings: newServings,
                dateModified: new Date().toISOString()
            };

            // Update the item
            const existingItemIndex = this.regime.findIndex(item => item.id === editId);
            if (existingItemIndex !== -1) {
                try {
                    // Try to update in database
                    const result = await apiClient.updateInRegime(editId, updatedItem);
                    this.regime = result.regime;
                    localStorage.setItem('regime', JSON.stringify(this.regime));
                } catch (error) {
                    console.error('Error updating in database, using local storage:', error);
                    // Update locally
                    this.regime[existingItemIndex] = updatedItem;
                    localStorage.setItem('regime', JSON.stringify(this.regime));
                }

                this.updateRegimeDisplay();
                this.calculateExpectedBoosts();
                
                // Close modal
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                delete modal.dataset.editId;

                this.showNotification('Dosage updated successfully', 'success');
            }
        } catch (error) {
            console.error('Error saving dosage edit:', error);
            this.showNotification(error.message || 'Error updating dosage', 'error');
        }
    }


    // Calculate expected stat boosts from current regime
    calculateExpectedBoosts() {
        this.expectedBoosts = {};
        
        this.regime.forEach(item => {
            let effects = {};
            
            // Try supplement database first
            const supplementInfo = getSupplementByKey(item.supplement);
            if (supplementInfo) {
                effects = calculateSupplementEffects(item.supplement, item.dosage, item.unit);
            } else {
                // Use micronutrient database
                effects = calculateStatBoosts(item.supplement, item.dosage, item.unit);
            }
            
            Object.entries(effects).forEach(([stat, boost]) => {
                this.expectedBoosts[stat] = (this.expectedBoosts[stat] || 0) + boost;
            });
        });

        this.updateBoostsDisplay();
        
        // Update stats display in stats tab
        if (typeof updateStatsDisplay === 'function') {
            updateStatsDisplay();
        }
    }

    // Update regime display in UI
    updateRegimeDisplay() {
        console.log('=== UPDATE REGIME DISPLAY CALLED ===');
        console.log('Current regime length:', this.regime.length);
        console.log('Regime contents:', this.regime);
        
        // Update timing-based displays
        this.updateTimelineDisplay();
        
        // Update counters
        this.updateSupplementCounts();
    }

    updateTimelineDisplay() {
        console.log('=== UPDATE TIMELINE DISPLAY ===');
        console.log('Current regime:', this.regime);
        
        const timings = ['morning', 'night'];
        
        timings.forEach(timing => {
            const container = document.getElementById(`${timing}-supplements`);
            console.log(`Container for ${timing}:`, container);
            if (!container) {
                console.warn(`No container found for ${timing}-supplements`);
                return;
            }

            const supplements = this.regime.filter(item => {
                // Handle both "night" and "evening" for the night slot
                const isMatch = item.timing === timing || (timing === 'night' && item.timing === 'evening');
                console.log(`Item timing: "${item.timing}", Looking for: "${timing}", Match: ${isMatch}`);
                return isMatch;
            });
            console.log(`Supplements for ${timing}:`, supplements);
            
            if (supplements.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">💊</div>
                        <div class="empty-state-text">No supplements scheduled for ${timing}</div>
                    </div>
                `;
                return;
            }

            container.innerHTML = supplements.map(item => {
                const supplementInfo = getSupplementByKey(item.supplement);
                const nutrientInfo = MICRONUTRIENT_DATABASE[item.supplement];
                const servingsText = item.servings > 1 ? ` × ${item.servings}` : '';
                const dailyTotal = item.dailyTotal || (item.dosage * (item.servings || 1));
                
                return `
                    <div class="supplement-card clickable" data-id="${item.id}" onclick="regimeManager.editSupplement('${item.id}')">
                        <div class="supplement-header">
                            <div class="supplement-name">
                                ${item.productName || supplementInfo?.name || nutrientInfo?.name || item.supplement}
                            </div>
                            <div class="supplement-dosage">
                                ${dailyTotal} ${item.unit}${servingsText}
                            </div>
                        </div>
                        <div class="supplement-frequency">
                            ${item.frequency === 'daily' ? 'Daily' : item.frequency}
                        </div>
                        ${item.notes ? `<div class="supplement-notes">${item.notes}</div>` : ''}
                        <button class="remove-supplement-btn" onclick="event.stopPropagation(); regimeManager.removeSupplement('${item.id}')" title="Remove from regime">×</button>
                    </div>
                `;
            }).join('');
        });
    }

    updateSupplementCounts() {
        console.log('=== UPDATE SUPPLEMENT COUNTS ===');
        const timings = ['morning', 'night'];
        
        timings.forEach(timing => {
            const countElement = document.getElementById(`${timing}-count`);
            console.log(`Count element for ${timing}:`, countElement);
            if (!countElement) {
                console.warn(`No count element found for ${timing}-count`);
                return;
            }
            
            const count = this.regime.filter(item => 
                item.timing === timing || (timing === 'night' && item.timing === 'evening')
            ).length;
            console.log(`Count for ${timing}: ${count}`);
            countElement.textContent = count;
        });
    }

    // Update expected boosts display
    updateBoostsDisplay() {
        const boostsContainer = document.getElementById('expected-boosts');
        if (!boostsContainer) return;

        if (Object.keys(this.expectedBoosts).length === 0) {
            boostsContainer.innerHTML = '<div class="empty-state">Add supplements to see expected benefits</div>';
            return;
        }

        // Sort boosts by value (highest first)
        const sortedBoosts = Object.entries(this.expectedBoosts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 12); // Show top 12 boosts

        boostsContainer.innerHTML = sortedBoosts.map(([stat, boost]) => `
            <div class="boost-item">
                <span class="boost-stat">${stat.replace('-', ' ')}</span>
                <span class="boost-value">+${Math.round(boost)}</span>
            </div>
        `).join('');
    }

    // Get dosage level (low/medium/high) for a supplement
    getDosageLevel(item) {
        const supplementInfo = getSupplementByKey(item.supplement);
        const nutrientInfo = MICRONUTRIENT_DATABASE[item.supplement];
        
        // Try supplement database first
        if (supplementInfo?.dosage) {
            const { low, medium, high } = supplementInfo.dosage;
            const dailyTotal = item.dailyTotal || (item.dosage * (item.servings || 1));

            if (dailyTotal <= low.max) return 'low';
            if (dailyTotal >= high.min) return 'high';
            return 'medium';
        }
        
        // Use micronutrient database
        if (nutrientInfo?.dosageRanges) {
            const { low, medium, high } = nutrientInfo.dosageRanges;
            const dailyTotal = item.dailyTotal || (item.dosage * (item.servings || 1));

            if (dailyTotal <= low.max) return 'low';
            if (dailyTotal >= high.min) return 'high';
            return 'medium';
        }
        
        return 'medium';
    }

    // Setup event listeners
    setupEventListeners() {
        this.setupModalListeners();
        this.setupWizardListeners();
    }

    // Setup modal event listeners
    setupModalListeners() {
        const addBtn = document.getElementById('add-supplement-btn');
        const modal = document.getElementById('add-supplement-modal');
        const closeBtn = document.querySelector('.modal-close');

        console.log('Modal setup - Add btn:', addBtn, 'Modal:', modal, 'Close btn:', closeBtn);

        if (!addBtn) {
            console.error('Add supplement button not found!');
            // Try to find it after a short delay
            setTimeout(() => {
                const delayedBtn = document.getElementById('add-supplement-btn');
                console.log('Delayed search for add btn:', delayedBtn);
                if (delayedBtn) {
                    this.setupModalListeners(); // Retry setup
                }
            }, 1000);
            return;
        }

        if (!modal) {
            console.error('Modal not found!');
            return;
        }

        if (addBtn && modal) {
            // Open modal and FORCE reset to step 1
            addBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Show modal first
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                
                // Use setTimeout to ensure DOM is ready
                setTimeout(() => {
                    this.forceResetToStepOne();
                }, 10);
            };

            // Also add event listener (comment out for now to test simple onclick)
            /*
            addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Add supplement button clicked');
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
                this.resetWizard(); // Reset wizard to step 1
                console.log('Modal should be visible now');
            });
            */

            // Close modal
            const closeModal = () => {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; // Restore scroll
            };

            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }

            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    closeModal();
                }
            });
        }
    }

    // Setup wizard event listeners - simplified version
    setupWizardListeners() {
        const nextBtn = document.getElementById('next-step');
        const prevBtn = document.getElementById('prev-step');
        const addBtn = document.getElementById('add-regime');

        if (!nextBtn || !prevBtn || !addBtn) return;

        // Next button
        nextBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const current = document.querySelector('.wizard-step.active');
            const currentNum = parseInt(current.dataset.step);
            const next = currentNum + 1;
            
            // Validation
            if (currentNum === 1 && !document.getElementById('regime-supplement').value) {
                alert('Please select a supplement');
                return;
            }
            if (currentNum === 2 && !document.getElementById('regime-dosage').value) {
                alert('Please enter dosage');
                return;
            }
            if (currentNum === 3 && !document.getElementById('regime-timing').value) {
                alert('Please select timing');
                return;
            }
            
            if (next <= 4) {
                document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
                document.querySelector(`[data-step="${next}"]`).classList.add('active');
                
                prevBtn.style.display = next === 1 ? 'none' : 'block';
                nextBtn.style.display = next === 4 ? 'none' : 'block';
                addBtn.style.display = next === 4 ? 'block' : 'none';
            }
        };

        // Previous button  
        prevBtn.onclick = (e) => {
            e.preventDefault();
            const current = document.querySelector('.wizard-step.active');
            const currentNum = parseInt(current.dataset.step);
            const prev = currentNum - 1;
            
            if (prev >= 1) {
                document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
                document.querySelector(`[data-step="${prev}"]`).classList.add('active');
                
                prevBtn.style.display = prev === 1 ? 'none' : 'block';
                nextBtn.style.display = prev === 4 ? 'none' : 'block';
                addBtn.style.display = prev === 4 ? 'block' : 'none';
            }
        };

        // Add button
        addBtn.onclick = async (e) => {
            e.preventDefault();
            await this.handleWizardSubmit();
        };

        // Timing buttons
        document.querySelectorAll('.timing-btn').forEach(btn => {
            btn.onclick = (e) => {
                const timing = e.currentTarget.getAttribute('data-timing');
                document.querySelectorAll('.timing-btn').forEach(b => b.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                document.getElementById('regime-timing').value = timing;
            };
        });
    }

    // Show error for invalid step
    showStepError(stepNumber) {
        let message = '';
        switch(stepNumber) {
            case 1:
                message = 'Please select a supplement first';
                break;
            case 2:
                message = 'Please enter a valid dosage';
                break;
            case 3:
                message = 'Please select when you take it';
                break;
        }
        this.showNotification(message, 'error');
    }

    // Handle wizard form submission
    async handleWizardSubmit() {
        const supplementData = {
            supplement: document.getElementById('regime-supplement').value,
            dosage: document.getElementById('regime-dosage').value,
            unit: document.getElementById('regime-unit').value,
            servings: document.getElementById('regime-servings').value || 1,
            timing: document.getElementById('regime-timing').value,
            frequency: document.getElementById('regime-frequency').value || 'daily',
            notes: document.getElementById('regime-notes').value,
            brandKey: document.getElementById('regime-brand-key').value,
            productName: document.getElementById('regime-product-name').value
        };

        
        // Validate required fields
        if (!supplementData.supplement) {
            console.error('No supplement selected');
            this.showNotification('Please select a supplement first', 'error');
            return;
        }
        
        if (!supplementData.dosage) {
            console.error('No dosage entered');
            this.showNotification('Please enter a dosage', 'error');
            return;
        }
        
        if (!supplementData.timing) {
            console.error('No timing selected');
            this.showNotification('Please select when to take it', 'error');
            return;
        }

        try {
            // Check if we're editing an existing supplement
            const modal = document.getElementById('add-supplement-modal');
            const editId = modal?.dataset.editId;
            
            if (editId) {
                console.log('Updating existing supplement...');
                await this.updateSupplement(editId, supplementData);
            } else {
                console.log('Adding new supplement...');
                await this.addSupplement(supplementData);
            }
            
            // Ensure regime view stays active
            const regimeView = document.getElementById('regime-view');
            if (regimeView) {
                regimeView.style.display = 'block';
                regimeView.classList.add('active');
                
                // Hide other views
                document.querySelectorAll('.view-container').forEach(view => {
                    if (view !== regimeView) {
                        view.style.display = 'none';
                        view.classList.remove('active');
                    }
                });
            }
            
            // No need to reset here - happens when modal opens
            
            // Close modal
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
            
            // Ensure navigation button is active
            const regimeNavBtn = document.querySelector('.nav-btn[data-view="regime"]');
            if (regimeNavBtn) {
                // Remove active from all nav buttons first
                document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                // Make regime button active
                regimeNavBtn.classList.add('active');
            }
            
            // Update the regime display
            this.updateRegimeDisplay();
            this.calculateExpectedBoosts();
            
        } catch (error) {
            this.showNotification(error.message || 'Error adding supplement', 'error');
            
            // Ensure regime view is still shown even on error
            const regimeView = document.getElementById('regime-view');
            if (regimeView) {
                regimeView.style.display = 'block';
                regimeView.classList.add('active');
            }
        }
    }

    // Clear all form fields only
    clearFormFields() {
        document.getElementById('regime-supplement-search').value = '';
        document.getElementById('regime-supplement').value = '';
        document.getElementById('regime-dosage').value = '';
        document.getElementById('regime-unit').value = 'mg';
        document.getElementById('regime-servings').value = '1';
        document.getElementById('regime-timing').value = '';
        document.getElementById('regime-frequency').value = 'daily';
        document.getElementById('regime-notes').value = '';
        
        // Clear suggestions and timing selection
        const suggestions = document.getElementById('supplement-suggestions');
        if (suggestions) suggestions.innerHTML = '';
        
        document.querySelectorAll('.timing-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }

    // FORCE reset to step 1 - nuclear option
    forceResetToStepOne() {
        console.log('🚀 FORCE RESET TO STEP 1');
        
        // 1. Clear form fields first
        this.clearFormFields();
        
        // 2. Remove active class from ALL steps
        const allSteps = document.querySelectorAll('.wizard-step');
        console.log('Found wizard steps:', allSteps.length);
        
        allSteps.forEach((step, index) => {
            step.classList.remove('active');
            // Remove any inline display styles that might interfere
            step.style.display = '';
            console.log(`Step ${index + 1} deactivated`);
        });
        
        // 3. Find and activate step 1 ONLY
        const step1 = document.querySelector('.wizard-step[data-step="1"]');
        if (step1) {
            step1.classList.add('active');
            console.log('✅ Step 1 activated');
        } else {
            console.error('❌ Step 1 not found!');
        }
        
        // 4. Set navigation buttons for step 1
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');  
        const addBtn = document.getElementById('add-regime');
        
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'block';
        if (addBtn) addBtn.style.display = 'none';
        
        console.log('✅ Navigation buttons set for step 1');
        
        // 5. Final verification
        setTimeout(() => {
            const activeSteps = document.querySelectorAll('.wizard-step.active');
            console.log(`Final check: ${activeSteps.length} active steps`);
            if (activeSteps.length === 1 && activeSteps[0].dataset.step === '1') {
                console.log('✅ SUCCESS: Modal is on step 1');
            } else {
                console.log('❌ FAILED: Modal is not on step 1');
            }
        }, 50);
    }

    // Setup body model interactions
    setupBodyModelListeners() {
        // Body part hover and click effects
        const bodyParts = document.querySelectorAll('.body-part');
        bodyParts.forEach(part => {
            part.addEventListener('click', (e) => {
                const system = e.target.dataset.system;
                this.highlightNutrientsForSystem(system);
            });
        });

        // Category expand/collapse
        const categoryHeaders = document.querySelectorAll('.category-header');
        categoryHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                const category = header.parentElement;
                category.classList.toggle('expanded');
            });
        });

        // Search functionality
        const searchInput = document.getElementById('nutrients-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterNutrients(e.target.value);
            });
        }
    }

    // Populate the nutrients panel with micronutrients from database
    populateNutrientsPanel() {
        const categories = {
            vitamin: document.getElementById('vitamins-list'),
            mineral: document.getElementById('minerals-list'),
            'amino-acid': document.getElementById('amino-acids-list'),
            phytochemical: document.getElementById('phytochemicals-list'),
            bioactive: document.getElementById('bioactives-list')
        };

        // Group nutrients by category
        Object.entries(MICRONUTRIENT_DATABASE).forEach(([key, nutrient]) => {
            const categoryContainer = categories[nutrient.category];
            if (categoryContainer) {
                const nutrientItem = this.createNutrientItem(key, nutrient);
                categoryContainer.appendChild(nutrientItem);
            }
        });

        // Update category counts
        Object.entries(categories).forEach(([category, container]) => {
            const count = container.children.length;
            const countElement = document.querySelector(`[data-category="${category}"] .category-count`);
            if (countElement) {
                countElement.textContent = count;
            }
        });
    }

    // Create a nutrient item element
    createNutrientItem(key, nutrient) {
        const item = document.createElement('div');
        item.className = 'nutrient-item';
        item.dataset.nutrientKey = key;
        item.dataset.category = nutrient.category;

        const mediumDose = nutrient.dosageRanges ? nutrient.dosageRanges.medium : null;
        const dosageText = mediumDose ? `${mediumDose.min}-${mediumDose.max}${nutrient.unit}` : '';

        item.innerHTML = `
            <div class="nutrient-info">
                <div class="nutrient-name">${nutrient.name}</div>
                ${dosageText ? `<div class="nutrient-dosage">${dosageText}</div>` : ''}
            </div>
            <button class="add-nutrient-btn" onclick="regimeManager.openModalWithNutrient('${key}')">+</button>
        `;

        return item;
    }

    // Open modal with pre-selected nutrient
    openModalWithNutrient(nutrientKey) {
        console.log('Opening modal for nutrient:', nutrientKey);
        
        // Ensure we're in regime view first
        const regimeView = document.getElementById('regime-view');
        if (regimeView && !regimeView.classList.contains('active')) {
            // Activate regime view
            document.querySelectorAll('.view-container').forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });
            regimeView.style.display = 'block';
            regimeView.classList.add('active');
            
            // Update nav button
            const regimeNavBtn = document.querySelector('.nav-btn[data-view="regime"]');
            if (regimeNavBtn) {
                document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                regimeNavBtn.classList.add('active');
            }
        }
        
        const modal = document.getElementById('add-supplement-modal');
        const searchInput = document.getElementById('regime-supplement-search');
        const hiddenInput = document.getElementById('regime-supplement');
        
        if (modal && searchInput && hiddenInput) {
            // Open modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Reset wizard
            this.resetWizard();
            
            // Pre-fill with selected nutrient
            const nutrient = MICRONUTRIENT_DATABASE[nutrientKey];
            if (nutrient) {
                searchInput.value = nutrient.name;
                hiddenInput.value = nutrientKey;
                
                // Auto-fill dosage if available
                if (nutrient.dosageRanges) {
                    const dosageInput = document.getElementById('regime-dosage');
                    const unitSelect = document.getElementById('regime-unit');
                    
                    if (dosageInput) {
                        dosageInput.value = nutrient.dosageRanges.medium.min;
                    }
                    if (unitSelect) {
                        unitSelect.value = nutrient.unit;
                    }
                }
            }
            
            console.log('Modal opened with pre-filled data');
        } else {
            console.error('Modal elements not found');
        }
    }

    // Highlight nutrients relevant to a body system
    highlightNutrientsForSystem(system) {
        // Remove previous highlights
        document.querySelectorAll('.nutrient-item').forEach(item => {
            item.classList.remove('highlighted');
        });

        // Add highlights based on system
        console.log('Highlighting nutrients for system:', system);
    }

    // Filter nutrients based on search
    filterNutrients(query) {
        const items = document.querySelectorAll('.nutrient-item');
        const searchTerm = query.toLowerCase();

        items.forEach(item => {
            const name = item.querySelector('.nutrient-name').textContent.toLowerCase();
            const matches = name.includes(searchTerm);
            
            item.style.display = matches ? 'flex' : 'none';
        });

        // Show/hide categories based on visible items
        document.querySelectorAll('.nutrient-category').forEach(category => {
            const visibleItems = category.querySelectorAll('.nutrient-item[style*="flex"], .nutrient-item:not([style])');
            const hasVisibleItems = visibleItems.length > 0;
            
            if (query.trim() === '') {
                category.style.display = 'block';
                category.classList.remove('expanded');
            } else {
                category.style.display = hasVisibleItems ? 'block' : 'none';
                if (hasVisibleItems) {
                    category.classList.add('expanded');
                }
            }
        });
    }

    // Legacy method - keeping for compatibility
    setupOldEventListeners() {
        const supplementHiddenInput = document.getElementById('regime-supplement');

        // Handle brand selection change
        if (brandSelect) {
            brandSelect.addEventListener('change', () => {
                const selectedKey = brandSelect.value;
                if (selectedKey) {
                    const product = getProductByKey(selectedKey);
                    if (product) {
                        // Auto-fill product details
                        dosageInput.value = product.dosagePerServing;
                        unitSelect.value = product.unit;
                        productNameInput.value = product.productName;
                        brandKeyInput.value = selectedKey;
                        
                        // Set suggested timing if available
                        const supplementInfo = getSupplementByKey(product.supplement);
                        if (supplementInfo?.timing) {
                            document.getElementById('regime-timing').value = supplementInfo.timing;
                        }
                    }
                } else {
                    brandKeyInput.value = '';
                }
            });
        }

        // Handle form submission
        regimeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const supplementData = {
                supplement: supplementHiddenInput.value,
                dosage: dosageInput?.value,
                unit: unitSelect?.value || 'mg',
                servings: servingsInput?.value || 1,
                timing: document.getElementById('regime-timing')?.value,
                frequency: document.getElementById('regime-frequency')?.value,
                brandKey: brandKeyInput?.value,
                productName: productNameInput?.value,
                notes: document.getElementById('regime-notes')?.value
            };

            // Validate required fields
            if (!supplementData.supplement) {
                this.showNotification('Please select a supplement', 'error');
                return;
            }

            if (!supplementData.dosage) {
                this.showNotification('Please enter a dosage', 'error');
                return;
            }

            try {
                await this.addSupplement(supplementData);
                regimeForm.reset();
                // Also clear the search input and hidden input
                const searchInput = document.getElementById('regime-supplement-search');
                if (searchInput) searchInput.value = '';
                supplementHiddenInput.value = '';
                
                this.showNotification('Supplement added to regime!', 'success');
            } catch (error) {
                this.showNotification(error.message, 'error');
            }
        });
    }

    // Update brand options based on selected supplement
    updateBrandOptions(supplementKey) {
        const brandSelect = document.getElementById('regime-brand');
        if (!brandSelect) return;

        // Clear current options
        brandSelect.innerHTML = '<option value="">Select brand product...</option>';

        if (!supplementKey) return;

        // Get products for this supplement type
        const products = getBrandsBySupplementType(supplementKey);
        
        // If no brand products available, show message
        if (Object.keys(products).length === 0) {
            const noProductsOption = document.createElement('option');
            noProductsOption.value = 'custom';
            noProductsOption.textContent = 'No brand products available - Enter custom details';
            brandSelect.appendChild(noProductsOption);
            return;
        }
        
        // Group by brand
        const brandGroups = {};
        Object.entries(products).forEach(([key, product]) => {
            if (!brandGroups[product.brand]) {
                brandGroups[product.brand] = [];
            }
            brandGroups[product.brand].push({ key, product });
        });

        // Add options grouped by brand
        Object.keys(brandGroups).sort().forEach(brand => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = brand;
            
            brandGroups[brand].forEach(({ key, product }) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = `${product.productName} - ${product.dosagePerServing}${product.unit}`;
                optgroup.appendChild(option);
            });
            
            brandSelect.appendChild(optgroup);
        });

        // Add custom option
        const customOption = document.createElement('option');
        customOption.value = 'custom';
        customOption.textContent = '-- Enter custom product --';
        brandSelect.appendChild(customOption);
    }

    // Show notification
    showNotification(message, type) {
        // Use the same notification system from app-simple.js
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 80px; right: 20px; padding: 12px 20px; border-radius: 8px;
            color: white; font-weight: 500; z-index: 10000; animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            background: ${type === 'success' ? 'linear-gradient(135deg, #00C851, #00A846)' : 
                        type === 'error' ? 'linear-gradient(135deg, #dc3545, #c82333)' :
                        'linear-gradient(135deg, #FFB300, #FF8800)'};
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }


}

// Global instance
const regimeManager = new RegimeManager();

// Make it globally available
window.regimeManager = regimeManager;

export default regimeManager;