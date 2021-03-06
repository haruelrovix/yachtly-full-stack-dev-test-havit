var express = require('express');
var router = express.Router();

const Users = require('../models').User;
const UserDTO = require('../helpers/user');

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
const USER_NOT_FOUND = 'User not found';

const constructError = errors => ({ error: errors && errors.length > 0 && errors[0].message || DEFAULT_ERROR_MESSAGE });

/* GET users listing. */
router.get('/', function (_, res) {
  Users.findAll({ order: [['id', 'ASC']] })
    .then(result => {
      const users = result.map(node => new UserDTO(node.get({ plain: true })));

      res.json({ users });
    }).catch(err => {
      res.status(400).send(err);
    });
});

/* POST user. */
router.post('/', function (req, res) {
  const user = new UserDTO(req.body.user);

  Users.create(user)
    .then(result => {
      const user = new UserDTO(result.get({ plain: true }), true);

      res.json({ user });
    }).catch(({ errors }) => {
      res.status(400).send(constructError(errors));
    });
})

/* GET user. */
router.get('/:id', function (req, res) {
  const id = Number(req.params.id);

  Users.findOne({ where: { id } })
    .then(result => {
      if (result && result.length > 0 && result[0] === 0) {
        return res.status(400).send({ error: USER_NOT_FOUND });
      }

      const user = new UserDTO(result.get({ plain: true }), true);

      res.json({ user });
    }).catch(({ errors }) => {
      res.status(400).send(constructError(errors));
    })
})

/* PUT user. */
router.put('/:id', function (req, res) {
  const id = Number(req.params.id);
  const user = new UserDTO(req.body.user);
  user.id = id;

  Users.update(user, { where: { id }, returning: true })
    .then(result => {
      if (result && result.length > 0 && result[0] === 0) {
        return res.status(400).send({ error: USER_NOT_FOUND });
      }

      const user = new UserDTO(result[1][0].get(), true);

      res.json({ user });
    }).catch(({ errors }) => {
      res.status(400).send(constructError(errors));
    })
})

/* DELETE user. */
router.delete('/:id', function (req, res) {
  const id = Number(req.params.id);

  Users.destroy({ where: { id } })
    .then(result => {
      if (result === 0) {
        return res.status(400).send({ error: USER_NOT_FOUND });
      }

      res.status(200).send()
    }).catch(({ errors }) => {
      res.status(400).send(constructError(errors));
    })
})

module.exports = router;
