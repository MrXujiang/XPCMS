"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

const {
  Route
} = require('../lib/decorator');

const {
  resolve
} = require('path');

const router = app => {
  const apiPath = resolve(__dirname, '../routes');
  const router = new Route(app, apiPath);
  router.init();
};

exports.router = router;