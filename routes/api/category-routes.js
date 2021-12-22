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
    Category.findOne({
      where: {
          id: req.params.id
        }
      
    })

  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
