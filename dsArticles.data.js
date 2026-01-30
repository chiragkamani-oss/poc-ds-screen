/**
 * Dummy DS Articles for POC/Preview purposes
 * Retail Store Products - Grocery, Fresh, Household, etc.
 * Frontend can use this data for layout binding in DS preview
 */
const DUMMY_DS_ARTICLES = [
  {
    PRICE_CURRENT: "4.99",
    consumer_info_1_11: "Farm fresh organic whole milk, 1 gallon",
    consumer_info_4_11: "1 gal",
    consumer_info_5_11: "3.78 L",
    name_11: "Organic Whole Milk",
    brand_11: "Happy Farms"
  },
  {
    PRICE_CURRENT: "5.49",
    consumer_info_1_11: "Grade A large eggs, 12 count",
    consumer_info_4_11: "12 ct",
    consumer_info_5_11: "680g",
    name_11: "Free Range Eggs",
    brand_11: "Nature's Best"
  },
  {
    PRICE_CURRENT: "3.99",
    consumer_info_1_11: "Creamy Greek yogurt with real vanilla",
    consumer_info_4_11: "32 oz",
    consumer_info_5_11: "907g",
    name_11: "Greek Yogurt Vanilla",
    brand_11: "Chobani"
  },
  {
    PRICE_CURRENT: "0.69",
    consumer_info_1_11: "Fresh organic bananas, per lb",
    consumer_info_4_11: "per lb",
    consumer_info_5_11: "1 lb",
    name_11: "Organic Bananas",
    brand_11: "Organic Valley"
  },
  {
    PRICE_CURRENT: "3.99",
    consumer_info_1_11: "Sweet and juicy red grapes",
    consumer_info_4_11: "per lb",
    consumer_info_5_11: "2 lb bag",
    name_11: "Red Seedless Grapes",
    brand_11: "Fresh Farms"
  },
  {
    PRICE_CURRENT: "4.49",
    consumer_info_1_11: "Pre-washed baby spinach leaves",
    consumer_info_4_11: "5 oz",
    consumer_info_5_11: "142g",
    name_11: "Baby Spinach",
    brand_11: "Earthbound Farm"
  },
  {
    PRICE_CURRENT: "7.99",
    consumer_info_1_11: "Fresh boneless skinless chicken breast",
    consumer_info_4_11: "per lb",
    consumer_info_5_11: "1.5 lb pack",
    name_11: "Chicken Breast Boneless",
    brand_11: "Tyson"
  },
  {
    PRICE_CURRENT: "12.99",
    consumer_info_1_11: "Fresh Atlantic salmon, skin-on fillet",
    consumer_info_4_11: "per lb",
    consumer_info_5_11: "1 lb",
    name_11: "Atlantic Salmon Fillet",
    brand_11: "Ocean Fresh"
  },
  {
    PRICE_CURRENT: "3.49",
    consumer_info_1_11: "100% whole wheat sliced bread",
    consumer_info_4_11: "20 oz",
    consumer_info_5_11: "567g",
    name_11: "Whole Wheat Bread",
    brand_11: "Nature's Own"
  },
  {
    PRICE_CURRENT: "5.99",
    consumer_info_1_11: "100% fresh squeezed orange juice",
    consumer_info_4_11: "52 oz",
    consumer_info_5_11: "1.5 L",
    name_11: "Orange Juice Fresh",
    brand_11: "Tropicana"
  }
];



function getAvailableCategories() {
  return [...new Set(DUMMY_DS_ARTICLES.map((a) => a.CATEGORY))];
}

/**
 * Get a random article
 */
function getRandomArticle() {
  const index = Math.floor(Math.random() * DUMMY_DS_ARTICLES.length);
  return DUMMY_DS_ARTICLES[index];
}

// Export as CommonJS
module.exports = {
  DUMMY_DS_ARTICLES,
  getAvailableCategories,
  getRandomArticle
};
