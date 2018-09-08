var express = require('express');
var router = express.Router();

const Users = require('../models').User;
const UserDTO = require('../helpers/user');

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

/* GET users listing. */
router.get('/', function (req, res, next) {
  Users.findAll()
    .then(result => {
      const users = result.map(node => new UserDTO(node.get({ plain: true })));

      res.json({ users });
    }).catch(err => {
      res.status(400).send(err);
    });
});

router.post('/', function (req, res) {
  const user = new UserDTO(req.body);

  Users.create(user)
    .then(result => {
      const user = new (result.get({ plain: true }), true);

      res.json({ user });
    }).catch(({ errors }) => {
      const errorMessage = errors && errors.length > 0 && errors[0].message || DEFAULT_ERROR_MESSAGE;

      res.status(400).send({ error: errorMessage });
    });
})

module.exports = router;
