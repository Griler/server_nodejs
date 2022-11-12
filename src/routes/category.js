const express = require('express');
const { addCategory, getCategories, deleteCategories, updateCategories, getFlatCategories,getCategoriesParent,
    getCategoriesChildWithParentName,
    getBanner} = require('../controllers/category');
const { requireSignin, adminMiddleware, uploadCloud } = require('../common-middleware');
const router = express.Router();

router.post('/add', requireSignin, adminMiddleware, uploadCloud.single("categoryImage"), addCategory);
router.get('/getCategories', getCategories);
router.get('/getFlatCategories', getFlatCategories);
router.get('/getCategoriesParent', getCategoriesParent);
router.get('/danh-muc/:categoryParentName', getCategoriesChildWithParentName);
router.post('/delete', requireSignin, adminMiddleware, deleteCategories)
router.post('/update', requireSignin, adminMiddleware, uploadCloud.none(), updateCategories)
router.get('/getBanner',getBanner)
module.exports = router;
