const express = require('express');
const router = express.Router();

// Load data model
const Room = require('../../models/Room');
// const Item = require('../../models/Item');

// @route GET api/test
// @description tests views route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/items
// @description Get all items
// @access Public
router.get('/items', (req, res) => {
  Room.find({}, { projection: { _id: 0 } })
    .then(rooms => {
      // select Items-Array of each room (since the projection didn't work...) 
      roomItems = rooms.map((room, idx) => {return room.Items})
      // flatten the array to have all item dictionaries in the same array
      items = [].concat(...roomItems);
      // get and add all combine items
      combineItems = items.map((item, idx) => {return item.CombineItem});
      // remove nulls
      combineItems = combineItems.filter(item => item);
      items = items.concat(...combineItems);
      res.json(items);
    })
    .catch(err => res.status(404).json({ noroomsanditemsfound: 'No Items found' }));
});

// @route GET api/
// @description Get all rooms
// @access Public
router.get('/', (req, res) => {
    Room.find()
      .then(rooms => res.json(rooms))
      .catch(err => res.status(404).json({ noroomsfound: 'No Rooms found' }));
  });

// @route GET api/:id
// @description get specific item by id
// @access Public
router.get('/:id', (req, res) => {
  Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(404).json({ noroomfound: 'Room not found' }));
});

// @route POST api/
// @description add room
// @access Public
router.post('/', (req, res) => {
  Room.create(req.body)
    .then(room => res.json(room))
    .catch(err => res.status(400).json({ error: 'Unable to add room' }));
});

// @route POST api/
// @description update room
// @access Public
router.put('/:room_id', (req, res) => {
  // Room.updateOne(
  //   {'_id': req.params.room_id}, 
  //   {
  //       '$set': {'name': req.body.name, 'room_width': req.body.room_width, 'texture_path': req.body.texture_path}
  //   })
  Room.findByIdAndUpdate(req.params.room_id, req.body)
    .then(room => res.json(room))
    .catch(err => res.status(400).json({ error: 'Unable to add room' }));
});

// @route GET api/rooms/:id
// @description Delete room by id
// @access Public
router.delete('/:room_id', (req, res) => {
  // Room.findByIdAndRemove(req.params.item_id, req.body)
  Room.findByIdAndRemove(req.params.room_id, req.body)
    .then(item => res.json({ msg: 'Item removed' }))
    .catch(err => res.status(400).json({ error: 'Unable to remove item' }));
});

// @route GET api/items
// @description Get all items
// @access Public
router.get('/items/:room_id', (req, res) => {
  Room.findById(req.params.room_id)
    .then(room => res.json(room))
    .catch(err => res.status(404).json({ noitemsfound: 'No Items found' }));
});

// @route GET api/items/:id
// @description get specific item by id
// @access Public
router.get('/items/:room_id/:item_id', (req, res) => {
    Room.findOne({"_id": req.params.room_id})
      .then(room => {
        // get the correct Item by ID
        let item;
        room.Items.forEach(it => {
          if(String(it._id) === req.params.item_id) {
            item = it;
            return;
          }
        });
        res.json(item);
      })
      .catch(err => res.status(404).json({ noitemfound: 'No item found' }));
});

// @route POST api/items
// @description add item to given room
// @access Public
router.post('/items/:room_id', (req, res) => {
  console.log(req.params.room_id);
  console.log(req.body);
  Room.updateOne({ _id: req.params.room_id }, { $push: { Items: req.body } })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ error: 'Unable to add item' }));
});

// @route PUT api/items/:id
// @description Update item
// @access Public
router.put('/items/:room_id/:item_id', (req, res) => {
  req.body['_id'] = req.params.item_id;
  Room.findOneAndUpdate(
    {'_id': req.params.room_id, 'Items._id': req.params.item_id},
    {
      '$set': {
        'Items.$': req.body
      }
    }
  )
    .then(item => res.json({ msg: 'Item updated' }))
    .catch(err => res.status(400).json({ error: 'Unable to update item' }));
});

// @route GET api/books/:id
// @description Delete item by id
// @access Public
router.delete('/items/:item_id', (req, res) => {
    // Room.findByIdAndRemove(req.params.item_id, req.body)
    Room.updateOne(
      {
        'Items._id': req.params.item_id
      },
      {
        $pull: { Items: { _id: req.params.item_id } }
      }
    )
      .then(item => res.json({ msg: 'Item removed' }))
      .catch(err => res.status(400).json({ error: 'Unable to remove item' }));
});

module.exports = router;
