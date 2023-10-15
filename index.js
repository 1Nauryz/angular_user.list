const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db')
const {mongo} = require("mongoose");
const {db} = require("./config/db");
const app = express();

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.get('/', (req, res) =>{
    res.send('SECOND PROJECT WITH STACK MEAN')
});

app.get('/test', (req, res) =>{
    // const collection = client.db('todos').collection('todos');
    res.sendFile(path.join(__dirname, '/public/test.html'));
}
);
app.get('/add_student', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/add-students.html'));
});
app.get('/students_page', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/students.html'));
});



const main = () => {
    return new Promise( (resolve,reject)=>
    {
        mongoose
            .connect(db)
            .then(() => {
                console.log('DB Connected');
                app.listen(port, () => {
                    console.log('Server started' + port)
                    resolve();
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    })
}

const Student = require('./models/student');

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

app.post('/students', async (req, res) => {
  try {
    const { name, surname, gpa } = req.body;
    const newStudent = new Student({ name, surname, gpa });
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Student add error' });
  }
});
const User = require('./models/user');

app.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});
app.post('/user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User add error' });
  }
});


app.delete('/students/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const deletedStudent = await Student.findByIdAndRemove(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Student delete ERROR' });
    }
});


main()
    .then(() => {
        console.log("Success")
    })
    .catch((err)=>{
        console.log("ERROR")
    })
