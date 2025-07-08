const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("coffee-store");
    const coffeeCollection = database.collection("coffees");
    const orderCollection = database.collection("orders");

    // generete jwt
    app.post('jwt', (req,res) => {
      const user = {email: req.body.email}
    })



    app.get("/coffees", async (req, res) => {
      const allCoffees = await coffeeCollection.find().toArray();
      console.log(allCoffees);
      res.send(allCoffees);
    });
    app.post("/add-coffee", async (req, res) => {
      const coffeeData = req.body;
      const quantity = coffeeData.quantity;
      coffeeData.quantity = parseInt(quantity);
      const result = await coffeeCollection.insertOne(coffeeData);

      console.log(result);

      res.status(201).send({ ...result });
    });

    // get a single coffee by id
    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const coffee = await coffeeCollection.findOne(filter);
      console.log(coffee);
      res.send(coffee);
    });

    // get a single coffee by email
    app.get("/my-coffees/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email };
      const coffees = await coffeeCollection.find(filter).toArray();
      console.log(coffees);
      res.send(coffees);
    });

    // handle like toggle
    app.patch("/like/:coffeeId", async (req, res) => {
      const id = req.params.coffeeId;
      const email = req.body.email;
      const filter = { _id: new ObjectId(id) };
      const coffee = await coffeeCollection.findOne({ _id: new ObjectId(id) });
      const alreadyLiked = coffee?.likedBy.includes(email);
      const updateDoc = alreadyLiked
        ? {
            $pull: {
              likedBy: email,
            },
          }
        : {
            $addToSet: {
              likedBy: email,
            },
          };

      await coffeeCollection.updateOne(filter, updateDoc);
      res.send({
        message: alreadyLiked ? "Dislike Successful" : "Like Successful",
        liked: !alreadyLiked,
      });
    });

    // handle order
    app.post("/place-order/:coffeeId", async (req, res) => {
      const id = req.params.coffeeId;
      const orderData = req.body;
      console.log(orderData);
      const result = await orderCollection.insertOne(orderData);
      if (result.acknowledged) {
        // update quantity
        await coffeeCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $inc: {
              quantity: -1,
            },
          }
        );
        return res.status(200).send({ success: true, message: "Order placed and quantity updated." });
      }
    });

    // get all order by customer email
    app.get('/my-orders/:email', async (req, res) => {
      const email = req.params.email
      const filter = { customerEmail: email}
      const allOrders = await orderCollection.find(filter).toArray()
      // allOrders.forEach(async order => {
      //   const orderId = order.coffeeId
      //   const fullCoffeeData = await coffeeCollection.findOne({
      //     _id: new ObjectId(orderId)
      //   })
      //   console.log(fullCoffeeData);
      // })
      // order.name =fullCoffeeData.name

      for (const order of allOrders){
        const orderId = order.coffeeId
        const fullCoffeeData = await coffeeCollection.findOne({
          _id: new ObjectId(orderId)
        })
        order.name = fullCoffeeData.name
        order.photo = fullCoffeeData.photo
        order.price = fullCoffeeData.price
        order.quantity = fullCoffeeData.quantity
      }


      res.send(allOrders)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Wellcome to Coffee Store Server");
});

app.listen(port, () => {
  console.log("server is running");
});
