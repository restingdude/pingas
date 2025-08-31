// Supplement Search Component
import { SUPPLEMENT_DATABASE, SUPPLEMENT_CATEGORIES, getRecommendedDosage } from './supplement-database.js';

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
            if (this.searchInput.value.trim() === '') {
                this.showAllSupplements();
            }
            this.showSuggestions();
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
            this.showAllSupplements();
            return;
        }

        this.filteredSupplements = Object.entries(SUPPLEMENT_DATABASE)
            .filter(([key, supplement]) => {
                const searchText = `${supplement.name} ${supplement.description} ${supplement.category}`.toLowerCase();
                return searchText.includes(query);
            })
            .map(([key, supplement]) => ({ key, ...supplement }));

        this.selectedIndex = -1;
    }

    showAllSupplements() {
        this.filteredSupplements = Object.entries(SUPPLEMENT_DATABASE)
            .map(([key, supplement]) => ({ key, ...supplement }));
        this.selectedIndex = -1;
    }

    showSuggestions() {
        if (this.filteredSupplements.length === 0) {
            this.suggestionsContainer.innerHTML = '<div class="suggestion-item"><div class="suggestion-name">No supplements found</div></div>';
        } else {
            this.renderSuggestions();
        }
        
        this.suggestionsContainer.classList.add('show');
        this.isOpen = true;
    }

    hideSuggestions() {
        this.suggestionsContainer.classList.remove('show');
        this.isOpen = false;
        this.selectedIndex = -1;
    }

    renderSuggestions() {
        // Group supplements by category
        const groupedSupplements = this.filteredSupplements.reduce((groups, supplement) => {
            const category = supplement.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(supplement);
            return groups;
        }, {});

        let html = '';
        let itemIndex = 0;

        Object.entries(groupedSupplements).forEach(([category, supplements]) => {
            const categoryName = SUPPLEMENT_CATEGORIES[category] || category;
            html += `<div class="suggestion-category">${categoryName}</div>`;

            supplements.forEach(supplement => {
                const recommended = getRecommendedDosage(supplement.key, 'medium');
                const dosageText = recommended ? `Recommended: ${recommended.min}-${recommended.max}${recommended.unit}` : '';
                
                html += `
                    <div class="suggestion-item ${this.selectedIndex === itemIndex ? 'selected' : ''}" 
                         data-key="${supplement.key}" 
                         data-index="${itemIndex}">
                        <div class="suggestion-name">${supplement.name}</div>
                        <div class="suggestion-description">${supplement.description}</div>
                        ${dosageText ? `<div class="suggestion-dosage">${dosageText}</div>` : ''}
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

        // Auto-fill recommended dosage
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