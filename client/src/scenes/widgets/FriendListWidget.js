import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state/State";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const friends = useSelector((state) => state.user.friends);
    const [friendFriends, setFriendFriends] = useState([]);
    const getFriends = async () => {
        const response = await fetch(
            `http://localhost:4000/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await response.json();
        userId === loggedInUserId
            ? dispatch(setFriends({ friends: data }))
            : setFriendFriends(data);
    };

    // console.log(friendFriends);

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friends List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {userId === loggedInUserId
                    ? friends.map((friend) => (
                          <Friend
                              key={friend._id}
                              friendId={friend._id}
                              name={`${friend.firstName} ${friend.lastName}`}
                              subtitle={friend.occupation}
                              userPicturePath={friend.picturePath}
                          />
                      ))
                    : friendFriends.map((friend) => (
                          <Friend
                              key={friend._id}
                              friendId={friend._id}
                              name={`${friend.firstName} ${friend.lastName}`}
                              subtitle={friend.occupation}
                              userPicturePath={friend.picturePath}
                          />
                      ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
