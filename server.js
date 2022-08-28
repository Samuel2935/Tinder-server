import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cards from './dbCards.js'
import bodyParser from 'body-parser'



// app config
const app = express();
const port = process.env.PORT || 8001;
// const connect_url = "mongodb+srv://admin:hEjF3PLBEpr4fATu@cluster0.x15wfaz.mongodb.net/?retryWrites=true&w=majority";//name issue might arise

const connect_url = "mongodb+srv://admin:frLHAUAfQMQiOQI1@cluster0.tx5tpko.mongodb.net/?retryWrites=true&w=majority"

// middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());

// db config
mongoose.connect(connect_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    serverSelectionTimeoutMS: 500000000,
  
});

// api endpoint
app.get('/', (req, res)=>{
    res.status(200).send('here we go dude!!');
});

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;
    cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/card', (req, res)=>{
    cards.find( (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    });
});

// frLHAUAfQMQiOQI1 //for admin/tinder-clone
// listener
// hEjF3PLBEpr4fATu //for admin/tinder_backend
app.listen(port, ()=> console.log(`listening on port: ${port}`))