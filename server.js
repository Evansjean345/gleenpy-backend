const express = require("express");
const app = express();
const port = 3000; //PORT to change for the deployment
const mongoose = require("mongoose");
const routes = require('./routes/user')



app.get("/", (req, res) => res.send("Hello World!"));

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);

//allow http methods
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json())
//connect to database
//not change the Username
mongoose
  .connect(
    "mongodb+srv://evansJean:Azerty0987@cluster0.a2k1t6d.mongodb.net/gleenpy?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => console.log(`database connecting ${res}`))
  .catch((err) => console.log(`connection failed ${err.message}`));

//set authentification middleware
app.use(routes)