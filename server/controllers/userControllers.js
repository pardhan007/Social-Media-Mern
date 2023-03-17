import User from "../models/userModel.js";

/* READ */

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const allUsers = async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                  $or: [
                      // if any of query exist then it's gonna return true
                      {
                          firstName: {
                              $regex: req.query.search,
                              $options: "i",
                          },
                      },
                      { email: { $regex: req.query.search, $options: "i" } },
                  ],
              }
            : {};
        // console.log(keyword);
        const users = await User.find(keyword).find({
            _id: { $ne: req.user._id },
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        // console.log(id);
        // console.log(friendId);

        const user = await User.findById(id).select("-password");
        const friend = await User.findById(friendId).select("-password");
        // console.log(user.friends);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((idx) => idx !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
