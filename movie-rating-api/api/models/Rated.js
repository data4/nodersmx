/**
* Rated.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  orientdbClass: 'E',
  attributes: {
    rating: 'integer',
    userRef: {
      columnName: 'userRef',
      type: 'string',
      foreignKey: true,
      references: 'users',
      on: 'id',
      onKey: 'id',
      via: 'movieRef'
    },
    movieRef: {
      columnName: 'stadiumRef',
      type: 'string',
      foreignKey: true,
      references: 'movies',
      on: 'id',
      onKey: 'id',
      via: 'userRef'
    }
  }
};

