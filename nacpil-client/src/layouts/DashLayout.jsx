import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Chip from '@mui/material/Chip';
import typedLogo from '../assets/images/typed_lightver.png';

const drawerWidth = 240;

const dashboardNavItems = [
    {
        label: 'Dashboard',
        title: 'Dashboard',
        to: '/dashboard',
        icon: DashboardIcon,
    },
    {
        label: 'Reports',
        title: 'Reports',
        to: '/dashboard/reports',
        icon: AssessmentIcon,
    },
    {
        label: 'Articles',
        title: 'Articles',
        to: '/dashboard/articles',
        icon: ArticleIcon,
    },
    {
        label: 'Users',
        title: 'Users',
        to: '/dashboard/users',
        icon: PeopleIcon,
    },
];

const dashboardTheme = createTheme({
    typography: {
        fontFamily: [
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'sans-serif',
        ].join(','),
    },
});

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1.5),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#f5f5f4",
    color: "#18181b",
    boxShadow: "none",
    borderBottom: "2px solid #18181b",
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
        backgroundColor: "#e7e5e4",
        color: "#18181b",
        borderRight: "2px solid #18181b",
    },
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
            ...openedMixin(theme),
            backgroundColor: "#e7e5e4",
            color: "#18181b",
            borderRight: "2px solid #18181b",
        },
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
            ...closedMixin(theme),
            backgroundColor: "#e7e5e4",
            color: "#18181b",
            borderRight: "2px solid #18181b",
        },
    }),
}));

const getPageTitle = (pathname) =>
    dashboardNavItems.find(({ to }) => to === pathname)?.title || 'Welcome';

const DashLayout = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const navigate = useNavigate();
    const currentUserType = localStorage.getItem('type');
    const displayUsername = localStorage.getItem('username') || localStorage.getItem('firstName') || 'User';
    const visibleNavItems = dashboardNavItems.filter(
        ({ to }) => currentUserType === 'admin' || to !== '/dashboard/users'
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        localStorage.removeItem('firstName');
        localStorage.removeItem('username');
        navigate("/");
    };

    return (
        <ThemeProvider theme={dashboardTheme}>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    bgcolor: "#f5f5f4",
                    color: "#18181b",
                    fontFamily: "inherit",
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "fixed",
                        inset: 0,
                        pointerEvents: "none",
                        opacity: 0.18,
                        mixBlendMode: "multiply",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    },
                }}
            >
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ gap: 2 }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={open ? handleDrawerClose : handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 1,
                                borderRadius: "12px",
                                "&:hover": {
                                    bgcolor: alpha("#18181b", 0.06),
                                },
                            }}
                        >
                            {open ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: "0.03em",
                            }}
                        >
                            {pageTitle}
                        </Typography>
                        <Chip
                            label={`${displayUsername} | ${currentUserType || 'guest'}`}
                            sx={{
                                display: { xs: "none", sm: "inline-flex" },
                                height: 36,
                                border: "2px solid #18181b",
                                borderRadius: "999px",
                                backgroundColor: "#fafaf9",
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                            }}
                        />
                        <Box
                            sx={{
                                ml: 1,
                                pl: 3,
                                borderLeft: "2px solid #d6d3d1",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={handleLogout}
                                sx={{
                                    border: "2px solid #18181b",
                                    borderRadius: "999px",
                                    px: 2,
                                    py: 1,
                                    fontSize: "0.625rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.24em",
                                    textTransform: "uppercase",
                                    color: "#fafaf9",
                                    backgroundColor: "#18181b",
                                    "&:hover": {
                                        border: "2px solid #18181b",
                                        backgroundColor: "#3f3f46",
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader
                        sx={{
                            justifyContent: open ? "space-between" : "center",
                            px: open ? 2 : 1,
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: open ? "flex" : "none",
                                alignItems: "center",
                                gap: 1.25,
                                minWidth: 0,
                            }}
                        >
                            <Box
                                component="img"
                                src={typedLogo}
                                alt="Typed"
                                sx={{
                                    width: 60,
                                    height: "auto",
                                    flexShrink: 0,
                                    objectFit: "contain",
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "0.62rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.18em",
                                    lineHeight: 1.2,
                                    color: "#71717a",
                                    textTransform: "uppercase",
                                }}
                            >
                                Admin Panel
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={handleDrawerClose}
                            sx={{
                                borderRadius: "12px",
                                "&:hover": {
                                    bgcolor: alpha("#18181b", 0.06),
                                },
                            }}
                        >
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List sx={{ px: open ? 1.5 : 1, py: 1 }}>
                        {visibleNavItems.map(({ label, to, icon: Icon }) => (
                            <ListItem key={to} disablePadding sx={{ display: "block" }}>
                                <ListItemButton
                                    component={Link}
                                    to={to}
                                    selected={location.pathname === to}
                                    sx={{
                                        minHeight: 48,
                                        px: open ? 2.5 : 1.25,
                                        mb: 1,
                                        border: "2px solid",
                                        borderColor: location.pathname === to ? "#18181b" : "transparent",
                                        borderRadius: "14px",
                                        bgcolor: location.pathname === to ? "#f5f5f4" : "transparent",
                                        justifyContent: open ? "initial" : "center",
                                        "&:hover": {
                                            bgcolor: alpha("#f5f5f4", 0.9),
                                            borderColor: "#18181b",
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                            color: "#18181b",
                                        }}
                                    >
                                        {React.createElement(Icon)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        sx={{
                                            opacity: open ? 1 : 0,
                                            "& .MuiTypography-root": {
                                                fontSize: "0.78rem",
                                                fontWeight: 700,
                                                letterSpacing: "0.16em",
                                                textTransform: "uppercase",
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        minWidth: 0,
                        p: { xs: 2, md: 3 },
                        position: "relative",
                        zIndex: 1,
                        overflowX: "hidden",
                    }}
                >
                    <DrawerHeader />
                    <Box
                        sx={{
                            minHeight: "calc(100vh - 96px)",
                            border: "2px solid #18181b",
                            borderRadius: "28px",
                            backgroundColor: alpha("#fafaf9", 0.92),
                            p: { xs: 2, md: 3 },
                            overflowX: "hidden",
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default DashLayout;
