const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB
const ObjectID = require('mongodb').ObjectID
const fs = require("fs");
var app = express();
var util = require("util");
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}))



app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log('accueil' + req.url)
   
   var cursor = db.collection('adresse').find().toArray(function(err, resultat){
   if (err) return console.log(err)
   // transfert du contenu vers la vue index.ejs (renders)
   // affiche le contenu de la BD
   res.render('accueil.ejs')
   }) 

})

app.get('/adresses', (req, res) => {
 console.log('adresses = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('adresse.ejs', {adresse: resultat})
 }) 
})


app.post('/ajouter', (req, res) => {
 
 // Preparer l'output en format JSON

 var oModification = {
    nom: "",
    prenom: "", 
    telephone: "",
    courriel: ""
  }

  console.log('la route /ajouter')
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('adresses')
 })


})


app.get('/detruire/:id', (req, res) => {
 var id = req.params.id
 console.log(id)
 db.collection('adresse')
 .findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {

if (err) return console.log(err)
 res.redirect('adresses')  // redirige vers la route qui affiche la collection
 })
})



app.post('/modifier', (req,res) => {

  var util = require("util");
  
  var oModification = {

    "_id": ObjectID(req.body['_id']),

    nom: req.body.nom,

    prenom:req.body.prenom, 

    telephone:req.body.telephone,

    courriel:req.body.courriel
  }


  db.collection('adresse').save(oModification, (err, result) => {
    if (err) return console.log(err)
    console.log('modif dans la BD')
    res.redirect('adresses')
  })


})




let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})