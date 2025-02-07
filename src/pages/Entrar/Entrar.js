import { useEffect, useState } from "react";
import style from "./Entrar.module.css";
import { Link, useNavigate } from "react-router-dom";
import UsuarioApi from "../../services/UsuarioApi";

import Button from 'react-bootstrap/Button';


import './Entrar.module.css';
import { TopBarLogin } from "../../componentes/pai/pai";
import { Footer } from "../../componentes/Footer/Footer";
import Alerta from "../../componentes/Alerta/Alerta";


export function Entrar() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();


    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');


    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 60000);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            setTipoAlerta('danger')
            setMensagemAlerta('Senha ou e-mail incorretos. Tente novamente.')
            exibirAlerta()
            return;
        }

        try {
            const response = await UsuarioApi.validarLogin(email, senha);
            if (response.success) {
                localStorage.setItem("tipoUsuario", response.tipoUsuario);
                localStorage.setItem("idUsuario", response.usuarioId);

                setTipoAlerta('success')
                setMensagemAlerta('Login bem-sucedido!')
                exibirAlerta()

              
                
                navigate("/");
            } else {
                console.error(response.message || "Erro ao tentar fazer login.");

            }
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);

            setTipoAlerta('danger')
            setMensagemAlerta('Senha ou e-mail incorretos. Tente novamente.')
            exibirAlerta()
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

                        <div className={style.Esquci_senha}>
                            <Link className={style.Senha} to="/senha">
                                Esqueceu a senha?
                            </Link>
                            <Link className={style.criarConta} to="/conta">
                                Criar uma conta
                            </Link>
                        </div>
                    </form>

                </div>
                <div className={style.Alerta_inferior}>

                    <Alerta className={style.erro}
                        tipo={tipoAlerta}
                        mensagem={mensagemAlerta}
                        visivel={mostrarAlerta}
                        aoFechar={() => setMostrarAlerta(false)}


                    />
                </div>

            </div>


        </TopBarLogin >

    );
}
