import express, { type Request, type Response} from "express";
import { router as ServiceRoute } from "./routes/servico.route.js"


const app = express()
app.use(express.json())

app.use("/service", ServiceRoute)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
}) 





app.listen(8080, () => {
    console.log("server running on port 8080");
});