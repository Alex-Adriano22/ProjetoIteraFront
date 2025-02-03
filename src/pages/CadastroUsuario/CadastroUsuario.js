import { useState } from "react";

import style from "./CadastroUsuario.module.css";
import UsuarioApi from "../../services/UsuarioApi";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { TopBarLogin } from "../../componentes/pai/pai";
import Button from 'react-bootstrap/Button';

export function CadastroUsuario() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setnome] = useState('');

    const navigate = useNavigate();

    const tipoUsuario = 1
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            await UsuarioApi.criarAsync(nome, email, senha, tipoUsuario);
            localStorage.getItem('usuarioNome', nome)
            localStorage.setItem('tipoUsuario', tipoUsuario)
            navigate("/login");

        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const isFormValid = () => {
        return nome && email && senha;
    };
    return (
        <TopBarLogin>

            <div className={style.corpo}>

                <div className={style.corpo2}>

                    <Form onSubmit={handleSubmit}>
                        <div className={style.Email_login}>
                            <input
                                className={style.Email}
                                type="text"
                                value={nome}
                                onChange={(e) => setnome(e.target.value)}
                                placeholder="Digite seu nome"
                                required
                            ></input>
                            <input
                                className={style.Email}
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                required


                            ></input>
                            <input
                                className={style.Email}
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Digite sua senha"
                                required
                            ></input>
                        </div>
                        <div className={style.opa}>
                            <Button type="submit" variant="outline-light">Cadastrar</Button>

                        </div>
                    </Form>
                </div>
            </div>
        </TopBarLogin>
    )
}