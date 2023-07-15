import {
    Check,
    EditOutlined,
    LocationOnOutlined,
    ManageAccountsOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    // console.log(picturePath);
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const server = useSelector((state) => state.server);
    // const friends = useSelector((state) => state.user.friends);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const [twitterOpen, setTwitterOpen] = useState(false);
    const [linkedinOpen, setLinkedinOpen] = useState(false);

    const [twitterUrl, setTwitterUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");

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
                                    value={twitterUrl}
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
                                    {twitterUrl ? (
                                        <a
                                            href={`https://twitter.com/${twitterUrl}`}
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
                    {loggedInUserId === _id && (
                        <IconButton
                            onClick={() => setTwitterOpen(!twitterOpen)}
                        >
                            {twitterOpen ? (
                                <Check color="primary" />
                            ) : (
                                <EditOutlined color={dark} />
                            )}
                        </IconButton>
                    )}
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem" paddingY="0.2rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            {linkedinOpen ? (
                                <Input
                                    placeholder="Enter Linkedin Username"
                                    value={linkedinUrl}
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
                                    {linkedinUrl ? (
                                        <a
                                            href={`https://www.linkedin.com/in/${linkedinUrl}`}
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
                    {loggedInUserId === _id && (
                        <IconButton
                            onClick={() => setLinkedinOpen(!linkedinOpen)}
                        >
                            {linkedinOpen ? (
                                <Check color="primary" />
                            ) : (
                                <EditOutlined color={dark} />
                            )}
                        </IconButton>
                    )}
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
