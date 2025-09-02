// Comprehensive Micronutrient Database
// Based on Blueprint Protocol and RCT-backed research
// Mapped to 18 health stats with dosage-based effects

export const MICRONUTRIENT_DATABASE = {
  // VITAMINS
  "vitamin-a": {
    name: "Vitamin A",
    category: "vitamin",
    forms: ["Retinol", "Beta-Carotene"],
    unit: "mcg RAE",
    dosageRanges: {
      low: { min: 700, max: 1000 },
      medium: { min: 1000, max: 2000 },
      high: { min: 2000, max: 3000 }
    },
    statBoosts: {
      low: { vision: 5, skinHealth: 4, immunity: 3 },
      medium: { vision: 10, skinHealth: 8, immunity: 5 },
      high: { vision: 12, skinHealth: 10, immunity: 7 }
    },
    primaryRole: "Vision, skin, immunity",
    evidence: "RCTs: 15% vision protection at 900 mcg",
    warnings: "Excess >10,000 IU risks toxicity",
    inStack: true
  },
  
  "vitamin-b1": {
    name: "Vitamin B1 (Thiamine)",
    category: "vitamin",
    forms: ["Thiamine HCl", "Thiamine Mononitrate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 1.2, max: 10 },
      medium: { min: 10, max: 25 },
      high: { min: 25, max: 50 }
    },
    statBoosts: {
      low: { energy: 4, focus: 3 },
      medium: { energy: 8, focus: 5 },
      high: { energy: 10, focus: 6 }
    },
    primaryRole: "Energy metabolism, nerve function",
    evidence: "Studies: 10% energy gain in deficient adults",
    inStack: true
  },

  "vitamin-b2": {
    name: "Vitamin B2 (Riboflavin)",
    category: "vitamin",
    forms: ["Riboflavin", "Riboflavin-5-Phosphate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 1.3, max: 10 },
      medium: { min: 10, max: 25 },
      high: { min: 25, max: 50 }
    },
    statBoosts: {
      low: { energy: 4, skinHealth: 3 },
      medium: { energy: 8, skinHealth: 5 },
      high: { energy: 10, skinHealth: 6 }
    },
    primaryRole: "Energy, skin",
    evidence: "RCTs: 10% metabolic boost",
    inStack: true
  },

  "vitamin-b3": {
    name: "Vitamin B3 (Niacin)",
    category: "vitamin",
    forms: ["Niacin", "Nicotinamide", "NMN"],
    unit: "mg",
    dosageRanges: {
      low: { min: 16, max: 100 },
      medium: { min: 100, max: 250 },
      high: { min: 250, max: 500 }
    },
    statBoosts: {
      low: { energy: 5, longevity: 4, skinHealth: 3 },
      medium: { energy: 10, longevity: 8, skinHealth: 5 },
      high: { energy: 12, longevity: 10, skinHealth: 6 }
    },
    primaryRole: "Energy, longevity, skin",
    evidence: "Niacin: 15% lipid improvement. NMN: 2x NAD+",
    inStack: true
  },

  "vitamin-b5": {
    name: "Vitamin B5 (Pantothenic Acid)",
    category: "vitamin",
    forms: ["Calcium Pantothenate", "Pantothenic Acid"],
    unit: "mg",
    dosageRanges: {
      low: { min: 5, max: 50 },
      medium: { min: 50, max: 250 },
      high: { min: 250, max: 500 }
    },
    statBoosts: {
      low: { energy: 4, hormonalBalance: 3 },
      medium: { energy: 8, hormonalBalance: 5 },
      high: { energy: 10, hormonalBalance: 6 }
    },
    primaryRole: "Energy, hormone synthesis",
    evidence: "Studies: 10% adrenal support",
    inStack: true
  },

  "vitamin-b6": {
    name: "Vitamin B6 (Pyridoxine)",
    category: "vitamin",
    forms: ["Pyridoxine HCl", "P-5-P"],
    unit: "mg",
    dosageRanges: {
      low: { min: 1.7, max: 10 },
      medium: { min: 10, max: 25 },
      high: { min: 25, max: 50 }
    },
    statBoosts: {
      low: { mood: 4, focus: 3, hormonalBalance: 3 },
      medium: { mood: 8, focus: 5, hormonalBalance: 5 },
      high: { mood: 10, focus: 6, hormonalBalance: 6 }
    },
    primaryRole: "Mood, brain, hormones",
    evidence: "RCTs: 15% mood improvement",
    inStack: true
  },

  "vitamin-b7": {
    name: "Vitamin B7 (Biotin)",
    category: "vitamin",
    forms: ["D-Biotin"],
    unit: "mcg",
    dosageRanges: {
      low: { min: 30, max: 300 },
      medium: { min: 300, max: 1000 },
      high: { min: 1000, max: 2500 }
    },
    statBoosts: {
      low: { hairHealth: 5, skinHealth: 4 },
      medium: { hairHealth: 10, skinHealth: 8 },
      high: { hairHealth: 12, skinHealth: 10 }
    },
    primaryRole: "Hair, skin, nails",
    evidence: "Studies: 10-15% hair growth at 2,500 mcg",
    inStack: true
  },

  "vitamin-b9": {
    name: "Vitamin B9 (Folate)",
    category: "vitamin",
    forms: ["Folic Acid", "Methylfolate", "5-MTHF"],
    unit: "mcg",
    dosageRanges: {
      low: { min: 400, max: 600 },
      medium: { min: 600, max: 800 },
      high: { min: 800, max: 1000 }
    },
    statBoosts: {
      low: { longevity: 3, mood: 3 },
      medium: { longevity: 5, mood: 5 },
      high: { longevity: 6, mood: 6 }
    },
    primaryRole: "DNA repair, mood",
    evidence: "RCTs: 10% homocysteine drop",
    notes: "Use methylfolate for better efficacy",
    inStack: true
  },

  "vitamin-b12": {
    name: "Vitamin B12",
    category: "vitamin",
    forms: ["Cyanocobalamin", "Methylcobalamin", "Adenosylcobalamin"],
    unit: "mcg",
    dosageRanges: {
      low: { min: 2.4, max: 100 },
      medium: { min: 100, max: 250 },
      high: { min: 250, max: 500 }
    },
    statBoosts: {
      low: { energy: 5, focus: 4, mood: 3 },
      medium: { energy: 10, focus: 8, mood: 5 },
      high: { energy: 12, focus: 10, mood: 6 }
    },
    primaryRole: "Energy, brain, blood",
    evidence: "RCTs: 15-20% energy in vegans",
    inStack: true
  },

  "vitamin-c": {
    name: "Vitamin C",
    category: "vitamin",
    forms: ["Ascorbic Acid", "Sodium Ascorbate", "Calcium Ascorbate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 500, max: 1000 },
      medium: { min: 1000, max: 1500 },
      high: { min: 1500, max: 2000 }
    },
    statBoosts: {
      low: { immunity: 8, skinHealth: 5, antiInflammatory: 4 },
      medium: { immunity: 15, skinHealth: 10, antiInflammatory: 8 },
      high: { immunity: 18, skinHealth: 12, antiInflammatory: 10 }
    },
    primaryRole: "Immunity, skin, antioxidant",
    evidence: "RCTs: 20% immune boost at 1,000 mg",
    inStack: true
  },

  "vitamin-d3": {
    name: "Vitamin D3",
    category: "vitamin",
    forms: ["Cholecalciferol"],
    unit: "IU",
    dosageRanges: {
      low: { min: 2000, max: 3000 },
      medium: { min: 3000, max: 4000 },
      high: { min: 4000, max: 5000 }
    },
    statBoosts: {
      low: { boneHealth: 8, immunity: 5, mood: 4, strength: 3 },
      medium: { boneHealth: 15, immunity: 10, mood: 8, strength: 5 },
      high: { boneHealth: 18, immunity: 12, mood: 10, strength: 6 }
    },
    primaryRole: "Bone, immunity, mood",
    evidence: "Meta: 20-30% fracture risk drop",
    inStack: true
  },

  "vitamin-e": {
    name: "Vitamin E",
    category: "vitamin",
    forms: ["Alpha-Tocopherol", "Mixed Tocopherols", "Tocotrienols"],
    unit: "mg",
    dosageRanges: {
      low: { min: 15, max: 50 },
      medium: { min: 50, max: 100 },
      high: { min: 100, max: 200 }
    },
    statBoosts: {
      low: { antiInflammatory: 4, skinHealth: 3, heartHealth: 3 },
      medium: { antiInflammatory: 8, skinHealth: 5, heartHealth: 5 },
      high: { antiInflammatory: 10, skinHealth: 6, heartHealth: 6 }
    },
    primaryRole: "Antioxidant, skin, heart",
    evidence: "RCTs: 10% oxidative stress drop",
    inStack: true
  },

  "vitamin-k2": {
    name: "Vitamin K2",
    category: "vitamin",
    forms: ["MK-7", "MK-4"],
    unit: "mcg",
    dosageRanges: {
      low: { min: 100, max: 200 },
      medium: { min: 200, max: 400 },
      high: { min: 400, max: 600 }
    },
    statBoosts: {
      low: { boneHealth: 8, heartHealth: 4 },
      medium: { boneHealth: 15, heartHealth: 8 },
      high: { boneHealth: 18, heartHealth: 10 }
    },
    primaryRole: "Bone, heart",
    evidence: "Studies: 20% arterial stiffness drop",
    notes: "MK7 at 600 mcg + MK4 at 5 mg in stack",
    inStack: true
  },

  // MINERALS
  "calcium": {
    name: "Calcium",
    category: "mineral",
    forms: ["Calcium Citrate", "Calcium Carbonate", "Ca-AKG"],
    unit: "mg",
    dosageRanges: {
      low: { min: 500, max: 800 },
      medium: { min: 800, max: 1000 },
      high: { min: 1000, max: 1200 }
    },
    statBoosts: {
      low: { boneHealth: 5, strength: 3 },
      medium: { boneHealth: 10, strength: 5 },
      high: { boneHealth: 12, strength: 6 }
    },
    primaryRole: "Bone, muscle",
    evidence: "RCTs: 15% bone density gain",
    notes: "Ca-AKG (1 g) for longevity",
    inStack: true
  },

  "magnesium": {
    name: "Magnesium",
    category: "mineral",
    forms: ["Mg Glycinate", "Mg Citrate", "Mg L-Threonate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 250, max: 350 },
      medium: { min: 350, max: 450 },
      high: { min: 450, max: 500 }
    },
    statBoosts: {
      low: { sleep: 8, mood: 5, energy: 4, heartHealth: 3 },
      medium: { sleep: 15, mood: 10, energy: 8, heartHealth: 5 },
      high: { sleep: 18, mood: 12, energy: 10, heartHealth: 6 }
    },
    primaryRole: "Sleep, mood, energy",
    evidence: "RCTs: 15-20% sleep/mood gain",
    notes: "Sleep efficiency 95% achieved",
    inStack: true
  },

  "zinc": {
    name: "Zinc",
    category: "mineral",
    forms: ["Zinc Picolinate", "Zinc Citrate", "Zinc Glycinate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 8, max: 11 },
      medium: { min: 11, max: 15 },
      high: { min: 15, max: 20 }
    },
    statBoosts: {
      low: { immunity: 5, hairHealth: 4, hormonalBalance: 3 },
      medium: { immunity: 10, hairHealth: 8, hormonalBalance: 5 },
      high: { immunity: 12, hairHealth: 10, hormonalBalance: 6 }
    },
    primaryRole: "Immunity, hair, hormones",
    evidence: "Studies: 10-15% immune boost",
    inStack: true
  },

  "iron": {
    name: "Iron",
    category: "mineral",
    forms: ["Ferrous Bisglycinate", "Ferrous Sulfate", "Iron Citrate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 8, max: 12 },
      medium: { min: 12, max: 15 },
      high: { min: 15, max: 18 }
    },
    statBoosts: {
      low: { energy: 5 },
      medium: { energy: 10 },
      high: { energy: 12 }
    },
    primaryRole: "Energy, blood",
    evidence: "RCTs: 20% fatigue reduction in deficient",
    warnings: "Avoid overuse (toxicity risk)",
    inStack: false
  },

  "selenium": {
    name: "Selenium",
    category: "mineral",
    forms: ["Selenomethionine", "Sodium Selenite"],
    unit: "mcg",
    dosageRanges: {
      low: { min: 55, max: 100 },
      medium: { min: 100, max: 150 },
      high: { min: 150, max: 200 }
    },
    statBoosts: {
      low: { immunity: 4, antiInflammatory: 3 },
      medium: { immunity: 8, antiInflammatory: 5 },
      high: { immunity: 10, antiInflammatory: 6 }
    },
    primaryRole: "Antioxidant, thyroid",
    evidence: "RCTs: 15% thyroid function gain",
    inStack: true
  },

  "iodine": {
    name: "Iodine",
    category: "mineral",
    forms: ["Potassium Iodide", "Kelp"],
    unit: "mcg",
    dosageRanges: {
      low: { min: 150, max: 200 },
      medium: { min: 200, max: 250 },
      high: { min: 250, max: 300 }
    },
    statBoosts: {
      low: { hormonalBalance: 4, energy: 3 },
      medium: { hormonalBalance: 8, energy: 5 },
      high: { hormonalBalance: 10, energy: 6 }
    },
    primaryRole: "Thyroid, metabolism",
    evidence: "Studies: 10% thyroid support",
    inStack: true
  },

  "chromium": {
    name: "Chromium",
    category: "mineral",
    forms: ["Chromium Picolinate", "Chromium Polynicotinate"],
    unit: "mcg",
    dosageRanges: {
      low: { min: 200, max: 250 },
      medium: { min: 250, max: 350 },
      high: { min: 350, max: 400 }
    },
    statBoosts: {
      low: { hormonalBalance: 5 },
      medium: { hormonalBalance: 10 },
      high: { hormonalBalance: 12 }
    },
    primaryRole: "Glucose control",
    evidence: "RCTs: 20-25% insulin sensitivity gain",
    inStack: true
  },

  "potassium": {
    name: "Potassium",
    category: "mineral",
    forms: ["Potassium Citrate", "Potassium Chloride"],
    unit: "mg",
    dosageRanges: {
      low: { min: 99, max: 200 },
      medium: { min: 200, max: 350 },
      high: { min: 350, max: 500 }
    },
    statBoosts: {
      low: { heartHealth: 4, strength: 3 },
      medium: { heartHealth: 8, strength: 5 },
      high: { heartHealth: 10, strength: 6 }
    },
    primaryRole: "Heart, muscle",
    evidence: "Studies: 10% BP reduction",
    notes: "Dietary focus in protocol",
    inStack: true
  },

  "manganese": {
    name: "Manganese",
    category: "mineral",
    forms: ["Manganese Citrate", "Manganese Gluconate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 2, max: 3 },
      medium: { min: 3, max: 4 },
      high: { min: 4, max: 5 }
    },
    statBoosts: {
      low: { boneHealth: 3 },
      medium: { boneHealth: 5 },
      high: { boneHealth: 6 }
    },
    primaryRole: "Bone, metabolism",
    evidence: "RCTs: 10% bone support",
    inStack: true
  },

  "copper": {
    name: "Copper",
    category: "mineral",
    forms: ["Copper Glycinate", "Copper Citrate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 0.9, max: 1.2 },
      medium: { min: 1.2, max: 1.6 },
      high: { min: 1.6, max: 2 }
    },
    statBoosts: {
      low: { immunity: 3 },
      medium: { immunity: 5 },
      high: { immunity: 6 }
    },
    primaryRole: "Blood, antioxidant",
    evidence: "Studies: 10% enzyme support",
    notes: "Balanced with zinc in stack",
    inStack: true
  },

  // AMINO ACIDS
  "taurine": {
    name: "Taurine",
    category: "amino-acid",
    forms: ["L-Taurine"],
    unit: "g",
    dosageRanges: {
      low: { min: 1, max: 1.5 },
      medium: { min: 1.5, max: 2.5 },
      high: { min: 2.5, max: 3 }
    },
    statBoosts: {
      low: { heartHealth: 5, energy: 4, longevity: 6 },
      medium: { heartHealth: 10, energy: 8, longevity: 12 },
      high: { heartHealth: 12, energy: 10, longevity: 15 }
    },
    primaryRole: "Heart, energy, longevity",
    evidence: "Cohorts: 20% CVD risk drop",
    notes: "Protocol: 3 g",
    inStack: true
  },

  "l-tyrosine": {
    name: "L-Tyrosine",
    category: "amino-acid",
    forms: ["L-Tyrosine", "N-Acetyl-L-Tyrosine"],
    unit: "mg",
    dosageRanges: {
      low: { min: 500, max: 750 },
      medium: { min: 750, max: 1000 },
      high: { min: 1000, max: 1500 }
    },
    statBoosts: {
      low: { focus: 5, mood: 4 },
      medium: { focus: 10, mood: 8 },
      high: { focus: 12, mood: 10 }
    },
    primaryRole: "Focus, mood",
    evidence: "RCTs: 15% cognitive boost under stress",
    inStack: true
  },

  "l-theanine": {
    name: "L-Theanine",
    category: "amino-acid",
    forms: ["L-Theanine", "Suntheanine"],
    unit: "mg",
    dosageRanges: {
      low: { min: 100, max: 150 },
      medium: { min: 150, max: 200 },
      high: { min: 200, max: 400 }
    },
    statBoosts: {
      low: { mood: 4, sleep: 3, focus: 3 },
      medium: { mood: 8, sleep: 5, focus: 5 },
      high: { mood: 10, sleep: 6, focus: 6 }
    },
    primaryRole: "Mood, sleep, focus",
    evidence: "RCTs: 15% relaxation gain",
    inStack: true
  },

  "glycine": {
    name: "Glycine",
    category: "amino-acid",
    forms: ["Glycine"],
    unit: "g",
    dosageRanges: {
      low: { min: 3, max: 4 },
      medium: { min: 4, max: 5 },
      high: { min: 5, max: 6 }
    },
    statBoosts: {
      low: { sleep: 5, skinHealth: 3 },
      medium: { sleep: 10, skinHealth: 5 },
      high: { sleep: 12, skinHealth: 6 }
    },
    primaryRole: "Sleep, skin",
    evidence: "RCTs: 15% sleep quality gain",
    inStack: true
  },

  "creatine": {
    name: "Creatine",
    category: "amino-acid",
    forms: ["Creatine Monohydrate", "Creatine HCl", "Creapure"],
    unit: "g",
    dosageRanges: {
      low: { min: 2.5, max: 3.5 },
      medium: { min: 3.5, max: 5 },
      high: { min: 5, max: 7 }
    },
    statBoosts: {
      low: { strength: 8, energy: 5, focus: 3 },
      medium: { strength: 15, energy: 10, focus: 5 },
      high: { strength: 18, energy: 12, focus: 6 }
    },
    primaryRole: "Muscle, energy, brain",
    evidence: "Meta: 5-20% strength gain",
    notes: "Lean mass +10%",
    inStack: true
  },

  // ANTIOXIDANTS/PHYTOCHEMICALS
  "curcumin": {
    name: "Curcumin",
    category: "phytochemical",
    forms: ["Curcumin", "Meriva", "Longvida", "Theracurmin"],
    unit: "g",
    dosageRanges: {
      low: { min: 1, max: 1.5 },
      medium: { min: 1.5, max: 2 },
      high: { min: 2, max: 2.5 }
    },
    statBoosts: {
      low: { antiInflammatory: 10, jointHealth: 5, liverHealth: 4 },
      medium: { antiInflammatory: 20, jointHealth: 10, liverHealth: 8 },
      high: { antiInflammatory: 25, jointHealth: 12, liverHealth: 10 }
    },
    primaryRole: "Anti-inflammatory, joint, liver",
    evidence: "Meta: 20-30% pain drop",
    notes: "hsCRP -50%",
    inStack: true
  },

  "fisetin": {
    name: "Fisetin",
    category: "phytochemical",
    forms: ["Fisetin", "Novusetin"],
    unit: "mg",
    dosageRanges: {
      low: { min: 100, max: 250 },
      medium: { min: 250, max: 500 },
      high: { min: 500, max: 750 }
    },
    statBoosts: {
      low: { longevity: 8, antiInflammatory: 10 },
      medium: { longevity: 15, antiInflammatory: 20 },
      high: { longevity: 18, antiInflammatory: 25 }
    },
    primaryRole: "Longevity, anti-inflammatory",
    evidence: "Pilot: 20-30% senescence drop",
    notes: "Senescence -21%",
    cycled: true,
    inStack: true
  },

  "sulforaphane": {
    name: "Sulforaphane",
    category: "phytochemical",
    forms: ["BroccoMax", "Sulforaphane Glucosinolate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 10, max: 15 },
      medium: { min: 15, max: 20 },
      high: { min: 20, max: 30 }
    },
    statBoosts: {
      low: { gutHealth: 5, liverHealth: 4 },
      medium: { gutHealth: 10, liverHealth: 8 },
      high: { gutHealth: 12, liverHealth: 10 }
    },
    primaryRole: "Gut, liver, detox",
    evidence: "RCTs: 15-20% detox enzyme gain",
    inStack: true
  },

  "resveratrol": {
    name: "Resveratrol",
    category: "phytochemical",
    forms: ["Trans-Resveratrol", "Pterostilbene"],
    unit: "mg",
    dosageRanges: {
      low: { min: 100, max: 250 },
      medium: { min: 250, max: 500 },
      high: { min: 500, max: 1000 }
    },
    statBoosts: {
      low: { longevity: 4, heartHealth: 3 },
      medium: { longevity: 8, heartHealth: 5 },
      high: { longevity: 10, heartHealth: 6 }
    },
    primaryRole: "Longevity, heart",
    evidence: "RCTs: 10% CV benefit",
    notes: "Low dose in stack",
    inStack: true
  },

  "quercetin": {
    name: "Quercetin",
    category: "phytochemical",
    forms: ["Quercetin", "Quercetin Phytosome"],
    unit: "mg",
    dosageRanges: {
      low: { min: 250, max: 400 },
      medium: { min: 400, max: 500 },
      high: { min: 500, max: 750 }
    },
    statBoosts: {
      low: { antiInflammatory: 5, immunity: 4 },
      medium: { antiInflammatory: 10, immunity: 8 },
      high: { antiInflammatory: 12, immunity: 10 }
    },
    primaryRole: "Anti-inflammatory, immunity",
    evidence: "RCTs: 15% inflammation drop",
    notes: "Complements fisetin",
    inStack: true
  },

  "astaxanthin": {
    name: "Astaxanthin",
    category: "phytochemical",
    forms: ["Natural Astaxanthin", "AstaReal"],
    unit: "mg",
    dosageRanges: {
      low: { min: 4, max: 6 },
      medium: { min: 6, max: 9 },
      high: { min: 9, max: 12 }
    },
    statBoosts: {
      low: { skinHealth: 5, vision: 4 },
      medium: { skinHealth: 10, vision: 8 },
      high: { skinHealth: 12, vision: 10 }
    },
    primaryRole: "Skin, vision, antioxidant",
    evidence: "RCTs: 10-20% UV protection",
    inStack: true
  },

  "lutein-zeaxanthin": {
    name: "Lutein/Zeaxanthin",
    category: "phytochemical",
    forms: ["Lutein", "Zeaxanthin", "FloraGLO"],
    unit: "mg",
    dosageRanges: {
      low: { min: 10, max: 15 },
      medium: { min: 15, max: 20 },
      high: { min: 20, max: 25 }
    },
    statBoosts: {
      low: { vision: 5 },
      medium: { vision: 10 },
      high: { vision: 12 }
    },
    primaryRole: "Vision health",
    evidence: "RCTs: 15-20% macular protection",
    inStack: true
  },

  "coq10": {
    name: "CoQ10",
    category: "phytochemical",
    forms: ["Ubiquinone", "Ubiquinol", "PQQ"],
    unit: "mg",
    dosageRanges: {
      low: { min: 100, max: 150 },
      medium: { min: 150, max: 200 },
      high: { min: 200, max: 300 }
    },
    statBoosts: {
      low: { energy: 5, heartHealth: 4, oralHealth: 3 },
      medium: { energy: 10, heartHealth: 8, oralHealth: 5 },
      high: { energy: 12, heartHealth: 10, oralHealth: 6 }
    },
    primaryRole: "Energy, heart, oral",
    evidence: "RCTs: 15% energy in deficient",
    notes: "Protocol uses gel",
    inStack: true
  },

  "evoo-polyphenols": {
    name: "EVOO Polyphenols",
    category: "phytochemical",
    forms: ["Hydroxytyrosol", "Oleuropein", "Oleocanthal"],
    unit: "mg",
    dosageRanges: {
      low: { min: 400, max: 500 },
      medium: { min: 500, max: 650 },
      high: { min: 650, max: 800 }
    },
    statBoosts: {
      low: { heartHealth: 5, antiInflammatory: 8 },
      medium: { heartHealth: 10, antiInflammatory: 15 },
      high: { heartHealth: 12, antiInflammatory: 18 }
    },
    primaryRole: "Heart, anti-inflammatory",
    evidence: "PREDIMED: 30% CVD event drop",
    notes: "Lipids top 1%",
    inStack: true
  },

  // OTHER BIOACTIVES
  "ca-akg": {
    name: "Ca-AKG",
    category: "bioactive",
    forms: ["Calcium Alpha-Ketoglutarate"],
    unit: "g",
    dosageRanges: {
      low: { min: 1, max: 1.5 },
      medium: { min: 1.5, max: 2 },
      high: { min: 2, max: 2.5 }
    },
    statBoosts: {
      low: { longevity: 6, energy: 5 },
      medium: { longevity: 12, energy: 10 },
      high: { longevity: 15, energy: 12 }
    },
    primaryRole: "Longevity, energy",
    evidence: "Trials: 12% frailty reduction",
    notes: "Bio age pace 0.48",
    inStack: true
  },

  "nmn": {
    name: "NMN",
    category: "bioactive",
    forms: ["Nicotinamide Mononucleotide", "NMN", "Uthever NMN"],
    unit: "mg",
    dosageRanges: {
      low: { min: 500, max: 750 },
      medium: { min: 750, max: 1000 },
      high: { min: 1000, max: 1250 }
    },
    statBoosts: {
      low: { energy: 10, longevity: 8, focus: 5 },
      medium: { energy: 20, longevity: 15, focus: 10 },
      high: { energy: 25, longevity: 18, focus: 12 }
    },
    primaryRole: "Energy, longevity, brain",
    evidence: "RCTs: 2x NAD+, 10-15% stamina",
    notes: "NAD+ youthful levels",
    inStack: true
  },

  "hyaluronic-acid": {
    name: "Hyaluronic Acid",
    category: "bioactive",
    forms: ["Hyaluronic Acid", "Sodium Hyaluronate"],
    unit: "mg",
    dosageRanges: {
      low: { min: 150, max: 200 },
      medium: { min: 200, max: 250 },
      high: { min: 250, max: 300 }
    },
    statBoosts: {
      low: { skinHealth: 5, jointHealth: 8 },
      medium: { skinHealth: 10, jointHealth: 15 },
      high: { skinHealth: 12, jointHealth: 18 }
    },
    primaryRole: "Skin, joints",
    evidence: "RCTs: 10-20% hydration/mobility",
    inStack: true
  },

  "glutathione": {
    name: "Glutathione",
    category: "bioactive",
    forms: ["L-Glutathione", "Liposomal Glutathione", "S-Acetyl Glutathione"],
    unit: "mg",
    dosageRanges: {
      low: { min: 250, max: 350 },
      medium: { min: 350, max: 500 },
      high: { min: 500, max: 750 }
    },
    statBoosts: {
      low: { immunity: 5, liverHealth: 4 },
      medium: { immunity: 10, liverHealth: 8 },
      high: { immunity: 12, liverHealth: 10 }
    },
    primaryRole: "Immunity, detox",
    evidence: "RCTs: 20-40% oxidative stress drop",
    inStack: true
  },

  "prebiotics": {
    name: "Prebiotics",
    category: "bioactive",
    forms: ["GOS", "Inulin", "FOS", "XOS"],
    unit: "g",
    dosageRanges: {
      low: { min: 1, max: 2 },
      medium: { min: 2, max: 3.5 },
      high: { min: 3.5, max: 5 }
    },
    statBoosts: {
      low: { gutHealth: 5 },
      medium: { gutHealth: 10 },
      high: { gutHealth: 12 }
    },
    primaryRole: "Gut health",
    evidence: "RCTs: 15-20% microbiome diversity",
    notes: "Gut optimal",
    inStack: true
  },

  "dhea": {
    name: "DHEA",
    category: "bioactive",
    forms: ["DHEA", "7-Keto DHEA"],
    unit: "mg",
    dosageRanges: {
      low: { min: 25, max: 35 },
      medium: { min: 35, max: 50 },
      high: { min: 50, max: 75 }
    },
    statBoosts: {
      low: { hormonalBalance: 5, mood: 3 },
      medium: { hormonalBalance: 10, mood: 5 },
      high: { hormonalBalance: 12, mood: 6 }
    },
    primaryRole: "Hormones, mood",
    evidence: "RCTs: 10-15% testosterone gain",
    notes: "Level 735 ng/dL",
    inStack: true
  },

  "genistein": {
    name: "Genistein",
    category: "bioactive",
    forms: ["Genistein", "Soy Isoflavones"],
    unit: "mg",
    dosageRanges: {
      low: { min: 50, max: 75 },
      medium: { min: 75, max: 100 },
      high: { min: 100, max: 125 }
    },
    statBoosts: {
      low: { boneHealth: 5, hormonalBalance: 3 },
      medium: { boneHealth: 10, hormonalBalance: 5 },
      high: { boneHealth: 12, hormonalBalance: 6 }
    },
    primaryRole: "Bone, hormones",
    evidence: "RCTs: 15% bone density gain",
    inStack: true
  },

  // Additional common supplements
  "omega-3": {
    name: "Omega-3",
    category: "fatty-acid",
    forms: ["Fish Oil", "Krill Oil", "Algae Oil"],
    unit: "mg",
    dosageRanges: {
      low: { min: 1000, max: 1500 },
      medium: { min: 1500, max: 2000 },
      high: { min: 2000, max: 3000 }
    },
    statBoosts: {
      low: { heartHealth: 5, antiInflammatory: 4, focus: 3 },
      medium: { heartHealth: 10, antiInflammatory: 8, focus: 6 },
      high: { heartHealth: 12, antiInflammatory: 10, focus: 8 }
    },
    primaryRole: "Heart, inflammation, brain",
    evidence: "Meta: 15-20% CVD risk reduction",
    notes: "EPA:DHA ratio important",
    inStack: true
  },

  "ashwagandha": {
    name: "Ashwagandha",
    category: "adaptogen",
    forms: ["KSM-66", "Sensoril", "Shoden"],
    unit: "mg",
    dosageRanges: {
      low: { min: 300, max: 500 },
      medium: { min: 500, max: 600 },
      high: { min: 600, max: 800 }
    },
    statBoosts: {
      low: { mood: 5, sleep: 4, hormonalBalance: 3 },
      medium: { mood: 10, sleep: 8, hormonalBalance: 6 },
      high: { mood: 12, sleep: 10, hormonalBalance: 8 }
    },
    primaryRole: "Stress, sleep, hormones",
    evidence: "RCTs: 30% cortisol reduction",
    inStack: true
  },

  "lions-mane": {
    name: "Lion's Mane",
    category: "mushroom",
    forms: ["Fruiting Body", "Mycelium", "8:1 Extract"],
    unit: "mg",
    dosageRanges: {
      low: { min: 500, max: 1000 },
      medium: { min: 1000, max: 1500 },
      high: { min: 1500, max: 2000 }
    },
    statBoosts: {
      low: { focus: 5, mood: 3 },
      medium: { focus: 10, mood: 6 },
      high: { focus: 12, mood: 8 }
    },
    primaryRole: "Cognitive function, nerve health",
    evidence: "Studies: NGF production increase",
    inStack: true
  },

  "nac": {
    name: "NAC",
    category: "amino-acid",
    forms: ["N-Acetyl Cysteine", "NAC Sustain"],
    unit: "mg",
    dosageRanges: {
      low: { min: 600, max: 900 },
      medium: { min: 900, max: 1200 },
      high: { min: 1200, max: 1800 }
    },
    statBoosts: {
      low: { liverHealth: 5, immunity: 4 },
      medium: { liverHealth: 10, immunity: 8 },
      high: { liverHealth: 12, immunity: 10 }
    },
    primaryRole: "Liver detox, glutathione precursor",
    evidence: "RCTs: Glutathione increase",
    inStack: true
  },

  "collagen": {
    name: "Collagen",
    category: "protein",
    forms: ["Type I & III", "Marine Collagen", "Multi-Collagen"],
    unit: "g",
    dosageRanges: {
      low: { min: 5, max: 10 },
      medium: { min: 10, max: 15 },
      high: { min: 15, max: 20 }
    },
    statBoosts: {
      low: { skinHealth: 5, jointHealth: 4, hairHealth: 3 },
      medium: { skinHealth: 10, jointHealth: 8, hairHealth: 6 },
      high: { skinHealth: 12, jointHealth: 10, hairHealth: 8 }
    },
    primaryRole: "Skin, joints, hair",
    evidence: "RCTs: 15% skin elasticity improvement",
    inStack: true
  },

  "rhodiola": {
    name: "Rhodiola",
    category: "adaptogen",
    forms: ["Rhodiola Rosea", "SHR-5"],
    unit: "mg",
    dosageRanges: {
      low: { min: 100, max: 200 },
      medium: { min: 200, max: 400 },
      high: { min: 400, max: 600 }
    },
    statBoosts: {
      low: { energy: 5, mood: 4, focus: 3 },
      medium: { energy: 10, mood: 8, focus: 6 },
      high: { energy: 12, mood: 10, focus: 8 }
    },
    primaryRole: "Energy, stress adaptation",
    evidence: "RCTs: Fatigue reduction",
    inStack: true
  }
};

