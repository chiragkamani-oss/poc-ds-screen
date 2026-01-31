/**
 * Dummy DS Articles for POC/Preview purposes
 * Retail Store Products - Grocery, Fresh, Household, etc.
 * Frontend can use this data for layout binding in DS preview
 */
const DUMMY_DS_ARTICLES = [
  {
    PRICE_CURRENT: "4.99",
    consumer_info_1_l1: "Farm fresh organic whole milk, 1 gallon",
    consumer_info_4_l1: "1 gal",
    consumer_info_5_l1: "3.78 L",
    name_l1: "Organic Whole Milk",
    brand_l1: "Happy Farms",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100001",
    EXTERNAL_ID: "EXT001",
    PROMOTION: "1",
    EAN: "100001",
    ITEM_ID: "100001",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "5.49",
    consumer_info_1_l1: "Grade A large eggs, 12 count",
    consumer_info_4_l1: "12 ct",
    consumer_info_5_l1: "680g",
    name_l1: "Free Range Eggs",
    brand_l1: "Nature's Best",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100002",
    EXTERNAL_ID: "EXT002",
    PROMOTION: "0",
    EAN: "100002",
    ITEM_ID: "100002",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "3.99",
    consumer_info_1_l1: "Creamy Greek yogurt with real vanilla",
    consumer_info_4_l1: "32 oz",
    consumer_info_5_l1: "907g",
    name_l1: "Greek Yogurt Vanilla",
    brand_l1: "Chobani",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100003",
    EXTERNAL_ID: "EXT003",
    PROMOTION: "0",
    EAN: "100003",
    ITEM_ID: "100003",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "0.69",
    consumer_info_1_l1: "Fresh organic bananas, per lb",
    consumer_info_4_l1: "per lb",
    consumer_info_5_l1: "1 lb",
    name_l1: "Organic Bananas",
    brand_l1: "Organic Valley",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100004",
    EXTERNAL_ID: "EXT004",
    PROMOTION: "1",
    EAN: "100004",
    ITEM_ID: "100004",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "3.99",
    consumer_info_1_l1: "Sweet and juicy red grapes",
    consumer_info_4_l1: "per lb",
    consumer_info_5_l1: "2 lb bag",
    name_l1: "Red Seedless Grapes",
    brand_l1: "Fresh Farms",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100005",
    EXTERNAL_ID: "EXT005",
    PROMOTION: "0",
    EAN: "100005",
    ITEM_ID: "100005",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "4.49",
    consumer_info_1_l1: "Pre-washed baby spinach leaves",
    consumer_info_4_l1: "5 oz",
    consumer_info_5_l1: "142g",
    name_l1: "Baby Spinach",
    brand_l1: "Earthbound Farm",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100006",
    EXTERNAL_ID: "EXT006",
    PROMOTION: "0",
    EAN: "100006",
    ITEM_ID: "100006",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "7.99",
    consumer_info_1_l1: "Fresh boneless skinless chicken breast",
    consumer_info_4_l1: "per lb",
    consumer_info_5_l1: "1.5 lb pack",
    name_l1: "Chicken Breast Boneless",
    brand_l1: "Tyson",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100007",
    EXTERNAL_ID: "EXT007",
    PROMOTION: "1",
    EAN: "100007",
    ITEM_ID: "100007",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "12.99",
    consumer_info_1_l1: "Fresh Atlantic salmon, skin-on fillet",
    consumer_info_4_l1: "per lb",
    consumer_info_5_l1: "1 lb",
    name_l1: "Atlantic Salmon Fillet",
    brand_l1: "Ocean Fresh",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100008",
    EXTERNAL_ID: "EXT008",
    PROMOTION: "0",
    EAN: "100008",
    ITEM_ID: "100008",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "3.49",
    consumer_info_1_l1: "100% whole wheat sliced bread",
    consumer_info_4_l1: "20 oz",
    consumer_info_5_l1: "567g",
    name_l1: "Whole Wheat Bread",
    brand_l1: "Nature's Own",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100009",
    EXTERNAL_ID: "EXT009",
    PROMOTION: "0",
    EAN: "100009",
    ITEM_ID: "100009",
    DISPLAYTYPE: "1"
  },
  {
    PRICE_CURRENT: "5.99",
    consumer_info_1_l1: "100% fresh squeezed orange juice",
    consumer_info_4_l1: "52 oz",
    consumer_info_5_l1: "1.5 L",
    name_l1: "Orange Juice Fresh",
    brand_l1: "Tropicana",

    STORE_CODE: "DAG_FS_AARHUS",
    Barcode_data: "100010",
    EXTERNAL_ID: "EXT010",
    PROMOTION: "1",
    EAN: "100010",
    ITEM_ID: "100010",
    DISPLAYTYPE: "1"
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
