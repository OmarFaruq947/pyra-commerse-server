const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors =require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.blxur.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection', err);
  const productCollection = client.db("pyra").collection("Commerce");


app.get('/Commerce', (req, res) => {
  productCollection.find()
  .toArray((err, items) => {
    res.send(items)
  })
})




  app.post('/addProduct'), (req,res) => {
    const newProuct = req.body;
    console.log('ading new event: ', newProuct);
    productCollection.insertOne(newProuct)
    .then(result => {
      console.log('inserted count',result.insertedCount)
      res.send( result.insertedCount > 0 )
    } )
  }

  // client.close();
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})