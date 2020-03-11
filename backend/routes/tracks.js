const router = require('express').Router();
let Track = require('../models/track.model');



router.route('/').get((req, res) => {
  Track.find()
        .then(tracks => res.json(tracks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const trackname = req.body.trackname;

    const newTrack = new Track({trackname});

    newTrack.save()
    .then(() => res.json('Track added!' ))
    .catch(err => res.status(400).json('Error: ' + err));
   
});

router.route('/:id').get((req, res) => {
    Track.findById(req.params.id)
      .then(tracks => res.json(tracks))
      .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//     Track.findByIdAndDelete(req.params.id)
//       .then(() => res.json('Element deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/update/:id').post((req, res) => {
    Track.findById(req.params.id)
      .then(track => {
        track.trackname = req.body.trackname;
      
        track.save()
          .then(() => res.json('Element updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;