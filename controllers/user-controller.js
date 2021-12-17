const { User } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            let dbUserData = await User.find({}).populate({ path: 'friends' });
            res.json(dbUserData)
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // get user by id
    async getUserById({ params }, res) {
        try {
            let dbUserData = await User.findById(params.id).populate({ path: 'friends' });    
            res.json(dbUserData);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    
    // create user
    async createUser({ body }, res) {
        try{
            let dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // update user
    async updateUser({ params, body }, res) {
        try {
            let dbUserData = await User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
            res.json(dbUserData);
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // delete user
    async deleteUser({ params }, res) {
        try {
            let deletedUser = await User.findByIdAndRemove(params.id);
            if (deletedUser) {
                let dbUserData = await User.updateMany({ friends: params.id }, { $pull: { friends: params.id }});
                res.json(dbUserData);
            } else {
                res.status(404).json({ message: 'User not found!'});
            }
        } catch (error) {
            res.status(404).json(error);
        }
    },

    async addFriend({ params }, res) {
        try {
            let dbUserData = await User.findByIdAndUpdate(params.userId, { $push: { friends: params.friendId }}, { new: true });
            res.json(dbUserData);
        } catch (error) {
            res.status(404).json(error);
        }
    },

    async deleteFriend({ params }, res) {
        try {
            let dbUserData = await User.findByIdAndUpdate(params.userId, { $pull: { friends: params.friendId }}, { new: true });
            res.json(dbUserData);    
        } catch (error) {
            res.status(404).json(error);
        }
    }
}

module.exports = userController;