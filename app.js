const express=require('express');
const bodyParser=require('body-parser');

const app=express();

// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//importing routes
const authRoutes=require('./routes/auth');
const articleRoutes=require('./routes/article');

app.use('/',articleRoutes);
app.use('/auth',authRoutes);

app.listen(3000);