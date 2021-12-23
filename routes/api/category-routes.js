const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
     // find all categories
    Category.findAll({
      // associated Products
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ],
    })
    .then((category) => {
      if(!category) {
        return res.status(404).json({message: 'No categories found'});
      };
      res.json(category);
    });
   
  }  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  try{
    // find one category by its `id` value
    Category.findOne({
      where: {
          id: req.params.id
        },
        // associated Products
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'category_id']
          }
        ]
    })
    .then((category) => {
      if(!category) {
        return res.status(404).json({message: "No category found with this ID"});
      }
      res.status(200).json(category)
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    newCategory = await Category.create(req.body);

    if(!req.body.category_name) {
      //category_name: { allowNull: false }
      return res.status(400).json({message: "Entry is Null"});
    } else {
      res.status(200).json(newCategory)
    };

  } catch (err) {
    res.status(500).json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }
    )

    if(!req.body.category_name) {
      //id: { allowNull: false }
      return res.status(400).json({message: "Update unsuccessful, category name required"});

    } else if(!updateCategory[0]) {
      return res.status(404).json({message: "Check ID entry, category does not exist"});

    } else {
      res.status(200).json({
        message: "Successful update of category",
        updateCategory
      });
    };

  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
       where: {
         id: req.params.id
       }
    });

    if(!deleteCategory) {
      return res.status(404).json({message: "Category doesn't exist, check category ID entry"});

    } else {
      res.status(200).json({
        message: "Category successfully deleted",
        updateCategory
      });
    };

  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
