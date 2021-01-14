import Card from '@material-ui/core/Card';
import {key} from "../globalSatate";
import Button from "@material-ui/core/Button";
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import {observer} from "mobx-react";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from "@material-ui/core/LinearProgress";
import {useLocation, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '50%',
        marginLeft: '25%',
        marginTop: '1vw',
        padding: '1vw',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    space: {
        display: 'block',
        padding: '1vw',
    },
    span: {
        marginRight: '1vw',
    },
    pb: {
        paddingBottom: 0,
    },
    pt: {
        paddingTop: 0,
    },
}));

export const ComInfo = observer(() => {
    const classes = useStyles();
    const [comInfo, setcomInfo] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const {goBack} = useHistory();
    const {state} = useLocation();
    const lookup_api = `https://api-v2.intrinio.com/companies/${state}?api_key=${key}`;

    useEffect(() => {
        fetch(lookup_api)
            .then(res => res.json())
            .then(companyInfo => setcomInfo([companyInfo]))
            .catch(err => console.log(err))
    }, [state])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            {comInfo.length
                ? <Card className={classes.root}>
                    <CardContent className={classes.pb}>
                        <Typography variant="h3">
                            {comInfo[0].name}
                        </Typography>
                        <Typography className={classes.span} variant="caption" >{comInfo[0].ticker}</Typography>
                        <Typography className={classes.span} variant="caption" >{comInfo[0].business_phone_no}</Typography>
                        <Typography className={classes.span} variant="caption" >
                            <a href={`https://${comInfo[0].company_url}`} target='_blank'>{comInfo[0].company_url}</a>
                        </Typography>
                        <div className={classes.space} />
                        <Typography variant="h6" >CEO: {comInfo[0].ceo}</Typography>
                        <Typography variant="h6" >Industry: {comInfo[0].industry_group}</Typography>
                        <Typography variant="h6" >Address: {comInfo[0].business_address}</Typography>
                        <div className={classes.space} />
                        {!expanded
                        && <>
                            <Typography variant='h6'>Description:</Typography>
                            <Typography variant="body1" >{comInfo[0].short_description}</Typography>
                        </>
                        }
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent className={classes.pt}>
                            <Typography variant='h6'>Description more:</Typography>
                            <Typography paragraph>{comInfo[0].long_description}</Typography>
                            <div className={classes.space} />
                            <Typography paragraph>Employees: {comInfo[0].employees}</Typography>
                        </CardContent>
                    </Collapse>
                    <CardActions disableSpacing>
                        <Button variant='contained' onClick={goBack}>Back</Button>
                        <IconButton
                            className={`${classes.expand} ${expanded && classes.expandOpen}`}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
                : <LinearProgress />
            }
        </>
    );
})
