// Brand Product Database
// Contains specific brand products with exact formulations

export const BRAND_DATABASE = {
  // NMN Products
  "donotage-nmn-500": {
    brand: "DoNotAge",
    productName: "Pure NMN Powder",
    supplement: "nmn",
    servingSize: "500mg",
    dosagePerServing: 500,
    unit: "mg",
    form: "powder",
    purity: "99%+",
    thirdPartyTested: true,
    description: "Pharmaceutical grade NMN powder, 99%+ purity",
    url: "donotage.org/products/nmn",
    price: 99,
    servings: 60
  },
  "renue-nmn-300": {
    brand: "Renue By Science",
    productName: "LIPO NMN",
    supplement: "nmn",
    servingSize: "300mg",
    dosagePerServing: 300,
    unit: "mg",
    form: "liposomal",
    purity: "98%+",
    thirdPartyTested: true,
    description: "Liposomal NMN for enhanced bioavailability",
    price: 75,
    servings: 90
  },
  "prohealth-nmn-1000": {
    brand: "ProHealth Longevity",
    productName: "NMN Pro 1000",
    supplement: "nmn",
    servingSize: "1000mg",
    dosagePerServing: 1000,
    unit: "mg",
    form: "capsule",
    purity: "99%+",
    thirdPartyTested: true,
    description: "High-dose NMN capsules with Uthever® NMN",
    price: 149,
    servings: 30
  },

  // Omega-3 Products
  "nordic-naturals-ultimate": {
    brand: "Nordic Naturals",
    productName: "Ultimate Omega",
    supplement: "omega-3",
    servingSize: "2 softgels",
    dosagePerServing: 1280,
    unit: "mg",
    form: "softgel",
    epa: 650,
    dha: 450,
    thirdPartyTested: true,
    description: "1280mg Omega-3 (650mg EPA, 450mg DHA) per serving",
    price: 47.95,
    servings: 60
  },
  "sports-research-triple": {
    brand: "Sports Research",
    productName: "Triple Strength Omega-3",
    supplement: "omega-3",
    servingSize: "1 softgel",
    dosagePerServing: 1250,
    unit: "mg",
    form: "softgel",
    epa: 647,
    dha: 253,
    thirdPartyTested: true,
    description: "1250mg Omega-3 (647mg EPA, 253mg DHA) per softgel",
    price: 36.95,
    servings: 90
  },
  "carlson-elite-gems": {
    brand: "Carlson Labs",
    productName: "Elite Omega-3 Gems",
    supplement: "omega-3",
    servingSize: "2 softgels",
    dosagePerServing: 1600,
    unit: "mg",
    form: "softgel",
    epa: 800,
    dha: 600,
    thirdPartyTested: true,
    description: "Professional strength 1600mg Omega-3",
    price: 44.90,
    servings: 45
  },

  // Magnesium Products
  "thorne-magnesium-glycinate": {
    brand: "Thorne",
    productName: "Magnesium Bisglycinate",
    supplement: "magnesium",
    servingSize: "1 capsule",
    dosagePerServing: 200,
    unit: "mg",
    form: "capsule",
    chelated: true,
    thirdPartyTested: true,
    description: "200mg highly absorbable magnesium glycinate",
    price: 44,
    servings: 90
  },
  "pure-encapsulations-mag": {
    brand: "Pure Encapsulations",
    productName: "Magnesium Glycinate",
    supplement: "magnesium",
    servingSize: "1 capsule",
    dosagePerServing: 120,
    unit: "mg",
    form: "capsule",
    chelated: true,
    thirdPartyTested: true,
    description: "120mg magnesium glycinate for sensitive stomachs",
    price: 23.60,
    servings: 90
  },
  "nootropics-depot-magtein": {
    brand: "Nootropics Depot",
    productName: "Magtein® Magnesium L-Threonate",
    supplement: "magnesium",
    servingSize: "3 capsules",
    dosagePerServing: 144,
    unit: "mg",
    form: "capsule",
    type: "l-threonate",
    thirdPartyTested: true,
    description: "Patented Magtein® for cognitive support - 144mg elemental Mg",
    price: 39.99,
    servings: 30
  },

  // Vitamin D3 Products
  "now-foods-d3-5000": {
    brand: "NOW Foods",
    productName: "Vitamin D-3 5000 IU",
    supplement: "vitamin-d3",
    servingSize: "1 softgel",
    dosagePerServing: 5000,
    unit: "IU",
    form: "softgel",
    thirdPartyTested: true,
    description: "5000 IU Vitamin D3 in olive oil base",
    price: 11.99,
    servings: 240
  },
  "thorne-d3-k2": {
    brand: "Thorne",
    productName: "Vitamin D3/K2",
    supplement: "vitamin-d3",
    servingSize: "1 drop",
    dosagePerServing: 1000,
    unit: "IU",
    form: "liquid",
    additionalIngredients: "K2 (MK-4) 200mcg",
    thirdPartyTested: true,
    description: "1000 IU D3 + 200mcg K2 per drop",
    price: 27,
    servings: 600
  },
  "life-extension-d3": {
    brand: "Life Extension",
    productName: "Vitamin D3 7000 IU",
    supplement: "vitamin-d3",
    servingSize: "1 softgel",
    dosagePerServing: 7000,
    unit: "IU",
    form: "softgel",
    thirdPartyTested: true,
    description: "High-potency 7000 IU Vitamin D3",
    price: 11.25,
    servings: 60
  },

  // Ashwagandha Products
  "ksm66-jarrow": {
    brand: "Jarrow Formulas",
    productName: "Ashwagandha KSM-66",
    supplement: "ashwagandha",
    servingSize: "1 capsule",
    dosagePerServing: 300,
    unit: "mg",
    form: "capsule",
    extract: "KSM-66®",
    withanolides: "5%",
    thirdPartyTested: true,
    description: "300mg KSM-66® Ashwagandha extract, 5% withanolides",
    price: 17.96,
    servings: 120
  },
  "goli-ashwa-gummies": {
    brand: "Goli Nutrition",
    productName: "Ashwa Gummies",
    supplement: "ashwagandha",
    servingSize: "2 gummies",
    dosagePerServing: 600,
    unit: "mg",
    form: "gummy",
    extract: "KSM-66®",
    thirdPartyTested: true,
    description: "600mg KSM-66® Ashwagandha in mixed berry gummies",
    price: 19,
    servings: 30
  },
  "nootropics-depot-shoden": {
    brand: "Nootropics Depot",
    productName: "Shoden® Ashwagandha",
    supplement: "ashwagandha",
    servingSize: "1 capsule",
    dosagePerServing: 120,
    unit: "mg",
    form: "capsule",
    extract: "Shoden®",
    withanolides: "35%",
    thirdPartyTested: true,
    description: "120mg Shoden® extract with 35% withanolides",
    price: 19.99,
    servings: 60
  },

  // Lion's Mane Products
  "host-defense-lions-mane": {
    brand: "Host Defense",
    productName: "Lion's Mane",
    supplement: "lions-mane",
    servingSize: "2 capsules",
    dosagePerServing: 1000,
    unit: "mg",
    form: "capsule",
    type: "mycelium",
    organic: true,
    thirdPartyTested: true,
    description: "1g organic Lion's Mane mycelium",
    price: 31.96,
    servings: 30
  },
  "real-mushrooms-lions": {
    brand: "Real Mushrooms",
    productName: "Lion's Mane Extract",
    supplement: "lions-mane",
    servingSize: "2 capsules",
    dosagePerServing: 1000,
    unit: "mg",
    form: "capsule",
    type: "fruiting body",
    betaGlucans: ">25%",
    thirdPartyTested: true,
    description: "1g fruiting body extract with >25% beta-glucans",
    price: 34.95,
    servings: 60
  },
  "nootropics-depot-8to1": {
    brand: "Nootropics Depot",
    productName: "Lion's Mane 8:1 Extract",
    supplement: "lions-mane",
    servingSize: "1 capsule",
    dosagePerServing: 500,
    unit: "mg",
    form: "capsule",
    type: "dual extract",
    ratio: "8:1",
    thirdPartyTested: true,
    description: "500mg 8:1 dual water/ethanol extract",
    price: 29.99,
    servings: 60
  },

  // Creatine Products
  "thorne-creatine": {
    brand: "Thorne",
    productName: "Creatine Monohydrate",
    supplement: "creatine",
    servingSize: "1 scoop",
    dosagePerServing: 5,
    unit: "g",
    form: "powder",
    type: "monohydrate",
    creapure: true,
    thirdPartyTested: true,
    description: "5g Creapure® creatine monohydrate",
    price: 50,
    servings: 90
  },
  "optimum-nutrition-creatine": {
    brand: "Optimum Nutrition",
    productName: "Micronized Creatine",
    supplement: "creatine",
    servingSize: "1 teaspoon",
    dosagePerServing: 5,
    unit: "g",
    form: "powder",
    type: "monohydrate",
    micronized: true,
    thirdPartyTested: true,
    description: "5g micronized creatine monohydrate",
    price: 47.99,
    servings: 120
  },
  "muscletech-cell-tech": {
    brand: "MuscleTech",
    productName: "Cell-Tech Elite",
    supplement: "creatine",
    servingSize: "1 scoop",
    dosagePerServing: 5,
    unit: "g",
    form: "powder",
    type: "monohydrate + HCl",
    additionalIngredients: "BCAAs, taurine",
    thirdPartyTested: true,
    description: "5g creatine blend with BCAAs and recovery matrix",
    price: 39.99,
    servings: 20
  },

  // NAC Products
  "now-nac-600": {
    brand: "NOW Foods",
    productName: "NAC 600mg",
    supplement: "nac",
    servingSize: "1 capsule",
    dosagePerServing: 600,
    unit: "mg",
    form: "capsule",
    additionalIngredients: "Selenium 25mcg, Molybdenum 50mcg",
    thirdPartyTested: true,
    description: "600mg NAC with selenium and molybdenum",
    price: 19.99,
    servings: 100
  },
  "jarrow-nac-sustain": {
    brand: "Jarrow Formulas",
    productName: "NAC Sustain",
    supplement: "nac",
    servingSize: "1 tablet",
    dosagePerServing: 600,
    unit: "mg",
    form: "tablet",
    sustainedRelease: true,
    thirdPartyTested: true,
    description: "600mg sustained-release NAC",
    price: 23.96,
    servings: 100
  },
  "thorne-nac": {
    brand: "Thorne",
    productName: "NAC",
    supplement: "nac",
    servingSize: "1 capsule",
    dosagePerServing: 500,
    unit: "mg",
    form: "capsule",
    thirdPartyTested: true,
    description: "500mg pharmaceutical-grade NAC",
    price: 28,
    servings: 90
  },

  // Quercetin Products
  "thorne-quercetin": {
    brand: "Thorne",
    productName: "Quercetin Phytosome",
    supplement: "quercetin",
    servingSize: "2 capsules",
    dosagePerServing: 500,
    unit: "mg",
    form: "capsule",
    type: "phytosome",
    bioavailability: "20x enhanced",
    thirdPartyTested: true,
    description: "500mg Quercetin Phytosome for 20x bioavailability",
    price: 40,
    servings: 30
  },
  "now-quercetin-bromelain": {
    brand: "NOW Foods",
    productName: "Quercetin with Bromelain",
    supplement: "quercetin",
    servingSize: "2 capsules",
    dosagePerServing: 800,
    unit: "mg",
    form: "capsule",
    additionalIngredients: "Bromelain 165mg",
    thirdPartyTested: true,
    description: "800mg Quercetin + 165mg Bromelain",
    price: 29.99,
    servings: 60
  },
  "jarrow-quercetin": {
    brand: "Jarrow Formulas",
    productName: "Quercetin",
    supplement: "quercetin",
    servingSize: "1 capsule",
    dosagePerServing: 500,
    unit: "mg",
    form: "capsule",
    thirdPartyTested: true,
    description: "500mg Quercetin dihydrate",
    price: 31.96,
    servings: 100
  },

  // CoQ10 Products
  "qunol-mega-coq10": {
    brand: "Qunol",
    productName: "Mega CoQ10 Ubiquinol",
    supplement: "coq10",
    servingSize: "1 softgel",
    dosagePerServing: 100,
    unit: "mg",
    form: "softgel",
    type: "ubiquinol",
    waterSoluble: true,
    thirdPartyTested: true,
    description: "100mg water-soluble Ubiquinol (active CoQ10)",
    price: 33.98,
    servings: 100
  },
  "doctors-best-coq10": {
    brand: "Doctor's Best",
    productName: "High Absorption CoQ10",
    supplement: "coq10",
    servingSize: "1 softgel",
    dosagePerServing: 200,
    unit: "mg",
    form: "softgel",
    type: "ubiquinone",
    bioperine: true,
    thirdPartyTested: true,
    description: "200mg CoQ10 with BioPerine® for absorption",
    price: 30.99,
    servings: 60
  },
  "life-extension-ubiquinol": {
    brand: "Life Extension",
    productName: "Super Ubiquinol CoQ10",
    supplement: "coq10",
    servingSize: "1 softgel",
    dosagePerServing: 100,
    unit: "mg",
    form: "softgel",
    type: "ubiquinol",
    additionalIngredients: "PrimaVie® shilajit",
    thirdPartyTested: true,
    description: "100mg Ubiquinol with PrimaVie® shilajit",
    price: 42.75,
    servings: 60
  },

  // Curcumin Products
  "thorne-meriva": {
    brand: "Thorne",
    productName: "Meriva 500-SF",
    supplement: "curcumin",
    servingSize: "2 capsules",
    dosagePerServing: 1000,
    unit: "mg",
    form: "capsule",
    type: "phytosome",
    bioavailability: "29x enhanced",
    thirdPartyTested: true,
    description: "1000mg Meriva® curcumin phytosome",
    price: 73,
    servings: 60
  },
  "now-curcubrain": {
    brand: "NOW Foods",
    productName: "CurcuBrain",
    supplement: "curcumin",
    servingSize: "1 capsule",
    dosagePerServing: 400,
    unit: "mg",
    form: "capsule",
    type: "longvida",
    bioavailability: "65x enhanced",
    thirdPartyTested: true,
    description: "400mg Longvida® Optimized Curcumin",
    price: 27.99,
    servings: 50
  },
  "jarrow-curcumin95": {
    brand: "Jarrow Formulas",
    productName: "Curcumin 95",
    supplement: "curcumin",
    servingSize: "1 capsule",
    dosagePerServing: 500,
    unit: "mg",
    form: "capsule",
    curcuminoids: "95%",
    thirdPartyTested: true,
    description: "500mg with 95% curcuminoids",
    price: 29.96,
    servings: 120
  },

  // Collagen Products
  "vital-proteins-collagen": {
    brand: "Vital Proteins",
    productName: "Collagen Peptides",
    supplement: "collagen",
    servingSize: "2 scoops",
    dosagePerServing: 20,
    unit: "g",
    form: "powder",
    types: "Type I & III",
    source: "Grass-fed bovine",
    thirdPartyTested: true,
    description: "20g grass-fed collagen peptides",
    price: 47,
    servings: 28
  },
  "sports-research-collagen": {
    brand: "Sports Research",
    productName: "Collagen Peptides",
    supplement: "collagen",
    servingSize: "1 scoop",
    dosagePerServing: 11,
    unit: "g",
    form: "powder",
    types: "Type I & III",
    source: "Grass-fed bovine",
    thirdPartyTested: true,
    description: "11g hydrolyzed collagen peptides",
    price: 32.95,
    servings: 41
  },
  "ancient-nutrition-multi": {
    brand: "Ancient Nutrition",
    productName: "Multi Collagen Protein",
    supplement: "collagen",
    servingSize: "1 scoop",
    dosagePerServing: 10,
    unit: "g",
    form: "powder",
    types: "Type I, II, III, V, X",
    sources: "Bovine, chicken, fish, eggshell",
    thirdPartyTested: true,
    description: "10g multi-source collagen (5 types)",
    price: 44.95,
    servings: 45
  },

  // Rhodiola Products
  "gaia-herbs-rhodiola": {
    brand: "Gaia Herbs",
    productName: "Rhodiola Rosea",
    supplement: "rhodiola",
    servingSize: "1 capsule",
    dosagePerServing: 240,
    unit: "mg",
    form: "capsule",
    standardized: "3% rosavins, 1% salidroside",
    organic: true,
    thirdPartyTested: true,
    description: "240mg organic Rhodiola extract",
    price: 16.99,
    servings: 60
  },
  "now-rhodiola": {
    brand: "NOW Foods",
    productName: "Rhodiola 500mg",
    supplement: "rhodiola",
    servingSize: "1 capsule",
    dosagePerServing: 500,
    unit: "mg",
    form: "capsule",
    standardized: "3% rosavins, 1% salidroside",
    thirdPartyTested: true,
    description: "500mg standardized Rhodiola extract",
    price: 17.99,
    servings: 60
  },
  "thorne-rhodiola": {
    brand: "Thorne",
    productName: "Rhodiola",
    supplement: "rhodiola",
    servingSize: "1 capsule",
    dosagePerServing: 100,
    unit: "mg",
    form: "capsule",
    standardized: "3% rosavins, 1% salidroside",
    thirdPartyTested: true,
    description: "100mg standardized extract for stress management",
    price: 17,
    servings: 60
  },

  // Fisetin Products
  "doctors-best-fisetin": {
    brand: "Doctor's Best",
    productName: "Fisetin with Novusetin",
    supplement: "fisetin",
    servingSize: "1 capsule",
    dosagePerServing: 100,
    unit: "mg",
    form: "capsule",
    patented: "Novusetin®",
    thirdPartyTested: true,
    description: "100mg Novusetin® fisetin",
    price: 15.71,
    servings: 30
  },
  "life-extension-fisetin": {
    brand: "Life Extension",
    productName: "Bio-Fisetin",
    supplement: "fisetin",
    servingSize: "1 capsule",
    dosagePerServing: 85,
    unit: "mg",
    form: "capsule",
    bioavailability: "25x enhanced",
    thirdPartyTested: true,
    description: "85mg Bio-Fisetin (equivalent to 1400mg standard)",
    price: 27,
    servings: 30
  },

  // Taurine Products
  "now-taurine-1000": {
    brand: "NOW Foods",
    productName: "Taurine 1000mg",
    supplement: "taurine",
    servingSize: "1 capsule",
    dosagePerServing: 1000,
    unit: "mg",
    form: "capsule",
    thirdPartyTested: true,
    description: "1000mg pharmaceutical grade taurine",
    price: 9.99,
    servings: 100
  },
  "life-extension-taurine": {
    brand: "Life Extension",
    productName: "Taurine",
    supplement: "taurine",
    servingSize: "1 capsule",
    dosagePerServing: 1000,
    unit: "mg",
    form: "capsule",
    thirdPartyTested: true,
    description: "1000mg taurine for cardiovascular support",
    price: 10.50,
    servings: 90
  },
  "thorne-taurine": {
    brand: "Thorne",
    productName: "Taurine",
    supplement: "taurine",
    servingSize: "1 capsule",
    dosagePerServing: 500,
    unit: "mg",
    form: "capsule",
    thirdPartyTested: true,
    description: "500mg hypoallergenic taurine",
    price: 17,
    servings: 90
  },

  // Calcium AKG Products
  "donotage-ca-akg": {
    brand: "DoNotAge",
    productName: "Calcium Alpha-Ketoglutarate",
    supplement: "ca-akg",
    servingSize: "3 capsules",
    dosagePerServing: 1000,
    unit: "mg",
    form: "capsule",
    ratio: "2:1 Ca:AKG",
    thirdPartyTested: true,
    description: "1g Calcium AKG (2:1 ratio)",
    price: 39,
    servings: 60
  },
  "rejuvant-lifeakg": {
    brand: "Rejuvant",
    productName: "LifeAKG",
    supplement: "ca-akg",
    servingSize: "2 tablets",
    dosagePerServing: 1000,
    unit: "mg",
    form: "tablet",
    additionalIngredients: "Vitamin A, D3",
    thirdPartyTested: true,
    description: "1g Ca-AKG with vitamins A & D3",
    price: 44.99,
    servings: 45
  },

  // Hyaluronic Acid Products
  "now-hyaluronic-acid": {
    brand: "NOW Foods",
    productName: "Hyaluronic Acid",
    supplement: "hyaluronic-acid",
    servingSize: "2 capsules",
    dosagePerServing: 100,
    unit: "mg",
    form: "capsule",
    additionalIngredients: "MSM 300mg",
    thirdPartyTested: true,
    description: "100mg HA + 300mg MSM for joint support",
    price: 24.99,
    servings: 60
  },
  "jarrow-hyaluronic": {
    brand: "Jarrow Formulas",
    productName: "Hyaluronic Acid",
    supplement: "hyaluronic-acid",
    servingSize: "1 capsule",
    dosagePerServing: 120,
    unit: "mg",
    form: "capsule",
    bioavailable: "Clinically studied",
    thirdPartyTested: true,
    description: "120mg bioavailable hyaluronic acid",
    price: 27.96,
    servings: 60
  },
  "sports-research-ha": {
    brand: "Sports Research",
    productName: "Hyaluronic Acid",
    supplement: "hyaluronic-acid",
    servingSize: "1 softgel",
    dosagePerServing: 100,
    unit: "mg",
    form: "softgel",
    additionalIngredients: "Organic coconut oil",
    thirdPartyTested: true,
    description: "100mg HA in organic coconut oil base",
    price: 29.95,
    servings: 60
  }
};

