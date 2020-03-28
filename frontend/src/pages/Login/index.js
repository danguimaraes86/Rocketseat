import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi'

export default function Login () {

    let [id, setId] = useState('');

    let historico = useHistory();

    async function userLogin(e) {
        e.preventDefault();

        try {
            let response = await api.post('login', {id});

            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_name', response.data.nome);

            historico.push('/perfil');
            
        } catch (error) {
            alert('Falha no login. Tente novamente.')
        }
    };

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
                <form onSubmit={userLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Digite sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size={16} color="e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Imagem com heroes"/>
        </div>
    )
}
