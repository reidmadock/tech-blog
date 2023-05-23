const router = require('express').Router();

const { UserPost, User, Comment} = require('../../models');

// Get all posts route
router.get('/board', async (req, res) => {
    try {
        const dbPostData = await UserPost.findAll();

        const allPosts = dbPostData.map((post) => 
         post.get({ plain: true })
        );


    // res.render('home', { allPosts, logged_in: req.session.logged_in, })
    res.status(200).json(allPosts);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get one post route with all comments
router.get('/board/:id', async (req, res) => {
    try {
        // This is returning too much...
        // const dbPostData = await UserPost.findByPk(req.params.id, { include: { all: true, nested: true }});
        const dbPostData = await UserPost.findByPk(req.params.id, 
            { include: 
                [
                    {
                        model: User, 
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        include: [
                            { 
                                model: User, 
                                attributes: ['username']
                            }
                        ],
                        nested: true
                    }
                ]
        });

        // const userPost = dbPostData.map((post) => 
        //  post.get({ plain: true })
        // );

        res.status(200).json(dbPostData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Submit a new post route
router.post('/submit', async (req, res) => {
    
});

// Update user post route
// router.put();

// Delete a user post route.
// router.delete();

module.exports = router;