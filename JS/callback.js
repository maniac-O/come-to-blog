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
                    `Hello ${userWithRole.name}, you have a ${userWithRole.role}`
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
