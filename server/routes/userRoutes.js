import express from "express";
import { addRemoveFriend, allUsers, getUser, getUserFriends } from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* READ */

router.get("/allusers", verifyToken, allUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
