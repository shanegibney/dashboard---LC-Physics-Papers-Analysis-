<template>
<div class="hello">
  <div id="todo-list-example" class="container">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Physics Papers</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" @click="toggleDashboard()" v-if="!showDashboard">Show Dashboard Panel</a>
            <a class="nav-link" @click="toggleDashboard()" v-if="showDashboard">Remove Dashboard Panel</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" @click="toggleQuery()" v-if="!showQuery">Show Query Panel</a>
            <a class="nav-link" @click="toggleQuery()" v-if="showQuery">Remove Query Panel</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" @click="toggleOptions()" v-if="!showOptions">Show Options Panel</a>
            <a class="nav-link" @click="toggleOptions()" v-if="showOptions">Remove Options Panel</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Add options panel -->
    <div class="row jumbotron" v-if="showOptions">
      <form>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <button @click="toggleExisting()" type="submit" class="btn btn-success mt-4 btn-newrelatedtopic">Add new topic and related sub-topic</button>
            </div>
            <div class="col-md-6">
              <button @click="toggleExisting()" type="submit" class="btn btn-success mt-4 btn-existingtopic">Add sub-topic to existing topic</button>
            </div>
          </div>
        </div>
      </form>

      <form v-on:submit.prevent="addOptions">
        <div class="row jumbotron" v-if="existingtopic">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-success mt-4">Submit</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="addnewtopicss"><strong>Add new topic: </strong></label>
                <input class="form-control" type="text" v-model="TopicExisting">
              </div>
              <div class="col-md-6">
                <label for="addnewsubtopic"><strong>New related sub topic: </strong></label>
                <input class="form-control" :disabled="TopicExisting.length == 0" type="text" v-model="Sub_topicExisting" placeholder="Add related sub topic">
              </div>
            </div>
          </div>
        </div>
      </form>

      <form v-on:submit.prevent="addOptions">
        <div class="row jumbotron" v-if="!existingtopic">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-success mt-4">Submit</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 inputs">
                <div class="dropdown">
                  <label for="topicExistingg"><strong>Existing topic: </strong></label><br>
                  <select v-model="TopicExisting" name="topicExistingg" id="topicExistingg" class="form-control">
                    <option v-for="(topicExisting_obj, topicExisting) in subjects" :value="topicExisting">{{topicExisting}}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="dropdown inputs">
                  <label for="subtopicExistingg"><strong>Add sub-topic to existing topic: </strong></label><br>
                  <input type="text" name="subtopicExistingg" v-model="Sub_topicExisting">
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- End add options panel -->

    <!-- Dashboard start -->
    <div class="row" v-if="showDashboard">
      <div class="col-md-12">
        <form v-on:submit.prevent="addNewTask" class="jumbotron">
          <!-- <form class="jumbotron"> -->
          <div class="row">
            <div class="col-md-2">
              <div class="dropdown inputs">
                <label for="level"><strong>Level: </strong></label><br>
                <select v-model="Leveltag" class="form-control">
                  <option v-for="opt in opts" v-bind:value="opt.level">{{opt.level}}</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <div class="dropdown inputs">
                <label for="year"><strong>Year: </strong></label><br>
                <select v-model="Yeartag" class="form-control">
                  <option v-for="i in 17" v-bind:value=(i+2002)>{{i+2002}}</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <label for="questionnumber"><strong>Q. number: </strong></label><br>
              <input v-model="Question_numbertag" type="number" id="questionnumbert" class="form-control" placeholder="Question no.">
            </div>

            <div class="col-md-2">
              <label for="part"><strong>Part: </strong></label><br>
              <input v-model="Parttag" type="text" id="part" class="form-control" placeholder="Add New Part">
            </div>

            <div class="col-md-2">
              <label for="subpart"><strong>Sub-part: </strong></label><br>
              <input v-model="Sub_parttag" type="text" id="subpart" class="form-control" placeholder="Add New Sub Part">
            </div>
          </div>

          <div class="row">
            <div class="col-md-2 inputs">
              <div class="dropdown">
                <label for="topic"><strong>Topic: </strong></label><br>
                <select v-model="Topictag" name="topic" id="topic" class="form-control">
                  <option v-for="(topic_obj, topic) in subjects" :value="topic">{{topic}}</option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <div class="dropdown inputs">
                <label for="subtopic"><strong>Sub-topic: </strong></label><br>
                <select v-model="Sub_topictag" class="form-control" name="subtopic" id="subtopic">
                  <option v-for="subTopic in subTopics">{{subTopic}}</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <div class="dropdown inputs">
                <label for="Question_typetaginput"><strong>Question type: </strong></label><br>
                <select v-model="Question_typetag" class="form-control">
                  <option v-for="questionopt in questionopts" v-bind:value="questionopt.type">{{questionopt.type}}</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <label for="marks"><strong>Marks: </strong></label><br>
              <input v-model="Markstag" type="number" id="marks" class="form-control" placeholder="Marks">
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <label for="question"><strong>Question: </strong></label><br>
              <textarea v-model="Questiontag" type="text" id="Question" class="form-control" placeholder="Add New Question"></textarea>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="answer"><strong>Answer: </strong></label><br>
                <textarea v-model="Answertag" type="textinput" id="answer" class="form-control" placeholder="add new answer"></textarea>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <button v-if="this.isEdit==false" type="submit" class="btn btn-success btn-block mt-3">
                Submit
              </button>
              <button v-else v-on:click="updateTask(id)" type="button" class="btn btn-primary btn-block mt-3">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- End dashboard -->

    <!-- Begin query panel -->
    <div class="row" v-if="showQuery">
      <div class="col-md-12">
        <form v-on:submit.prevent class="jumbotron">
          <div class="form-group">
            <div class="row queryinputs">
              <!-- <div class="col-md-2">
                <label for="querybytopic"><strong>Query by Topic: </strong></label><br>
              </div>
              <div class="col-md-3">
                <div class="dropdown inputs">
                  <select v-model="topicQuery" class="form-control" name="querybytopic" id="querybytopic">
                    <option value="Mechanics">Mechanics</option>
                    <option value="Nuclear">Nuclear</option>
                    <option value="Thermal">Thermal</option>
                    <option value="Thermal">Particle</option>
                    <option value="" placeholder="leave empty">leave empty</option>
                  </select>
                </div>
              </div> -->

              <div class="col-md-2 inputs">
                <div class="dropdown">
                  <label for="topic"><strong>Topic: </strong></label><br>
                  <select v-model="TopicQuery" name="topic" id="topic" class="form-control">
                    <option v-for="(topic_obj, topic) in subjects" :value="topic">{{topic}}</option>
                    <option value="" placeholder="leave empty">leave empty</option>
                  </select>
                </div>
              </div>

              <div class="col-md-3">
                <div class="dropdown inputs">
                  <label for="subtopic"><strong>Sub-topic: </strong></label><br>
                  <select :disabled="subTopicsQuery.length == 0" v-model="Sub_topicQuery" class="form-control" name="subtopic" id="subtopic">
                    <option v-for="subTopics in subTopicsQuery">{{subTopics}}</option>
                    <option value="" placeholder="leave empty">leave empty</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-md-2">
                <label for="querybytopic"><strong>Query by Level: </strong></label><br>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <div class="dropdown inputs">
                    <select v-model="levelQuery" class="form-control" name="querybylevel" id="querybylevel">
                      <option value="Higher">Higher</option>
                      <option value="Ordinary">Ordinary</option>
                      <option value="" placeholder="leave empty">leave empty</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <button v-on:click="getQuery(levelQuery, TopicQuery, Sub_topicQuery)" type="submit" class="btn btn-success btn-submitquery">
                Submit Query
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- End Query -->

    <!-- Display data-->
    <div class="row">
      <div class="col-md-12">
        <hr>
      </div>
    </div>
    <div v-for="(todo,index) in reversedTodos">
      <div class="row">
        <div class="col-md-12 alignRight">
          <font-awesome-icon icon="edit" v-on:click="editTask(todo.id, todo.Level, todo.Year, todo.Question, todo.Answer, todo.Topic, todo.Sub_topic,todo.Question_type, todo.Marks, todo.Question_number, todo.Part, todo.Sub_part)" />
          &nbsp;
          <font-awesome-icon icon="trash-alt" v-on:click="deleteTask(todo.id)" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 alignLeft"><strong>{{todo.Level}} {{todo.Year}} Q.{{todo.Question_number}} {{todo.Part}} {{todo.Sub_part}} ({{todo.Marks}} marks)</strong></div>
        <div class="col-md-6 alignRight">({{todo.Topic}}, {{todo.Sub_topic}}, {{todo.Question_type}} type question)</div>
      </div>
      <div class="row">
        <div class="col-md-12 alignLeft"> Question: {{todo.Question}}</div>
      </div>
      <div class="row">
        <div class="col-md-12 alignLeft"> Answer: {{todo.Answer}}</div>
        <div class="col-md-12">
          <hr>
        </div>
      </div>
    </div>
  </div>
  <!-- End data display -->

