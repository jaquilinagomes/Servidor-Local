import express, { type Request, type Response } from "express";
import { adicionarServico, listarServicos, apagarServico, obterServico, addServicesToDB, getServiceById, getAllServices, updateService, deleteService } from "./servico.js"
import { apagarPrestadorDeServico, calcularOrcamento, createOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, listarPrestadoresDeServico, selecionarPrestadoresDeServico, selecionarServicos } from "./orcamento.js";
import { createUser, getUserById, getUsers } from "./users.js";
import { createPrestador } from "./prestador.js";
import type { servicoDBType } from "./utils/types.js";

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

    if (nomeDoPrestador) {
        const apagarPrestadorResponse = apagarPrestadorDeServico(nomeDoPrestador as string)

        res.json(apagarPrestadorResponse)
    } else {
        res.json({
            message: "Nome do prestador obrigatório"
        })
    }
})

// selecionar todos os utilizadores presentes na base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers()

    res.json(getUsersResponse);
})

// selecionar um utilizador por id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
    const { id } = req.query
    if (id) {
        const getUserByIdResponse = await getUserById(id as string)

        if (!getUserByIdResponse) {
            res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            })
        }

        res.status(200).json({
            status: "sucess",
            message: "Utilizador encontrado",
            data: getUserByIdResponse
        })
    } else {
        res.status(400).json({
            status: "error",
            message: "Id é obrigatório",
            data: null
        })
    }
})

// Rota para criar utilizadores no DB
app.post("/create-user", async (req: Request, res: Response) => {
    const user = req.body;

    if (!user) {
        return res.status(400).json({
            error: "utilizador não encontrado!"
        });
    }
    const createUserResponse = await createUser(user);

    res.json(createUserResponse);
}
)

// Rota para criar servico no DB
app.post("/create-service", async (req: Request, res: Response) => {
    const newService: servicoDBType = req.body

    if (!newService) {
        return res.status(400).json({
            status: "error",
            message: "Dados de serviço inválidos",
            data: null
        })
    }

    console.log(newService)

    const createServiceResponse = await addServicesToDB(newService)

    if (createServiceResponse === null) {
        return res.status(400).json({
            status: "sucess",
            message: "serviço criado com sucesso",
            data: createServiceResponse
        })
    }

})

app.get("/get-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatório",
            data: null
        })
    }

    const getServiceByIdResponse = await getServiceById(id as string)

    if (!getServiceByIdResponse) {
        return res.status(404).json({
            status: "error",
            message: "serviço não encontrado",
            data: null
        })
    }

    res.status(200).json({
        status: "sucess",
        message: "serviço encontrado",
        data: getServiceByIdResponse
    })
})

app.get("/get-all-services", async (req: Request, res: Response) => {
    const getAllServicesResponse = await getAllServices()

    if (!getAllServicesResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao selecionar serviços",
            data: null
        })
    }

    res.status(200).json({
        status: "sucess",
        message: "serviços encontrados",
        data: getAllServicesResponse
    })
})

app.put("/update-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    const updatedService: servicoDBType = req.body

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "Dados de serviço inválidos",
            data: null
        })
    }
    if (!updatedService) {
        return res.status(400).json({
            status: "error",
            message: "Dados de serviço inválidos",
            data: null
        })
    }
    const updateServiceResponse = await updateService(id as string, updatedService)

    if (!updateServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao atualizar serviço",
            data: null
        })
    }

    return res.status(200).json({
        status: "sucess",
        message: "serviço atualizado com sucesso",
        data: updateServiceResponse
    })
})

app.delete("/delete-service-by-id/:id"), async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatório",
            data: null
        })
    }

    const deleteServiceResponse = await deleteService(id as string)

    if (!deleteServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao apagar serviço",
            data: null
        })
    }

    return res.status(200).json({
        status: "sucess",
        message: "Serviço apagado com sucesso",
        data: deleteServiceResponse
    })
}











// Rota para criar orcamento no DB
app.post("/create-orcamento", async (req: Request, res: Response) => {
    const orcamento = req.body;

    if (!orcamento) {
        return res.status(400).json({
            error: "orcamento não encontrado!"
        });
    }

    const response = await createOrcamento(orcamento)

    res.json(response);
})

// Rota para criar prestador no DB
app.post("/create-prestador", async (req: Request, res: Response) => {
    const prestador = req.body;

    if (!prestador) {
        return res.status(400).json({
            error: "prestador não encontrado!"
        })
    }

    const response = await createPrestador(prestador)

    res.json(response)
})






app.listen(8080, () => {
    console.log("server running on port 8080");
});