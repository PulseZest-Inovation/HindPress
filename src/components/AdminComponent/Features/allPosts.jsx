import React, { useState, useEffect } from "react";
import { db, storage } from "../../../utils/FireBase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const AddPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setFilteredPosts(postsData); // Initialize filtered posts with all posts
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  // Delete a post from Firestore and Storage
  const handleDeletePost = async (postId, imageUrl) => {
    try {
      // Delete post document from Firestore
      await deleteDoc(doc(db, "posts", postId));

      // Delete image from Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Update state to remove deleted post from UI
      setPosts(posts.filter((post) => post.id !== postId));
      setFilteredPosts(filteredPosts.filter((post) => post.id !== postId));
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  // Handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    filterPosts(event.target.value);
  };

  // Filter posts based on search term
  const filterPosts = (term) => {
    if (term.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.name.toLowerCase().includes(term.toLowerCase()) ||
          post.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  // Open edit modal and set selected post
  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setSelectedPost(null);
    setEditModalOpen(false);
  };

  // Save edited post details
  const saveEditedPost = async () => {
    // Implement your logic to save edited post details here
    // Example: Update Firestore document
    try {
      const { id, name, description, actualPrice, sellingPrice, imageUrl } = selectedPost;
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        name,
        description,
        actualPrice,
        sellingPrice,
        imageUrl,
      });

      // Close modal and update state
      closeEditModal();
      fetchPosts(); // Refresh posts list after edit
      console.log("Post details updated successfully!");
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">All Posts</h1>

      {/* Search Box */}
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      {/* Display Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPosts.map((post) => (
          <Paper key={post.id} className="p-4 border rounded-md shadow-md">
            <img
              src={post.imageUrl}
              alt={post.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <Typography variant="h5" className="font-semibold mt-2">
              {post.name}
            </Typography>
            <Typography variant="body1" className="mt-1 text-gray-600">
              {post.description}
            </Typography>
            <Typography
              variant="body1"
              className="mt-1 text-gray-800 font-bold"
            >
              Actual Price: ${post.actualPrice}
            </Typography>
            <Typography
              variant="body1"
              className="mt-1 text-gray-800 font-bold"
            >
              Selling Price: ${post.sellingPrice}
            </Typography>
            <div className="flex justify-between items-center mt-4">
              <IconButton
                aria-label="edit"
                onClick={() => openEditModal(post)}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all duration-300"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeletePost(post.id, post.imageUrl)}
                className="p-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-all duration-300"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Paper>
        ))}
      </div>

      {/* Edit Post Modal */}
      <Modal open={editModalOpen} onClose={closeEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Post Details
          </Typography>
          <TextField
            label="Post Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedPost ? selectedPost.name : ""}
            onChange={(e) =>
              setSelectedPost({
                ...selectedPost,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="Post Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={selectedPost ? selectedPost.description : ""}
            onChange={(e) =>
              setSelectedPost({
                ...selectedPost,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Actual Price"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={selectedPost ? selectedPost.actualPrice : ""}
            onChange={(e) =>
              setSelectedPost({
                ...selectedPost,
                actualPrice: e.target.value,
              })
            }
          />
          <TextField
            label="Selling Price"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={selectedPost ? selectedPost.sellingPrice : ""}
            onChange={(e) =>
              setSelectedPost({
                ...selectedPost,
                sellingPrice: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={saveEditedPost}
            className="mt-4"
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddPosts;
