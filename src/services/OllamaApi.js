import { HTTPClient } from "./client";



const OllamaApi = {

    async Ollama( mensagem) {
        try { 

            

            const request = {
                prompt: mensagem  
            };
            console.log('request',request);
            const response = await HTTPClient.post(`/api/Ollama/Geradortexto`, request);

            console.log('responseee',response.data)
            return response.data;

        } catch (error) {
            console.error("Erro ao obter usuário:", error);
            throw error;
        }
    },
 
}

export default OllamaApi;