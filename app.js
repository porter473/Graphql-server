const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongo  = require('mongoose');
const cors = require('cors');

app.use(cors());

 mongo.connect("url", { useUnifiedTopology: true , useNewUrlParser: true });
 mongo.connection.once('open', ()=>{
    console.log('Database Connected');
 })

const schema =  require('./schema/schema')

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(4000, ()=> {
    console.log("Listening at Port 4000");
})