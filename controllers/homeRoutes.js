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

/* Create a dashboard route,
    Where are user can see all their posts,
    Or create a new post
*/
router.get('/dashboard', async (req, res) => {
    if(!req.session.logged_in) { // Redirect to signup if not logged in
        res.redirect('/signup');
    } else {
        try {
            const dbPostData = await UserPost.findAll({
                where: {
                    user_id: req.session.user.id,
                }
            });

            const allPosts = dbPostData.map((post) => post.get({plain: true}));
            res.render('dashboard', { allPosts, logged_in: req.session.logged_in, });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

module.exports = router;