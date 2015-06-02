/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  joinTableNames: {
    movies: 'rated',
    occupations: 'hasOccupation'
  },
  attributes: {
    id: 'integer',
    gender: {
      type:'string',
      enum: ['M', 'F']
    },
    age: 'integer',
    occupationId: 'string',
    zipCode: 'integer',
    // occupations: {
      // collection: 'occupation',
      // via: 'users'
    // },

    // movies: {
    //   collection: 'movies', 
    //   through: 'rated',
    //   via: 'users',
    //   dominant: true
    // }

  }
};

