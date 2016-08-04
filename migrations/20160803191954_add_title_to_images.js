
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('images', function(table) {
          table.string('title').notNullable();
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('images', function(table) {
          table.dropColumn('title');
      })
  ]);
};
