// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

// TODO: Create an aggregate function to get the number of thoughts overall
const headCount = async () =>
  Thought.countDocuments().then((numberOfThoughts) => numberOfThoughts);

// Execute the aggregate method on the Thought model and calculate the overall grade by using the $avg operator
const grade = async (thoughtId) =>
  Thought.aggregate([
    // Ensure we include only the thought who can match the given ObjectId using the $match operator
    {},
    {
      $unwind: "$reactions",
    },
    // Group information for the thought with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      // Your code here
    },
  ]);

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          headCount: await headCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((singleThought) => {
        res.json(singleThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought } },
          { new: true }
        )
          .then(() => res.json(thought))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the User
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought deleted, but no users found",
            })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a reaction to a Thought
  addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  removeReaction(req, res) {
    console.log(req.params);
		
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
       .then((thought) =>
			
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
       )
      .catch((err) => res.status(500).json(err));
  },
};
