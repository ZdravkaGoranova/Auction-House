const mongoose = require('mongoose');


const userShema = new mongoose.Schema({

    email: {
        type: String,

        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Invalid URL'],
        required: [true, 'Username is required!'],

    }, password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 5,
    },

    firstName: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: 1,
    },
    lastName: {
        type: String,
        minLength: 1,

        required: [true, 'Email is required!'],
    },

});

//userShema.virtual('confirmPassword').set;

const User = mongoose.model('User', userShema);

module.exports = User;



  // }, {
    //     virtuals: {
    //         confirmPassword: {
    //             set(value) {
    //                 if (this.password !== value) {
    //                     throw new mongoose.Error('Password missmatch!');
    //                 }
    //             }
    //         }
    //     }

//});

//userShema.virtual('confirmPassword').set;