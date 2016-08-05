var bookshelf = require('../config/bookshelf');
var User = require('./User');

export default bookshelf.Model.extend({
    tableName: "images",
    hasTimestamps: false,
    user() {
        return this.belongsTo(User);
    }
});