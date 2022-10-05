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
import { Outlet } from "react-router-dom";
import '../styles/MenuBar.css';
import logo from '../img/logo.png';

  export default function MenuBar(){
    const [isOpen, setOpen] = React.useState(false)
    return(
      <>
       <div className='sticky'>
        <Navbar light expand="md">
          <NavbarBrand href="/"><img src={logo} className="top-logo" alt="logo" /></NavbarBrand>
          <NavbarToggler onClick={()=>{setOpen(!isOpen)}} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Employment</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Resources
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    Food
                  </DropdownItem>
                  <DropdownItem>
                    Clothing
                  </DropdownItem>
                  <DropdownItem>
                    Shelter
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Video Tutorials
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