// Dosage Effects Model for Supplement Stats
// Based on Blueprint protocol and clinical studies

export const supplementDatabase = {
    'nmn': {
        name: 'NMN',
        dosages: {
            low: { amount: 250, unit: 'mg' },
            medium: { amount: 500, unit: 'mg' },
            high: { amount: 750, unit: 'mg' }
        },
        effects: {
            energy: { low: 10, medium: 20, high: 25 },
            longevity: { low: 8, medium: 15, high: 19 },
            focus: { low: 5, medium: 10, high: 13 }
        },
        basis: 'RCTs: 2x NAD+ at 500mg (10-15% stamina). Blueprint NAD+: 54.6μM (+20% energy).',
        timing: 'morning',
        maxDailyBoost: 30
    },
    'fisetin': {
        name: 'Fisetin (cycled)',
        dosages: {
            low: { amount: 250, unit: 'mg' },
            medium: { amount: 500, unit: 'mg' },
            high: { amount: 750, unit: 'mg' }
        },
        effects: {
            longevity: { low: 8, medium: 15, high: 19 },
            'anti-inflammatory': { low: 10, medium: 20, high: 25 },
            immunity: { low: 5, medium: 10, high: 13 }
        },
        basis: 'Pilot studies: 20-30% senescence drop at 500mg. Blueprint senescence -21%.',
        timing: 'with-meals',
        frequency: '3-days-month',
        maxDailyBoost: 30
    },
    'ca-akg': {
        name: 'Ca-AKG',
        dosages: {
            low: { amount: 500, unit: 'mg' },
            medium: { amount: 1000, unit: 'mg' },
            high: { amount: 1500, unit: 'mg' }
        },
        effects: {
            longevity: { low: 6, medium: 12, high: 15 },
            energy: { low: 5, medium: 10, high: 13 },
            'anti-inflammatory': { low: 4, medium: 8, high: 10 }
        },
        basis: 'Trials: 12% frailty reduction at 1g. Blueprint bio age slowdown 9.2%.',
        timing: 'morning',
        maxDailyBoost: 30
    },
    'ashwagandha': {
        name: 'Ashwagandha',
        dosages: {
            low: { amount: 150, unit: 'mg' },
            medium: { amount: 450, unit: 'mg' },
            high: { amount: 900, unit: 'mg' }
        },
        effects: {
            mood: { low: 10, medium: 20, high: 25 },
            focus: { low: 5, medium: 10, high: 13 },
            strength: { low: 5, medium: 10, high: 13 },
            'hormonal-balance': { low: 8, medium: 15, high: 19 }
        },
        basis: 'RCTs: 27.9% cortisol drop at 300mg; 77% mood improvement. Blueprint HRV +20%. 20% strength gain at 600mg.',
        timing: 'evening',
        maxDailyBoost: 30
    },
    'rhodiola': {
        name: 'Rhodiola',
        dosages: {
            low: { amount: 100, unit: 'mg' },
            medium: { amount: 300, unit: 'mg' },
            high: { amount: 600, unit: 'mg' }
        },
        effects: {
            focus: { low: 8, medium: 15, high: 19 },
            mood: { low: 5, medium: 10, high: 13 },
            energy: { low: 4, medium: 8, high: 10 }
        },
        basis: 'RCTs: 15-25% focus/anxiety reduction at 200-400mg. Complements ashwagandha.',
        timing: 'morning',
        maxDailyBoost: 30
    },
    'creatine': {
        name: 'Creatine',
        dosages: {
            low: { amount: 2, unit: 'g' },
            medium: { amount: 5, unit: 'g' },
            high: { amount: 7.5, unit: 'g' }
        },
        effects: {
            strength: { low: 8, medium: 15, high: 19 },
            energy: { low: 5, medium: 10, high: 13 },
            focus: { low: 3, medium: 6, high: 8 }
        },
        basis: 'Meta-analyses: 5-20% strength at 5g; 6.85kg bench press gain. Blueprint lean mass +10%.',
        timing: 'with-meals',
        loadingPhase: { amount: 20, unit: 'g', duration: 5 },
        maxDailyBoost: 30
    },
    'nac': {
        name: 'NAC',
        dosages: {
            low: { amount: 300, unit: 'mg' },
            medium: { amount: 1200, unit: 'mg' },
            high: { amount: 2700, unit: 'mg' }
        },
        effects: {
            immunity: { low: 10, medium: 20, high: 25 },
            'liver-health': { low: 8, medium: 15, high: 19 },
            'anti-inflammatory': { low: 5, medium: 10, high: 13 },
            mood: { low: 4, medium: 8, high: 10 }
        },
        basis: 'RCTs: 20-40% oxidative stress drop at 600-1,200mg. Blueprint enzymes -30%.',
        timing: 'morning',
        sideEffects: { high: { immunity: -5 } }, // GI upset at high doses
        maxDailyBoost: 30
    },
    'omega-3': {
        name: 'Omega-3 (EPA/DHA)',
        dosages: {
            low: { amount: 500, unit: 'mg' },
            medium: { amount: 1500, unit: 'mg' },
            high: { amount: 3000, unit: 'mg' }
        },
        effects: {
            immunity: { low: 8, medium: 15, high: 19 },
            'anti-inflammatory': { low: 10, medium: 20, high: 25 },
            'heart-health': { low: 5, medium: 10, high: 13 },
            mood: { low: 4, medium: 8, high: 10 },
            'joint-health': { low: 3, medium: 6, high: 8 }
        },
        basis: 'Meta: 20% inflammation drop at 1-2g. Blueprint lipids top 1%.',
        timing: 'with-meals',
        maxDailyBoost: 30
    },
    'taurine': {
        name: 'Taurine',
        dosages: {
            low: { amount: 500, unit: 'mg' },
            medium: { amount: 2000, unit: 'mg' },
            high: { amount: 4500, unit: 'mg' }
        },
        effects: {
            longevity: { low: 6, medium: 12, high: 15 },
            'heart-health': { low: 5, medium: 10, high: 13 },
            energy: { low: 4, medium: 8, high: 10 }
        },
        basis: 'Cohorts: 20% CVD risk drop at 1-2g. Blueprint protocol uses 3g.',
        timing: 'morning',
        maxDailyBoost: 30
    },
    'vitamin-d3': {
        name: 'Vitamin D3',
        dosages: {
            low: { amount: 1000, unit: 'iu' },
            medium: { amount: 3500, unit: 'iu' },
            high: { amount: 7500, unit: 'iu' }
        },
        effects: {
            'bone-health': { low: 8, medium: 15, high: 19 },
            immunity: { low: 5, medium: 10, high: 13 },
            strength: { low: 4, medium: 8, high: 10 },
            mood: { low: 3, medium: 6, high: 8 }
        },
        basis: 'Studies: 20-30% fracture risk drop at 2,000-5,000IU. Blueprint bone top 1%.',
        timing: 'morning',
        sideEffects: { high: { 'bone-health': -5 } }, // Hypercalcemia risk
        maxDailyBoost: 30
    },
    'magnesium': {
        name: 'Magnesium',
        dosages: {
            low: { amount: 250, unit: 'mg' },
            medium: { amount: 500, unit: 'mg' },
            high: { amount: 750, unit: 'mg' }
        },
        effects: {
            mood: { low: 5, medium: 10, high: 13 },
            energy: { low: 4, medium: 8, high: 10 },
            'heart-health': { low: 3, medium: 6, high: 8 },
            'bone-health': { low: 2, medium: 4, high: 5 }
        },
        basis: 'RCTs: 15-20% sleep/mood improvement at 500mg. Blueprint sleep 95%.',
        timing: 'evening',
        maxDailyBoost: 30
    },
    'collagen': {
        name: 'Collagen Peptides',
        dosages: {
            low: { amount: 10, unit: 'g' },
            medium: { amount: 20, unit: 'g' },
            high: { amount: 30, unit: 'g' }
        },
        effects: {
            strength: { low: 5, medium: 10, high: 13 },
            'skin-health': { low: 8, medium: 15, high: 19 },
            'joint-health': { low: 4, medium: 8, high: 10 },
            'bone-health': { low: 3, medium: 6, high: 8 }
        },
        basis: 'Studies: 10-20% elasticity at 20g. Blueprint collagen +12.8%.',
        timing: 'morning',
        maxDailyBoost: 30
    },
    'hyaluronic-acid': {
        name: 'Hyaluronic Acid',
        dosages: {
            low: { amount: 150, unit: 'mg' },
            medium: { amount: 300, unit: 'mg' },
            high: { amount: 450, unit: 'mg' }
        },
        effects: {
            'skin-health': { low: 5, medium: 10, high: 13 },
            'joint-health': { low: 8, medium: 15, high: 19 }
        },
        basis: 'RCTs: 10-20% hydration/mobility at 300mg. In Blueprint skin protocol.',
        timing: 'with-meals',
        maxDailyBoost: 30
    },
    'turmeric': {
        name: 'Turmeric/Curcumin',
        dosages: {
            low: { amount: 1000, unit: 'mg' },
            medium: { amount: 2000, unit: 'mg' },
            high: { amount: 3000, unit: 'mg' }
        },
        effects: {
            'anti-inflammatory': { low: 10, medium: 20, high: 25 },
            'joint-health': { low: 5, medium: 10, high: 13 },
            'liver-health': { low: 4, medium: 8, high: 10 }
        },
        basis: 'Meta: 20-30% pain drop at 2g. Blueprint hsCRP -50%.',
        timing: 'with-meals',
        maxDailyBoost: 30
    },
    'zinc': {
        name: 'Zinc',
        dosages: {
            low: { amount: 7.5, unit: 'mg' },
            medium: { amount: 15, unit: 'mg' },
            high: { amount: 22.5, unit: 'mg' }
        },
        effects: {
            immunity: { low: 5, medium: 10, high: 13 },
            'hair-health': { low: 4, medium: 8, high: 10 },
            'hormonal-balance': { low: 3, medium: 6, high: 8 }
        },
        basis: 'Studies: 10-15% immune boost at 15mg. In Blueprint stack.',
        timing: 'evening',
        maxDailyBoost: 30
    },
    'b12': {
        name: 'Vitamin B12',
        dosages: {
            low: { amount: 250, unit: 'mcg' },
            medium: { amount: 500, unit: 'mcg' },
            high: { amount: 750, unit: 'mcg' }
        },
        effects: {
            energy: { low: 5, medium: 10, high: 13 },
            focus: { low: 4, medium: 8, high: 10 }
        },
        basis: 'Deficient adults: 15-20% energy at 500mcg. Blueprint protocol.',
        timing: 'morning',
        maxDailyBoost: 30
    },
    'garlic': {
        name: 'Garlic',
        dosages: {
            low: { amount: 1.2, unit: 'g' },
            medium: { amount: 2.4, unit: 'g' },
            high: { amount: 3.6, unit: 'g' }
        },
        effects: {
            'heart-health': { low: 5, medium: 10, high: 13 },
            'liver-health': { low: 4, medium: 8, high: 10 }
        },
        basis: 'RCTs: 10-20% BP drop at 2.4g. In Blueprint stack.',
        timing: 'with-meals',
        maxDailyBoost: 30
    },
    'coq10': {
        name: 'CoQ10',
        dosages: {
            low: { amount: 50, unit: 'mg' },
            medium: { amount: 100, unit: 'mg' },
            high: { amount: 150, unit: 'mg' }
        },
        effects: {
            energy: { low: 5, medium: 10, high: 13 },
            'heart-health': { low: 4, medium: 8, high: 10 },
            'oral-health': { low: 3, medium: 6, high: 8 }
        },
        basis: 'Studies: 15% energy in deficient. Blueprint protocol uses gel.',
        timing: 'with-meals',
        maxDailyBoost: 30
    }
};

