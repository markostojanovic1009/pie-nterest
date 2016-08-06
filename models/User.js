var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');
import Image from "./Image";
import LikedImage from "./LikedImage";

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('saving', this.hashPassword, this);
  },

  images() {
    return this.hasMany(Image);
  },

  liked() {
    return this.belongsToMany(Image).through(LikedImage);
  },

  getLikedImages() {
    return new Promise((resolve, reject) => {
      this.liked().fetch().then((likedImages) => {
        resolve(likedImages);
      }).catch(error => reject(error));
    });
  },

  likeImage(imageId) {
    var self = this;
    return new Promise((resolve, reject) => {
      Image.forge({id: imageId}).fetch().then((image) => {
        self.liked().attach(image);
      }).then(() => {
        resolve();
      });
    });
  },

  hashPassword: function(model, attrs, options) {
    var password = options.patch ? attrs.password : model.get('password');
    if (!password) { return; }
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (options.patch) {
            attrs.password = hash;
          }
          model.set('password', hash);
          resolve();
        });
      });
    });
  },

  comparePassword: function(password, done) {
    var model = this;
    bcrypt.compare(password, model.get('password'), function(err, isMatch) {
      done(err, isMatch);
    });
  },

  hidden: ['password', 'passwordResetToken', 'passwordResetExpires'],

  virtuals: {
    gravatar: function() {
      if (!this.get('email')) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
      }
      var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
      return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
    }
  }
});

module.exports = User;
