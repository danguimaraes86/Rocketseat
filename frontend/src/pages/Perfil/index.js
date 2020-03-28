import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Perfil () {

    let history = useHistory();

    let [casos, setCasos] = useState([]);

    let ongNome = localStorage.getItem('ong_name');
    let ongID = localStorage.getItem('ong_id');

    useEffect(() => {
        api.get('/perfil', {
            headers: {
                Authorization: ongID,
            },
        }).then(response => {
            setCasos(response.data);
        })
    }, [ongID]);

    async function deletarCaso(id) {

        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: ongID
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));

        } catch (error) {
            alert('Erro ao deletar caso. Tente novamente.')
        }
    };

    function logout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="perfil-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongNome}!</span>

                <Link className="button" to="/casos/cadastro"> Cadastrar novo caso</Link>
                <button type="button" onClick={logout} >
                    <FiPower size={18} color="e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>Caso:</strong>
                        <p>{caso.titulo}</p>
                        
                        <strong>Descrição:</strong>
                        <p>{caso.descricao}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</p>

                        <button onClick={() => deletarCaso(caso.id)}>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}