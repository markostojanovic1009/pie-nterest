var bookshelf = require('../config/bookshelf');
var User = require('./User');
import Image  from './Image';

export default bookshelf.Model.extend({
    tableName: "liked_images",
    hasTimestamps: false,

    user() {
        return this.belongsTo(User);
    },

    image() {
        return this.belongsTo(Image, "image_id");
    }
});