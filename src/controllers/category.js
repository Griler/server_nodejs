const { Category } = require("../models")
const slugify = require("slugify");
const shortid = require("shortid");
const { query } = require("express");
const {clone} = require("nodemon/lib/utils");

const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined)
    } else {
        category = categories.filter((cat) => cat.parentId == parentId)
    }

    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategories(categories, cat._id)
        })
    }
    return categoryList;
}

exports.addCategory = (req, res) => {

    const { name, parentId } = req.body;
    const categoryObj = {
        name,
    }

    if (req.file) {
        categoryObj.categoryImage = req.file.path;
    }

    if (parentId) {
        categoryObj.parentId = parentId;
    }

    const cate = new Category(categoryObj);
    cate.save((error, category) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (category) {
            return res.status(201).json({ category });
        }
    })
}

exports.getCategories = (req, res) => {
    Category.find({ isDisabled: { $ne: true } }).exec((error, categories) => {
        if (error) {
            return res.status(400).json({ error })
        } else {
            const categoriesList = createCategories(categories);
            return res.status(200).json({ categories: categoriesList });
        }
    })
}

exports.getFlatCategories = (req, res) => {
    Category.find({},function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }}); 
}

exports.getCategoriesParent = (req, res) => {
    Category.find({ parentId: null },function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }});  
}

exports.getCategoriesChildWithParentName = (req, res) => {
    var  MatchNameToId = {
        'ghe': '636b4c6bf028b4189c025ac0',
        'sofa': '636b4dfaf028b4189c025ac6',
        'giuong-ngu':'636b9f6f5475d525b0e83d4b',
        'ban': '636c9d2c413e1a3c2c36611f',
        'tu-va-ke': '636c9f80413e1a3c2c36613f',
        'bep':'636ca126413e1a3c2c366159',
        'hang-trang-tri':'636ca2db413e1a3c2c366165'
    }
    var categoryParent = req.params.categoryParentName;
    var Id = MatchNameToId[categoryParent]
    console.log(MatchNameToId[categoryParent]);
    Category.find({parentId : Id },function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }});  
}


exports.deleteCategories = async (req, res) => {
    const { ids } = req.body;
    try {
        for (let i = 0; i < ids.length; i++) {
            Category.deleteOne({
                _id: ids[i]._id,
            },{ isDisabled: true });
        }
        return  res.status(200).json({Message : " Xoá thành công "});

    }catch (e) {
        return  res.status(400).json({Message : e});

    }
};

exports.updateCategories = async (req, res) => {
    const { _id, name, parentId } = req.body;
    const category = {
        name,
    };
    if (parentId !== "") {
        category.parentId = parentId;
    }
    await Category.findOneAndUpdate({ _id }, category, {
        new: true,
    });
    res.status(202).json({ message: 'Category updated successfully' })
};