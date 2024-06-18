import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './com/Home';
import AddAdmin from './com/AddAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewAdmin from './com/ViewAdmin';
import AddBranch from './com/Branch';
import AddRole from './com/Role';
import Login from './com/Login';
import ViewBranch from './com/ViewBranch';
import Updatebranch from './com/UpdateBranch';
import AddCourse from './com/Course';
import ViewCourse from './com/ViewCourse';
import Updatecourse from './com/UpdateCourse';
import ViewRole from './com/ViewRole';
import Updaterole from './com/UpdateRole';
import AddStatus from './com/Status';
import ViewStatus from './com/ViewStatus';
import AddReference from './com/Reference';
import ViewReference from './com/ViewReference';
import UpdateReference from './com/UpdateReference';
import Updatestatus from './com/UpdateStatus';
import AddInquiry from './com/Inquiry';
import ViewInquiry from './com/ViewInquiry';
import AddFollowup from './com/Followup';
import VerifyInquiry from './com/VerifyInquiry';
import ViewFollowup from './com/ViewFollowup';
import UpdateFollowup from './com/UpdateFollowup';
import UpdateInquiry from './com/UpdateInquiry';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Dashboard' element={<Home/>} exact></Route>
        <Route path="/admin/admin-add" element={<AddAdmin />} />
        <Route path="/admin/View-admin" element={<ViewAdmin />} />
        <Route path="/branch/addBranch" element={<AddBranch />} />
        <Route path="/branch/View-branch" element={<ViewBranch />} />
        <Route path="/branch/Updatebranch/:id" element={<Updatebranch />} />
        <Route path="/course/addCourse" element={<AddCourse />} />
        <Route path="/course/View-course" element={<ViewCourse />} />
        <Route path="/course/Updatecourse/:id" element={<Updatecourse />} />
        <Route path="/role/addRole" element={<AddRole />}></Route>
        <Route path="/role/View-role" element={<ViewRole />} />
        <Route path="/role/Updaterole/:id" element={<Updaterole />} />
        <Route path="/status/addstatus" element={<AddStatus />} />
        <Route path="/status/View-status" element={<ViewStatus />} />
        <Route path="/status/Updatestatus/:id" element={<Updatestatus />} />

        <Route path="/reference/addreference" element={<AddReference />} />
        <Route path="/reference/View-reference" element={<ViewReference />} />
        <Route path="/reference/Updatereference/:id" element={<UpdateReference />} />

        <Route path="/inquiry/addinquiry" element={<AddInquiry />} />
        <Route path="/inquiry/View-inquiry" element={<ViewInquiry />} />
        <Route path='/inquiry/verify' element={<VerifyInquiry />} />
        <Route path="/inquiry/Updateinquiry/:id" element={<UpdateInquiry />} />


        <Route path="/followup/addfollowup" element={<AddFollowup />} />
        <Route path="/followup/View-followup" element={<ViewFollowup />} />
        <Route path="/followup/Updatefollowup/:id" element={<UpdateFollowup />} />



      </Routes>
    </div>
  );
}

export default App;
