var express = require("express")
var router = express.Router()
const Task = require("../model/Task")

//Get task
router.get("/tasks", (req, res) => {
  Task.findAll()
    .then(tasks => {
      res.json(tasks)
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

// //Get last task
// router.get("/lastTasks", (req, res) => {
//   Task.findAll()
//     .then(tasks => {
//       res.json(tasks)
//     })
//     .catch(err => {
//       res.send("error: " + err)
//     })
// })

//Add task
router.post("/task", (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400)
    res.json({
      error: "Bad Data for POST"
    })
  } else {
    Task.create(req.body)
      .then(() => {
        res.send("Task Added")
      })
      .catch(err => {
        res.send("Error: " + err)
      })
  }
})

//Delete task
router.delete("/task/:id", (req, res) => {
  Task.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.send("Task Deleted!")
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

//Update task
router.put("/task/:id", (req, res) => {
  if (!req.body) {
    res.status(400)
    res.json({
      error: "Bad Data....!"
    })
  } else {
    Task.update({
        Level: req.body.Level,
        Year: req.body.Year,
        Question: req.body.Question,
        Answer: req.body.Answer,
        Topic: req.body.Topic,
        Sub_topic: req.body.Sub_topic,
        Question_type: req.body.Question_type,
        Marks: req.body.Marks,
        Question_number: req.body.Question_number,
        Part: req.body.Part,
        Sub_part: req.body.Sub_part
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        res.send("Task Updated")
      })
      .error(err => res.send(err))
  }
})

module.exports = router