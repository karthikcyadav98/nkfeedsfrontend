import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onLogin = () => {
    setLoading(true);
    axios({
      method: "post",
      url: base_url + "login",
      data: {
        email: email.toLowerCase(),
      },
    })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("isLogin", true);
          window.location.assign("/feedback");
        } else {
          setLoginError("Invalid Email ID");
        }
      })
      .catch((err) => console.log("ajsghdasd", err))
      .finally(() => setLoading(false));
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Anonymous Neo Wall</h1>
      <input
        style={{
          border: "2px solid #000",
          color: "#000",
          width: 300,
          fontSize: 20,
          padding: 20,
          borderRadius: 100,
        }}
        onKeyPress={handleKeypress}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      {loginError !== "" && (
        <p style={{ margin: 0, color: "red" }}>{loginError}</p>
      )}

      <div
        style={{
          marginTop: 30,
          borderRadius: 100,
          width: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fee4c5",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => {
          if (!isLoading) onLogin();
        }}
      >
        <p>{isLoading ? "loading..." : "Log in"}</p>
      </div>
    </div>
  );
};

export default Login;
