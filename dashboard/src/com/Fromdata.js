import React, { useState } from 'react';
import {  Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const dropdownData = [
    { id: 'admin', label: 'Admin', items: [{ label: 'Add Admin', path: '/admin/admin-add' },{ label: 'View Admin', path: '/admin/View-admin' } ] },
    { id: 'branch', label: 'Branch', items: [{ label: 'Add Branch', path: '/branch/addBranch' },{ label: 'View Branch', path: '/branch/View-branch' } ] },
    { id: 'course', label: 'Course', items: [{ label: 'Add Course', path: '/course/addCourse' },{ label: 'View Course', path: '/course/View-course' }] },
    { id: 'role', label: 'Role', items:  [{ label: 'Add Role', path: '/role/addRole' },{ label: 'View Role', path: '/role/View-Role' } ] },
    { id: 'status', label: 'Status', items: [{ label: 'Add Status', path: '/status/addStatus' },{ label: 'View Status', path: '/status/View-status' } ] },
    { id: 'reference', label: 'Reference', items:  [{ label: 'Add Reference', path: '/reference/addReference' },{ label: 'View Reference', path: '/reference/View-reference' } ] },
    { id: 'inquiry', label: 'Inquiry', items: [{ label: 'Add Inquiry', path: '/inquiry/addInquiry' },{ label: 'View Inquiry', path: '/inquiry/View-inquiry' } ,{label:'Verify Inquiry',path:'/inquiry/verify'}] },
    { id: 'followup', label: 'Followup', items: [{ label: 'Add Followup', path: '/followup/addfollowup' },{ label: 'View Followup', path: '/followup/View-followup' } ] },
];

function Fromdate() {
    const [dropdownOpen, setDropdownOpen] = useState(dropdownData.map(() => false));

    const toggleDropdown = (index) => {
        setDropdownOpen(prevState => 
            prevState.map((isOpen, i) => i === index ? !isOpen : isOpen)
        );
    };

    return (
        <>
                    <div xl={2} lg={3} md={4} className="bg-black text-white text-opacity-50 border-top border-secondary">
                        <div>
                            <h5 className="py-4 px-2 mb-0">Admin name</h5>
                        </div>
                        {dropdownData.map((dropdown, index) => (
                            <Dropdown key={dropdown.id} className="my-3" show={dropdownOpen[index]} onToggle={() => toggleDropdown(index)}>
                                <Dropdown.Toggle className="bg-black border-0" id={`dropdown-${dropdown.id}`} aria-label={dropdown.label}>
                                    {dropdown.label}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                {dropdown.items.map((item, itemIndex) => (
                                        typeof item === 'string' ? (
                                            <Dropdown.Item key={itemIndex} href={`#/${dropdown.id}-${itemIndex}`} className="text-white ps-5">
                                                <p className="mb-0">{item}</p>
                                            </Dropdown.Item>
                                        ) : (
                                            <Dropdown.Item key={itemIndex} as={Link} to={item.path} className="text-white ps-5">
                                                <p className="mb-0">{item.label}</p>
                                            </Dropdown.Item>
                                        )
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        ))}
            </div>
        </>
    );
}

export default Fromdate;
