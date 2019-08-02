const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  //if table name does not end in an 's' then it is added during query...odd!!!?
  "physics_tbls", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Level: {
      type: Sequelize.STRING
    },
    Year: {
      type: Sequelize.INTEGER
    },
    Question: {
      type: Sequelize.STRING
    },
    Answer: {
      type: Sequelize.STRING
    },
    Topic: {
      type: Sequelize.STRING
    },
    Sub_topic: {
      type: Sequelize.STRING
    },
    Question_type: {
      type: Sequelize.STRING
    },
    Marks: {
      type: Sequelize.INTEGER
    },
    Question_number: {
      type: Sequelize.INTEGER
    },
    Part: {
      type: Sequelize.STRING
    },
    Sub_part: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  }
)