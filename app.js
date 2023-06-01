const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');




const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeContent = "Hello this is home";
const aboutContent = "Hello this is About";
const contactContent = "Hello this is Contact";

var posts = [];




app.get('/', function(req, res){
    res.render('home', {content: homeContent,
                        allPosts: posts});

});

app.get('/posts/:postName', function(req, res){
    console.log(req.params.postName);
    posts.forEach(element => {
        if (_.lowerCase(element.title) === _.lowerCase(req.params.postName)){
            console.log('Match!');
            post = {'title': element.title,'body': element.body};
            res.render('post', {post: post});
        }
    });
    console.log('Not a match!');
    res.redirect('/')
});

app.get('/about', function(req, res){
    res.render('about', {content: aboutContent});
});


app.get('/contact', function(req, res){
    res.render('about', {content: contactContent});
});


app.get('/compose', function(req, res){
    res.render('compose');
});

app.post('/compose', function(req, res){
    const post = {
        'title': req.body.newTitle,
        'body': req.body.newStory
    };
    posts.push(post);
    res.redirect('/');
});


app.listen(port=3000, function(){
    console.log('Server starting on port 3000..');
})
