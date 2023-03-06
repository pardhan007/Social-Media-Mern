import { useSelector } from "react-redux";

const { Box } = require("@mui/material");

const UserImage = ({ image, size = "50px" }) => {
    const server = useSelector((state) => state.server);
    return (
        <Box width={size} height={size}>
            <img
                style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                }}
                width={size}
                height={size}
                alt="user"
                src={`${server}/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;
