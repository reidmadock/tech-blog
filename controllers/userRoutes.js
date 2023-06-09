const { UserPost, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/dashboard', async (req, res) => {
    try {
        console.log(req);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

/*
 This route returns a given post to the edit screen.
 Editing does not require bringing the comments with it.
*/
router.get('/dashboard/edit/:id', async (req, res) => {
    try {
        const dbPostData = await UserPost.findByPk(req.params.id);
        
        // Validate this post is owned by the (session) user requesting it for edits
        if(dbPostData.user_id !== req.session.user.id) {
            res.status(400).json('Access denied');
        }

        const post = dbPostData.get({ plain: true });
        if(dbPostData.user_id === req.session.user.id) {
            res.render('edit', { post, logged_in: req.session.logged_in});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
/*
 This route updates a given post.
*/
router.put('/dashboard/edit/:id', async (req, res, next) => {
    try {
        
        const dbPostData = await UserPost.findByPk(req.params.id);
        
        // Validate this post is owned by the (session) user requesting it for edits
        if(dbPostData.user_id !== req.session.user.id) {
            res.status(400).json('Access denied');
        }

        if(dbPostData.user_id === req.session.user.id) {    
            const dbEditData = await UserPost.update(
                {
                    title: req.body.title,
                    content: req.body.content
                },
                { where: { id: req.params.id } }
            );

            // Send redirect with 303 or PUT will not GET /dashboard after.
            res.redirect(303, '/dashboard');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
/* 
 This query is tested and works,
 brings back the selected post, all
 post comments and all comment users 
*/
router.get('/board/:id', async (req, res) => {
    try {
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

        const postThread = dbPostData.get({ plain: true });

        res.render('thread', { postThread, logged_in: req.session.logged_in, });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

/* 
TODO:
    - Add a post blog post route
    (Validate update with logged in user session)
*/

/* 
 This route adds a comment onto a given thread.
*/
router.post('/board/:id', async (req, res) => {
    try {
        const userComment = await Comment.create(
            {
                content: req.body.content,
                user_id: req.session.user.id,
                user_post_id: parseInt(req.params.id)
            }
        );
        
        res.status(200).redirect(`/board/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;