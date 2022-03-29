import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import history from "./history";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";

function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    setLogin(localStorage.getItem("isLogin"));
  }, []);

  return (
    <BrowserRouter history={history}>
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Navigate replace to="/feedback" />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/login" />} />
        )}

        {isLogin && (
          <Route path="/login" element={<Navigate replace to="/feedback" />} />
        )}

        {!isLogin && (
          <Route path="/feedback" element={<Navigate replace to="/login" />} />
        )}

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
