import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

export default function Perfil () {

    let ongId = localStorage.getItem('ong_id')

    let [titulo, setTitulo] = useState('');
    let [descricao, setDescricao] = useState('');
    let [valor, setValor] = useState('');

    let history = useHistory();

    async function cadastroNovoCaso(e) {
        e.preventDefault();

        let cadastroCaso = {
            titulo,
            descricao,
            valor,
        };
        
        try {
            await api.post('casos', cadastroCaso, {headers: {authorization: ongId}});
            alert(`Caso criado com sucesso`);
            history.push('/perfil');
        } catch (error) {
            alert("Erro ao cadastrar novo caso. Por favor, tente novamente.");
        }
    };

    return (
        <div className="novo-caso-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva detalhadamente o seu caso para encontrar um herói para ajudar.</p>

                <Link className="back-link" to="/perfil">
                    <FiArrowLeft size={16} color="e02041" />
                    Voltar para a página de perfil
                </Link>
            </section>

            <form onSubmit={cadastroNovoCaso}>
                <input type="text" placeholder="Título do caso" value={titulo} onChange={e => setTitulo(e.target.value)} />
                <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                <input type="text" placeholder="Valor em R$" value={valor} onChange={e => setValor(e.target.value)} />
                
                <button className="button" type="submit">Cadastrar</button>

            </form>
        </div>
    </div>
       
    )
}