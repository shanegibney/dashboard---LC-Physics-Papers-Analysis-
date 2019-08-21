# Dashboard for Leaving Cert Physics Exam Papers Analysis

The vue.js code is in the physicspspersanalysis directory.

This project uses a MEVN stack - mySQL, Express.js, Vue.js and NodeJS

* This project is the first step to build software that will allow for analysis of the Leaving Certificate examination papers.

* The dashboard is being built to allow easy entry of data to a mySQL database.

* The subsequent step will involve querying the information in the database to figure out what is the most relevant and time efficient material for a student to cover.

* The final step will involve using this information to create an online study site which will generate problems, correct and keep track of student progress.

## Installing and running

* The project's root directory uses Express.js

* First install all dependencies

```
$ npm i
```

and run using

```
$ npm run start
```

* In the root directory there is another directory 'physicspaperanalysis' this is the directory containing the frontend vue.js framework. Enter it, install dependencies and run,

```
$ cd physicspaperanalysis
$ npm i
$ npm run serve
```

However the db needs to be created. This shouldn't be a problem using information from MEVN-Physics-Ppaers-Analysis/model/Task.js

```
mysql> describe physics_tbls;
```

```
+-----------------+--------------+------+-----+---------+----------------+
| Field           | Type         | Null | Key | Default | Extra          |
+-----------------+--------------+------+-----+---------+----------------+
| id              | int(11)      | NO   | PRI | NULL    | auto_increment |
| Level           | varchar(11)  | YES  |     | NULL    |                |
| Year            | int(4)       | YES  |     | NULL    |                |
| Question        | varchar(300) | YES  |     | NULL    |                |
| Answer          | varchar(300) | YES  |     | NULL    |                |
| Topic           | varchar(100) | YES  |     | NULL    |                |
| Sub_topic       | varchar(100) | YES  |     | NULL    |                |
| Question_type   | varchar(100) | YES  |     | NULL    |                |
| Marks           | int(10)      | YES  |     | NULL    |                |
| Question_number | int(2)       | YES  |     | NULL    |                |
| Part            | varchar(5)   | YES  |     | NULL    |                |
| Sub_part        | varchar(5)   | YES  |     | NULL    |                |
+-----------------+--------------+------+-----+---------+----------------+
```
