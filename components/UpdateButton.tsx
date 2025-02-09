"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/apis/userApi";
import { RootState } from "@/store/store";
import { Button, Typography } from "@mui/material";

export default function UpdateButton() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const handleFetch = async () => {
    if (user) {
      const token = await user.getIdToken();
      const response = await fetchUserData(token);
      console.log(response.data);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleFetch}>Fetch User Data</Button>
    </div>
  );
}
