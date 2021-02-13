const express=require('express');
const { graphqlHTTP }=require('express-graphql');
const schema=require('./schema/schema');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
mongoose.connect('mongodb+srv://sjay05305:graphql101@cluster0.vdh7t.mongodb.net/graphql-101?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open',()=>{
    console.log('connected to mongodb!');
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log(`Server is up!`);
})