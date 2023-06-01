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
router.get('/metadata', async (req, res) => { 
    try {
        const dbCommData = await Comment.getAttributes();
        const dbUserData = await User.getAttributes();
        const dbPostData = await UserPost.getAttributes();

        res.status(200).json({dbCommData, dbUserData, dbPostData});
    } catch (err) {
        res.status(500).json(err);
    }
})

/*
 Get all comments for testing purposes
*/
router.get('/usercomments', async (req, res) => {
        try {
            const dbPostData = await Comment.findAll();

            const allComments = dbPostData.map((post) => post.get({plain: true}));

            res.status(200).json(allComments);            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
})
/*
 This is a route for testing,
 This method is alternative to creating an association on User
 */
router.get('/userposts', async (req, res) => {
        try {
            const dbPostData = await UserPost.findAll({
                where: {
                    user_id: req.session.user.id,
                }
            });

            const allPosts = dbPostData.map((post) => post.get({plain: true}));

            res.status(200).json(allPosts);            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
})

// Submit a new post route
router.post('/submit', async (req, res) => {
    try {
        const newPost = UserPost.create(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user.id
            }
        );
        res.status(200).json(newPost);    
    } catch (err) {
        res.status(500).json(err)
    }
});

// Update user post route
// router.put();

router.put('/edit/:id', async (req, res) => {
    try {
        
        const dbPostData = await UserPost.findByPk(req.params.id);
        
        if(dbPostData.user_id !== req.session.user.id) {
            res.status(400).json('Access denied');
        }

        if(dbPostData.user_id === req.session.user.id) {    
            const dbEditData = await UserPost.update(
                {
                    title: req.body.title,
                    content: req.body.content
                },
                { where: req.params.id }
            );

            res.redirect('/dashboard');
            // res.render('edit', { post, logged_in: req.session.logged_in});       
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
/*
 Backend route to delete a post.
 This route is tested and works
*/
// Delete a user post route.
router.delete('/delete/:id', async (req, res) => {
    try {
        const dbDelData = UserPost.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(dbDelData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;