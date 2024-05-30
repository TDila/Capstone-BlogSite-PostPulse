import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, resp) => {
    resp.render("home.ejs",{posts:posts});
});

app.get('/home', (req, resp) => {
    resp.render("home.ejs",{posts:posts});
});

app.get('/new-post', (req,resp) => {
    resp.render("new-post.ejs");
});

app.get('/post', (req, resp) => {
    let post = posts[req.query.id];
    console.log(post);
    resp.render("post.ejs",{post:post});
})

app.post('/add-post', (req, resp) => {
    let title = req.body.title;
    let content = req.body.content;
    let datetime = new Date().toISOString().split('T')[0];
    if(title === "" || content === "" ){
        resp.render("new-post.ejs");
    }else{
        let newPost = {
            id:posts.length,
            title:title,
            content:content,
            datetime:datetime,
        }
        posts.push(newPost);
        resp.render("home.ejs",{posts:posts});
    }
});

app.listen(port, () => {
    console.log("Server is running on port "+port);
});