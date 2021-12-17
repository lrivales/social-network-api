const { User } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        let dbUserData = await User.find({}).populate({path: 'friends'});
        
        if (!dbUserData) {
            res.status(404);
            return;
        }

        res.json(dbUserData);
    },

    // get user by id
    async getUserById({ params }, res) {
        let dbUserData = await User.findById(params.id).populate({ path: 'friends' });

        if (!dbUserData) {
            res.status(404);
            return;
        }

        res.json(dbUserData);
    },
    
    // create user
    async createUser({ body }, res) {
        let dbUserData = await User.create(body);

        if (!dbUserData) {
            res.status(404);
            return;
        }

        res.json(dbUserData);
    },

    // update user
    async updateUser({ params, body }, res) {
        let dbUserData = await User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });

        if (!dbUserData) {
            res.status(404);
            return;
        }

        res.json(dbUserData);
    },

    // delete user
    async deleteUser({ params }, res) {
        let deletedUser = await User.findByIdAndRemove(params.id);
        
        if (!deletedUser) {
            res.status(404);
            return;
        }

        let dbUserData = await User.updateMany({ friends: params.id }, { $pull: { friends: params.id }});

        res.json(dbUserData);
    }
}

module.exports = userController;