// DO YOUR MAGIC
exports.up = function(knex) {
    // does the structural changes to the db
    return knex.schema
        .createTable('cars', table => {
            table.increments('cars_id');
            table.text('vin').unique().notNullable();
            table.text('make').notNullable();
            table.text('model').notNullable();
            table.integer('mileage').notNullable();
            table.text('title');
            table.text('transmission');
        })
}

exports.down = function(knex) {
    // un-does those changes
    return knex.schema
      //.dropTableIfExists('fruits')
      .dropTableIfExists('cars')
  };
