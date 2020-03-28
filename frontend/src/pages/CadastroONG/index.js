import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'

export default function Cadastro() {

    let [nome, setNome] = useState('');
    let [email, setEmail] = useState('');
    let [whatsapp, setWhatsapp] = useState('');
    let [cidade, setCidade] = useState('');
    let [uf, setUf] = useState('');

    let historico = useHistory();

    async function registroONG(e) {
        e.preventDefault();

        let cadastroONG = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };
        
        try {
            let response = await api.post('ongs', cadastroONG);
            alert(`Seu ID de acesso: ${response.data.id}`);
            historico.push('/');
        } catch (error) {
            alert("Erro no cadastro. Por favor, tente novamente.");
        }
    };

    return (
        <div className="cadastro-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="e02041" />
                        Voltar para a página inicial
                    </Link>
                </section>

                <form onSubmit={registroONG} >
                    <input type="text" placeholder="Nome da ONG" value={nome} onChange={e => setNome(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    <div className="form-group">
                        <input type="text" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                        <input type="text" placeholder="UF" style={{ width: 80}} value={uf} onChange={e => setUf(e.target.value)} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}