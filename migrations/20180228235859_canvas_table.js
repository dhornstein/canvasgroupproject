exports.up = function(knex, Promise) {
    return knex.schema.createTable('canvas',(table)=>{
      table.increments();
      table.text("canvas_content");
      table.integer("facebook_id").unsigned();
      table.foreign("facebook_id").references('facebook_id');
      table.timestamps(false, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('canvas');
  };