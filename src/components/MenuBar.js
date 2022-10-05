import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Outlet, Link, useLocation } from "react-router-dom";
import '../styles/MenuBar.css';
import logo from '../img/logo.png';

export default function MenuBar(){
    const [isOpen, setOpen] = React.useState(false)
    const location = useLocation();
    return(
      <>
       <div className={location.pathname.includes("resources")?"sticky":"fixed"}>
        <Navbar color={location.pathname.includes("resources")?"light":""} light expand="md">
          <Link to="/">
            <NavbarBrand>
              <img src={logo} className="top-logo" alt="logo" />
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={()=>{setOpen(!isOpen)}} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <Link to="/profile" style={{textDecoration: 'none'}}>
                <NavItem>
                  <NavLink>Profile</NavLink>
                </NavItem>
              </Link>
              <Link to="/employment" style={{textDecoration: 'none'}}>
                <NavItem>
                  <NavLink>Employment</NavLink>
                </NavItem>
              </Link>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Resources
                </DropdownToggle>
                <DropdownMenu end>
                  <Link to="/resources/food" style={{textDecoration: 'none'}}>
                    <DropdownItem>
                      Food
                    </DropdownItem>
                  </Link>
                  <Link to="/resources/clothing" style={{textDecoration: 'none'}}>
                    <DropdownItem>
                      Clothing
                    </DropdownItem>
                  </Link>
                  <Link to="/resources/shelter" style={{textDecoration: 'none'}}>
                    <DropdownItem>
                      Shelter
                    </DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem>
                    Video
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      
      <div>
        <Outlet/>
      </div>
      </>
    )
  }