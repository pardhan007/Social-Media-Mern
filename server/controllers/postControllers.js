import Post from "../models/postModel.js";
import User from "../models/userModel.js";

/* CREATE  */

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;

        const user = await User.findById(userId).select("-password");
        const newpost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });

        await newpost.save();
        const allPosts = await Post.find().sort({ createdAt: -1 });

        res.status(201).json(allPosts); // sending all post as a response
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */

export const getFeedPosts = async (req, res) => {
    try {
        const allPosts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const userPosts = await Post.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addComment = async (req, res) => {
    const { userName, userPicturePath, textComment, postId } = req.body;

    const data = {
        userName: userName,
        userPicturePath: userPicturePath,
        textComment: textComment,
    };

    const added = await Post.findByIdAndUpdate(
        postId,
        {
            $push: { comments: data },
        },
        {
            new: true,
        }
    );

    if (!added) {
        res.status(404);
        throw new Error("comment not added");
    } else {
        res.status(201).json(added);
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).send(`No id Provided: ${id}`);
        }

        await Post.findByIdAndRemove(id);

        const allPosts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(allPosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
