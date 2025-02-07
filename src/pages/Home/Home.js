import { useState } from "react";
import { BannerInicial } from "../../componentes/BannerInicial/BannerIcial";
import { CardsProdutos } from "../../componentes/CardsProdutos/CardsProdutos";
import { Footer } from "../../componentes/Footer/Footer";
import { TopBarEntrar } from "../../componentes/TopBarEntrar/TopBarEntrar";


export function Home() {
        const [pesquisaValor, setPesquisaValor] = useState("")
        const [carrinho, setCarrinho] = useState ([])
        return (

                <TopBarEntrar carrinho={carrinho} setPesquisaValor={setPesquisaValor}  pesquisaValor={pesquisaValor}>
                        <BannerInicial />
                        
                        <CardsProdutos carrinho={carrinho} setCarrinho={setCarrinho} pesquisaValor={pesquisaValor}>
                        </CardsProdutos>
                        <Footer/>
                </TopBarEntrar>


        )
}