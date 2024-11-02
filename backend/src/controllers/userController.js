import User from '../models/User.js'; // Ensure this path matches where your model is located

// Controller to create a new user
export const createUser = async (req, res) => {
  const { id, name, email, phone, address } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({ id, name, email, phone, address });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a response with the saved user
    res.status(201).json(savedUser);
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send the list of users as a response
    res.status(200).json(users);
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an existing user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    // Find user by id and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true, runValidators: true } // Return updated user and validate
    );

    // If user not found, send a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send updated user as response
    res.status(200).json(updatedUser);
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(400).json({ message: error.message });
  }
};

// Controller to delete an existing user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by id and delete
    const deletedUser = await User.findByIdAndDelete(id);

    // If user not found, send a 404 error
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ message: error.message });
  }
};