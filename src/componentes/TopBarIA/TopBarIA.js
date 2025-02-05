import { useEffect, useState } from 'react';

import style from "./TopBarIA.module.css";

import { Link, useNavigate } from 'react-router-dom';
import UsuarioApi from '../../services/UsuarioApi';



export function TopBarIA({ children }) {
    const [usuario, setUsuario] = useState({});


    const navigate = useNavigate();
    function removerusuario() {
    
        navigate("/login");
    }

    const buscarNomeUsuario = async () => {
        const Id = localStorage.getItem("idUsuario");


        try {
            if (Id) {
                const resposta = await UsuarioApi.obterAsync(Id);
                setUsuario(resposta);
            }
        } catch (error) {
            console.error("Erro ao buscar o nome do usuário:", error);
        }
    };

    useEffect(() => {
        buscarNomeUsuario();
    }, []);

    return (
        <div>
            <div className={style.topo_conteudo}>
                <div className={style.logo}>
                    <Link to='/' className={style.link_botao}>
                        <h1>Pro2 Adesivos</h1>
                    </Link>
                </div>

                <ul className={style.top_bar_intens}>
                   
                    <li className={style.item_topbar}>
                        <Link to="/login" className={style.link}>
                            {usuario.nome}
                        </Link>
                    </li>

                    <li className="item-nav">
                        <Link to="/DuvidasIA" className={style.link}>
                            DuvidasIA
                        </Link>
                    </li>

                </ul>
            </div>

            <div className={style.pagina_conteudo}>
                {children}

            </div>
        </div>
    );
}