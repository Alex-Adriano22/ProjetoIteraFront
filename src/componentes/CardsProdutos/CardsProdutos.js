import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Black from '../../assets/Black.jpg';
import ProdutosApi from '../../services/ProdutosApi';
import Alerta from '../Alerta/Alerta';
import style from "./CardsProdutos.module.css"

export function CardsProdutos({ carrinho, setCarrinho, pesquisaValor }) {

    const [produtos, setProdutos] = useState([]);


    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');


    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 1000);
    };

    console.log(JSON.parse(localStorage.getItem("Carrinho")));


    async function CarregarProdutos() {
        try {
            const listaProdutos = await ProdutosApi.listarProdutosAsync(true);
            setProdutos(listaProdutos);


        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    function adicionarAoCarrinho(produto) {
        const novosProdutos = [...carrinho, produto];
        setCarrinho(novosProdutos);
        localStorage.setItem("Carrinho", JSON.stringify(novosProdutos));
        setTipoAlerta('success');
        setMensagemAlerta('Adicionado')
        exibirAlerta(true);

    }



    const formatarPreco = (valor) => {

        return parseFloat(valor).toFixed(2);
    };


    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().startsWith(pesquisaValor.toLowerCase())
    );


    useEffect(() => {
        CarregarProdutos();

    }, []);

    return (
        <>
            <div className={style.container_total}>
                <div className={style.container_produtos}>

                    {/* Mapeamos os produtos para criar os cards */}
                    {produtosFiltrados.map((produto) => (
                        <div className="col-md-4 mb-4" key={produto.id}>
                            <Card style={{ width: '20rem' }} className="d-flex flex-column h-100">
                                <Card.Img variant="top" src={Black} />
                                <Card.Body className="p-4 flex-grow-1">
                                    <Card.Title>{produto.nome}</Card.Title>

                                    <Card.Text>{produto.descricao}</Card.Text>
                                    <h5 className="fw-bold text-primary">{formatarPreco(produto.preco)}</h5>
                                    <Button onClick={() => adicionarAoCarrinho(produto)} variant="primary">
                                        Adicionar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}

                </div>
                <div className={style.alerta_container}>
                    <Alerta
                        tipo={tipoAlerta}
                        mensagem={mensagemAlerta}
                        visivel={mostrarAlerta}
                        aoFechar={() => setMostrarAlerta(false)}
                    

                    />
                </div>
            </div>
        </>
    );
}
