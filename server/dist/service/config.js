"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSupportPay = exports.setBannerSider = exports.setBanner = exports.setHeader = exports.getConfig = void 0;

var _config = _interopRequireDefault(require("../db/schema/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getConfig = async () => {
  const result = await _config.default.hgetall();
  return result;
};

exports.getConfig = getConfig;

const setHeader = async headerData => {
  const result = await _config.default.hmset('header', headerData);
  return result;
};

exports.setHeader = setHeader;

const setBanner = async bannerData => {
  const result = await _config.default.hmset('banner', bannerData);
  return result;
};

exports.setBanner = setBanner;

const setBannerSider = async bannerSiderData => {
  const result = await _config.default.hmset('bannerSider', bannerSiderData);
  return result;
};

exports.setBannerSider = setBannerSider;

const setSupportPay = async supportPayData => {
  const result = await _config.default.hmset('supportPay', supportPayData);
  return result;
};

exports.setSupportPay = setSupportPay;