// Helper functions for dosage calculations
export function calculateStatBoosts(nutrientKey, dosage, unit) {
  const nutrient = MICRONUTRIENT_DATABASE[nutrientKey];
  if (!nutrient) return {};

  // Convert dosage to standard unit if needed
  const standardDosage = convertToStandardUnit(dosage, unit, nutrient.unit);
  
  // Determine dosage level
  let level = 'low';
  if (standardDosage >= nutrient.dosageRanges.medium.min) {
    level = 'medium';
  }
  if (standardDosage >= nutrient.dosageRanges.high.min) {
    level = 'high';
  }

  return nutrient.statBoosts[level] || {};
}

export function convertToStandardUnit(value, fromUnit, toUnit) {
  // Simple conversion logic - expand as needed
  const conversions = {
    'g_to_mg': 1000,
    'mg_to_g': 0.001,
    'mcg_to_mg': 0.001,
    'mg_to_mcg': 1000,
    'IU_to_mcg': 0.025, // for Vitamin D3
    'mcg_to_IU': 40     // for Vitamin D3
  };

  if (fromUnit === toUnit) return value;

  const conversionKey = `${fromUnit}_to_${toUnit}`;
  if (conversions[conversionKey]) {
    return value * conversions[conversionKey];
  }

  return value; // Return unchanged if conversion not found
}

