import { useEffect, useState } from "react";
import style from "./Entrar.module.css";
import { Link, useNavigate } from "react-router-dom";
import UsuarioApi from "../../services/UsuarioApi";

import Button from 'react-bootstrap/Button';


import './Entrar.module.css';
import { TopBarLogin } from "../../componentes/pai/pai";
import { Footer } from "../../componentes/Footer/Footer";


export function Entrar() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            console.error("Por favor, preencha ambos os campos.");
            return;
        }

        try {
            const response = await UsuarioApi.validarLogin(email, senha);
            if (response.success) {
                localStorage.setItem("usuarioId", response.usuarioId);
                console.log("Login bem-sucedido!");
                navigate("/");
            } else {
                console.error(response.message || "Erro ao tentar fazer login.");
            }
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            alert("Senha incorreta");
        }
    };


    

    return (
        <TopBarLogin>
            <div className={style.corpo}>
                <div className={style.corpo2}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.Email_login}>
                            <input
                                className={style.Email}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                required
                            />
                            <input
                                className={style.Email}
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>
                        <div className={style.Entrar_button}>
                        <Button type="submit" variant="outline-light">Entrar</Button>
                          
                        </div>
                    </form>
                    <div className={style.Esquci_senha}>
                        <Link className={style.Senha} to="/senha">
                            Esqueceu a senha?
                        </Link>
                        <Link className={style.criarConta} to="/conta">
                            Criar uma conta
                        </Link>
                    </div>
                </div>
            </div>        
            <Footer/>
        </TopBarLogin >
        
    );
}
