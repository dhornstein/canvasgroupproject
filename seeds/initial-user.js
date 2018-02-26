
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('local_signin_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('local_signin_users').insert([
        {first_name:"Lee", last_name:"Mary", email:"mary.lee@gmail.com", password:"123456"},
        {first_name:"Tan",last_name:"Ray", email:"raytan@mail.com", password:"test"}
      ]);
    });
};
