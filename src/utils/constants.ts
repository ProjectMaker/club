export const MATERIAL_CATEGORIES = [
  { name: 'washing_machine', label: 'Machine à laver' },
  { name: 'dryer', label: 'Séchoir' },
  { name: 'payment', label: 'Centrale de paiement' },
  { name: 'detergent_distributor', label: 'Distributeur de lessive' },
  { name: 'coin_changer', label: 'Monnayeur' },
  { name: 'beverage_distributor', label: 'Distributeur de boissons' },
  { name: 'food_distributor', label: 'Distributeur alimentaire' },
  { name: 'other', label: 'Autre' },
]

export const MATERIAL_SUBCATEGORIES = [
  { name: '6kg', label: '6 kg', category: 'washing_machine' },
  { name: '7kg', label: '7 kg', category: 'washing_machine' },
  { name: '8kg', label: '8 kg', category: 'washing_machine' },
  { name: '9kg', label: '9 kg', category: 'washing_machine' },
  { name: '10kg', label: '10 kg', category: 'washing_machine' },
  { name: '12kg', label: '12 kg', category: 'washing_machine' },
  { name: '13kg', label: '13 kg', category: 'washing_machine' },
  { name: '16kg', label: '16 kg', category: 'washing_machine' },
  { name: '18kg', label: '18 kg', category: 'washing_machine' },
  { name: '20kg', label: '20 kg', category: 'washing_machine' },
  { name: '24kg', label: '24 kg', category: 'washing_machine' },
  { name: 'gas', label: 'Gaz', category: 'dryer' },
  { name: 'electric', label: 'Electrique', category: 'dryer' },
  { name: 'heat_pump', label: 'Pompe à chaleur', category: 'dryer' },
  { name: 'cash', label: 'Avec lecteur de billet', category: 'payment' },
  { name: 'cash_cb', label: 'Avec lecteur de billet et cb', category: 'payment' },
  { name: 'connected', label: 'Centrale connectée', category: 'payment' },
  { name: 'powder', label: 'Poudre', category: 'detergent_distributor' },
  { name: 'tablet', label: 'Tablette', category: 'detergent_distributor' },
  { name: 'multi_product', label: 'Multi produits', category: 'detergent_distributor' },
  { name: 'other', label: 'Autre', category: 'other' },
]

export const MATERIAL_BRANDS = [
  { name: 'primus', label: 'Primus' },
  { name: 'miele', label: 'Miele' },
  { name: 'electrolux', label: 'Electrolux' },
  { name: 'ipso', label: 'Ipso' },
  { name: 'huebsh', label: 'Huebsh' },
  { name: 'girbau', label: 'Girbau' },
  { name: 'danube', label: 'Danube' },
  { name: 'lg', label: 'LG' },
  { name: 'lm_control', label: 'LM Control' },
  { name: 'other', label: 'Autre' },
]

export const MATERIAL_PERCENTS_COM = [
  { priceMin: 0, priceMax: 3000, com: 0.09 },
  { priceMin: 3000, priceMax: 10000, com: 0.08 },
  { priceMin: 10000, com: 0.07 },
]
export const DEPARTMENTS = [
  '01 - Ain', '02 - Aisne', '03 - Allier', '04 - Alpes-de-Haute-Provence', '05 - Hautes-Alpes',
  '06 - Alpes-Maritimes', '07 - Ardèche', '08 - Ardennes', '09 - Ariège', '10 - Aube',
  '11 - Aude', '12 - Aveyron', '13 - Bouches-du-Rhône', '14 - Calvados', '15 - Cantal',
  '16 - Charente', '17 - Charente-Maritime', '18 - Cher', '19 - Corrèze', '2A - Corse-du-Sud',
  '2B - Haute-Corse', '21 - Côte-d\'Or', '22 - Côtes-d\'Armor', '23 - Creuse', '24 - Dordogne',
  '25 - Doubs', '26 - Drôme', '27 - Eure', '28 - Eure-et-Loir', '29 - Finistère',
  '30 - Gard', '31 - Haute-Garonne', '32 - Gers', '33 - Gironde', '34 - Hérault',
  '35 - Ille-et-Vilaine', '36 - Indre', '37 - Indre-et-Loire', '38 - Isère', '39 - Jura',
  '40 - Landes', '41 - Loir-et-Cher', '42 - Loire', '43 - Haute-Loire', '44 - Loire-Atlantique',
  '45 - Loiret', '46 - Lot', '47 - Lot-et-Garonne', '48 - Lozère', '49 - Maine-et-Loire',
  '50 - Manche', '51 - Marne', '52 - Haute-Marne', '53 - Mayenne', '54 - Meurthe-et-Moselle',
  '55 - Meuse', '56 - Morbihan', '57 - Moselle', '58 - Nièvre', '59 - Nord',
  '60 - Oise', '61 - Orne', '62 - Pas-de-Calais', '63 - Puy-de-Dôme', '64 - Pyrénées-Atlantiques',
  '65 - Hautes-Pyrénées', '66 - Pyrénées-Orientales', '67 - Bas-Rhin', '68 - Haut-Rhin', '69 - Rhône',
  '70 - Haute-Saône', '71 - Saône-et-Loire', '72 - Sarthe', '73 - Savoie', '74 - Haute-Savoie',
  '75 - Paris', '76 - Seine-Maritime', '77 - Seine-et-Marne', '78 - Yvelines', '79 - Deux-Sèvres',
  '80 - Somme', '81 - Tarn', '82 - Tarn-et-Garonne', '83 - Var', '84 - Vaucluse',
  '85 - Vendée', '86 - Vienne', '87 - Haute-Vienne', '88 - Vosges', '89 - Yonne',
  '90 - Territoire de Belfort', '91 - Essonne', '92 - Hauts-de-Seine', '93 - Seine-Saint-Denis', '94 - Val-de-Marne',
  '95 - Val-d\'Oise', '971 - Guadeloupe', '972 - Martinique', '973 - Guyane', '974 - La Réunion',
  '976 - Mayotte',
]

// Pièces jointes des demandes d'offres et services (bucket privé « images »)
export const OFFER_UPLOAD = {
  maxFiles: 5,
  maxSize: 10 * 1024 * 1024,
  types: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'],
}
