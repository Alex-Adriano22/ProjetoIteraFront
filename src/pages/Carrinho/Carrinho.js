import { useState, useEffect } from 'react';
import { Footer } from '../../componentes/Footer/Footer';
import { TopBarEntrar } from '../../componentes/TopBarEntrar/TopBarEntrar';
import { Button, Card } from 'react-bootstrap';
import Black from '../../assets/Black.jpg';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function Carrinho() {


 

    const [produtosRecuperados, setProdutosRecuperados] = useState(JSON.parse(localStorage.getItem("Carrinho")) || []);
    const navigate = useNavigate();


    function Pagina() {
        navigate("/");
    }

    const removerDoCarrinho = (produtoId) => {
        const produtosAtualizados = [...produtosRecuperados];
        const index = produtosAtualizados.findIndex(produto => produto.id === produtoId);

        if (index !== -1) {
            produtosAtualizados.splice(index, 1); 
            setProdutosRecuperados(produtosAtualizados);
            localStorage.setItem("Carrinho", JSON.stringify(produtosAtualizados));
            localStorage.removeItem("Carrinho") 
        }
    };

    const formatarPreco = (valor) => {
    
        return parseFloat(valor).toFixed(2);
    };

    const calcularTotalCarrinho = () => {
        return produtosRecuperados.reduce((acumulador, produto) => acumulador + produto.preco, 0).toFixed(2);
    };

    return (
        <TopBarEntrar carrinho={produtosRecuperados} setPesquisaValor='' pesquisaValor=''>
          
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div style={{ flex: 1 }}>
                    <div className="container mt-4">
                        <div className="row g-4">
                            {produtosRecuperados.map((produto, index) => (
                                <div className="col-md-4 mb-4" key={`${produto.id}-${index}`}>
                                    <Card style={{ width: '20rem' }}>
                                        <Card.Img variant="top" src={Black} />
                                        <Card.Body>
                                            <Card.Title>{produto.nome}</Card.Title>
                                           
                                            <Card.Text>{produto.descricao}</Card.Text>
                                            <h5 className="fw-bold text-primary">R$ {formatarPreco(produto.preco)}</h5>
                                            <Button variant="danger" onClick={() => removerDoCarrinho (produto.id)}>
                                                Remover do Carrinho
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}

                        </div>
                    

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <h3>Total: R$ {calcularTotalCarrinho()}</h3>
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <Footer />
            </div>
        </TopBarEntrar>
    );
}
