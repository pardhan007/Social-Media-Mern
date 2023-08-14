import { Cancel, EditOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state/State";

const Form2 = () => {
    const [pageType, setPageType] = useState("login");
    // const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const server = useSelector((state) => state.server);
    const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    const [file, setFile] = useState([]);

    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });

    const [registerValues, setRegisterValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        location: "",
        occupation: "",
        picturePath: "",
    });

    function handleLoginValue(e) {
        setLoginValues((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }
    function handleRegisterValue(e) {
        setRegisterValues((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }

    const handleDirect = () => {
        setLoginValues((prevState) => {
            return {
                email: "guest@example.com",
                password: "123456",
            };
        });
    };
    const picUpload = async (pics) => {
        if (pics === undefined) {
            return "";
        }
        if (
            pics.type === "image/jpeg" ||
            pics.type === "image/png" ||
            pics.type === "image/jpg"
        ) {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "socialmern");
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/socialmern/image/upload",
                {
                    method: "post",
                    body: data,
                }
            );
            const responseData = await response.json();
            let ans = responseData.url.toString();
            setRegisterValues((prevState) => {
                return {
                    ...prevState,
                    picturePath: ans,
                };
            });
            return ans;
        } else {
            return "";
        }
    };

    const login = async () => {
        setLoading(true);
        const loggedInUserResponse = await fetch(`${server}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginValues),
        });

        const loggedIn = await loggedInUserResponse.json();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn,
                    token: loggedIn.token,
                })
            );
        }
        setLoading(false);
        navigate("/home");
    };

    const register = async () => {
        setLoading(true);

        let ans = await picUpload(file[0]);

        const savedUserResponse = await fetch(`${server}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerValues),
        });

        const savedUser = await savedUserResponse.json();
        console.log(savedUser);
        if (savedUser) {
            setPageType("login");
        }
        setLoading(false);
    };

    // console.log(registerValues);
    // console.log(file);
    // console.log(file.length);

    return (
        <Box width="100%" display="flex" justifyContent="center">
            <Box
                width="360px"
                padding="2.5rem 2rem"
                bgcolor="#FFFFFF"
                color="black"
                display="flex"
                flexDirection="column"
                gap
                borderRadius="0.5rem"
            >
                <Typography>E-mail address*</Typography>
                <input
                    style={{
                        backgroundColor: "transparent",
                        borderRadius: "0.3rem",
                        borderColor: "grey",
                        borderWidth: "0.2px",
                        padding: "0.5rem 0.7rem",
                        fontSize: "0.9rem",
                    }}
                    onChange={
                        pageType === "login"
                            ? handleLoginValue
                            : handleRegisterValue
                    }
                    value={
                        pageType === "login"
                            ? loginValues.email
                            : registerValues.email
                    }
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    required
                />
                <Typography>Password*</Typography>
                <input
                    style={{
                        backgroundColor: "transparent",
                        borderRadius: "0.3rem",
                        borderColor: "grey",
                        borderWidth: "0.2px",
                        padding: "0.5rem 0.7rem",
                        fontSize: "0.9rem",
                    }}
                    onChange={
                        pageType === "login"
                            ? handleLoginValue
                            : handleRegisterValue
                    }
                    value={
                        pageType === "login"
                            ? loginValues.password
                            : registerValues.password
                    }
                    name="password"
                    type="password"
                    required
                />
                {isRegister && (
                    <>
                        <Typography>First Name*</Typography>
                        <input
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: "0.3rem",
                                borderColor: "grey",
                                borderWidth: "0.2px",
                                padding: "0.5rem 0.7rem",
                                fontSize: "0.9rem",
                            }}
                            onChange={
                                pageType === "login"
                                    ? handleLoginValue
                                    : handleRegisterValue
                            }
                            value={registerValues.firstName}
                            type="text"
                            name="firstName"
                            required
                            placeholder="e.g - Harsh"
                        />
                        <Typography>Last Name*</Typography>
                        <input
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: "0.3rem",
                                borderColor: "grey",
                                borderWidth: "0.2px",
                                padding: "0.5rem 0.7rem",
                                fontSize: "0.9rem",
                            }}
                            onChange={
                                pageType === "login"
                                    ? handleLoginValue
                                    : handleRegisterValue
                            }
                            value={registerValues.lastName}
                            type="text"
                            name="lastName"
                            required
                            placeholder="e.g - prajapati"
                        />
                        <Typography>Location*</Typography>
                        <input
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: "0.3rem",
                                borderColor: "grey",
                                borderWidth: "0.2px",
                                padding: "0.5rem 0.7rem",
                                fontSize: "0.9rem",
                            }}
                            onChange={
                                pageType === "login"
                                    ? handleLoginValue
                                    : handleRegisterValue
                            }
                            value={registerValues.location}
                            type="text"
                            name="location"
                            required
                            placeholder="e.g - Delhi,Haryana"
                        />
                        <Typography>Occupation*</Typography>
                        <input
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: "0.3rem",
                                borderColor: "grey",
                                borderWidth: "0.2px",
                                padding: "0.5rem 0.7rem",
                                fontSize: "1rem",
                            }}
                            onChange={
                                pageType === "login"
                                    ? handleLoginValue
                                    : handleRegisterValue
                            }
                            value={registerValues.occupation}
                            type="text"
                            name="occupation"
                            required
                            placeholder="e.g - Tester, Student"
                        />
                        <Typography>Profile Picture</Typography>
                        <Box display="flex">
                            <Dropzone
                                acceptedFiles=".jpg, .jpeg, .png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setFile((previousFiles) => [
                                        ...acceptedFiles.map((file) =>
                                            Object.assign(file, {
                                                preview:
                                                    URL.createObjectURL(file),
                                            })
                                        ),
                                    ])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`1px dashed grey`}
                                        p="0.6rem 1rem"
                                        sx={{
                                            "&:hover": {
                                                cursor: "pointer",
                                            },
                                        }}
                                        width="100%"
                                    >
                                        <input {...getInputProps()} />

                                        {!file.length ? (
                                            <Typography color="grey">
                                                Drag 'n' drop file here, or
                                                click here
                                            </Typography>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>
                                                    {file[0].name}
                                                </Typography>
                                                <Box display="flex">
                                                    <IconButton>
                                                        <EditOutlined color="secondary" />
                                                    </IconButton>
                                                </Box>
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                            {file.length ? (
                                <IconButton onClick={() => setFile([])}>
                                    <Cancel color="warning" />
                                </IconButton>
                            ) : (
                                <></>
                            )}
                        </Box>
                    </>
                )}

                <LoadingButton
                    sx={{
                        color: "white",
                        backgroundColor: "#223134",
                        borderRadius: "2.5rem",
                        padding: "0.5rem",
                        "&:hover": { backgroundColor: "black" },
                        marginY: "1rem",
                    }}
                    loading={loading}
                    loadingIndicator={
                        <CircularProgress color="primary" size={20} />
                    }
                    onClick={pageType === "login" ? login : register}
                    type="submit"
                >
                    {isLogin ? "Sign in" : "Sign up"}
                </LoadingButton>
                {isLogin && (
                    <Button
                        onClick={handleDirect}
                        type="submit"
                        sx={{
                            mb: "1rem",
                            padding: "0.5rem",
                            backgroundColor: "skyblue",
                            borderRadius: "2.5rem",
                            color: "black",
                            "&:hover": { backgroundColor: "#A0C49D" },
                        }}
                    >
                        Get email & password
                    </Button>
                )}
                <Typography
                    onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                    }}
                >
                    {isLogin
                        ? "Don't have an account? Sign up here."
                        : "Already have an account? Login here."}
                </Typography>
            </Box>
        </Box>
    );
};

export default Form2;
