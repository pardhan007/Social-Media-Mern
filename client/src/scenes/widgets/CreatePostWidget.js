import {
    AttachFileOutlined,
    DeleteOutline,
    EditOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    InputBase,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/State";

const CreatePostWidget = ({ picturePath }) => {
    const [loading, setLoading] = useState(false);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [postDescription, setPostsDescription] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const server = useSelector((state) => state.server);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        setLoading(true);
        let data = {
            userId: _id,
            description: postDescription,
        };
        if (image) {
            data = { ...data, picturePath: image };
        }
        const response = await fetch(`${server}/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const posts = await response.json(); // all posts
        dispatch(setPosts({ posts }));
        setLoading(false);
        setImage("");
        setIsImage(false);
        setImageName("");
        setPostsDescription("");
    };

    const picUpload = async (pics) => {
        // console.log(pics);
        setImageUploadLoading(true);
        setImageName(pics.name);
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
            // console.log(responseData.url);
            setImage(responseData.url.toString());
            setImageUploadLoading(false);
        } else {
            setImageUploadLoading(false);
            return;
        }
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setPostsDescription(e.target.value)}
                    value={postDescription}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        padding: "0.6rem 1.5rem",
                        borderRadius: "2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="0.6rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .png"
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            picUpload(acceptedFiles[0]);
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween gap="1rem">
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="0.2rem 1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": { cursor: "pointer" },
                                    }}
                                >
                                    <input type="file" {...getInputProps()} />
                                    {!image ? (
                                        imageUploadLoading ? (
                                            <CircularProgress
                                                color="primary"
                                                size={20}
                                            />
                                        ) : (
                                            <p>Add Image Here</p>
                                        )
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{imageName}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)}>
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: { medium },
                            },
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography
                                color={mediumMain}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: { medium },
                                    },
                                }}
                            >
                                Clip
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography
                                color={mediumMain}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: { medium },
                                    },
                                }}
                            >
                                Attachment
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography
                                color={mediumMain}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: { medium },
                                    },
                                }}
                            >
                                Audio
                            </Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <>
                        <FlexBetween>
                            <MoreHorizOutlined sx={{ color: mediumMain }} />
                        </FlexBetween>
                    </>
                )}
                <Button
                    disabled={!postDescription || imageUploadLoading}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: !postDescription
                            ? palette.neutral.medium
                            : palette.primary.main,
                        borderRadius: "3rem",
                        "&:hover": { color: palette.primary.main },
                    }}
                >
                    {loading ? (
                        <CircularProgress color="error" size={20} />
                    ) : (
                        "POST"
                    )}
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default CreatePostWidget;
