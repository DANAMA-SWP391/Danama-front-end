// src/utils/userData.js

export const users = [
    {
        id: '1',
        email: 'tungdang.nbk.9a5@gmail.com',
        password: '555555',
        name: 'Tung Dang',
        phone: '0987654321',
        avatar: 'path/to/avatar.png'
    },

];


export const addUser = (newUser) => {
    users.push(newUser);
};