import express, { type Request, type Response} from "express";
import { router as ServiceRouter } from "./routes/servico.route.js";
import { router as UserRouter} from "./routes/users.route.js";
import { router as PrestadorRouter} from "./routes/prestador.route.js";
import { router as OrcamentoRouter } from "./routes/orcamento.route.js";
import { router as PropostaRouter } from "./routes/proposta.route.js";
import { router as PrestacaoServicoRouter } from "./routes/prestacao-servico.route.js";
import { swaggerSpec } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express()
app.use(express.json())

app.use("/service", ServiceRouter)
app.use("/users", UserRouter)
app.use("/prestador", PrestadorRouter)
app.use("/orcamento", OrcamentoRouter)
app.use("/proposta", PropostaRouter)
app.use("/prestacao-servico", PrestacaoServicoRouter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
}) 


app.listen(8080, () => {
    console.log("server running on port 8080");
});