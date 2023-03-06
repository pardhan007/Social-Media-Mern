import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/State";
import PostWidget from "./PostWidget.js";

const AllPost = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(`http://localhost:4000/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:4000/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map((post) => {
                return <PostWidget key={post._id} post={post} />;
            })}
        </>
    );
};

export default AllPost;
