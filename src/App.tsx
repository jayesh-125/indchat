import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserChatPage from "./pages/UserChatPage";
import SignUp from "./pages/SIgnUp";

import { route } from "./constant/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.login} element={<LoginPage />} />
        <Route path={route.sign_up} element={<SignUp />} />
        <Route path={route.profile} element={<UserProfilePage />} />
        <Route path={route.chat} element={<UserChatPage />} />
        <Route path={`${route.chat}/:id`} element={<UserChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
