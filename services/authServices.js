const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken.js');
const { SECRET } = require('../constans.js')

exports.findByUsername = (username) => User.findOne({ username });//User.exists({username})
exports.findByEmail = (email) => User.findOne({ email });//User.exists({email})

exports.register = async (email, firstName, lastName, password, confirmPassword) => {

    if (password !== confirmPassword) {
        throw new Error('Password missmatc!');
    }
    //TODO:Check user exists
    //const existingUser = await this.findByUsername(username);
    const existingUser = await User.findOne({
        $or: [
            { email },
            { firstName },
            { lastName }
        ]
    });
    if (existingUser) {
        throw new Error('User  exists!');
    }
   

    // if (password.length < 5) {
    //     throw new Error('The password should be at least four characters long!');
    // }
    // if (firstName.length < 1) {
    //     throw new Error('FirstName is too short!');
    // }
    // if (lastName.length < 1) {
    //     throw new Error('LastName is too short!');
    // }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ email, firstName, lastName, sername, password: hashPassword });

    return this.login(email, password);
};


exports.login = async (email, password) => {

    //Email/User exist
    const user = await this.findByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    //Password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password!');
    };

    //Generated token
    const payload = {
        _id: user._id,
        email,
        username: user.username,
    };

    const token = await jwt.sing(payload, SECRET);

    return token;
}

