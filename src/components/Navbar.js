import './navbar.css'
import {key} from '../globalSatate';
import AppBar from "@material-ui/core/AppBar";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useStyles } from '../style';
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import React, {useEffect, useState} from "react";

export const Navbar = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [results, setResults] = useState([]);
    const search_api = `https://api-v2.intrinio.com/companies/search?query=${value}&api_key=${key}`

    useEffect(()  => {
        fetch(search_api)
            .then(res => res.json())
            .then(({companies}) => setResults(companies))
            .catch(err => console.log(err))
    }, [value])
    
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to='/' className={classes.link}>
                            <IconButton
                                edge="start"
                                className={classes.logoButton}
                                color="inherit"
                                aria-label="open drawer"
                            >
                                <LaptopMacIcon />
                            </IconButton>
                        </Link>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Companies
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                value={value}
                                onChange={e => {setValue(e.target.value)}}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.searchContent}>
                <div className={classes.searchBody}>
                    {results.length
                        ? <>
                            {results.map(result => (
                                <div key={result.id}>
                                    <Link
                                        to={{pathname: '/info', state: `${result.id}`}}
                                        className={classes.link}
                                    >
                                        <Button style={{width: '100%', padding: '1vw'}}>
                                            <h4 style={{margin: 0}}>{result.name}</h4>
                                        </Button>
                                    </Link>
                                    <hr style={{margin: 0}}/>
                                </div>
                            ))}
                        </>
                        : <div>
                            {value.length ? <Loading /> : ''}
                        </div>
                    }
                </div>
            </div>
        </>
    )
};

function Loading() {
    return (
        <div className="loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    )
}