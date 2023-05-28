const { UserPost, User, Comment } = require('../models');

const router = require('express').Router();

/* Create a dashboard route,
    Where are user can see all their posts,
    Or create a new post
*/
router.get('/dashboard', async (req, res) => {
    try {
        const dbPostData = await UserPost.findByPk(req.session.user.id);

        const allPosts = dbPostData.map((post) => 
         post.get({ plain: true })
        );


    // res.render('home', { allPosts, logged_in: req.session.logged_in, })
    res.status(200).json(allPosts);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

/* This query is tested and works,
 brings back the selected post, all
 post comments and all comment users */
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
    - Add an update blog post route
    - Add a delete blog post route
    (Validate update with logged in user session)

*/

router.post('/board/:id', async (req, res) => {
    try {
        // const userComment = {content: req.body.content,
        // user_id:}
        const userComment = await Comment.create(
            {
                content: req.body.content,
                user_id: req.session.user.id,
                user_post_id: parseInt(req.params.id)
            }
        );
        // res.render('thread', { postThread, logged_in: req.session.logged_in, });
        res.status(200).redirect(`/board/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;