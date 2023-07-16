import {
    Cancel,
    Check,
    EditOutlined,
    LocationOnOutlined,
    ManageAccountsOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Input,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserDetail } from "state/State";

const UserWidget = ({ userId, picturePath }) => {
    // console.log(picturePath);
    const [user, setUser] = useState(null);

    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const loggedInUser = useSelector((state) => state.user);
    const server = useSelector((state) => state.server);
    // const friends = useSelector((state) => state.user.friends);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const [twitterOpen, setTwitterOpen] = useState(false);
    const [linkedinOpen, setLinkedinOpen] = useState(false);

    const [twitterUrl, setTwitterUrl] = useState(loggedInUser.twitter);
    const [linkedinUrl, setLinkedinUrl] = useState(loggedInUser.linkedin);
    const dispatch = useDispatch();
    const [twitterUpdateLoading, setTwitterUpdateLoading] = useState(false);
    const [linkedinUpdateLoading, setLinkedinUpdateLoading] = useState(false);

    const getUser = async () => {
        try {
            const res = await fetch(`${server}/users/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLinkedin = async () => {
        setLinkedinUpdateLoading(true);
        try {
            let data = {
                userId: loggedInUserId,
                linkedinUsername: linkedinUrl,
            };
            await fetch(`${server}/users/linkedin/update`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            dispatch(updateUserDetail({ linkedin: linkedinUrl }));
            setLinkedinUpdateLoading(false);
            setLinkedinOpen(false);
        } catch (error) {
            console.error(error);
            setLinkedinUpdateLoading(false);
            setLinkedinOpen(false);
        }
    };
    const handleTwitter = async () => {
        setTwitterUpdateLoading(true);
        try {
            let data = {
                userId: loggedInUserId,
                twitterUsername: twitterUrl,
            };
            await fetch(`${server}/users/twitter/update`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            dispatch(updateUserDetail({ twitter: twitterUrl }));
            setTwitterUpdateLoading(false);
            setTwitterOpen(false);
        } catch (error) {
            console.error(error);
            setTwitterUpdateLoading(false);
            setTwitterOpen(false);
        }
    };

    if (!user) {
        return null;
    }

    const {
        _id,
        firstName,
        lastName,
        occupation,
        location,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <Box
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        <UserImage image={picturePath} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.neutral.main,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: dark }} />
                    <Typography color={main}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined
                        fontSize="large"
                        sx={{ color: dark }}
                    />
                    <Typography color={main}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}

            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={dark} fontWeight="500">
                        Who's viewed your profile
                    </Typography>
                    <Typography color={main}>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={dark} fontWeight="500">
                        Impressions on your posts
                    </Typography>
                    <Typography color={main}>{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography
                    fontSize="1rem"
                    color={dark}
                    fontWeight="500"
                    mb="1rem"
                >
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem" paddingY="0.2rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            {twitterOpen ? (
                                <Input
                                    placeholder="Enter Twitter Username"
                                    value={
                                        loggedInUserId === userId
                                            ? twitterUrl
                                            : user.twitter
                                    }
                                    onChange={(e) =>
                                        setTwitterUrl(e.target.value)
                                    }
                                ></Input>
                            ) : (
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                >
                                    {user.twitter ? (
                                        <a
                                            href={`https://twitter.com/${user.twitter}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ textDecoration: "none" }}
                                        >
                                            Twitter
                                        </a>
                                    ) : (
                                        <Typography variant="">
                                            Twitter
                                        </Typography>
                                    )}
                                </Button>
                            )}
                        </Box>
                    </FlexBetween>
                    {loggedInUserId === _id &&
                        (twitterOpen ? (
                            <div style={{ display: "flex", gap: "0.1rem" }}>
                                <IconButton
                                    onClick={() => setTwitterOpen(false)}
                                >
                                    <Cancel color={dark} />
                                </IconButton>
                                <IconButton
                                    onClick={handleTwitter}
                                    disabled={user.twitter === twitterUrl}
                                >
                                    {twitterUpdateLoading ? (
                                        <CircularProgress
                                            color="error"
                                            size={20}
                                        />
                                    ) : (
                                        <Check color="primary" />
                                    )}
                                </IconButton>
                            </div>
                        ) : (
                            <IconButton onClick={() => setTwitterOpen(true)}>
                                <EditOutlined color={dark} />
                            </IconButton>
                        ))}
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem" paddingY="0.2rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            {linkedinOpen ? (
                                <Input
                                    placeholder="Enter Linkedin Username"
                                    value={
                                        loggedInUserId === userId
                                            ? linkedinUrl
                                            : user.linkedin
                                    }
                                    onChange={(e) =>
                                        setLinkedinUrl(e.target.value)
                                    }
                                ></Input>
                            ) : (
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                >
                                    {user.linkedin ? (
                                        <a
                                            href={`https://www.linkedin.com/in/${user.linkedin}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ textDecoration: "none" }}
                                        >
                                            LinkedIn
                                        </a>
                                    ) : (
                                        <Typography variant="">
                                            LinkedIn
                                        </Typography>
                                    )}
                                </Button>
                            )}
                        </Box>
                    </FlexBetween>
                    {loggedInUserId === _id &&
                        (linkedinOpen ? (
                            <div style={{ display: "flex", gap: "0.1rem" }}>
                                <IconButton
                                    onClick={() => setLinkedinOpen(false)}
                                >
                                    <Cancel color={dark} />
                                </IconButton>
                                <IconButton
                                    onClick={handleLinkedin}
                                    disabled={user.linkedin === linkedinUrl}
                                >
                                    {linkedinUpdateLoading ? (
                                        <CircularProgress
                                            color="error"
                                            size={20}
                                        />
                                    ) : (
                                        <Check color="primary" />
                                    )}
                                </IconButton>
                            </div>
                        ) : (
                            <IconButton onClick={() => setLinkedinOpen(true)}>
                                <EditOutlined color={dark} />
                            </IconButton>
                        ))}
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
