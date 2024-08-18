import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"  // Increased height
                image={blog.img_url}
                alt={blog.title}
                sx={{ objectFit: "cover" }} // Ensures the image covers the container
              />
              <CardContent>
                <Typography variant="h5">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleUpdate(blog._id)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
