(function() {
  'use strict';
  angular
    .module('movieRating')
    .controller('DemoController', DemoController);

  DemoController.$inject = ['Restangular'];
  function DemoController(Restangular) {
    var vm = this;
    vm.movies = Restangular
      .all('movies')
      .getList()
      .then( function (movies) {
        console.log('movies :', movies);
        vm.movies = movies;
      });

    vm.users = Restangular
      .all('users')
      .getList()
      .then( function (users) {
        vm.users = users;
      })

    vm.fivestars = Restangular
      .all('movies')
      .customGET('fivestars2')
      .then(function(popularMovies) {
        console.log('popularMovies :', popularMovies);
        vm.popularMovies = popularMovies;

      })
    .catch(function(err) {
      console.log('ERR: ', err);
    });


  }
}());
