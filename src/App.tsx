import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "Pages/Login/Login";
import AdminTemplate from "Templates/AdminTemplate";
import AdminPage from "Pages/Admin/AdminPage";
const UserList = lazy(() => import("Components/User/UserList"));
const LocationList = lazy(() => import("Components/Location/LocationList"));
const RoomList = lazy(() => import("Components/Room/RoomList"));
const AddUser = lazy(() => import("Components/AddUser/AddUser"));
const ProtectedRoute = lazy(() => import("Routes/ProtectedRoute"));
const AddLocation = lazy(() => import("Components/AddLocation/AddLocation"));

const UserInfo = lazy(() => import("Components/UserInfo/UserInfo"));
const LocationInfo = lazy(() => import("Components/LocationInfo/LocationInfo"));
const RoomInfo = lazy(() => import("Components/RoomInfo/RoomInfo"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="loading h-screen">
          <svg viewBox="0 0 50 50">
            <circle className="ring" cx={25} cy={25} r={20} />
            <circle className="ball" cx={25} cy={5} r="3.5" />
          </svg>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />}></Route>
          <Route
            path="Admin"
            element={
              <ProtectedRoute>
                <AdminTemplate />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<AdminPage></AdminPage>}>
              <Route path="User" element={<UserList />}></Route>
              <Route path="" element={<UserList />}></Route>
              <Route
                path="User/UserInfo/:UserId"
                element={<UserInfo />}
              ></Route>
              <Route
                path="Location/LocationInfo/:LocationId"
                element={<LocationInfo />}
              ></Route>
              <Route
                path="Location/LocationInfo/:LocationId/RoomInfo/:RoomId"
                element={<RoomInfo />}
              ></Route>
              <Route
                path="RoomList/RoomInfo/:RoomId"
                element={<RoomInfo />}
              ></Route>
              <Route path="addUser" element={<AddUser />}></Route>

              <Route path="addLocation" element={<AddLocation />}></Route>
              <Route path="Location" element={<LocationList />}></Route>
              <Route path="RoomList" element={<RoomList />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
