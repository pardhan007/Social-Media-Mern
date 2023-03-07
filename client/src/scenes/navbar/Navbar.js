import FlexBetween from "components/FlexBetween.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    FormControl,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    DarkMode,
    Help,
    LightMode,
    Message,
    Notifications,
    Search,
    Menu,
    Close,
} from "@mui/icons-material";
import { setLogout, setMode } from "state/State";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // tells current display size is below this min-width or higher

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    // const background = theme.palette.background.default;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween padding="0.7rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    SocioPedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 0.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}

            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}

            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={alt}
                >
                    {/* CLOSE ICON   */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() =>
                                setIsMobileMenuToggled(!isMobileMenuToggled)
                            }
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode
                                    sx={{ color: dark, fontSize: "25px" }}
                                />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;
