import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";

import Main from "./page/Main";
import Detail from "./page/Detail";
import MyPokemon from "./page/MyPokemon";

import {
    useLocation
  } from "react-router-dom";
  
const Routes = () => {
    const location = useLocation();
    return (
        <Switch location={location}>
            <Route exact path="/" component={Main} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/mypokemon" component={MyPokemon} />
        </Switch>
    );
}

export default Routes;