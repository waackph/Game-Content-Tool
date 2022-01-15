const express = require('express');
const router = express.Router();

// Load data model
const Item = require('../../models/Item');

// @route GET api/items/test
// @description tests views route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/items
// @description Get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
      .then(items => res.json(items))
      .catch(err => res.status(404).json({ noitemsfound: 'No Items found' }));
  });

// @route GET api/items/:id
// @description get specific item by id
// @access Public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(404).json({ noitemfound: 'No book found' }));
});

// @route POST api/items
// @description add/save item
// @access Public
router.post('/', (req, res) => {
    console.log(req.body);
    Item.create(req.body)
      .then(item => res.json({ msg: 'Item added' }))
      .catch(err => res.status(400).json({ error: 'Unable to add item' }));
});

// @route PUT api/items/:id
// @description Update item
// @access Public
router.put('/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
      .then(item => res.json({ msg: 'Item updated' }))
      .catch(err => res.status(400).json({ error: 'Unable to update item' }));
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, req.body)
      .then(item => res.json({ msg: 'Item removed' }))
      .catch(err => res.status(400).json({ error: 'Unable to remove item' }));
});

module.exports = router;
