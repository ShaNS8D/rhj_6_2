import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

let posts = [];
let nextId = 1;

try {
  const data = fs.readFileSync('posts.json', 'utf-8');
  posts = JSON.parse(data);
  if (posts.length > 0) {
    nextId = Math.max(...posts.map(post => post.id)) + 1;
  }
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('Файл posts.json не найден, будет создан при первом сохранении');
  } else {
    console.error('Ошибка при чтении файла:', err);
  }
}

function savePostsToFile() {
  fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
}

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.get("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((o) => o.id === postId);
  if (post) {
    res.send(JSON.stringify({ post }));
  } else {
    res.status(404).send(JSON.stringify({ error: "Post not found" }));
  }
});

app.put("/posts/:id", (req, res) => {
  try {
    const postId = Number(req.params.id);    
    const index = posts.findIndex((o) => o.id === postId);
    if (index === -1) {
      return res.status(404).send(JSON.stringify({ error: "Post not found" }));
    }    
    posts[index] = { ...posts[index], ...req.body, id: postId };
    savePostsToFile();    
    res.status(200).send(JSON.stringify(posts));
  } catch (err) {
    res.status(500).send(JSON.stringify({ error: "Server error" }));
  }
});


app.post("/posts", (req, res) => {
  const newPost = { ...req.body, id: nextId++, created: new Date().toISOString().split('T')[0] };
  posts.push(newPost);
  savePostsToFile();
  res.status(201).send(JSON.stringify(posts));
});

app.delete("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);  
  if (index === -1) {
    return res.status(404).send(JSON.stringify({ error: "Post not found" }));
  }
  const deletedPost = posts.splice(index, 1)[0];
  savePostsToFile();
  res.status(200).send(JSON.stringify(deletedPost));
});

const port = process.env.PORT || 7070;
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
  console.log('Posts loaded:', posts.length);
});