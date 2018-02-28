exports.up = function(knex,Promise){
    return knex.schema.createTable('users',(table)=>{
      table.increments();
      table.string("username");
      table.string("facebook_id");
      table.timestamps(false,true);
    });
  }
  
  exports.down = function(knex,Promise){
    return knex.schema.dropTable('users');
  }
