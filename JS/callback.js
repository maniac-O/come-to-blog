'use strict';

class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (id === 'jo' && password === 'jo') {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'jo') {
                onSuccess({ name: 'jo', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const _userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

_userStorage.loginUser(
    id,
    password,
    (user) => {
        _userStorage.getRoles(
            user,
            (userWithRole) => {
                alert(
                    `Hello ${userWithRole.name}, you have a ${userWithRole.role} a`
                );
            },
            (error) => {
                console.log(error);
            }
        );
    },
    (error) => {
        console.log(error);
    }
);

//================================================
// promise문

class _UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id === 'jo' && password === 'jo') {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 1000);
        });
    }

    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (user === 'jo') {
                    resolve({ name: 'jo', role: 'admin' });
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        });
    }
}

const __userStorage = new _UserStorage();
const _id = prompt('enter your id');
const _password = prompt('enter your password');

__userStorage
    .loginUser(_id, _password)
    .then((user) => __userStorage.getRoles(user))
    .then((user) => alert(`Hello ${user.name}, you have a ${user.role}`))
    .catch(console.log);
