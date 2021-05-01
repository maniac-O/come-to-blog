'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserStorage =
/*#__PURE__*/
function () {
  function UserStorage() {
    _classCallCheck(this, UserStorage);
  }

  _createClass(UserStorage, [{
    key: "loginUser",
    value: function loginUser(id, password, onSuccess, onError) {
      setTimeout(function () {
        if (id === 'jo' && password === 'jo') {
          onSuccess(id);
        } else {
          onError(new Error('not found'));
        }
      }, 2000);
    }
  }, {
    key: "getRoles",
    value: function getRoles(user, onSuccess, onError) {
      setTimeout(function () {
        if (user === 'jo') {
          onSuccess({
            name: 'jo',
            role: 'admin'
          });
        } else {
          onError(new Error('no access'));
        }
      }, 1000);
    }
  }]);

  return UserStorage;
}();

var _userStorage = new UserStorage();

var id = prompt('enter your id');
var password = prompt('enter your password');

_userStorage.loginUser(id, password, function (user) {
  _userStorage.getRoles(user, function (userWithRole) {
    alert("Hello ".concat(userWithRole.name, ", you have a ").concat(userWithRole.role, " a"));
  }, function (error) {
    console.log(error);
  });
}, function (error) {
  console.log(error);
}); //================================================
// promise문


var _UserStorage =
/*#__PURE__*/
function () {
  function _UserStorage() {
    _classCallCheck(this, _UserStorage);
  }

  _createClass(_UserStorage, [{
    key: "loginUser",
    value: function loginUser(id, password) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (id === 'jo' && password === 'jo') {
            resolve(id);
          } else {
            reject(new Error('not found'));
          }
        }, 1000);
      });
    }
  }, {
    key: "getRoles",
    value: function getRoles(user) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (user === 'jo') {
            resolve({
              name: 'jo',
              role: 'admin'
            });
          } else {
            reject(new Error('no access'));
          }
        }, 1000);
      });
    }
  }]);

  return _UserStorage;
}();

var __userStorage = new _UserStorage();

var _id = prompt('enter your id');

var _password = prompt('enter your password');

__userStorage.loginUser(_id, _password).then(function (user) {
  return __userStorage.getRoles(user);
}).then(function (user) {
  return alert("Hello ".concat(user.name, ", you have a ").concat(user.role));
})["catch"](console.log);