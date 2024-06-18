import React, { useState } from 'react';
import { Col, Container, Row, Dropdown } from 'react-bootstrap';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddAdmin from './AddAdmin';
import Fromdata from './Fromdata';
import ViewAdmin from './ViewAdmin';
import AddBranch from './Branch';
import AddRole from './Role';
import AddCourse from './Course';
import Login from './Login';
import ViewBranch from './ViewBranch';
import ViewCourse from './ViewCourse';
import AddStatus from './Status';
import ViewStatus from './ViewStatus';
import ViewReference from './ViewReference';
import AddReference from './Reference';
import ViewRole from './ViewRole';
import AddInquiry from './Inquiry';
import AddFollowup from './Followup';
import VerifyInquiry from './VerifyInquiry';
import ViewFollowup from './ViewFollowup';



function Main() {
    return (
        <>
            <Container fluid className="ps-0">
                <Row className="gx-0">
                    <Col xl={2} lg={3} md={4} className="bg-black text-white height text-opacity-50 border-top border-secondary">
                        
                        <Fromdata></Fromdata>
                    </Col>
                    <Col>
                        <Routes>
                            <Route path="admin-add" element={<AddAdmin />} />
                            <Route path="View-admin" element={<ViewAdmin />} />
                            
                            <Route path="addBranch" element={<AddBranch />} />
                            <Route path="View-branch" element={<ViewBranch />} />

                            <Route path="addRole" element={<AddRole/>} />
                            <Route path="View-role" element={<ViewRole />} />

                            <Route path="addCourse" element={<AddCourse/>} />
                            <Route path="View-course" element={<ViewCourse />} />

                            <Route path="addStatus" element={<AddStatus />} />
                            <Route path="View-status" element={<ViewStatus />} />

                           <Route path="addreference" element={<AddReference />} />
                            <Route path="View-reference" element={<ViewReference />} />

                            <Route path="addinquiry" element={<AddInquiry />} />
                            <Route path="View-reference" element={<ViewReference />} />
                            <Route path="Verify" element={<VerifyInquiry />} />

                            <Route path="addfollowup" element={<AddFollowup />} />
                            <Route path="View-followup" element={<ViewFollowup />} />


                        </Routes>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Main;
