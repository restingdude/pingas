// Supplement Search Component
import { SUPPLEMENT_DATABASE, SUPPLEMENT_CATEGORIES, getRecommendedDosage } from './supplement-database.js';
import { MICRONUTRIENT_DATABASE, searchNutrients } from './micronutrient-database.js';

class SupplementSearch {
    constructor() {
        this.searchInput = null;
        this.suggestionsContainer = null;
        this.hiddenInput = null;
        this.selectedIndex = -1;
        this.filteredSupplements = [];
        this.isOpen = false;
    }

    init() {
        this.searchInput = document.getElementById('regime-supplement-search');
        this.suggestionsContainer = document.getElementById('supplement-suggestions');
        this.hiddenInput = document.getElementById('regime-supplement');

        if (!this.searchInput || !this.suggestionsContainer || !this.hiddenInput) {
            console.error('Supplement search elements not found');
            return;
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search input events
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterSupplements(query);
            this.showSuggestions();
        });

        this.searchInput.addEventListener('focus', () => {
            // Only show suggestions if there's already text in the input
            if (this.searchInput.value.trim() !== '') {
                this.filterSupplements(this.searchInput.value.toLowerCase());
                this.showSuggestions();
            }
        });

        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateDown();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateUp();
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (this.selectedIndex >= 0) {
                        this.selectSupplement(this.filteredSupplements[this.selectedIndex]);
                    }
                    break;
                case 'Escape':
                    this.hideSuggestions();
                    break;
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.suggestionsContainer.contains(e.target)) {
                this.hideSuggestions();
            }
        });

        // Prevent form submission when suggestions are open
        const form = this.searchInput.closest('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                if (!this.hiddenInput.value) {
                    e.preventDefault();
                    this.searchInput.focus();
                }
            });
        }
    }

    filterSupplements(query) {
        if (query.trim() === '') {
            this.filteredSupplements = [];
            this.selectedIndex = -1;
            this.hideSuggestions();
            return;
        }

        // Search in supplement database
        const supplementResults = Object.entries(SUPPLEMENT_DATABASE)
            .filter(([key, supplement]) => {
                const searchText = `${supplement.name} ${supplement.description} ${supplement.category}`.toLowerCase();
                return searchText.includes(query);
            })
            .map(([key, supplement]) => ({ key, ...supplement, source: 'supplement' }));

        // Search in micronutrient database
        const micronutrientResults = Object.entries(MICRONUTRIENT_DATABASE)
            .filter(([key, nutrient]) => {
                const searchText = `${nutrient.name} ${nutrient.primaryRole} ${nutrient.category}`.toLowerCase();
                const formsText = nutrient.forms ? nutrient.forms.join(' ').toLowerCase() : '';
                return searchText.includes(query) || formsText.includes(query);
            })
            .map(([key, nutrient]) => ({ 
                key, 
                name: nutrient.name,
                description: nutrient.primaryRole,
                category: nutrient.category,
                ...nutrient, 
                source: 'micronutrient' 
            }));

        // Combine and sort results (supplements first, then micronutrients)
        this.filteredSupplements = [...supplementResults, ...micronutrientResults];
        this.selectedIndex = -1;
    }


    showSuggestions() {
        if (this.filteredSupplements.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        this.renderSuggestions();
        this.suggestionsContainer.classList.add('show');
        this.isOpen = true;
    }

    hideSuggestions() {
        this.suggestionsContainer.classList.remove('show');
        this.isOpen = false;
        this.selectedIndex = -1;
    }

    renderSuggestions() {
        // Group supplements by category and source
        const groupedSupplements = this.filteredSupplements.reduce((groups, supplement) => {
            const category = supplement.category;
            const source = supplement.source || 'supplement';
            const groupKey = `${source}-${category}`;
            
            if (!groups[groupKey]) {
                groups[groupKey] = {
                    category,
                    source,
                    items: []
                };
            }
            groups[groupKey].items.push(supplement);
            return groups;
        }, {});

        let html = '';
        let itemIndex = 0;

        // Sort groups to show supplements first, then micronutrients
        const sortedGroups = Object.entries(groupedSupplements).sort(([keyA, groupA], [keyB, groupB]) => {
            if (groupA.source === 'supplement' && groupB.source === 'micronutrient') return -1;
            if (groupA.source === 'micronutrient' && groupB.source === 'supplement') return 1;
            return groupA.category.localeCompare(groupB.category);
        });

        sortedGroups.forEach(([groupKey, group]) => {
            const categoryName = SUPPLEMENT_CATEGORIES[group.category] || 
                               group.category.charAt(0).toUpperCase() + group.category.slice(1);
            const sourceLabel = group.source === 'micronutrient' ? ' (Nutrients)' : '';
            
            html += `<div class="suggestion-category">${categoryName}${sourceLabel}</div>`;

            group.items.forEach(supplement => {
                let dosageText = '';
                
                if (supplement.source === 'supplement') {
                    const recommended = getRecommendedDosage(supplement.key, 'medium');
                    dosageText = recommended ? `Recommended: ${recommended.min}-${recommended.max}${recommended.unit}` : '';
                } else if (supplement.dosageRanges) {
                    const medium = supplement.dosageRanges.medium;
                    dosageText = `Range: ${medium.min}-${medium.max}${supplement.unit}`;
                }
                
                const sourceIcon = supplement.source === 'micronutrient' ? '🧬' : '💊';
                
                html += `
                    <div class="suggestion-item ${this.selectedIndex === itemIndex ? 'selected' : ''}" 
                         data-key="${supplement.key}" 
                         data-index="${itemIndex}">
                        <div class="suggestion-name">${sourceIcon} ${supplement.name}</div>
                        <div class="suggestion-description">${supplement.description}</div>
                        ${dosageText ? `<div class="suggestion-dosage">${dosageText}</div>` : ''}
                        ${supplement.evidence ? `<div class="suggestion-evidence">${supplement.evidence}</div>` : ''}
                    </div>
                `;
                itemIndex++;
            });
        });

        this.suggestionsContainer.innerHTML = html;

        // Add click listeners to suggestions
        this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const key = item.getAttribute('data-key');
                const supplement = this.filteredSupplements.find(s => s.key === key);
                if (supplement) {
                    this.selectSupplement(supplement);
                }
            });
        });
    }

    navigateDown() {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredSupplements.length - 1);
        this.updateSelection();
    }

    navigateUp() {
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.updateSelection();
    }

    updateSelection() {
        const items = this.suggestionsContainer.querySelectorAll('.suggestion-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });

        // Scroll selected item into view
        if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
            items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    selectSupplement(supplement) {
        this.searchInput.value = supplement.name;
        this.hiddenInput.value = supplement.key;
        this.hideSuggestions();

        // Auto-fill recommended dosage based on source
        if (supplement.source === 'supplement') {
            const recommended = getRecommendedDosage(supplement.key, 'medium');
            if (recommended) {
                const dosageInput = document.getElementById('regime-dosage');
                const unitSelect = document.getElementById('regime-unit');
                
                if (dosageInput) {
                    dosageInput.value = recommended.min;
                }
                if (unitSelect) {
                    unitSelect.value = recommended.unit;
                }
            }
        } else if (supplement.dosageRanges) {
            // Auto-fill micronutrient dosage
            const medium = supplement.dosageRanges.medium;
            const dosageInput = document.getElementById('regime-dosage');
            const unitSelect = document.getElementById('regime-unit');
            
            if (dosageInput && medium) {
                dosageInput.value = medium.min;
            }
            if (unitSelect && supplement.unit) {
                unitSelect.value = supplement.unit;
            }
        }

        // Focus next input
        const dosageInput = document.getElementById('regime-dosage');
        if (dosageInput) {
            dosageInput.focus();
        }

        // Trigger change event for any listeners
        this.hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    clearSelection() {
        this.searchInput.value = '';
        this.hiddenInput.value = '';
        this.hideSuggestions();
    }

    getSelectedSupplement() {
        return this.hiddenInput.value;
    }
}

// Create global instance
const supplementSearch = new SupplementSearch();

// Make it globally available
window.supplementSearch = supplementSearch;

export default supplementSearch;