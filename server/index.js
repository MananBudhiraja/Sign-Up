const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['https://sign-up-fw54.vercel.app/'], // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const EmployeeModel = require('./models/employee.js');

mongoose.connect('mongodb+srv://Manan:manan9897@cluster0.mlxcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

// mongoose.connect("mongodb://localhost:27017/employee", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to MongoDB");
// }).catch(err => {
//     console.error("Failed to connect to MongoDB", err);
// });

app.get("/"(req,res)=>{
    res.json("hello");
})

app.post("/login", (req,res)=>{
    const{email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
    if(user){
        if(user.password==password){
            res.json("Success")
        }else{
            res.json("The password is incorrect")
        }}
        else{
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to register employee', details: err });
        });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
