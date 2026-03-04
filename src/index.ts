import express, { type Request, type Response } from "express";
import { adicionarServico, listarServicos, apagarServico, obterServico } from "./servico.js"
import { apagarPrestadorDeServico, calcularOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, listarPrestadoresDeServico, selecionarPrestadoresDeServico, selecionarServicos } from "./orcamento.js";

const app = express();
app.use(express.json())

app.get("/hello", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});

// Rota para adicionar serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const servico = req.body

    console.log(servico)
    const addServicoResponse = adicionarServico(servico)
    res.json(addServicoResponse)

    adicionarServico(servico)
})

// Rota para listar todos os servicos
app.get("/listar-servico", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})

// Rota para apagar serviço
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)
        res.json(apagarServicoResponse)
    } else {
        res.json({
            message: "Nome do serviço é obrigatório"
        })
    }
})

// Rota para obter servico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const obterServicoResponse = obterServico(nome as string)
        res.json(obterServicoResponse)
    } else {
        res.json({
            message: "Nome do serviço é obrigatório"
        })
    }
})

// Rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body

    const selecionarServicoResponse = selecionarServicos(nome as string)

    res.json(selecionarServicoResponse)
})

// Rota para calcular orçamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body

    const calcularOrcamentoResponse = calcularOrcamento(pedido)

    res.json({
        message: "Orcamento calculado com sucesso",
        orcamentoTotal: calcularOrcamentoResponse
    })
})

// Rota para selecionar prestadores de servico
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.body

    const selecionarPrestadorResponse = selecionarPrestadoresDeServico(nomeDoPrestador as string)

    res.json({
        message: "Prestador de servico selecionado com sucesso",
        prestadorSelecionado: selecionarPrestadorResponse
    })
})

// Rota para criar prestadores de servico
app.post("/criar-prestadores", (req: Request, res: Response) => {
    // pegar o corpo de requisicao com os dados do novo prestador
    const { novoPrestador } = req.body

    const criarPrestadorResponse = criarPrestadoresDeServico(novoPrestador)

    res.json(criarPrestadorResponse)
})

// Rota para listar prestadores
app.get("/listar-prestadores", (req: Request, res: Response) => {
    const listPrestadorResponse = listarPrestadoresDeServico()

    res.json(listPrestadorResponse)
})

// Rota para editar um prestador de serviço
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador, novosDadosDoPrestador } = req.body

    const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)

    res.json(editarPrestadorResponse)
})

// Rota para apagar prestador
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.body

    if ( nomeDoPrestador) {
        const apagarPrestadorResponse = apagarPrestadorDeServico(nomeDoPrestador as string)

        res.json(apagarPrestadorResponse)
    }
})

app.listen(8080, () => {
    console.log("server running on port 8080");
});