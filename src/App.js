import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Entrar } from "./pages/Entrar/Entrar";
import { CadastroUsuario } from "./pages/CadastroUsuario/CadastroUsuario";
import { Senha } from "./pages/EsqueciMinhaSenha/Senha";

import { CardsProdutos } from "./componentes/CardsProdutos/CardsProdutos";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Produtos } from "./pages/Produtos/Produtos";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./pages/PaginaAdm/PageAdmin";
import { Carrinho } from "./pages/Carrinho/Carrinho";
import  DuvidasIA  from "./pages/DuvidasIA/DuvidasIA";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Entrar />} />
        <Route path="conta/Entrar" element={<Entrar />} />
        <Route path="Conta" element={<CadastroUsuario />} />
        <Route path="senha" element={<Senha />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="cards" element={<CardsProdutos />} />
        <Route path="DuvidasIA" element={<DuvidasIA />} />
        
        {/* Página do carrinho acessível para todos */}
        <Route path="/carrinho" element={<Carrinho />} />
        
        {/* Página de administrador protegida */}
        <Route path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