// Get all nutrients by category
export function getNutrientsByCategory(category) {
  return Object.entries(MICRONUTRIENT_DATABASE)
    .filter(([key, nutrient]) => nutrient.category === category)
    .reduce((acc, [key, nutrient]) => {
      acc[key] = nutrient;
      return acc;
    }, {});
}

// Search nutrients by name or form
export function searchNutrients(query) {
  const searchTerm = query.toLowerCase();
  return Object.entries(MICRONUTRIENT_DATABASE)
    .filter(([key, nutrient]) => {
      return nutrient.name.toLowerCase().includes(searchTerm) ||
             nutrient.forms.some(form => form.toLowerCase().includes(searchTerm)) ||
             key.includes(searchTerm);
    })
    .reduce((acc, [key, nutrient]) => {
      acc[key] = nutrient;
      return acc;
    }, {});
}

// Get nutrient recommendations based on health goals
export function getRecommendationsForGoal(healthStat) {
  const recommendations = [];
  
  Object.entries(MICRONUTRIENT_DATABASE).forEach(([key, nutrient]) => {
    // Check if this nutrient affects the desired health stat
    const hasEffect = Object.values(nutrient.statBoosts).some(boosts => 
      Object.keys(boosts).includes(healthStat)
    );
    
    if (hasEffect) {
      // Calculate max possible boost for this stat
      const maxBoost = Math.max(
        nutrient.statBoosts.low[healthStat] || 0,
        nutrient.statBoosts.medium[healthStat] || 0,
        nutrient.statBoosts.high[healthStat] || 0
      );
      
      recommendations.push({
        key,
        nutrient,
        maxBoost,
        recommendedDose: nutrient.dosageRanges.medium
      });
    }
  });
  
  // Sort by max boost descending
  return recommendations.sort((a, b) => b.maxBoost - a.maxBoost);
}

