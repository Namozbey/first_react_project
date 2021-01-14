import List from "@material-ui/core/List";
import React from "react";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import {observer} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import {useStyles} from "../style";
import {Pagination} from "./Pagination";
import ListItemText from "@material-ui/core/ListItemText";
import {globalState} from "../globalSatate";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export const Main = observer(() => {
    const classes = useStyles()
    const {companies} = globalState;

    return (
        <>
            {companies.length
                ? <div className={classes.main}>
                    {companies.map(company => (
                    <Link to={{pathname: '/info', state: `${company.id}`}} className={classes.link} key={company.id}>
                        <List className={classes.list}>
                            <ListItem alignItems="flex-start" button>
                                <ListItemAvatar>
                                    <Avatar>{company.name.slice(0,2).toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={company.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Click to see informatsions
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <ChevronRightIcon />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    </Link>
                    ))}
                    <Pagination />
                </div>
                : <LinearProgress />
            }
        </>
    )
})