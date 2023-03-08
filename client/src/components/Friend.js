import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import {
    Box,
    CircularProgress,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state/State";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const server = useSelector((state) => state.server);

    // console.log(friends);
    const [loading, setLoading] = useState(false);
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
            {userId !== friendId && (
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
            )}
        </FlexBetween>
    );
};

export default Friend;
