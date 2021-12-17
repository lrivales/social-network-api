const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            let dbThoughtData = await Thought.find({}).populate({ path: 'user'});
            res.json(dbThoughtData);
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // get thought by id
    async getThoughtById({ params }, res) {
        try {
            let dbThoughtData = await Thought.findById(params.id).populate({ path: 'user' });
            if (dbThoughtData) {
                res.json(dbThoughtData);
            } else {
                res.status(404).json({ message: 'Thought not found!' });
            }
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // create thought
    async createThought({ body }, res) {
        try {
            let dbThoughtData = await Thought.create(body);
            if (dbThoughtData) {
                let dbUserData = await User.findOneAndUpdate({ _id: body.user }, { $push: { thoughts: dbThoughtData._id }})
                if (dbUserData) {
                    res.json(dbThoughtData)
                } else {
                    res.status(404).json({ message: 'User not found!'});
                }
            }
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // update thought
    async updateThought({ params, body }, res) {
        try {
            let dbThoughtData = await Thought.findByIdAndUpdate(params.id, body, { new: true });
            if (dbThoughtData) {
                res.json(dbThoughtData);
            } else {
                res.status(404).json({ message: 'Thought not found!' });
            }
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // delete thought
    async deleteThought({ params }, res) {
        try {
            let dbThoughtData = await Thought.findByIdAndDelete(params.id);
            if (dbThoughtData) {
                let dbUserData = await User.updateMany({ thoughts: params.id }, { $pull: { thoughts: params.id }}, { new: true });
                if (dbUserData) {
                    res.json(dbThoughtData)
                } else {
                    res.status(404).json({ message: 'User not found!'});
                }
            } else {
                res.status(404).json({ message: 'Thought not found!' });
            }
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // create reaction
    async createReaction({ params, body }, res) {
        try {
            let dbThoughtData = await Thought.findByIdAndUpdate(params.thoughtId, { $push: { reactions: body }}, { new: true, runValidators: true })
            if (dbThoughtData) {
                let dbUserData = await User.findByIdAndUpdate(body.user, { $push: { reactions: dbThoughtData.reactions[0]._id }}, { new: true });
                if (dbUserData) {
                    res.json(dbThoughtData);
                } else {
                    res.status(404).JSON({ message: 'User not found!' });
                }
            } else {
                res.status(404).json({ message: 'Thought not found!' });
            }
        } catch (error) {
            res.status(404).json(error);
        }
    },

    // delete reaction
    async deleteReaction({ params }, res) {
        try {
            let dbThoughtData = await Thought.findByIdAndUpdate(params.thoughtId, { $pull: { reactions: { _id: params.reactionId }}}, { new: true, runValidators: true });
            if (dbThoughtData) {
                let dbUserData = await User.updateMany( { reactions: params.reactionId }, { $pull: { reactions: params.reactionId }}, { new: true });
                if (dbUserData) {
                    res.json(dbThoughtData);
                } else {
                    res.status(404).JSON({ message: 'User not found!' });
                }
            } else {
                res.status(404).json({ message: 'Thought not found!' });
            }
        } catch (error) {
            res.status(404).json(error);
        }
    }
}

module.exports = thoughtController;