var bookshelf = require('../config/bookshelf');
var User = require('./User');
import LikedImage from "./LikedImage";


export default bookshelf.Model.extend({
    tableName: "images",
    hasTimestamps: false,

    initialize() {
        this.on('destroying', (model) => {
            return new Promise((resolve, reject) => {
                bookshelf.knex('liked_images').where('image_id', model.get('id')).del().then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    },

    user() {
        return this.belongsTo(User);
    },

    likedBy() {
        return this.belongsToMany(User, "image_id").through(LikedImage);
    }

});