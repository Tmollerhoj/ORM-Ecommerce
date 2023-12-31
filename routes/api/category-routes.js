const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req,res) => {
  Category.findAll({
    include: {model: Product},
  })
  .then((categoryData) => {
    res.json(categoryData);
  });
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: {model: Product},
  })
  .then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updateCategory) => {
    res.json(updateCategory);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deleteCategory) => {
    res.json(deleteCategory);
  })
  .catch((err) => {
    res.json(err);
  })
});

module.exports = router;
