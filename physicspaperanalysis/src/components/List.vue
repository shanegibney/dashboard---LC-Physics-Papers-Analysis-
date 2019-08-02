<template>
<div class="hello">
  <div id="todo-list-example" class="container">
    <div class="row">
      <div class="col-md-12 mx-auto">
        <h1 class="text-center">Analysis</h1>
        <form v-on:submit.prevent="addNewTask">
          <!-- <form v-on:submit="addNewTask"> -->
          <div class="row">
            <div class="col-md-1">
              <label for="tasktaginput">Level</label>
              <select v-model="Leveltag" class="form-control">
                <option v-for=" opt in opts" v-bind:value="opt.level">{{opt.level}}</option>
              </select>
            </div>

            <div class="col-md-2">
              <label for="Yeartaginput">Years</label>
              <input v-model="Yeartag" type="number" id="Yeartaginput" class="form-control" placeholder="Add New Year">
            </div>

            <div class="col-md-2">
              <label for="Question_numbertaginput">Quest. no.</label>
              <input v-model="Question_numbertag" type="number" id="Question_numbertaginput" class="form-control" placeholder="Question no.">
            </div>

            <div class="col-md-2">
              <label for="Parttaginput">Part</label>
              <input v-model="Parttag" type="text" id="Parttaginput" class="form-control" placeholder="Add New Part">
            </div>

            <div class="col-md-2">
              <label for="Sub_parttaginput">Sub-Part</label>
              <input v-model="Sub_parttag" type="text" id="Sub_parttaginput" class="form-control" placeholder="Add New Sub Part">
            </div>

            <div class="col-md-2">
              <label for="Questiontaginput">Question</label>
              <input v-model="Questiontag" type="text" id="Questiontaginput" class="form-control" placeholder="Add New Question">
            </div>

            <div class="col-md-2">
              <label for="Answertaginput">Answer</label>
              <input v-model="Answertag" type="text" id="Answertaginput" class="form-control" placeholder="Add New Answer">
            </div>

            <div class="col-md-2">
              <label for="Topictag">Topic</label>
              <select v-model="Topictag" @change="selectDrink" id="Topictag" class="form-control">
                <option v-for="(drink,index) in drinks" :value="index">{{ drink.label }}</option>
              </select>
              <p>selectedDrink: {{selectedDrink}}</p>
            </div>

            <div class="col-md-2">
              <label for="Sub_topictag">sub-topic</label>
              <select v-model="Sub_topictag" id="Sub_topictag" class="form-control">
                <option v-for="option in drinks[selectedDrink].options" v-if="selectedDrink != -1">{{ option }}</option>
              </select>
            </div>

            <div class="col-md-2">
              <label for="Question_typetaginput">Question type</label>
              <select v-model="Question_typetag" class="form-control">
                <option v-for="questionopt in questionopts" v-bind:value="questionopt.type">{{questionopt.type}}</option>
              </select>
            </div>

            <div class="col-md-2">
              <label for="Markstaginput">Marks</label>
              <input v-model="Markstag" type="number" id="Markstaginput" class="form-control" placeholder="Marks">
            </div>
          </div>

          <button v-if="this.isEdit==false" type="submit" class="btn btn-success btn-block mt-3">
            Submit
          </button>
          <button v-else v-on:click="updateTask(id)" type="button" class="btn btn-primary btn-block mt-3">
            Update
          </button>
        </form>

        <table class="table striped">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Level</th>
              <th>Year</th>
              <th>Q.no.</th>
              <th>Part</th>
              <th>Sub_part</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Topic</th>
              <th>Sub topic</th>
              <th>Q.type</th>
              <th>Marks</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tr v-for="(todo,index) in reversedTodos" v-bind:id="todo.id" v-bind:Level="todo.Level" v-bind:Year="todo.Year" v-bind:Question="todo.Question" v-bind:Answer="todo.Answer" v-bind:Topic="todo.Topic" v-bind:Sub_topic="todo.Sub_topic"
            v-bind:Question_type="todo.Question_type" v-bind:arks="todo.Marks" v-bind:Question_number="todo.Question_number" v-bind:Part="todo.Part" v-bind:Sub_part="todo.Sub_part">
            <td class="text-center">{{index+1}}</td>
            <td class="text-center">{{todo.id}}</td>
            <td class="text-left">{{todo.Level}}</td>
            <td class="text-center">{{todo.Year}}</td>
            <td class="text-center">{{todo.Question_number}}</td>
            <td class="text-center">{{todo.Part}}</td>
            <td class="text-center">{{todo.Sub_part}}</td>
            <td class="text-left">{{todo.Question}}</td>
            <td class="text-left">{{todo.Answer}}</td>
            <td class="text-left">{{todo.Topic}}</td>
            <td class="text-left">{{todo.Sub_topic}}</td>
            <td class="text-left">{{todo.Question_type}}</td>
            <td class="text-center">{{todo.Marks}}</td>
            <td class="text-center">
              <!-- icon="icon name", also need to add icon to main.js rewritting the name in camel-case as given at  https://fontawesome.com/icons/trash-alt?style=solid-->
              <font-awesome-icon icon="edit" v-on:click="editTask(todo.id, todo.Level, todo.Year, todo.Question, todo.Answer, todo.Topic, todo.Sub_topic,todo.Question_type, todo.Marks, todo.Question_number, todo.Part, todo.Sub_part)" />
            </td>
            <td class="text-center">
              <font-awesome-icon icon="trash-alt" v-on:click="deleteTask(todo.id)" />
            </td>
            <!-- <td class="text-right">
              <button class="btn btn-info" v-on:click="editTask(todo.id, todo.Level, todo.Year, todo.Question, todo.Answer, todo.Topic, todo.Sub_topic,todo.Question_type, todo.Marks, todo.Question_number, todo.Part, todo.Sub_part)">Edit</button>
              <button class="btn btn-danger" v-on:click="deleteTask(todo.id)">Delete</button>
            </td> -->
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'List',
  data() {
    return {
      drinks: [{
          label: "Beer",
          options: ["Sam Adams", "Anchor Steam", "St. Arnold"]
        },
        {
          label: "Soda",
          options: ["Pepsi", "Coke", "RC"]
        },
        {
          label: "Coffee",
          options: ["Starbucks", "Dunkin Donuts", "Gross Hotel Room"]
        }
      ],
      selectLevels: ['Higher', 'Ordinary'],
      selected: 'Higher',
      // options: ["Higher", "Ordinary"],
      selectedDrink: 0,
      selectedOption: '',
      opts: [{
        level: 'Higher'
      }, {
        level: 'Ordinary'
      }],
      questionopts: [{
        type: 'Theory'
      }, {
        type: 'Substitution'
      }, {
        type: 'Historic'
      }, {
        type: 'Experiment'
      }, {
        type: 'Definition'
      }],
      selected: '',
      todos: [],
      id: '',
      Yeartag: 2015,
      Leveltag: 'Higher',
      Questiontag: 'Question about the thing....',
      Answertag: 'Answer is 42!',
      Topictag: 'Mechanics',
      Sub_topictag: 'Friction',
      Question_typetag: 'Theory',
      Markstag: 5,
      Question_numbertag: 2,
      Parttag: 'c',
      Sub_parttag: 'ii',
      isEdit: false
    }
  },
  mounted() {
    this.getTasks()
    //this.sortDynamicDropDownMenu()
  },
  methods: {
    selectDrink: function() {
      this.selectedOption = '';
    },
    sortDynamicDropDownMenu() {
      //console.log("qwertyui")
      // console.log("hello we are result.data - this.todos[0].task_tag; " + this.todos[0].task_tag )
      for (var i = 0; i < this.todos.length; i++) {
        // console.log(this.todos[i].task_tag);
      }
    },
    // lastTask() {
    //   axios.get("/api/lastTask").then(
    //     result => {
    //       // this.todos = result.data
    //       console.log(result.data);
    //     },
    //     error => {
    //       console.error(error)
    //     }
    //   )
    // },
    getTasks() {
      axios.get("/api/tasks").then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewTask() {
      console.log("this.Questiontag: " + this.Questiontag);
      axios.post("/api/task", {
          Level: this.Leveltag,
          Year: this.Yeartag,
          Question: this.Questiontag,
          Answer: this.Answertag,
          Topic: this.Topictag,
          Sub_topic: this.Sub_topictag,
          Question_type: this.Question_typetag,
          Marks: this.Markstag,
          Question_number: this.Question_numbertag,
          Part: this.Parttag,
          Sub_part: this.Sub_parttag
        })
        .then((res) => {
          // this.Leveltag = 'Higher'
          this.Yeartag = 2017
          //this are always different and so should be cleared
          this.Questiontag = ''
          this.Answertag = ''
          this.Topictag = 'Nuclear Physics'
          this.Sub_parttag = 'Radioactivity'
          this.Question_typetag = 'Theory'
          this.Markstag = 2
          this.Question_numbertag = 8
          this.Parttag = 'vi'
          this.Sub_part = ''
          this.getTasks()
        }).catch((err) => {
          console.log(error)
        })
    },
    editTask(id, edit_Level, edit_Year, edit_Question, edit_Answer, edit_Topic, edit_Sub_topic, edit_Question_type, edit_Marks, edit_Question_number, edit_Part, edit_Sub_part) {
      this.id = id
      this.Leveltag = edit_Level
      this.Yeartag = edit_Year
      this.Questiontag = edit_Question
      this.Answertag = edit_Answer
      this.Topictag = edit_Topic
      this.Sub_parttag = edit_Sub_topic
      this.Question_typetag = edit_Question_type
      this.Markstag = edit_Marks
      this.Question_numbertag = edit_Question_number
      this.Parttag = edit_Part
      this.Sub_parttag = edit_Sub_part
      this.isEdit = true
    },
    updateTask(id) {
      // axios.put(`/api/task/${this.id}`, {
      axios.put('/api/task/' + id, {
          Level: this.Leveltag,
          Year: this.Yeartag,
          Question_number: this.Question_numbertag,
          Part: this.Parttag,
          Sub_part: this.Sub_parttag,
          Question: this.Questiontag,
          Answer: this.Answertag,
          Topic: this.Topictag,
          Sub_part: this.Sub_parttag,
          Question_type: this.Question_typetag,
          Marks: this.Markstag
        })
        .then((res) => {
          this.Leveltag = 'Higher'
          this.Yeartag = 2010
          this.Question_numbertag = 3
          this.Parttag = 'b'
          this.Sub_parttag = 'i'
          this.Questiontag = 'quest...'
          this.Answertag = 'ans:...'
          this.Topictag = 'Heat'
          this.Sub_topictag = 'Specific heat capacity'
          this.Question_typetag = 'Substitution'
          this.Markstag = 4
          this.isEdit = false
          this.getTasks()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteTask(id) {
      // axios.delete('/api/task/${id}')
      axios.delete('/api/task/' + id)
        .then((res) => {
          console.log("delete id: " + id);
          this.Leveltag = ''
          this.getTasks()
          console.log("The delete task...");
          console.log(res)
          console.log("....");
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    reversedTodos() {
      return this.todos.slice().reverse()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

th {
  text-align: center;
}

td,
tr {
  text-align: center;
}

button {
  width: 100px;
  align: center;
}
</style>
