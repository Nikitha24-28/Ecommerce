import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Role-based navigation links
const pages = {
    user: [
        { text: "Explore", link: "/Explore" },
        { text: "Products", link: "/Products" },
        { text: "Cart", link: "/Cart" }
    ],
    admin: [
        { text: "Dashboard", link: "/AdminDashboard" },
        { text: "Add Products", link: "/AddProducts" },
        { text: "Order Summary", link: "/OrderSummary" }
    ]
};

const settings = ['Profile',"Logout"];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("role");
        window.location.href = "/Explore"; // Redirect to Explore after logout
    };

    // Get user role and assign navigation links accordingly
    const role = localStorage.getItem("role") || "user"; // Default to 'user' if no role is found
    const navLinks = pages[role] || [];

    const handleProfile = () => {
        if(role==='user'){
            window.location.href = "/UserProfile"; 
        }
        else{
            window.location.href = "/AdminProfile";
        }
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: 'fantasy',
                            fontWeight: 500,
                            letterSpacing: ".25rem",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        Minimalist
                    </Typography>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } ,fontFamily: 'fantasy'}}
                        >
                            {navLinks.map((page) => (
                                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                                    <Link to={page.link} style={{ textDecoration: "none", color: "black" }}>
                                        <Typography>{page.text}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        Minimalist
                    </Typography>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {navLinks.map((page) => (
                            <Button 
                                key={page.link}
                                component={Link}
                                to={page.link}
                                sx={{ my: 2, color: "black", display: "block",marginLeft:"50px",fontWeight:600 ,fontSize:17,}}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>

                    {/* User Profile Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => {
                                if (setting === "Logout") {
                                    return (
                                        <MenuItem key={setting} onClick={handleLogout}>
                                            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                                        </MenuItem>
                                    );
                                } else if (setting === "Profile") {
                                    return (
                                        <MenuItem key={setting} onClick={handleProfile}>
                                            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                                        </MenuItem>
                                    );
                                } else {
                                    return (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                                        </MenuItem>
                                    );
                                }
                            })}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;