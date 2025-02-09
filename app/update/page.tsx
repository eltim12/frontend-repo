"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "firebase/auth";
import { auth } from "@/apis/user";
import { updateUserEmail } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";

const EditEmailPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEmailUpdate = async () => {
    setError(null);
    setSuccess(false);

    if (!auth.currentUser) {
      setError("No authenticated user.");
      return;
    }

    try {
      await updateEmail(auth.currentUser, email);
      dispatch(updateUserEmail(email)); // Update Redux state
      setSuccess(true);
      
      setTimeout(() => {
        router.push("/main"); // Redirect after update
      }, 1500);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Edit Email
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Email updated successfully!</Alert>}
      <TextField
        fullWidth
        label="New Email"
        margin="normal"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button fullWidth variant="contained" color="primary" onClick={handleEmailUpdate}>
        Update Email
      </Button>
    </Container>
  );
};

export default EditEmailPage;
