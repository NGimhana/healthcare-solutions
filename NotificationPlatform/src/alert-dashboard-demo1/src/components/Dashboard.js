import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',


    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        backgroundColor: '#e96c15'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,

    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',

    },
    chartContainer: {
        marginLeft: 5,
        marginTop: 20,
        width: "80%",
        height: "30%",
        backgroundColor: "#ffffff"

    },
    tableContainer: {
        height: 320,
    },
    doughnutChartContainer: {
        width: 470,
        height: 470,

    },


});



class Dashboard extends React.Component {

    state = {
        open: true,
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;


        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>

                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap className={classes.title}>
                                WSO2 Healthcare Alert Dashboard
                            </Typography>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer

                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}><img
                            src="https://upload.wikimedia.org/wikipedia/en/5/56/WSO2_Software_Logo.png"
                            alt="WSO2"></img>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>


                       <List>
                           <ListItem button component={Link} to={"/"}>
                               <ListItemIcon>
                                   <DashboardIcon/>
                               </ListItemIcon>
                               <ListItemText primary="Home"/>
                           </ListItem>

                           <ListItem button component={Link} to={"/patients"}>
                               <ListItemIcon>
                                   <DashboardIcon/>
                               </ListItemIcon>
                               <ListItemText primary="Patients"/>
                           </ListItem>

                           <ListItem button component={Link} to={"/addpatient"}>
                               <ListItemIcon>
                                   <DashboardIcon/>
                               </ListItemIcon>
                               <ListItemText primary="Add Patient"/>
                           </ListItem>
                       </List>

                    </Drawer>
                    <main className={classes.content} style={{backgroundColor: "#feffa4"}}>
                        <div className={classes.appBarSpacer}/>
                        <div className={classes.toolbar} />
                        {this.props.children}
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Dashboard);