var bookshelf = require('../config/bookshelf');
var User = require('./User');
import LikedImage from "./LikedImage";


export default bookshelf.Model.extend({
    tableName: "images",
    hasTimestamps: false,

    user() {
        return this.belongsTo(User);
    },

    likedBy() {
        return this.belongsToMany(User, "image_id").through(LikedImage);
    }


});