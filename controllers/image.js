import Image from '../models/Image';
var User = require('../models/User');

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
    req.assert('url', 'URL cannot be empty.').notEmpty();
    req.assert('title', 'Title cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
        return res.status(400).send(errors);
    }

    const {title, url} = req.body;
    new Image({
        title,
        url,
        user_id: req.user.id
    }).save().then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        res.status(400).send({msg: "Image url or title are not correct. Please try again."});
    });
}

export function getAllImages(req, res) {
    new Image()
        .fetchAll({require: true})
        .then(function(bookModel) {
            res.status(200).send(bookModel);
        })
        .catch((error) => {
           res.status(404).send({msg: "No images found."});
        });
}

export function getUserImages(req, res) {
    new User({id: req.user.id})
        .fetch({withRelated: ['images']})
        .then((user) => {
            res.status(200).send(user.related('images'));
        })
        .catch((error) => {
           res.status(404).send({msg: "No images found."});
        });
}
