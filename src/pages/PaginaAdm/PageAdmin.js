import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import Black from '../../assets/Black.jpg';
import { FaStar, FaRegStar } from 'react-icons/fa';
import ProdutosApi from '../../services/ProdutosApi';
import styles from './PageAdmin.module.css';

function Admin({ pesquisaValor = '' }) {
  const [produto, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  const [showNovoProduto, setShowNovoProduto] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalDeletar, setShowModalDeletar] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  async function CarregarProdutos() {
    try {
      const listaProdutos = await ProdutosApi.listarProdutosAsync(true);
      setProdutos(listaProdutos);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  async function DeletarProduto() {
    try {
      await ProdutosApi.deletarProdutoAsync(produtoEditando.id);
      setProdutos(produto.filter((p) => p.id !== produtoEditando.id));
      fecharTodosOsModais(); // Fecha todos os modais após a exclusão
    } catch (error) {
      console.error('Erro ao deletar produtos:', error);
    }
  }

  async function EditarProduto() {
    try {
      await ProdutosApi.atualizarProdutoAsync(
        produtoEditando.id,
        produtoEditando.nome,
        produtoEditando.preco,
        produtoEditando.descricao
      );
      CarregarProdutos();
      fecharTodosOsModais(); // Fecha todos os modais após a edição
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  }

  useEffect(() => {
    CarregarProdutos();
  }, []);

  async function CriarProduto(e) {
    e.preventDefault();
    try {
      console.log("chegando da função");
      await ProdutosApi.criarProdutoAsync(nome, preco, descricao);
      console.log("depois da função");
      CarregarProdutos();
      fecharTodosOsModais(); // Fecha todos os modais após a criação
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
    }
  }

  // Função para fechar todos os modais
  const fecharTodosOsModais = () => {
    setShowNovoProduto(false);
    setShowModalEditar(false);
    setShowModalDeletar(false);
    setProdutoEditando(null);
  };


  const abrirModalDeletar = (produto) => {
    setProdutoEditando(produto);
    setShowModalDeletar(true);
  };

  const fecharModalDeletar = () => {
    setShowModalDeletar(false);
    setProdutoEditando(null);
  };

  const abrirModalEditar = (produto) => {
    setProdutoEditando(produto);
    setShowModalEditar(true);
  };

  const fecharModalEditar = () => {
    setShowModalEditar(false);
    setProdutoEditando(null);
  };

  const handleChange = (e) => {
    setProdutoEditando({ ...produtoEditando, [e.target.name]: e.target.value });
  };



  const produtosFiltrados = produto.filter((p) =>
    p.nome.toLowerCase().startsWith(pesquisaValor.toLowerCase())
  );

  const formatarPreco = (valor) => {
    
    return parseFloat(valor).toFixed(2);
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>Gerenciamento de Produtos</h1>
        <Button onClick={() => setShowNovoProduto(true)}>+ Novo Produto</Button>
      </header>

      <div className="container mt-4">
        <div className="row g-4">
          {produtosFiltrados.map((produto) => (
            <div className="col-md-4 mb-4" key={produto.id}>
              <Card style={{ width: '20rem' }} className="d-flex flex-column h-100">
                <Card.Img variant="top" src={Black} />
                <Card.Body className="p-4 flex-grow-1">
                  <Card.Title>{produto.nome}</Card.Title>
                  <div className="d-flex align-items-center mb-2">
                   
                    <span className="ms-2">({produto.nota}.3)</span>
                  </div>
                  <Card.Text>{produto.descricao}</Card.Text>
                  <h5 className="fw-bold text-primary">{formatarPreco(produto.preco)}</h5>
                  <Button onClick={() => abrirModalDeletar(produto)} variant="danger">
                    Deletar
                  </Button>
                  <Button onClick={() => abrirModalEditar(produto)} variant="primary" className="ms-2">
                    Editar
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showNovoProduto} onHide={fecharTodosOsModais}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={CriarProduto}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite uma descrição"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor"
                name="preco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={fecharTodosOsModais}>Fechar</Button>
              <Button type="submit" variant="primary">Salvar</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL DE EDIÇÃO */}
      <Modal show={showModalEditar} onHide={fecharModalEditar}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {produtoEditando && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={produtoEditando.nome}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricao"
                  value={produtoEditando.descricao}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  name="preco"
                  value={produtoEditando.preco}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={fecharModalEditar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={EditarProduto}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalDeletar} onHide={fecharModalDeletar}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {produtoEditando && <p>Tem certeza de que deseja excluir o produto "{produtoEditando.nome}"?</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModalDeletar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={DeletarProduto}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Admin;
