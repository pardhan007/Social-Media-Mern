const { Box} = require("@mui/material");

const UserImage = ({ image, size = "50px" }) => {
    return (
        <Box width={size} height={size} display="flex">
            <img
                style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: `0.1px solid grey`,
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
