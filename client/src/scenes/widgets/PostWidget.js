import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    Send,
    ShareOutlined,
} from "@mui/icons-material";
import {
    Box,
    Checkbox,
    CircularProgress,
    Divider,
    IconButton,
    InputBase,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/State";

const PostWidget = ({ post }) => {
    const [isComments, setIsComments] = useState(false);
    const [textComment, setTextComment] = useState("");

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const server = useSelector((state) => state.server);
    const user = useSelector((state) => state.user);
    const isLiked = Boolean(post.likes[loggedInUserId]);
    const likeCount = Object.keys(post.likes).length;
    const [loading, setLoading] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);
    const [viewMore, setViewMore] = useState(false);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        setLoading(true);
        const response = await fetch(`${server}/posts/${post._id}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setLoading(false);
    };

    const handleComment = async () => {
        setLoadingComment(true);
        const data = {
            userName: `${user.firstName} ${user.lastName}`,
            userPicturePath: user.picturePath,
            textComment: textComment,
            postId: post._id,
        };

        const response = await fetch(`${server}/posts/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setTextComment("");
        setLoadingComment(false);
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={post.userId}
                name={`${post.firstName} ${post.lastName}`}
                subtitle={post.location}
                userPicturePath={post.userPicturePath}
                postId={post._id}
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
                    src={post.picturePath}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    {/* LIKE */}
                    <FlexBetween>
                        {/* <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton> */}
                        {isLiked ? (
                            <Checkbox
                                onClick={patchLike}
                                defaultChecked
                                icon={<FavoriteBorderOutlined />}
                                checkedIcon={
                                    <FavoriteOutlined sx={{ color: primary }} />
                                }
                            />
                        ) : (
                            <Checkbox
                                onClick={patchLike}
                                icon={<FavoriteBorderOutlined />}
                                checkedIcon={
                                    <FavoriteOutlined sx={{ color: primary }} />
                                }
                            />
                        )}
                        {loading ? (
                            <CircularProgress color="primary" size={15} />
                        ) : (
                            <Typography>{likeCount}</Typography>
                        )}
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
                    <Divider />
                    <Box display="flex" alignItems="center" gap="0.7rem">
                        <UserImage image={post.userPicturePath} size="35" />
                        <FlexBetween
                            borderRadius="50px"
                            gap="3rem"
                            padding="0rem 0.7rem"
                            margin="1rem 0"
                            width="100%"
                            sx={{
                                backgroundColor: palette.neutral.light,
                            }}
                        >
                            <InputBase
                                fullWidth
                                value={textComment}
                                placeholder="Add a comment..."
                                onChange={(e) => setTextComment(e.target.value)}
                            />
                            <IconButton
                                onClick={handleComment}
                                disabled={!textComment.trim()}
                            >
                                {loadingComment ? (
                                    <CircularProgress
                                        color="primary"
                                        size={18}
                                    />
                                ) : (
                                    <Send />
                                )}
                            </IconButton>
                        </FlexBetween>
                    </Box>

                    {post.comments
                        ?.slice(0, post.comments.length)
                        .reverse()
                        .slice(0, viewMore ? post.comments.length : 3)
                        .map((comment, i) => (
                            <Box display="flex" gap="1rem" mb="0.7rem">
                                <UserImage
                                    image={comment.userPicturePath}
                                    size={35}
                                />
                                <Box
                                    key={`${post.firstName} ${post.lastName}-${i}`}
                                    borderRadius="0.8rem"
                                    padding="0.2rem 0.7rem"
                                    gap="3rem"
                                    minWidth="6rem"
                                    maxWidth="29.5rem"
                                    sx={{
                                        backgroundColor: palette.neutral.light,
                                        overflowWrap: "break-word",
                                    }}
                                >
                                    <Typography fontWeight="500">
                                        {comment.userName}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: main,
                                        }}
                                    >
                                        {comment.textComment}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    <Typography
                        color={palette.primary.main}
                        mt="0.5rem"
                        onClick={() => setViewMore(!viewMore)}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        {post.comments.length > 3 &&
                            (viewMore ? "View Less" : "View More")}
                    </Typography>
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
