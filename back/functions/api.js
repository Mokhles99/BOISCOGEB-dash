const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Initialiser Express
const app = express();

app.use(express.json());

// var corsOptions = {
//   origin: ['http://localhost:8081', 'http://localhost:8082', 'http://localhost:8080', 'http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174']
// };
var corsOptions = {
	origin: '*'
  };
app.use(cors(corsOptions));

// Configurer Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
    cloud_name: 'dlp3bn4yr',
    api_key: '241549437291335',
    api_secret: 'Cn9oM8rXApFHPvsfOh7HNa5BL-0'
  });

// Charger les routes
const productRoutes = require('../app/routes/product.routes');
const aboutRoutes = require('../app/routes/about.routes');
const catalogueRoutes = require('../app/routes/catalogue.routes');
const carouselRoutes = require('../app/routes/carousel.routes');
const formulaireRoutes = require('../app/routes/formulaire.routes');
const uploadRoute = require('../app/routes/upload.route');
const downloadRoutes = require('../app/routes/download.routes');
const cartRoutes = require('../app/routes/cart.routes');
const carttwoRoutes = require('../app/routes/carttwo.routes');

// Utiliser les routes
app.use('/download', downloadRoutes);
app.use('/upload', uploadRoute);
app.use('/product', productRoutes);
app.use('/carousel', carouselRoutes);
app.use('/catalogue', catalogueRoutes);
app.use('/about', aboutRoutes);
app.use('/formulaire', formulaireRoutes);
app.use('/cart', cartRoutes);
app.use('/carttwo', carttwoRoutes);

// Configurer MongoDB
mongoose.set('strictQuery', false);
// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI='mongodb+srv://Mokles:123456789Mokles@cluster0.0qupb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const db = require('../app/models'); // Importer les modèles
const Role = db.role; // Importer le modèle Role

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial(); // Appeler la fonction initial() après la connexion à MongoDB
  })
  .catch(err => {
    console.error("Connection error", err);
  });

// Middleware pour analyser le corps des requêtes
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes d'authentification
require("../app/routes/auth.routes")(app);
require("../app/routes/user.routes")(app);

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mokhles application." });
});

// Fonction initiale pour configurer les rôles par défaut
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: "user" }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({ name: "moderator" }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });

      new Role({ name: "admin" }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Utiliser serverless-http pour créer la fonction Netlify
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