</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'List',
  data() {
    return {
      subjects: {
        "Mechanics": ["Force", "Momentum", "Acceleration", "Centripetal acceleration", "Gravity", "Friction"],
        "Thermal": ["Charle's Law", "Specific heat capacity", "Latent heat of vaporisation"],
        "Nuclear": ["Half-life", "Decay rate", "Radioactivity"],
        "Particle": ["Hadrons", "Baryons", "Leptons"]
      },
      topics: [],
      subTopics: [],

      selectLevels: ['Higher', 'Ordinary'],
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
        type: 'Short Question'
      }, {
        type: 'Experiment'
      }, {
        type: 'Definition'
      }, {
        type: "Derivation"
      }],
      selected: '',
      todos: [],
      id: '',
      addnewTopic: 'newTopic',
      addnewtopic: '',
      addnewsubtopic: '',

      showQuery: false,
      showDashboard: true,
      showOptions: true,

      levelQuery: 'Higher',
      yearQuery: '2019',
      qnumberQuery: '',
      topicQuery: 'Mechanics',
      TopicQuery: '',
      Sub_topicQuery: '',
      subtopicQuery: 'Force',
      subTopicsQuery: '',
      questiontypeQuery: 'Theory',

      Yeartag: 2019,
      Leveltag: 'Higher',
      Questiontag: '',
      Answertag: '',
      Topictag: '',
      Sub_topictag: '',
      Question_typetag: 'Theory',
      Markstag: 5,
      Question_numbertag: 2,
      Parttag: 'c',
      Sub_parttag: 'ii',
      isEdit: false,

      existingtopic: true,
      TopicExisting: '',
      Sub_topicExisting: '',
      subTopicsExisting: [],

      check: false
    }
  },
  created() {
    this.getTasks()
    // need to get and then generate topics and related subtopics object
    // subjects: {
    //   "Mechanics": ["Force", "Momentum", "Acceleration", "Centripetal acceleration", "Gravity", "Friction"],
    //   "Thermal": ["Charle's Law", "Specific heat capacity", "Latent heat of vaporisation"],
    //   "Nuclear": ["Half-life", "Decay rate", "Radioactivity"],
    //   "Particle": ["Hadrons", "Baryons", "Leptons"]
    // }
  },
  methods: {
    toggleExisting() {
      this.existingtopic = !this.existingtopic;
    },
    addOptions() {
      // check if topic exists in subjects
      this.check = this.subjects.hasOwnProperty(this.TopicExisting)
      if (this.check) {
        this.subjects[this.TopicExisting].push(this.Sub_topicExisting);
      } else {
        this.subjects[this.TopicExisting] = []; // must set this as an array
        this.subjects[this.TopicExisting].push(this.Sub_topicExisting);
      }
      this.TopicExisting = '';
      this.Sub_topicExisting = '';
      console.log(JSON.stringify(this.subjects, null, 4))
    },
    toggleQuery() {
      this.showQuery = !this.showQuery;
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    toggleDashboard() {
      this.showDashboard = !this.showDashboard;
    },
    getTasks() {
      axios.get("/api/tasks").then(
        result => {
          // console.log(result.data)
          this.todos = result.data

          // get most recently added elements in todos for dashboard panel form
          this.Yeartag = this.todos[this.todos.length - 1].Year
          this.Leveltag = this.todos[this.todos.length - 1].Level
          this.Questiontag = this.todos[this.todos.length - 1].Question
          this.Answertag = this.todos[this.todos.length - 1].Answer
          this.Topictag = this.todos[this.todos.length - 1].Topic
          this.Sub_topictag = this.todos[this.todos.length - 1].Sub_topic
          this.Question_typetag = this.todos[this.todos.length - 1].Question_type
          this.Markstag = this.todos[this.todos.length - 1].Marks
          this.Question_numbertag = this.todos[this.todos.length - 1].Question_number
          this.Parttag = this.todos[this.todos.length - 1].Part
          this.Sub_parttag = this.todos[this.todos.length - 1].Sub_part
        },
        error => {
          console.error(error)
        }
      )
    },
    getQuery(level, topic, subtopic) {
      if (!topic) {
        topic = " ";
      }
      if (!subtopic) {
        subtopic = " ";
      }
      if (!level) {
        level = " ";
      }
      axios.get("/api/tasks/" + level + "/" + topic + "/" + subtopic + "/").then(
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
      // console.log("this.Questiontag: " + this.Questiontag);
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
          this.getTasks()
        }).catch((err) => {
          console.log(error)
        })
    },
    //need to call editTask() twice to invoke the watched variable Sub_topictag
    editTask(id, edit_Level, edit_Year, edit_Question, edit_Answer, edit_Topic, edit_Sub_topic, edit_Question_type, edit_Marks, edit_Question_number, edit_Part, edit_Sub_part) {
      this.id = id
      this.Leveltag = edit_Level
      this.Yeartag = edit_Year
      this.Questiontag = edit_Question
      this.Answertag = edit_Answer
      this.Topictag = edit_Topic
      this.Sub_topictag = edit_Sub_topic
      this.Question_typetag = edit_Question_type
      this.Markstag = edit_Marks
      this.Question_numbertag = edit_Question_number
      this.Parttag = edit_Part
      this.Sub_parttag = edit_Sub_part
      this.isEdit = true
    },
    updateTask(id) {
      console.log("updateTask()");
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
          Sub_topic: this.Sub_topictag,
          Question_type: this.Question_typetag,
          Marks: this.Markstag
        })
        .then((res) => {
          this.isEdit = false;
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
          this.getTasks()
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
  watch: {
    Topictag: function() {
      this.topics = [];
      this.subTopics = [];
      // uncommenting this line below will clear subTopics
      // everytime edit is used, we don't want that!
      // this.Sub_topictag = "";
      console.log("watching this.Topictag..........");

      if (this.Topictag.length > 0) {
        // if (this.Topictag == this.newTopic) {
        //   console.log("this.Topictag = " + this.Topictag);
        // } else {
        console.log("watching this.Topictag.length > 0");
        this.subTopics = this.subjects[this.Topictag]
        console.log("this.Topictag = " + this.Topictag);
        // }
      }
      // console.log("this.Topictag.length = " + this.Topictag.length);

      // if (this.Topictag == "newTopic") {
      //   console.log("someone is trying to add a new topic....");
      // }
    },
    TopicQuery: function() {
      this.topicsQuery = [];
      this.subTopicsQuery = [];
      // uncommenting this line below will clear subTopics
      // everytime edit is used, we don't want that!
      // this.Sub_topictag = "";
      if (this.TopicQuery.length > 0) {
        this.subTopicsQuery = this.subjects[this.TopicQuery]
      }
    },
    // addnewtopic: function() {
    //   console.log("watch: change on addnewtopic: " + this.addnewtopic);
    //   // this.disableSubTopicForm = true;
    // }
    // TopicExisting: function() {
    //   console.log("TopicExisting: " + this.TopicExisting);
    //   // this.Sub_TopicExisting = [];
    //   // if (this.TopicExisting.length > 0) {
    //   //   this.subTopicsExisting = this.subjects[this.TopicExisting]
    //   // }
    // }
  }
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

/* td {
  width: 20px;
  white-space: nowrap;
  overflow: hidden;
} */

button {
  width: 100px;
  align: center;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}

.queryinputs {
  margin: 10px;
}

.btn-submitquery {
  white-space: nowrap;
  width: 150px;
}

.btn-existingtopic {
  white-space: nowrap;
  width: 350px;
}

.btn-newrelatedtopic {
  white-space: nowrap;
  width: 350px;
}

.btn-query-show {
  white-space: nowrap;
  width: 150px;
}

.btn-query-remove {
  white-space: nowrap;
  width: 200px;
}

.btn-dashboard-show {
  white-space: nowrap;
  width: 200px;
}

.btn-dashboard-remove {
  white-space: nowrap;
  width: 210px;
}

.alignLeft {
  text-align: left;
}

.alignRight {
  text-align: right;
}

button {
  margin: 5px;
}

.optionsPanel {
  border-radius: 5px;
  border: 1px solid gray;
}

.jumbotron {
  border: 1px solid black;
}
</style>
