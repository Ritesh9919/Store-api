const express = require('express');
const router = express();
const productsApi = require('../controllers/products');
router.get('/api/v1/products', productsApi.getAllProducts);
module.exports = router;