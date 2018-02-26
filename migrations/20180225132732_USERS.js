
exports.up = function(knex,Promise){
    return knex.schema.createTable('local_signin_users',(table)=>{
      table.increments();
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("password");
      table.timestamps(false,true);
    });
  }
  
  exports.down = function(knex,Promise){
    return knex.schema.dropTable('local_signin_users');
  }