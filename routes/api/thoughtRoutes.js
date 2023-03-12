const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
	updateThought,
  deleteThought,
	addReaction,
	removeReaction
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

	// /api/thoughts/:thoughtId/reactions
	router.route('/:thoughtId/reactions').post(addReaction);

	// /api/thoughts/:thoughtId/reactions/:reactionId
	router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// // /api/students/:studentId/assignments
// router.route('/:thought/reaction').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
