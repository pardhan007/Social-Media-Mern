import {
    MoreVert,
    PersonAddOutlined,
    PersonRemoveOutlined,
} from "@mui/icons-material";
import {
    Box,
    CircularProgress,
    ClickAwayListener,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Typography,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "state/State";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath, postId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const server = useSelector((state) => state.server);

    // console.log(friends);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    // const isFriend = friends.find(
    //     (friend) => friend._id === friendId || friend === friendId
    // );

    // console.log(isFriend);

    const patchFriend = async () => {
        setLoading(true);
        const response = await fetch(`${server}/users/${userId}/${friendId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
        setLoading(false);
    };

    const deletePost = async () => {
        setLoading(true);
        const response = await fetch(`${server}/posts/delete/${postId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setLoading(false);
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    <UserImage image={userPicturePath} size="50px" />
                </Box>
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.neutral.medium,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {userId !== friendId ? (
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{
                        backgroundColor: primaryLight,
                        p: "0.6rem",
                    }}
                >
                    {isFriend ? (
                        loading ? (
                            <CircularProgress color="primary" size={20} />
                        ) : (
                            <PersonRemoveOutlined sx={{ color: primaryDark }} />
                        )
                    ) : loading ? (
                        <CircularProgress color="primary" size={20} />
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )}
                </IconButton>
            ) : loading ? (
                <CircularProgress color="primary" size={20} />
            ) : (
                <div>
                    <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                        {postId && <MoreVert />}
                    </IconButton>
                    {menuOpen && (
                        <Paper
                            sx={{
                                position: "absolute",
                                zIndex: "100",
                            }}
                        >
                            <ClickAwayListener
                                onClickAway={() => setMenuOpen(!menuOpen)}
                            >
                                <MenuList>
                                    <MenuItem
                                        onClick={() => setMenuOpen(!menuOpen)}
                                    >
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={deletePost}>
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    )}
                </div>
            )}
        </FlexBetween>
    );
};

export default Friend;
