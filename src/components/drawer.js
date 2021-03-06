import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpIcon from '@material-ui/icons/Help';
import { withRouter } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PublicIcon from '@material-ui/icons/Public';
import { connect } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import { setHeaderSearch } from '../actions/index'
import Datepicker from './Datepicker'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function PersistentDrawerRight(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("")
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleSearch = (e) => {
    props.setHeaderSearch(e.target.value)
    setSearch(e.target.value)
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
const makeIcons=(text)=>{
 if(text=="All")
 return <PublicIcon/>
 else if(text==="India")
 return <HomeIcon/>
 else if(text==="Resources")
 return <HelpIcon/>
 else if(text==="Timeline")
 return <TimelineIcon/>
}
const searchMenuVisible=["/","/All","/India"]
const hideTitle=["/Timeline"]
  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <div className={classes.root} >
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>{props.history.location.key &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => props.history.goBack()}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <ArrowBackIcon />
            </IconButton>}

            {!hideTitle.includes(props.history.location.pathname) ?
              <Typography variant="h6" noWrap className={classes.title} style={{ textAlignLast: "center" }}>
              COVID 19 Updates
          </Typography>:
              <Typography variant="h6" noWrap className={classes.title} style={{ textAlignLast: "center" ,color:'white'}}>
              <Datepicker/>
          </Typography>
          }

         {searchMenuVisible.includes(props.history.location.pathname)  && <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
                value={props.search}
              />
            </div>}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['All', 'India','Timeline','Resources'].map((text, index) => (
              <ListItem button key={text} onClick={() => {
                props.history.push(`/${text}`)
                handleDrawerClose()
                props.setHeaderSearch("")
                setSearch("")
              }}>
                <ListItemIcon>{makeIcons(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </ClickAwayListener>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setHeaderSearch: (data) => dispatch(setHeaderSearch(data))
});
function mapStateToProps(state) {
  return {
    search: state.rootReducer.searchField,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PersistentDrawerRight))