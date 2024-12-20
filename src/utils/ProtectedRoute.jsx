import React from "react";
import { useMyContext } from "../Context/ContextProvider";

function ProtectedRoute({ children }) {
  const { currUser } = useMyContext();

  if (currUser) {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