// Personalization factors
export const personalizationFactors = {
    age: {
        calculate: (age) => {
            if (age > 50) return 0.8;
            if (age < 25) return 1.1;
            return 1.0;
        }
    },
    activity: {
        sedentary: 0.9,
        light: 1.0,
        moderate: 1.1,
        high: 1.2,
        extreme: 1.3
    },
    adherence: {
        calculate: (streakDays) => {
            if (streakDays > 30) return 1.2;
            if (streakDays > 7) return 1.1;
            if (streakDays > 3) return 1.05;
            return 1.0;
        }
    }
};

// Calculate dosage level based on user input
export function getDosageLevel(supplement, userDosage, userUnit) {
    const suppData = supplementDatabase[supplement];
    if (!suppData) return 'medium';
    
    // Convert user dosage to mg for comparison
    let normalizedDosage = userDosage;
    if (userUnit === 'g') normalizedDosage = userDosage * 1000;
    else if (userUnit === 'mcg') normalizedDosage = userDosage / 1000;
    else if (userUnit === 'iu') normalizedDosage = userDosage; // Keep as is for IU
    
    // Convert supplement dosages to same unit
    let lowDose = suppData.dosages.low.amount;
    let medDose = suppData.dosages.medium.amount;
    let highDose = suppData.dosages.high.amount;
    
    if (suppData.dosages.low.unit === 'g') {
        lowDose *= 1000;
        medDose *= 1000;
        highDose *= 1000;
    } else if (suppData.dosages.low.unit === 'mcg') {
        lowDose /= 1000;
        medDose /= 1000;
        highDose /= 1000;
    }
    
    if (normalizedDosage <= lowDose * 1.2) return 'low';
    else if (normalizedDosage <= medDose * 1.2) return 'medium';
    else return 'high';
}

