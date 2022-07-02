const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port=process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.User_Id}:${process.env.User_pass}@cluster0.bvpcziz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    await client.connect();
    const AddTaskCollection =client.db("Add_Tasl").collection("Task")
    const CompleteTaskCollection =client.db('C_Task').collection('Ctask')
    try{
        app.post('/task', async(req,res) =>{
            const addTask= req.body;
            const result = await AddTaskCollection.insertOne(addTask)
            res.send(result);
        })

        app.get('/task', async(req,res) =>{
            const query = {};
            const cursor=AddTaskCollection.find(query);
            const task=await cursor.toArray();
            res.send(task);
        })
        app.get('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const task= await AddTaskCollection.findOne(query);
           res.send(task) 
        });
        console.log('connect');


    }
    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Yes key-task server site');
})

app.listen(port,()=>{
    console.log('listening on port 5000');
})