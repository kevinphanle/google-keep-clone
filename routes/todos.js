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
      res.json(todos);
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
  TodosModel.findByIdAndUpdate({ _id: req.params.id }, {
    title: req.body.title,
    text: req.body.text,
    color: req.body.color,
    isDone: req.body.isDone,
    hasAttachment: req.body.hasAttachment
  }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User: ", docs);
      }
  })
})


router.delete('/removeTodo/:id', (req, res) => {
  TodosModel.findByIdAndDelete(req.params.id,
    function (err) {
      console.log(req.params.id)
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send('Success! Item Deleted');
      }
    });
});


module.exports = router;