// Calculate personalized effects
export function calculatePersonalizedEffects(supplement, dosageLevel, userProfile, adherenceStreak) {
    const suppData = supplementDatabase[supplement];
    if (!suppData) return {};
    
    const baseEffects = suppData.effects;
    const personalizedEffects = {};
    
    // Get base boost values
    for (const [stat, values] of Object.entries(baseEffects)) {
        let baseBoost = values[dosageLevel] || 0;
        
        // Apply personalization factors
        let personalizedBoost = baseBoost;
        
        // Age factor
        if (userProfile.age) {
            personalizedBoost *= personalizationFactors.age.calculate(userProfile.age);
        }
        
        // Activity level factor
        if (userProfile.activity) {
            personalizedBoost *= personalizationFactors.activity[userProfile.activity] || 1.0;
        }
        
        // Adherence bonus
        personalizedBoost *= personalizationFactors.adherence.calculate(adherenceStreak);
        
        // Apply side effects if any
        if (suppData.sideEffects && suppData.sideEffects[dosageLevel] && suppData.sideEffects[dosageLevel][stat]) {
            personalizedBoost += suppData.sideEffects[dosageLevel][stat];
        }
        
        // Cap at max daily boost
        personalizedBoost = Math.min(personalizedBoost, suppData.maxDailyBoost);
        
        personalizedEffects[stat] = Math.round(personalizedBoost);
    }
    
    return personalizedEffects;
}