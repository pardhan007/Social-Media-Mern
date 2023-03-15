import express from "express";
import {
    createPost,
    deletePost,
    getFeedPosts,
    getUserPosts,
    likePost,
} from "../controllers/postControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* READ */

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */

router.patch("/:id/like", verifyToken, likePost);

/* WRITE */

router.post("/", verifyToken, createPost);
router.post("/delete/:id", verifyToken, deletePost);

export default router;
