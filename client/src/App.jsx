import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Group from "./pages/Group";
import NotFound from "./pages/NotFound";

let user = true;


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/group" element={<Group />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Route>

        <Route
          path="/login"
          element={
            <ProtectRoute user={!user} redirect="/">
              <Login />
            </ProtectRoute>
          }
        />

        <Route path="*" element={<NotFound />}></Route>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
