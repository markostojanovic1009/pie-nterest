import Image from '../models/Images';

/**
 * Middleware that checks whether the right user is logged in.
 * Prevents a logged in user from sending API requests
 * for another user.
 */
exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated() && req.user.id == req.params.userId) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

export function postImage(req, res) {
    req.assert('url', 'URL cannot be empty').notEmpty();
    req.assert('title', 'Title cannot be empty').notEmpty();
    const {title, url} = req.body;
    new Image({
        title,
        url
    }).save().then((image) => {
        res.sendStatus(204);
    }).catch((error) => {
        res.status(400).send({msg: "Image url or title are not correct. Please try again."});
    });
}
