const router = require('express').Router();
const { User } = require('../../models');

/*
    Route for submitting user info
    User ID is stored in session
    !This route is tested and works.
*/
router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.user = {
            id: dbUserData.id,
            username: dbUserData.username,
        };

        // Create a "logged_in" session variable on user creation, sets it to true. (required for logout function)
        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
/*
    Route for logging a user in.
    User ID gets stored in session 
    !This route is tested and works.
*/
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res.status(401).json({ message: 'No user found with this username address.' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect password. Please try again.' });
            return;
        }

        // If username and password are correct, sets up user data in the session
        req.session.user = {
            id: user.id,
            username: user.username,
        };

        // Create a "logged_in" session variable, sets it to true. (required for logout function)
        req.session.save(() => {
            req.session.logged_in = true;
            // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.json({user: user.username, message: 'Succesful login!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
/*
    Route to log a user out.
    Session is destroyed at logout
    !This route is tested and works.
*/
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;