import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/CadastroONG';
import Perfil from './pages/Perfil';
import NovoCaso from './pages/CadastroNovoCaso';


export default function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/cadastro' component={Cadastro} />
                <Route path='/perfil' component={Perfil} />
                <Route path='/casos/cadastro' component={NovoCaso} />

            </Switch>
        </BrowserRouter>
    )
}