import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/State";

const PostWidget = ({ post }) => {
    const [isComments, setIsComments] = useState(false);
    // console.log(post);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(post.likes[loggedInUserId]);
    const likeCount = Object.keys(post.likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(
            `http://localhost:4000/posts/${post._id}/like`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: loggedInUserId }),
            }
        );
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={post.userId}
                name={`${post.firstName} ${post.lastName}`}
                subtitle={post.location}
                userPicturePath={post.userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {post.description}
            </Typography>
            {post.picturePath && (
                <img
                    width="100%"
                    // height="650px"
                    alt="post"
                    style={{
                        borderRadius: "0.75rem",
                        marginTop: "0.75rem",
                        objectFit: "contain",
                        maxHeight: "650px",
                    }}
                    src={`http://localhost:4000/assets/${post.picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    {/* LIKE */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    {/* COMMENTS */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{post.comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {post.comments.map((comment, i) => (
                        <Box key={`${post.firstName} ${post.lastName}-${i}`}>
                            <Divider />
                            <Typography
                                sx={{
                                    color: main,
                                    margin: "0.5rem 0",
                                    paddingLeft: "1rem",
                                }}
                            >
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
