import { useState } from "react";
import OllamaApi from "../../services/OllamaApi";
import style from './DuvidasIA.module.css';
import { TopBarEntrar } from "../../componentes/TopBarEntrar/TopBarEntrar";
import { TopBarLogin } from "../../componentes/pai/pai";
import { TopBarIA } from "../../componentes/TopBarIA/TopBarIA";

export default function ChatIA() {
    const [mensagem, setMensagem] = useState("");

    const [carregando, setCarregando] = useState(false);

    const [historico, setHistorico] = useState([]);

    async function enviarMensagem() {
        if (!mensagem.trim()) return;


        const novaMensagem = { tipo: "usuario", texto: mensagem };
        setHistorico((previsaohistorico) => [...previsaohistorico, novaMensagem]);

        setCarregando(true);

        try {
            const respostaApi = await OllamaApi.Ollama(mensagem);
            const respostaIA = { tipo: 'ia', texto: respostaApi.response };


            setHistorico((previsaohistorico) => [...previsaohistorico, respostaIA])
        } catch (erro) {
            console.error("Erro ao obter resposta:", erro);
            const respostaErro = { tipo: "ia", texto: "Erro ao obter resposta da IA." };
            setHistorico((prevHistorico) => [...prevHistorico, respostaErro]);
        } finally {
            setCarregando(false);
        }
    }

    return (



        <TopBarIA>
            <div className={style.Corpo_fora}>




                <div className={style.chatContainer}>
                    <h1 className={style.chatTitle}>DuvidasIA</h1>

                    <div className={style.chatHistory}>
                        {historico.map((msg, index) => (
                            <div
                                key={index}
                                className={msg.tipo === "usuario" ? style.usuarioMensagem : style.iaMensagem}
                            >
                                <p>{msg.texto}</p>
                            </div>
                        ))}
                        {carregando && (
                            <div className={style.carregando}>
                                <p>Carregando...</p>
                            </div>
                        )}
                    </div>
                    <div className={style.chatInputContainer}>
                        <input
                            type="text"
                            className={style.chatInput}
                            placeholder="Digite sua pergunta..."
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                        />
                        <button
                            className={style.chatButton}
                            onClick={enviarMensagem}
                            disabled={carregando}
                        >
                            Enviar
                        </button>
                    </div>

                </div>
            </div>
        </TopBarIA>
    );
}
