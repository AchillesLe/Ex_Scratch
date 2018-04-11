
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/nodekb');

let db = mongoose.connection;

db.on('open', function(){
    console.log('Connected to MongoDatabase ');
});

db.on('error' , function(err){
     console.log(err);
});

let Article = require('./models/article');
const app = express();
const PORT = 3000;


app.set( 'views', path.join(__dirname,'views') );
app.set( 'view engine','pug' );

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )
app.use( express.static( path.join(__dirname , 'public' ) ) );


app.get('/', function(req,res){
    Article.find({} , function(err , articles){
        res.render( 'index' ,{
            title :'index',
            articles : articles
        });
    });
});


app.get( '/articles/add', function( req , res ){
    res.render('add_article', {
        title: "add article"
    });
});

app.post( '/articles/add', function( req , res ){
    let art  = new Article();
    art.title = req.body.title;
    art.author = req.body.author;
    art.body = req.body.body;

    art.save( function(err){
        if(err){
            console.log(err);
            return ;
        }
        else{
            res.redirect('/articles');
        }
    });
});

app.get( '/article/:id',function(req,res){
    Article.findById( req.params.id ,function(err , article){
        res.render('article',{
            article : article
        });
    });
});
app.get( '/article/edit/:id',function(req,res){
    Article.findById( req.params.id ,function(err , article){
        res.render('edit_article',{
            article : article
        });
    });
});
app.post( '/article/edit/:id',function(req,res){

    Article.findById( req.params.id ,function(err , article){
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
        article.save( function(){
           res.redirect('/');
        });
    });
});
app.delete('/article/:id' , function( req , res){
    let data = { _id : req.params.id}
    Article.remove( data , function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});
app.listen( PORT);
