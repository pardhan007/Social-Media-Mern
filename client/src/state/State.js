import { createSlice } from "@reduxjs/toolkit";

// global states
const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
    server: "https://socialpedia-zx17.onrender.com",
    // server: "http://localhost:4000",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // contains the functions that modify the global states
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("User friends non-existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        // update post, e.g -> like
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post._id)
                    return action.payload.post;
                return post;
            });
            state.posts = updatedPost;
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
    authSlice.actions;

export default authSlice.reducer;