// Helper functions
export function getBrandsBySupplementType(supplementKey) {
  return Object.entries(BRAND_DATABASE)
    .filter(([key, product]) => product.supplement === supplementKey)
    .reduce((acc, [key, product]) => {
      acc[key] = product;
      return acc;
    }, {});
}

export function getProductByKey(key) {
  return BRAND_DATABASE[key];
}

export function searchBrandProducts(query) {
  const searchTerm = query.toLowerCase();
  return Object.entries(BRAND_DATABASE)
    .filter(([key, product]) => {
      return product.brand.toLowerCase().includes(searchTerm) ||
             product.productName.toLowerCase().includes(searchTerm) ||
             product.supplement.toLowerCase().includes(searchTerm);
    })
    .reduce((acc, [key, product]) => {
      acc[key] = product;
      return acc;
    }, {});
}

export function getUniqueBrands() {
  const brands = new Set();
  Object.values(BRAND_DATABASE).forEach(product => {
    brands.add(product.brand);
  });
  return Array.from(brands).sort();
}

export function getProductsByBrand(brand) {
  return Object.entries(BRAND_DATABASE)
    .filter(([key, product]) => product.brand === brand)
    .reduce((acc, [key, product]) => {
      acc[key] = product;
      return acc;
    }, {});
}

export default BRAND_DATABASE;