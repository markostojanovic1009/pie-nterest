/**
 * Knex doesn't support altering table columns, so the only
 * solution is to use a raw SQL command
 *
 */
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.raw('ALTER TABLE images ALTER COLUMN liked_count SET DEFAULT 0')
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.raw('ALTER TABLE images ALTER COLUMN liked_count SET DEFAULT null')
    ])
};
