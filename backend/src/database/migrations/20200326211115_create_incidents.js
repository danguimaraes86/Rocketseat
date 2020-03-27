
exports.up = function(knex) {
  return knex.schema.createTable('incidentCasos', (table) => {
      table.increments();

      table.string('titulo').notNullable();
      table.string('descricao').notNullable();
      table.decimal('valor').notNullable();

      table.string('ong_id').notNullable();
      table.foreign('ong_id').references('id').inTable('userONGs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('postCasos');
};
