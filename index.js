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

app.delete('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('User ID to delete:', userId);
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      console.log('User not found for deletion:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User deleted successfully:', userId);
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'User delete error' });
  }
});

app.put('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.password = password;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'User update error' });
  }
});


main()
    .then(() => {
        console.log("Success")
    })
    .catch((err)=>{
        console.log("ERROR")
    })
