import { EditOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setLogin } from "state/State.js";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const server = useSelector((state) => state.server);

    const picUpload = async (pics) => {
        // console.log(pics);
        if (pics === undefined) {
            return;
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
            return ans;
        } else {
            return "";
        }
    };

    const register = async (values, onSubmitProps) => {
        let ans = await picUpload(values.picture);
        delete values["picture"];
        values = { ...values, picturePath: ans };

        const savedUserResponse = await fetch(`${server}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };
    const login = async (values, onSubmitProps) => {
        const loggedInUserResponse = await fetch(`${server}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        const loggedIn = await loggedInUserResponse.json();
        onSubmitProps.resetForm();
        // console.log(loggedIn);
        // console.log(loggedIn.token);
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn,
                    token: loggedIn.token,
                })
            );
        }
        navigate("/home");
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns="repeat(4, minmax(0,1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobile ? undefined : "span 4",
                            },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    autoComplete="off"
                                    error={
                                        Boolean(touched.firstName) &&
                                        Boolean(errors.firstName)
                                    }
                                    helperText={
                                        touched.firstName && errors.firstName
                                    }
                                    sx={{
                                        gridColumn: "span 2",
                                    }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.LastName}
                                    name="lastName"
                                    autoComplete="off"
                                    error={
                                        Boolean(touched.lastName) &&
                                        Boolean(errors.lastName)
                                    }
                                    helperText={
                                        touched.lastName && errors.lastName
                                    }
                                    sx={{
                                        gridColumn: "span 2",
                                    }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    autoComplete="off"
                                    error={
                                        Boolean(touched.location) &&
                                        Boolean(errors.location)
                                    }
                                    helperText={
                                        touched.location && errors.location
                                    }
                                    sx={{
                                        gridColumn: "span 4",
                                    }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    autoComplete="off"
                                    error={
                                        Boolean(touched.occupation) &&
                                        Boolean(errors.occupation)
                                    }
                                    helperText={
                                        touched.occupation && errors.occupation
                                    }
                                    sx={{
                                        gridColumn: "span 4",
                                    }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg, .jpeg, .png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue(
                                                "picture",
                                                acceptedFiles[0]
                                            )
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="0.2rem 1rem"
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer",
                                                    },
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {
                                                                values.picture
                                                                    .name
                                                            }
                                                        </Typography>
                                                        <EditOutlined />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        {/* LOGIN */}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            autoComplete="off"
                            error={
                                Boolean(touched.email) && Boolean(errors.email)
                            }
                            helperText={touched.email && errors.email}
                            sx={{
                                gridColumn: "span 4",
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            autoComplete="off"
                            error={
                                Boolean(touched.password) &&
                                Boolean(errors.password)
                            }
                            helperText={touched.password && errors.password}
                            sx={{
                                gridColumn: "span 4",
                            }}
                        />
                    </Box>
                    {/* BUTTONS */}

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
