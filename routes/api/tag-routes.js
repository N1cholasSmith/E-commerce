const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // find all tags
    Tag.findAll({
     // associated Products
     include: [
       {
         model: Product,
         through: ProductTag
       },
     ],
   })
   .then((tag) => {
     if(!tag) {
       return res.status(404).json({message: 'No tags found'});
     };
     res.json(tag);
   });
  
 }  catch (err) {
   res.status(500).json(err)
 }

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    // find one tag by its `id` value
    Tag.findOne({
      where: {
          id: req.params.id
        },
        // associated Products
        include: [
          {
            model: Product,
            through: ProductTag
          }
        ]
    })
    .then((tag) => {
      if(!tag) {
        return res.status(404).json({message: "No tag found with this ID"});
      }
      res.status(200).json(tag)
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    newTag = await Tag.create(req.body);

    if(!req.body.tag_name) {
      //tag_name: { allowNull: false }
      return res.status(400).json({message: "Entry is Null"});
    } else {
      res.status(200).json(newTag)
    };

  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }
    )

    if(!req.body.tag_name) {
      //id: { allowNull: false }
      return res.status(400).json({message: "Update unsuccessful, tag name required"});

    } else if(!updateTag[0]) {
      return res.status(404).json({message: "Check ID entry, tag does not exist"});

    } else {
      res.status(200).json({
        message: "Successful update of tag",
        updateTag
      });
    };

  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
       where: {
         id: req.params.id
       }
    });

    if(!deleteTag) {
      return res.status(404).json({message: "tag doesn't exist, check tag ID entry"});

    } else {
      res.status(200).json({
        message: "tag successfully deleted",
        updateTag
      });
    };


  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
