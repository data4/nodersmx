/**
 * MoviesController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var waterlineUtils = require('sails-orientdb/lib/utils');

module.exports = {

  fivestars1: function (req, res) {
    // Películas con 5 estrellas de un determinado usuario.
    var query1 = "select expand(outE('rated')[rating = 5].in.title) from #16:0";
      Movies.getDB( function (db) {
        db.query(query1)
          .then( function (movies) {
            // waterlineUtils.cleanOrientAttributes(movies);
            // waterlineUtils.rewriteIdsRecursive(movies, Movies.waterline.schema);
            res.ok(movies)
          })
        .catch( function (err) {
          // ok, algo salió mal.
          res.serverError(err);
        })
      })
  },

  fivestars2: function (req, res) {
    // De los resultados de la consulta anterior, consultar las que han recibido 5 estrellas entre todos los usuarios.
    var query2 = "select @rid, title, inE('rated')[rating=5].size() as 5stars from (select expand(outE('rated')[rating = 5].in) from #16:0) order by 5stars desc";
      Movies.getDB( function (db) {
        db.query(query2)
          .then( function (movies) {
            // waterlineUtils.cleanOrientAttributes(movies);
            // waterlineUtils.rewriteIdsRecursive(movies, Movies.waterline.schema);
            res.ok(movies)
          })
        .catch( function (err) {
          // ok, algo salió mal.
          res.serverError(err);
        })
      })
  },

  fivestars3: function (req, res) {
    var query3 = "select out.@rid as rid, out.id as id, count(*) as conto from (select expand(inE('rated')[rating=5]) from (select expand(outE('rated')[rating = 5].in) from #16:0)) where out <> #16:0 group by out.@rid, out.id order by conto desc";
    // Las peliculas que tienen 5 estrelals y el usuario XX aún no ha calificado.
      Movies.getDB( function (db) {
        db.query(query3)
          .then( function (movies) {
            // waterlineUtils.cleanOrientAttributes(movies);
            // waterlineUtils.rewriteIdsRecursive(movies, Movies.waterline.schema);
            res.ok(movies)
          })
        .catch( function (err) {
          // ok, algo salió mal.
          res.serverError(err);
        })
      })
  },

  fivestars4: function (req, res) {
    // Las peliculas que tienen 5 estrelals y el usuario XX aún no ha calificado.
    var query4 = "select title, count(*) as conto from (select expand(rid.outE('rated')[rating = 5].in) from (select @rid as rid, id as id, count(*) as conto from (select expand(outE('rated')[rating=5].in.inE('rated'[rating=5].out) from #16:0) where @rid <> #16:0 group by rid, id order by conto desc limit 10)) where title not in (select out('rated').title from #16:0) group by title order by conto desc)";
      Movies.getDB( function (db) {
        db.query(query4)
          .then( function (movies) {
            // waterlineUtils.cleanOrientAttributes(movies);
            // waterlineUtils.rewriteIdsRecursive(movies, Movies.waterline.schema);
            res.ok(movies)
          })
        .catch( function (err) {
          // ok, algo salió mal.
          res.serverError(err);
        })
      })
  },

  fivestars5: function (req, res) {
    // En base a la lista de géneros que le gustan a XX usuario, busca todas las que tienen 5 estrellas entre todos los usuarios
    var query5 = "select title, count(*) from (select expand(rid.in().inE('rated')[rating = 5].in) from (select @rid, description, count(*) from (select expand(in.out('hasGenera')) from (select expand(outE()) from #16:481) where rating > 3) group by @rid, description order by count desc limit 1)) where title not in (select out('rated').title from #16:481) group by title order by count desc";
      Movies.getDB( function (db) {
        db.query(query5)
          .then( function (movies) {
            // waterlineUtils.cleanOrientAttributes(movies);
            // waterlineUtils.rewriteIdsRecursive(movies, Movies.waterline.schema);
            res.ok(movies)
          })
        .catch( function (err) {
          // ok, algo salió mal.
          res.serverError(err);
        })
      })
  },

  fivestars6: function (req, res) {
    // Lista de peliculas que tienen 5 estrellas entre los usuarios que han dado 5 estrellas a Toy Story
    var query6 = "select title, count(*) from (select expand(inE('rated')[rating = 5].out.outE('rated')[rating = 5].in) from #13:0) where @rid not in [#13:0] group by title order by count desc limit 10"
      Movies.getDB( function (db) {
        db.query(query6)
          .then( function (movies) {
            // waterlineUtils.cleanOrientAttributes(movies);
            // waterlineUtils.rewriteIdsRecursive(movies, Movies.waterline.schema);
            res.ok(movies)
          })
        .catch( function (err) {
          // ok, algo salió mal.
          res.serverError(err);
        })
      })
  }

};

