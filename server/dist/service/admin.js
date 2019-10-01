"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAdmin = exports.loginAdmin = exports.delAdmin = exports.editAdmin = exports.addAdmin = exports.findAdmin = exports.getAdmins = void 0;

var _admin = _interopRequireDefault(require("../db/schema/admin"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAdmins = async () => {
  let originResult = await _admin.default.lrange(0, -1);

  if (originResult && originResult.length) {
    let result = originResult.map(item => JSON.parse(item));
    return result;
  } else {
    return [];
  }
};

exports.getAdmins = getAdmins;

const findAdmin = async name => {
  let admins = await getAdmins();

  if (admins.length) {
    let result = admins.filter(item => item.username === name);
    return result;
  } else {
    return [];
  }
};

exports.findAdmin = findAdmin;

const addAdmin = async query => {
  let admin = await findAdmin(query.username);

  if (admin.length) {
    return null;
  } else {
    // 生成加密hash密码
    let hash = _bcrypt.default.hashSync(query.pwd, 8);

    query.pwd = hash;
    query.role = +query.role;
    let result = await _admin.default.lpush(query);
    return result;
  }
};

exports.addAdmin = addAdmin;

const editAdmin = async query => {
  let admins = await getAdmins();
  let index = -1;
  admins.forEach((item, i) => {
    if (item.username === query.prevName) {
      index = i;
      return;
    }
  });

  if (admins[index].pwd !== query.pwd) {
    // 生成加密hash密码
    let hash = _bcrypt.default.hashSync(query.pwd, 8);

    query.pwd = hash;
  }

  query.role = +query.role;
  let result = await _admin.default.lset(index, query);
  return result;
};

exports.editAdmin = editAdmin;

const delAdmin = async name => {
  let admins = await getAdmins();
  let delIndex = -1;
  admins.forEach((item, i) => {
    if (item.username === name) {
      delIndex = i;
      return;
    }
  });
  await _admin.default.lset(delIndex, 'del');
  return await _admin.default.lrem(1, 'del');
};

exports.delAdmin = delAdmin;

const loginAdmin = async query => {
  let admin = await findAdmin(query.username);

  if (admin.length) {
    let {
      pwd,
      username,
      role
    } = admin[0];

    let match = _bcrypt.default.compareSync(query.pwd, pwd);

    return match ? {
      username,
      role
    } : null;
  } else {
    // 用户不存在
    return null;
  }
}; // 初始化管理员数据，目前先放在这个位置


exports.loginAdmin = loginAdmin;

const initAdmin = async query => {
  let admins = await _admin.default.lrange(0, -1);

  if (!admins || !admins.length) {
    let hash = _bcrypt.default.hashSync(query.pwd, 8);

    query.pwd = hash;
    return await _admin.default.lpush(query);
  }
};

exports.initAdmin = initAdmin;