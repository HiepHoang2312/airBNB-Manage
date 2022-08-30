import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "Pages/Login/Login";
import AdminTemplate from "Templates/AdminTemplate";
import UserList from "Components/User/UserList";
import LocationList from "Components/Location/LocationList";
import RoomList from "Components/Room/RoomList";
import AddUser from "Components/AddUser/AddUser";
import ProtectedRoute from "Routes/ProtectedRoute";
import AddLocation from "Components/AddLocation/AddLocation";

import UserInfo from "Components/UserInfo/UserInfo";
import LocationInfo from "Components/LocationInfo/LocationInfo";
import RoomInfo from "Components/RoomInfo/RoomInfo";

function App() {
  return (
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
          <Route path="User" element={<UserList />}></Route>
          <Route path="User/UserInfo/:UserId" element={<UserInfo />}></Route>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
