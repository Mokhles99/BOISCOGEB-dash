const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
const bodyParser = require('body-parser')

var corsOptions = {
  origin: ['http://localhost:8081','http://localhost:8082','http://localhost:8080','http://localhost:3000', 'http://localhost:3001','http://127.0.0.1:5173','http://127.0.0.1:5174']
};

cloudinary.config({
  cloud_name: 'dlp3bn4yr',
  api_key: '241549437291335',
  api_secret: 'Cn9oM8rXApFHPvsfOh7HNa5BL-0'
});
   
const productRoutes=require ('./app/routes/product.routes')
const aboutRoutes=require ('./app/routes/about.routes')
const catalogueRoutes=require ('./app/routes/catalogue.routes')
const carouselRoutes=require ('./app/routes/carousel.routes')
const formulaireRoutes=require('./app/routes/formulaire.routes')

const uploadRoute = require('./app/routes/upload.route'); 
const downloadRoutes = require('./app/routes/download.routes');
const cartRoutes = require ('./app/routes/cart.routes')
const carttwoRoutes = require ('./app/routes/carttwo.routes')

app.use('/download', downloadRoutes);
app.use('/upload', uploadRoute); 
mongoose.set('strictQuery', false);
// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI='mongodb+srv://Mokles:123456789Mokles@cluster0.0qupb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// parse requests of content-type - application/json


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

//`mongodb://localhost:27017/Zaremdine`   a la place de mongouri
db.mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mokles application." });
});


app.use('/product',productRoutes)
app.use('/carousel',carouselRoutes)
app.use('/catalogue',catalogueRoutes)
app.use('/about',aboutRoutes)
app.use('/formulaire',formulaireRoutes)
app.use('/cart',cartRoutes)
app.use('/carttwo',carttwoRoutes)

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
