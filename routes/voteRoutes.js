const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const voteController = require("../controllers/voteController");

router.post("/add-vote", authMiddleware, voteController.createVote);
router.put("/update-vote", authMiddleware, voteController.updateVote);
router.delete("/delete-vote/:id", authMiddleware, voteController.deleteVote);
router.get("/get-vote", authMiddleware, voteController.getVote);
router.get("/get-vote/:id", authMiddleware, voteController.getVoteById);

module.exports = router;
