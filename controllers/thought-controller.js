const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        let dbThoughtData = await Thought.find({}).populate({ path: 'user'});

        if (!dbThoughtData) {
            res.status(404);
            return;
        }

        res.json(dbThoughtData);
    },

    // get thought by id
    async getThoughtById({ params }, res) {
        let dbThoughtData = await Thought.findById(params.id).populate({ path: 'user' });

        if (!dbThoughtData) {
            res.status(404);
            return;
        }

        res.json(dbThoughtData);

    },

    // create thought
    async createThought({ body }, res) {
        let dbThoughtData = await Thought.create(body);

        if (!dbThoughtData) {
            res.status(404);
            return;
        }

        let dbUserData = await User.findOneAndUpdate({ _id: body.user }, { $push: { thoughts: dbThoughtData._id }})

        if (!dbUserData) {
            res.status(404).json({ message: 'User not found!'});
            return;
        }

        res.json(dbThoughtData);
    },

    // update thought
    async updateThought({ params, body }, res) {
        let dbThoughtData = await Thought.findByIdAndUpdate(params.id, body, { new: true });

        if (!dbThoughtData) {
            res.status(404);
            return;
        }

        res.json(dbThoughtData);
    },

    // delete thought
    async deleteThought({ params }, res) {
        let dbThoughtData = await Thought.findByIdAndDelete(params.id);

        if (!dbThoughtData) {
            res.status(404)
            return;
        }

        let dbUserData = await User.updateMany({ thoughts: params.id }, { $pull: { thoughts: params.id }}, { new: true });

        if (!dbUserData) {
            res.status(404).JSON({ message: 'User not found!' });
            return;
        }

        res.json(dbThoughtData);
    },

    // create reaction
    async createReaction({ params, body }, res) {
        let dbThoughtData = await Thought.findByIdAndUpdate(params.thoughtId, { $push: { reactions: body }}, { new: true })

        if (!dbThoughtData) {
            res.status(404);
            return;
        }

        console.log(dbThoughtData);

        let dbUserData = await User.findByIdAndUpdate(body.user, { $push: { reactions: dbThoughtData.reactions[0]._id }}, { new: true });
        
        if (!dbUserData) {
            res.status(404).JSON({ message: 'User not found!' });
            return;
        }

        res.json(dbThoughtData);
    },

    // delete reaction
    async deleteReaction({ params }, res) {
        let dbThoughtData = await Thought.findByIdAndUpdate(params.thoughtId, { $pull: { reactions: { _id: params.reactionId }}}, { new: true });

        if (!dbThoughtData) {
            res.status(404);
            return;
        }

        let dbUserData = await User.updateMany( { reactions: params.reactionId }, { $pull: { reactions: params.reactionId }}, { new: true });
        
        if (!dbUserData) {
            res.status(404);
            return;
        }

        res.json(dbThoughtData);
    }
}

module.exports = thoughtController;