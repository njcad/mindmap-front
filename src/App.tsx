// import { useState } from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ColorModeButton } from "./components/ui/color-mode";
import { JoinSession } from "./pages/JoinSession";
import { StartSession } from "./pages/StartSession";
import { TeacherSession } from "./pages/TeacherSession";
import { StudentSession } from "./pages/StudentSession";

export const App = () => {
  return (
    <BrowserRouter>
      <Box maxH="100vh" w="100vw">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join-session" element={<JoinSession />} />
          <Route path="/start-session" element={<StartSession />} />
          <Route
            path="/session/:sessionId/teacher"
            element={<TeacherSession />}
          />
          <Route
            path="/session/:sessionId/student"
            element={<StudentSession />}
          />
        </Routes>
        <ColorModeButton position="fixed" top="10" right="10" p="4" />
        
      </Box>
    </BrowserRouter>
  );
};
