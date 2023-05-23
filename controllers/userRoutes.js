const { UserPost } = require('../models');

const router = require('express').Router();

/* Query by PK return all comments with associated post */
router.get('/boards/:id', async (req, res) => {
    try {
        const dbPostData = await UserPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['content', 'user_id', 'createdOn']
                }
            ]
        });

        const userPost = dbPostData.map((post) => 
         post.get({ plain: true })
        );


        res.render('blogpost', { userPost, logged_in: req.session.logged_in, });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

/* Experimental Query */
router.get('/board/:id', async (req, res) => {
    try {
        const dbPostData = await UserPost.findByPk(req.params.id, { include: { all: true, nested: true }});

        const userPost = dbPostData.map((post) => 
         post.get({ plain: true })
        );


        res.render('blogpost', { userPost, logged_in: req.session.logged_in });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;