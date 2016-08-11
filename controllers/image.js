import Image from '../models/Image';
var User = require('../models/User');
var _ = require('lodash');

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
        next();
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
    const newImage = new Image({
        title,
        url,
        user_id: req.user.id
    });
    newImage.save().then(() => {
        res.status(200).send(newImage);
    }).catch((error) => {
        res.status(400).send({msg: "Image url or title are not correct. Please try again."});
    });
}

export function getAllImages(req, res) {
    let allImages = [];
    new Image()
        .fetchAll({require: true})
        .then((images) => {
            allImages = images.toJSON();
            if(!req.user) {
                return res.status(200).send(images);
            } else {
                return User.forge({id: req.user.id}).getLikedImages()
                    .then((likedImagesCollection) => {
                        const likedImages = likedImagesCollection.toJSON();
                        allImages = allImages.map((image) => {
                            for(let i = 0; i < likedImages.length; i++) {
                                if(likedImages[i].id === image.id)
                                    return Object.assign(image, { liked: true });
                            }
                            return image;
                        });
                        res.status(200).send(allImages);
                    })
            }
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

export function getLikedImages(req, res) {
    User.forge({id: req.user.id})
        .getLikedImages()
        .then((likedImages) => {
            res.status(200).send(likedImages);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
}

export function likeImage(req, res) {
    var imageId = req.body.image_id;
    new User({id: req.user.id})
        .fetch()
        .then((user) => {
            return user.likeImage(imageId);
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
           res.status(400).send(error);
        });
}

export function deleteImage(req, res) {
    Image.forge({id: req.body.image_id}).destroy().then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log(error);
        res.status(400).send({msg: "An error occured while deleting the image. Please try again later."});
    })
}