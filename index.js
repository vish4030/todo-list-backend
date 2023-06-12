
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect("mongodb+srv://vish4030:1234mongo@cluster0.f8xhe5a.mongodb.net/todoData").then(() => { console.log("mongodb connected") }).catch(
    (err) => { console.log(err) }
);

const todoSchema = mongoose.Schema({
    todoValue: String
})

const todoItem = mongoose.model("todoItem", todoSchema);



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post('/save', async (req, res) => {
    console.log(req.body);
    const item = new todoItem({ todoValue: req.body.todoValue })
    if (req.body.todoValue != undefined) {
        await item.save();
        res.send(`${req.body.todoValue} is added to DB.`);
    }
})

app.get("/get", async (req, res) => {
    const items = await todoItem.find();
    const arr = [];
    for(let item of items)
    {
        console.log(item.todoValue);
        arr.push(item.todoValue);   
    }
    res.send(arr);
})


app.listen(5000, () => console.log("listning at 5000"));