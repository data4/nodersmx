Movies.getDB( function (db) {
  db.query("select expand(outE('rated')[rating = 5].in.title) from #16:0").
    then( function (r) {
      console.log('r :', r);
    })
})

Movies.getDB( function (db) {
  db.query("select @rid as rid, title, inE('rated')[rating=5].size() as 5stars from (select expand(outE('rated')[rating = 5].in) from #16:0) order by 5stars desc").
    then( function (r) {
      console.log('r :', r);
    })
})
