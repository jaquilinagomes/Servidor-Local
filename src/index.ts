import "dotenv/config";
import express, { type Request, type Response} from "express";
import { router as ServiceRouter } from "./routes/servico.route.js";
import { router as UserRouter} from "./routes/users.route.js";
import { router as PrestadorRouter} from "./routes/prestador.route.js";
import { router as OrcamentoRouter } from "./routes/orcamento.route.js";
import { router as PropostaRouter } from "./routes/proposta.route.js";
import { router as PrestacaoServicoRouter } from "./routes/prestacao-servico.route.js";
import { swaggerSpec } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "./graphql/index.js";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/service", ServiceRouter)
app.use("/users", UserRouter)
app.use("/prestador", PrestadorRouter)
app.use("/orcamento", OrcamentoRouter)
app.use("/proposta", PropostaRouter)
app.use("/prestacao-servico", PrestacaoServicoRouter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const graphqlServer = new ApolloServer ({
    typeDefs,
    resolvers,
})
await graphqlServer.start()

app.use("/graphql",
    expressMiddleware(graphqlServer, {
        context: async ({ req }) => ({
            token: req.headers.authorization,
            DB_HOST: process.env.DB_HOST,
            DB_USER: process.env.DB_USER,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_NAME: process.env.DB_NAME
        }),
    })
)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
}) 

app.listen(8080, () => {
    console.log("server running on port 8080");
});