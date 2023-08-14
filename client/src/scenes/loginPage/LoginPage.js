import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form.js";

const LoginPage = () => {
    // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreen = useMediaQuery("(max-width: 1030px)");

    return (
        <Box
            backgroundColor="#223134"
            height="100vh"
            display="flex"
            flexDirection="column"
            width="100%"
        >
            <Typography fontSize="1.2rem" fontWeight="500" padding="1.5rem">
                connectify.app
            </Typography>
            <Box
                display="flex"
                flexDirection={isMobileScreen ? "column" : "row"}
                width="100%"
                padding={isMobileScreen ? "1rem" : "3.5rem"}
                justifyContent="space-evenly"
                gap="1rem"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    padding="1rem"
                    // marginLeft="7rem"
                >
                    <Typography
                        fontSize={isMobileScreen ? "3rem" : "5rem"}
                        fontWeight="500"
                        lineHeight={0.9}
                        marginTop={isMobileScreen ? "0rem" : "7rem"}
                    >
                        Welcome to
                    </Typography>
                    <Typography
                        fontSize={isMobileScreen ? "2rem" : "4.7rem"}
                        fontWeight="500"
                        lineHeight={1}
                    >
                        connectify.app
                    </Typography>
                    <Typography fontSize="1.1rem" paddingY="1rem">
                        To continue using connectify.app, create your account
                        first.
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <Form />
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
