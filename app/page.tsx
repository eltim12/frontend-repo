"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/apis/user";
import { Button, Typography, Container } from "@mui/material";

const MainPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if no user is found
    }
  }, [user, router]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    router.push("/login");
  };

  const handleUpdate = () => {
    router.push("/update");
  };

  if (!user) {
    return null; // Prevent rendering before redirect
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Welcome, {user?.email}!
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ marginRight: 2 }}>
        Logout
      </Button>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Data
      </Button>
    </Container>
  );
};

export default MainPage;
