var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

var urlencodedParser = bodyParser.urlencoded({extended: false});


const TodosModel = require('../models/todoModel')

router.get('/',urlencodedParser, (req, res) => {
  TodosModel.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(todos);
    }
  })
})

router.get('/:id', (req, res) => {
  TodosModel.findById(req.params.id, function (err, todo) {
    if (err) {
      console.log(err);
    } else {
      console.log("item: ", todo);
      return res.status(200).json("Got item");
    }
  })
})

router.post('/addTodo', (req, res) => {
  var newTodo = new TodosModel({
    title: req.body.title,
    text: req.body.text,
    color: req.body.color,
    isDone: req.body.isDone,
    hasAttachment: req.body.hasAttachment
  });
  console.log(newTodo)
  newTodo.save().then(todo => {
    res.status(200).json({ 'status': 'todo added successsfully', data: {body: todo} })
  }).catch(err => {
    res.status(400).send('adding new todo failed');
  });
  // console.log('body: ', req.body)

});

router.patch('/update/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params);
  TodosModel.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    text: req.body.text,
    color: req.body.color,
    isDone: req.body.isDone,
    hasAttachment: req.body.hasAttachment
  }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated item: ", docs);
        return res.status(200).json("Updated item")
      }
  })
})


router.delete('/removeTodo/:id', (req, res) => {
  console.log(req.params);
  TodosModel.findByIdAndDelete(req.params.id,
    function (err) {
      if (err) {
        console.log("in delete error")
        return res.status(404).json({error: err})
      } else {
        console.log("delete worked")
        return res.status(200).json("Success! Item deleted!");
        // return res.status(200).send('Success! Item Deleted');
      }

    });
});


module.exports = router;
