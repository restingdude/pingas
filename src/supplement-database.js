// Comprehensive Supplement Database
// Based on clinical research and Blueprint protocol

export const SUPPLEMENT_DATABASE = {
  // Anti-Aging & Longevity
  nmn: {
    name: "NMN (Nicotinamide Mononucleotide)",
    category: "longevity",
    description: "NAD+ precursor for cellular energy and DNA repair",
    dosage: {
      low: { min: 250, max: 500, unit: "mg" },
      medium: { min: 500, max: 1000, unit: "mg" },
      high: { min: 1000, max: 2000, unit: "mg" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      energy: { low: 8, medium: 12, high: 18 },
      longevity: { low: 15, medium: 22, high: 30 },
      "heart-health": { low: 5, medium: 8, high: 12 },
      "anti-inflammatory": { low: 3, medium: 5, high: 8 }
    },
    interactions: ["resveratrol", "quercetin"],
    sideEffects: ["mild nausea (rare)", "headache (rare)"],
    research: "Multiple studies show NAD+ restoration, improved mitochondrial function"
  },

  fisetin: {
    name: "Fisetin",
    category: "longevity",
    description: "Senolytic flavonoid that removes damaged cells",
    dosage: {
      low: { min: 100, max: 200, unit: "mg" },
      medium: { min: 200, max: 500, unit: "mg" },
      high: { min: 500, max: 1000, unit: "mg" }
    },
    timing: "morning",
    frequency: "3-days-month",
    effects: {
      longevity: { low: 10, medium: 18, high: 25 },
      "anti-inflammatory": { low: 8, medium: 12, high: 18 },
      "joint-health": { low: 5, medium: 8, high: 12 },
      immunity: { low: 4, medium: 6, high: 10 }
    },
    interactions: ["quercetin", "curcumin"],
    sideEffects: ["mild digestive upset"],
    research: "Senolytic effects demonstrated in multiple animal studies"
  },

  "ca-akg": {
    name: "Calcium Alpha-Ketoglutarate",
    category: "longevity",
    description: "Krebs cycle intermediate for cellular energy",
    dosage: {
      low: { min: 1, max: 2, unit: "g" },
      medium: { min: 2, max: 3, unit: "g" },
      high: { min: 3, max: 4, unit: "g" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      energy: { low: 6, medium: 10, high: 15 },
      longevity: { low: 8, medium: 12, high: 18 },
      "bone-health": { low: 5, medium: 8, high: 12 },
      strength: { low: 4, medium: 7, high: 10 }
    },
    interactions: [],
    sideEffects: ["mild digestive upset"],
    research: "Studies show lifespan extension in animal models"
  },

  // Cognitive Enhancement
  "lions-mane": {
    name: "Lion's Mane Mushroom",
    category: "cognitive",
    description: "Nootropic mushroom for nerve growth factor",
    dosage: {
      low: { min: 500, max: 1000, unit: "mg" },
      medium: { min: 1000, max: 2000, unit: "mg" },
      high: { min: 2000, max: 3000, unit: "mg" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      focus: { low: 8, medium: 12, high: 18 },
      mood: { low: 5, medium: 8, high: 12 },
      longevity: { low: 3, medium: 5, high: 8 }
    },
    interactions: [],
    sideEffects: ["rare allergic reactions"],
    research: "Studies show neurogenesis and cognitive improvement"
  },

  ashwagandha: {
    name: "Ashwagandha",
    category: "adaptogen",
    description: "Adaptogenic herb for stress and performance",
    dosage: {
      low: { min: 300, max: 500, unit: "mg" },
      medium: { min: 500, max: 800, unit: "mg" },
      high: { min: 800, max: 1200, unit: "mg" }
    },
    timing: "evening",
    frequency: "daily",
    effects: {
      mood: { low: 10, medium: 15, high: 22 },
      strength: { low: 8, medium: 12, high: 18 },
      "hormonal-balance": { low: 12, medium: 18, high: 25 },
      immunity: { low: 5, medium: 8, high: 12 }
    },
    interactions: ["rhodiola"],
    sideEffects: ["drowsiness", "mild digestive upset"],
    research: "Extensive research on cortisol reduction and performance"
  },

  rhodiola: {
    name: "Rhodiola Rosea",
    category: "adaptogen", 
    description: "Adaptogenic herb for mental performance",
    dosage: {
      low: { min: 200, max: 400, unit: "mg" },
      medium: { min: 400, max: 600, unit: "mg" },
      high: { min: 600, max: 800, unit: "mg" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      focus: { low: 10, medium: 15, high: 20 },
      energy: { low: 8, medium: 12, high: 18 },
      mood: { low: 8, medium: 12, high: 16 },
      immunity: { low: 4, medium: 6, high: 10 }
    },
    interactions: ["ashwagandha"],
    sideEffects: ["mild jitteriness", "insomnia if taken late"],
    research: "Clinical studies show improved mental performance under stress"
  },

  // Performance & Recovery
  creatine: {
    name: "Creatine Monohydrate",
    category: "performance",
    description: "Cellular energy system support",
    dosage: {
      low: { min: 3, max: 5, unit: "g" },
      medium: { min: 5, max: 7, unit: "g" },
      high: { min: 7, max: 10, unit: "g" }
    },
    timing: "post-workout",
    frequency: "daily",
    effects: {
      strength: { low: 12, medium: 18, high: 25 },
      energy: { low: 8, medium: 12, high: 18 },
      focus: { low: 3, medium: 5, high: 8 },
      "bone-health": { low: 2, medium: 4, high: 6 }
    },
    interactions: [],
    sideEffects: ["water retention", "mild digestive upset"],
    research: "Gold standard supplement with extensive research"
  },

  taurine: {
    name: "Taurine",
    category: "performance",
    description: "Amino acid for cardiovascular and cellular health",
    dosage: {
      low: { min: 500, max: 1000, unit: "mg" },
      medium: { min: 1000, max: 2000, unit: "mg" },
      high: { min: 2000, max: 3000, unit: "mg" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      "heart-health": { low: 10, medium: 15, high: 22 },
      energy: { low: 5, medium: 8, high: 12 },
      longevity: { low: 5, medium: 8, high: 12 },
      vision: { low: 6, medium: 10, high: 15 }
    },
    interactions: [],
    sideEffects: ["rare digestive upset"],
    research: "Studies show cardiovascular and longevity benefits"
  },

  // Essential Nutrients
  "vitamin-d3": {
    name: "Vitamin D3",
    category: "essential",
    description: "Essential hormone for multiple body systems",
    dosage: {
      low: { min: 2000, max: 4000, unit: "IU" },
      medium: { min: 4000, max: 6000, unit: "IU" },
      high: { min: 6000, max: 10000, unit: "IU" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      "bone-health": { low: 15, medium: 22, high: 30 },
      immunity: { low: 12, medium: 18, high: 25 },
      mood: { low: 8, medium: 12, high: 18 },
      "hormonal-balance": { low: 10, medium: 15, high: 20 }
    },
    interactions: ["vitamin-k2", "magnesium"],
    sideEffects: ["hypercalcemia at very high doses"],
    research: "Deficiency epidemic, essential for optimal health"
  },

  magnesium: {
    name: "Magnesium Glycinate",
    category: "essential",
    description: "Essential mineral for 300+ enzymatic reactions",
    dosage: {
      low: { min: 200, max: 400, unit: "mg" },
      medium: { min: 400, max: 600, unit: "mg" },
      high: { min: 600, max: 800, unit: "mg" }
    },
    timing: "evening",
    frequency: "daily",
    effects: {
      mood: { low: 8, medium: 12, high: 18 },
      "bone-health": { low: 10, medium: 15, high: 20 },
      "heart-health": { low: 8, medium: 12, high: 18 },
      "joint-health": { low: 5, medium: 8, high: 12 }
    },
    interactions: ["vitamin-d3", "calcium"],
    sideEffects: ["digestive upset", "drowsiness"],
    research: "Critical mineral, most people are deficient"
  },

  "omega-3": {
    name: "Omega-3 (EPA/DHA)",
    category: "essential",
    description: "Essential fatty acids for brain and heart health",
    dosage: {
      low: { min: 1, max: 2, unit: "g" },
      medium: { min: 2, max: 3, unit: "g" },
      high: { min: 3, max: 4, unit: "g" }
    },
    timing: "with-meals",
    frequency: "daily",
    effects: {
      "heart-health": { low: 12, medium: 18, high: 25 },
      "anti-inflammatory": { low: 10, medium: 15, high: 22 },
      focus: { low: 6, medium: 10, high: 15 },
      mood: { low: 8, medium: 12, high: 18 },
      "joint-health": { low: 8, medium: 12, high: 18 }
    },
    interactions: [],
    sideEffects: ["fishy aftertaste", "mild digestive upset"],
    research: "Extensive research on cardiovascular and cognitive benefits"
  },

  // Antioxidants & Anti-inflammatory
  curcumin: {
    name: "Curcumin (Turmeric)",
    category: "antioxidant",
    description: "Potent anti-inflammatory compound",
    dosage: {
      low: { min: 500, max: 1000, unit: "mg" },
      medium: { min: 1000, max: 2000, unit: "mg" },
      high: { min: 2000, max: 3000, unit: "mg" }
    },
    timing: "with-meals",
    frequency: "daily",
    effects: {
      "anti-inflammatory": { low: 15, medium: 22, high: 30 },
      "joint-health": { low: 12, medium: 18, high: 25 },
      longevity: { low: 8, medium: 12, high: 18 },
      "liver-health": { low: 10, medium: 15, high: 20 }
    },
    interactions: ["black pepper", "fisetin"],
    sideEffects: ["mild digestive upset", "blood thinning"],
    research: "Thousands of studies on anti-inflammatory effects"
  },

  quercetin: {
    name: "Quercetin",
    category: "antioxidant",
    description: "Flavonoid antioxidant and senolytic",
    dosage: {
      low: { min: 250, max: 500, unit: "mg" },
      medium: { min: 500, max: 1000, unit: "mg" },
      high: { min: 1000, max: 2000, unit: "mg" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      "anti-inflammatory": { low: 10, medium: 15, high: 22 },
      immunity: { low: 8, medium: 12, high: 18 },
      longevity: { low: 6, medium: 10, high: 15 },
      "heart-health": { low: 8, medium: 12, high: 18 }
    },
    interactions: ["fisetin", "nmn"],
    sideEffects: ["mild headache", "digestive upset"],
    research: "Studies show senolytic and immune support effects"
  },

  nac: {
    name: "N-Acetyl Cysteine",
    category: "antioxidant",
    description: "Glutathione precursor and mucolytic",
    dosage: {
      low: { min: 600, max: 1000, unit: "mg" },
      medium: { min: 1000, max: 1500, unit: "mg" },
      high: { min: 1500, max: 2000, unit: "mg" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      "liver-health": { low: 12, medium: 18, high: 25 },
      "anti-inflammatory": { low: 8, medium: 12, high: 18 },
      immunity: { low: 10, medium: 15, high: 20 },
      longevity: { low: 5, medium: 8, high: 12 }
    },
    interactions: [],
    sideEffects: ["nausea", "digestive upset"],
    research: "Studies show liver protection and antioxidant effects"
  },

  // Beauty & Aesthetics
  collagen: {
    name: "Collagen Peptides",
    category: "beauty",
    description: "Structural protein for skin, hair, and joints",
    dosage: {
      low: { min: 10, max: 15, unit: "g" },
      medium: { min: 15, max: 20, unit: "g" },
      high: { min: 20, max: 30, unit: "g" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      "skin-health": { low: 15, medium: 22, high: 30 },
      "hair-health": { low: 10, medium: 15, high: 22 },
      "joint-health": { low: 12, medium: 18, high: 25 },
      "bone-health": { low: 8, medium: 12, high: 18 }
    },
    interactions: ["vitamin-c"],
    sideEffects: ["rare allergic reactions"],
    research: "Clinical studies show skin and joint benefits"
  },

  "hyaluronic-acid": {
    name: "Hyaluronic Acid",
    category: "beauty",
    description: "Moisture-retaining compound for skin and joints",
    dosage: {
      low: { min: 100, max: 200, unit: "mg" },
      medium: { min: 200, max: 300, unit: "mg" },
      high: { min: 300, max: 500, unit: "mg" }
    },
    timing: "morning",
    frequency: "daily",
    effects: {
      "skin-health": { low: 12, medium: 18, high: 25 },
      "joint-health": { low: 10, medium: 15, high: 20 }
    },
    interactions: [],
    sideEffects: ["rare allergic reactions"],
    research: "Studies show improved skin hydration and joint lubrication"
  },

  // Heart & Circulation
  coq10: {
    name: "Coenzyme Q10",
    category: "cardiovascular",
    description: "Mitochondrial antioxidant for heart health",
    dosage: {
      low: { min: 100, max: 200, unit: "mg" },
      medium: { min: 200, max: 400, unit: "mg" },
      high: { min: 400, max: 600, unit: "mg" }
    },
    timing: "with-meals",
    frequency: "daily",
    effects: {
      "heart-health": { low: 15, medium: 22, high: 30 },
      energy: { low: 8, medium: 12, high: 18 },
      longevity: { low: 10, medium: 15, high: 20 },
      "anti-inflammatory": { low: 5, medium: 8, high: 12 }
    },
    interactions: [],
    sideEffects: ["mild digestive upset"],
    research: "Extensive research on cardiovascular benefits"
  }
};

// Helper functions
export function getSupplementByKey(key) {
  return SUPPLEMENT_DATABASE[key];
}

export function getSupplementsByCategory(category) {
  return Object.entries(SUPPLEMENT_DATABASE)
    .filter(([key, supplement]) => supplement.category === category)
    .reduce((acc, [key, supplement]) => {
      acc[key] = supplement;
      return acc;
    }, {});
}

export function calculateSupplementEffects(supplementKey, dosage, unit) {
  const supplement = SUPPLEMENT_DATABASE[supplementKey];
  if (!supplement) return {};

  // Determine dosage level based on amount
  let level = 'medium';
  const dosageRanges = supplement.dosage;
  
  if (dosage <= dosageRanges.low.max) {
    level = 'low';
  } else if (dosage >= dosageRanges.high.min) {
    level = 'high';
  }

  return supplement.effects ? Object.entries(supplement.effects).reduce((acc, [stat, values]) => {
    acc[stat] = values[level] || 0;
    return acc;
  }, {}) : {};
}

export function getRecommendedDosage(supplementKey, level = 'medium') {
  const supplement = SUPPLEMENT_DATABASE[supplementKey];
  return supplement?.dosage[level] || null;
}

export const SUPPLEMENT_CATEGORIES = {
  longevity: "Anti-Aging & Longevity",
  cognitive: "Brain & Focus",
  performance: "Performance & Recovery", 
  essential: "Essential Nutrients",
  antioxidant: "Antioxidants",
  beauty: "Beauty & Aesthetics",
  cardiovascular: "Heart & Circulation",
  adaptogen: "Stress & Adaptation"
};

export default SUPPLEMENT_DATABASE;