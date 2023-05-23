const { UserPost } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const dbPostData = await UserPost.findAll();

        const allPosts = dbPostData.map((post) => 
         post.get({ plain: true })
        );


        res.render('home', { allPosts, logged_in: req.session.logged_in, });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    // res.render('home', { logged_in: req.session.logged_in, });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login', { logged_in: req.session.logged_in, });
});

router.get('/home', (req, res) => {
    // res.render('home', { logged_in: req.session.logged_in, });
    res.redirect('/'); // Will this cause a problem with session?
});

router.get('/dashboard', (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/signup');
    } else {
        res.render('dashboard', { logged_in: req.session.logged_in, });
    }
});

module.exports = router;