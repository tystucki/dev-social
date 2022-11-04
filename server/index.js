// IMPORTING
require('dotenv').config()

const { sequelize } =  require( './util/database')
const { User } = require('./models/user')
const { Post } = require('./models/post')

const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {register, login} = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express ();

// MIDDLEWARE  to parse request into JSON
app.use(express.json())
app.use(cors())


User.hasMany(Post)
Post.belongsTo(User)

// ENDPOINTS 

// AUTH 
app.post('/register', register)
app.post('/login', login)

// GET POST - no auth 
app.get('/posts', getAllPosts)

// CRUD POST - auth requried
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)


sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`app is running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err))





