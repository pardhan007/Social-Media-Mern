const { Box } = require("@mui/material");

const UserImage = ({ image, size = "50px" }) => {
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
                src={image}
            />
        </Box>
    );
};

export default UserImage;
