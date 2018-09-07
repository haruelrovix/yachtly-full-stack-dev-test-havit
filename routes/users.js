var express = require('express');
var router = express.Router();

const Users = require('../models').User;

/* GET users listing. */
router.get('/', function (req, res, next) {
  Users.findAll()
    .then(result => {
      const users = result.map(node => {
        const {
          id,
          name,
          email,
          phoneNumber,
          address
        } = node.get({
          plain: true
        });

        return {
          id,
          name,
          email,
          phoneNumber,
          address
        };
      });

      res.json({
        users
      });
    }).catch(err => {
      res.status(204).send(err);
    });
});

module.exports = router;
