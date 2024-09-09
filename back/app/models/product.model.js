

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

  
  REF: {
    type: String,
    required: [false, "Veuillez entrer le REF du produit"]
  },
  name: {
    type: String,
    required: [true, "Veuillez entrer le nom du produit"]
  },
  description: {
    type: String,
    required: [true, "Veuillez entrer la description du produit"]
  },

  famille: {
    type: String,
    required: [true, "Veuillez spécifier la famille"],
    enum: [
      'Bois_Blanc',
      'Bois_Rouge',
      'Bois_Dur',
      'Bois_Mdf'
    ]
  },

  
  categorie: {
    type: String,
    required: [true, "Veuillez spécifier la categorie"],
    enum: [
      'Normal',
      'Premium',
     
    ]
  },
  type: {
    type: String,
    required: [false, "Veuillez spécifier le type"],
    enum: [
             'Hêtre','Frêne','Acajou_Sapolli','Chêne','Brutte','Mélaminé','Couvre_Chant','Hydrofuge','Vida','Saters','Moelven','Rundvirke','StoraEnso & Khumo','Taiga','Arkhangesk','Ilim'
    ]
  },
  // soustype: {
  //   type: String,
  //   required: [false, "Veuillez spécifier le type"],
  //   enum: [
  //            'Vida','Saters','Moelven','Rundvirke','Vogue_bois','Calvi','Delta_Bois','Sangiorgi_Italie','Shared_Wood'
  //   ]
  // },

  choix: {
    type: String,
    required: [false, "Veuillez spécifier le type"],
    enum: [
             '1ere','2eme','3eme','6.5' , '7eme','Schalbord','Semi_avivé','Plots','Avivé_étuvé choix A','Plots_étuvé choix A','Plots_étuvé choix BC','Avivé_étuvé choix B',
             'Avivé_étuvé choix AB','Semi_avivé','Plots','Avivé','Choix QB1A','Basse','Doméstique'
    ]
  },

});

module.exports = mongoose.model('Product', productSchema);