// Validate dosage safety
export function validateDosage(nutrientKey, dosage, unit) {
  const nutrient = MICRONUTRIENT_DATABASE[nutrientKey];
  if (!nutrient) return { valid: false, message: "Nutrient not found" };
  
  const standardDosage = convertToStandardUnit(dosage, unit, nutrient.unit);
  
  if (standardDosage > nutrient.dosageRanges.high.max) {
    return {
      valid: false,
      message: `Dosage exceeds safe maximum (${nutrient.dosageRanges.high.max} ${nutrient.unit})`,
      warning: nutrient.warnings
    };
  }
  
  return { valid: true, level: getDosageLevel(nutrient, standardDosage) };
}

function getDosageLevel(nutrient, dosage) {
  if (dosage >= nutrient.dosageRanges.high.min) return 'high';
  if (dosage >= nutrient.dosageRanges.medium.min) return 'medium';
  return 'low';
}

// Calculate XP for gamification
export function calculateXP(nutrientKey, dosage, unit) {
  const nutrient = MICRONUTRIENT_DATABASE[nutrientKey];
  if (!nutrient) return 0;
  
  const level = getDosageLevel(nutrient, convertToStandardUnit(dosage, unit, nutrient.unit));
  const xpMap = { low: 10, medium: 20, high: 30 };
  
  // Bonus XP for certain categories
  const categoryBonus = {
    'bioactive': 10,
    'phytochemical': 5,
    'adaptogen': 5
  };
  
  return xpMap[level] + (categoryBonus[nutrient.category] || 0);
}

export default MICRONUTRIENT_DATABASE;