var express = require('express');
var router = express.Router();

/* GET features */
router.get('/', getFeatures);

function getFeatures(req, res, next) {
  res.json(features);
}

let features = [
  { id: 1, name: 'Profile image', country: 'Uk', segment: 225 },
  { id: 2, name: 'Face detection sign off', country: 'Dk', segment: 334  },
  { id: 3, name: 'Fingerprint authenication', country: 'Uk', segment: 554  },
]

module.exports = router;
