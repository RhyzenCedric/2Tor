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

function App() {
  return (
    <>
      <ToastContainer className={'toast-position'} position='bottom-right'/>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<RoleSelection/>}/>


          <Route path="/registerUser" element={<RegisterUser/>}/>
          <Route path="/loginUser" element={<LoginUser/>}/>
          <Route path="/MainUserMenu" element={<MainUserMenu/>}/>
          <Route path="/UserProfile" element={<UserProfile/>}/>

          <Route path="/registerEducator" element={<RegisterEducator/>}/>
          <Route path="/loginEducator" element={<LoginEducator/>}/>
          <Route path="/MainEducatorMenu" element={<MainEducatorMenu/>}/>
          <Route path="/EducatorProfile" element={<EducatorProfile/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
