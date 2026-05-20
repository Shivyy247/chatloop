import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { lazy, Suspense, useEffect, useState } from "react";
import { LayoutLoader } from "./components/layout/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./utils/socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Admin = lazy(() => import("./pages/admin/Admin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserMang = lazy(() => import("./pages/admin/UserMang"));
const ChatManag = lazy(() => import("./pages/admin/ChatManag"));
const MessageMang = lazy(() => import("./pages/admin/MessageMang"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute
                  user={user}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              </SocketProvider>
            }
          >
            <Route
              path="/"
              element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
            />

            <Route
              path="/group"
              element={<Group darkMode={darkMode} setDarkMode={setDarkMode} />}
            />

            <Route
              path="/chat/:chatId"
              element={<Chat darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
          </Route>

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserMang />} />
          <Route path="/admin/chats" element={<ChatManag />} />
          <Route path="/admin/message" element={<MessageMang />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
