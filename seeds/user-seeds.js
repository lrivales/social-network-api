const { User } = require('../models/');
const mongoose = require('mongoose');

const userData = [
    {
        'username': 'lawrence',
        'email': 'lawrence@rivales.com'
    },
    {
        'username': 'bixbie',
        'email': 'bixbie@rivales.com'
    },
    {
        'username': 'beatrix',
        'email': 'beatrix@rivales.com'
    },
    {
        'username': 'juni',
        'email': 'juni@rivales.com'
    }
];

const seedUsers = () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    User.create(userData);
};

module.exports = seedUsers;