import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// _________________________________________________________________________________________________________

function Logout() {

  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
    
  }, [navigate]);

  return (
    <div 
    className="flex justify-center items-center h-screen"><p>Logout...</p>
    </div>
  );
}

export default Logout;
