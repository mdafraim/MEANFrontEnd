const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
var cors = require('cors')


const app = express();
app.use(cors())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

mongoose.connect('mongodb+srv://mohammadafraim:V98gyaXc3sAMFjje@meanstack.iwjukai.mongodb.net/?retryWrites=true&w=majority&appName=MEANStack')
.then(() => {
    console.log('Mongodb server is connected')
}).catch(() => {
    console.log('failed to connect mongodb');
});


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next()
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save();
    res.status(201).json({
      message: "Post successfully Added..!"
    });
})

app.get('/api/posts/',(req, res) => {
    Post.find().then(document => {
        res.status(200).json({
            message: "Posts fetch successfully..!",
            posts: document
        });
    })
   
});

app.delete('/api/posts/:id', (req,res,next) => {
    Post.deleteOne({
        _id:req.params.id
    }).then(result => {
        console.log(result)
        res.status(200).json({ message: "post is deleted..!"})
    }) 
});

module.exports = app;