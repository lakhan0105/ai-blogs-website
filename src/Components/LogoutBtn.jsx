import React from "react";
import { useMyContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";
import Button from "./Button";

function LogoutBtn() {
  const { currUser, logoutUser } = useMyContext();
  const navigate = useNavigate();

  // function to handle logout (runs when the logout btn is clicked)
  async function handleLogout() {
    // run the logoutUser function from ContextProvider
    const result = await logoutUser();
    if (result.success) {
      console.log("logout successfull!");
      navigate("/");
    }
  }

  if (currUser) {
    return (
      <Button
        extraStyles={"bg-red-600 hover:bg-red-500"}
        handleOnClick={handleLogout}
      >
        Logout
      </Button>
    );
  }
}

export default LogoutBtn;
