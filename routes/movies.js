const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

router.get('/', (req, res, next) => {
  Movie.find().then(movies => {
    res.render('movies/index.hbs', { movies });
  })
    .catch(err => {
      next(err);
    });
});

router.get('/new', (req, res, next) => {
	// we need to get all the celebrities and pass them into the view
	Celebrity.find()
		.then(celebritiesFromDB => {
      res.render('movies/new.hbs', { celebrities: celebritiesFromDB });
			// console.log(celebritiesFromDB);
		})
		.catch(err => {
			console.log(err);
		})
  });

  // need to populate and run a query on the movies and a query on the celebrite

// router.get('/new', (req, res, next) => {
//   res.render('movies/new.hbs');
// });

router.post('/', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast})
  .then(() => {
    res.redirect('/movies');
  })
  .catch(err => {
    next(err);
  })
});

module.exports = router;