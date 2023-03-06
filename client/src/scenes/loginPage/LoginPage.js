import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import Form from "./Form.js";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <Box>
      <Box width="100%" backgroundColor={alt} p="0.5rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SocioPedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{
            mb: "1.5rem",
          }}
        >
          Welcome to SocioPedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
