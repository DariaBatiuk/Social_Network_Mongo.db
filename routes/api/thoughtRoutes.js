const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
	updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/thought




// router.route('/').get(getThoughts).post(createThought);

// // router
// //   .route('/:thoughtId')
// //   .get(getSingleThought)
// //   .put(updateThought)
// //   .delete(deleteThought);


// // /api/students/:studentId
// router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// // /api/students/:studentId/assignments
// router.route('/:thought/reaction').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
