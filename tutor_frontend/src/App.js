import logo from './logo.svg';
import './App.css';
import {ToastContainer} from 'react-toastify';
import RegisterUser from './Component/User/RegisterUser/RegisterUser';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginUser from './Component/User/LoginUser/LoginUser';
import MainUserMenu from './Component/User/MainUserMenu/MainUserMenu';
import RegisterEducator from './Component/Educator/RegisterEducator/RegisterEducator';
import LoginEducator from './Component/Educator/LoginEducator/LoginEducator';
import MainEducatorMenu from './Component/Educator/MainEducatorMenu/MainEducatorMenu';
import UserProfile from './Component/User/UserProfile/UserProfile';
import RoleSelection from './Component/RoleSelection';
import EducatorProfile from './Component/Educator/EducatorProfile/EducatorProfile';
import EditUserProfile from './Component/User/UserProfile/EditUserProfile';
import EditEducatorProfile from './Component/Educator/EducatorProfile/EditEducatorProfile';
import TableSelection from './Component/Hidden/TableSelection';
import UsersTable from './Component/Hidden/UsersTable/UsersTable';
import EducatorsTable from './Component/Hidden/EducatorsTable/EducatorsTable';
import AddUsers from './Component/Hidden/UsersTable/AddUsers';
import UpdateUser from './Component/Hidden/UsersTable/UpdateUser';
import UpdateEducator from './Component/Hidden/EducatorsTable/UpdateEducator';
import AddEducators from './Component/Hidden/EducatorsTable/AddEducators';

function App() {
  return (
    <>
      <ToastContainer className={'toast-position'} position='bottom-right'/>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<RoleSelection/>}/>

          <Route path="/TableSelection" element={<TableSelection/>}/>
          <Route path="/UsersTable" element={<UsersTable/>}/>
          <Route path="/EducatorsTable" element={<EducatorsTable/>}/>
          <Route path="/AddUsers" element={<AddUsers/>}/>
          <Route path="/UpdateUser/:username" element={<UpdateUser/>}/>
          <Route path="/AddEducators" element={<AddEducators/>}/>
          <Route path="/UpdateEducator/:username" element={<UpdateEducator/>}/>

          <Route path="/registerUser" element={<RegisterUser/>}/>
          <Route path="/loginUser" element={<LoginUser/>}/>
          <Route path="/MainUserMenu" element={<MainUserMenu/>}/>
          <Route path="/UserProfile" element={<UserProfile/>}/>
          <Route path="/EditUserProfile/:username" element={<EditUserProfile/>}/>

          <Route path="/registerEducator" element={<RegisterEducator/>}/>
          <Route path="/loginEducator" element={<LoginEducator/>}/>
          <Route path="/MainEducatorMenu" element={<MainEducatorMenu/>}/>
          <Route path="/EducatorProfile" element={<EducatorProfile/>}/>
          <Route path="/EditEducatorProfile/:username" element={<EditEducatorProfile/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
