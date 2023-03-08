import { Box, Divider, Skeleton } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween.js";
import WidgetWrapper from "./WidgetWrapper.js";

const UserLoadingSkelton = () => {
    return (
        <WidgetWrapper>
            <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween gap="1rem">
                    <Box>
                        <Skeleton variant="circular" width={50} height={50} />
                    </Box>
                    <Box>
                        <Skeleton
                            variant="text"
                            width="10rem"
                            sx={{ fontSize: "1rem" }}
                        />
                        <Skeleton
                            variant="text"
                            width="4rem"
                            sx={{ fontSize: "1rem" }}
                        />
                    </Box>
                </FlexBetween>
            </FlexBetween>
            <Divider />
            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <Skeleton
                        variant="text"
                        width="50%"
                        sx={{ fontSize: "1rem" }}
                    />
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <Skeleton
                        variant="text"
                        width="40%"
                        sx={{ fontSize: "1rem" }}
                    />
                </Box>
            </Box>
            <Divider />
            {/* THIRD ROW  */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Skeleton
                        variant="text"
                        width="60%"
                        sx={{ fontSize: "1rem" }}
                    />
                    <Skeleton
                        variant="text"
                        width="15%"
                        sx={{ fontSize: "1rem" }}
                    />
                </FlexBetween>
                <FlexBetween>
                    <Skeleton
                        variant="text"
                        width="60%"
                        sx={{ fontSize: "1rem" }}
                    />
                    <Skeleton
                        variant="text"
                        width="15%"
                        sx={{ fontSize: "1rem" }}
                    />
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Skeleton
                    variant="text"
                    width="45%"
                    sx={{ fontSize: "1rem" }}
                />

                <Skeleton variant="rounded" width="100%" height={90} />
            </Box>
        </WidgetWrapper>
    );
};

export default UserLoadingSkelton;
