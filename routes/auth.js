const router = require('express').Router();
const Admin = require('../model/admin');
const Blog = require('../model/blog');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


// Register Admin
router.post('/admin-register' , async(req, res) => {
    const admin = new Admin ({
        name : req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedAdmin = await admin.save();
        res.send(savedAdmin);
    }catch(err){
        res.status(400).send(err);
    }
});

// Register User
router.post('/user-register' , async(req, res) => {
    const user = new User ({
        name : req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});


// Login Admin
router.post('/admin-login', async (req, res) => {
    let result = await Admin.findOne({
        email : req.body.email,
        password : req.body.password
    });
        const token = jwt.sign({email: result.email , _id : result._id}, process.env.SECRET_TOKEN , {expiresIn : 9999999999999});
        res.header('auth-token' , token).send({access_token : token});
});

// Login User
router.post('/user-login', async (req, res) => {
    let result = await User.findOne({
        email : req.body.email,
        password : req.body.password
    });
        const token = jwt.sign({email: result.email , _id : result._id}, process.env.SECRET_TOKEN , {expiresIn : 9999999999999});
        res.header('auth-token' , token).send({user_token : token });
});

// Save Blog data
router.post('/user/blog' , async(req, res) => {
    const blog = new Blog ({
        title : req.body.title,
        message: req.body.message
    });
    try{
        const savedBlog  = await blog.save();
        res.send(savedBlog);
    }catch(err){
        res.status(400).send(err);
    }
});

// Get Blogs of User
router.get('/user/blog-data' , async(req, res) => {
    let result = await Blog.find();
    res.send(result);
})

//Get list of users
router.get('/all-user' ,  async(req, res) => {
    let result = await User.find();
    res.send(result);
});



module.exports = router;