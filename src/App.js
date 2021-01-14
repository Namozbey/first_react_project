import './App.css';
import {Navbar} from "./components/Navbar";
import { Main } from "./components/Main";
import {ComInfo} from "./components/ComInfo";
import {observer} from "mobx-react";
import React, {useEffect} from 'react';
import {getInforms, globalState} from "./globalSatate";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';


export const App = observer(() => {
    useEffect(() => {
        globalState.next_page = [''];
        getInforms();
    }, [])

    return (
        <Router className='App'>
            <Navbar />
            <Switch>
                <Route path='/' exact>
                    <Main />
                </Route>
                <Route path='/info'>
                    <ComInfo />
                </Route>
            </Switch>
        </Router>
    );
})
