import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Black from '../../assets/Black.jpg'; 
import { FaStar, FaRegStar } from 'react-icons/fa';
import ProdutosApi from '../../services/ProdutosApi';

export function CardsProdutos({ carrinho, setCarrinho, pesquisaValor }) {

        
    console.log(JSON.parse(localStorage.getItem("Carrinho")));

    
    const [produtos, setProdutos] = useState([]);

  
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
    }
 
    const renderizarEstrelas = (nota) => {
        const estrelas = [];
        for (let i = 1; i <= 5; i++) {
            estrelas.push(i <= nota ? <FaStar key={i} color="#FFD700" /> : <FaRegStar key={i} color="#CCCCCC" />);
        }
        return estrelas;
    };

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
        <div className="container mt-4">
            <div className="row g-4">
                {/* Mapeamos os produtos para criar os cards */}
                {produtosFiltrados.map((produto) => (
                    <div className="col-md-4 mb-4" key={produto.id}>
                        <Card style={{ width: '20rem' }} className="d-flex flex-column h-100">
                            <Card.Img variant="top" src={Black} />
                            <Card.Body className="p-4 flex-grow-1">
                                <Card.Title>{produto.nome}</Card.Title>
                                <div className="d-flex align-items-center mb-2">
                                    {renderizarEstrelas(produto.nota)}
                                    <span className="ms-2">({produto.nota}.3)</span>
                                </div>
                                <Card.Text>{produto.descricao}</Card.Text>
                                <h5 className="fw-bold text-primary">{formatarPreco(produto.preco)}</h5>
                                <Button onClick={() => adicionarAoCarrinho(produto)} variant="primary">
                                    Comprar
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>


        </div>
    );
}
