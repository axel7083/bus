import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

interface NavItems {
    name: string,
    url: string,
}

const Header = () => {

    // All the navItems and the url they are linked to.
    const navItems: NavItems[] = [
        {name: "Map", url: "/map"},
        { name: "Statisctic on a line", url: "/stats" },
        { name: "Dashboard", url: "/dashboard" },
    ]

    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>Bus</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {navItems.map((navItem, index) => {
                    return (
                        <LinkContainer key={index} to={navItem.url}>
                            <Nav.Link>{navItem.name}</Nav.Link>
                        </LinkContainer>
                    )
                })}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;