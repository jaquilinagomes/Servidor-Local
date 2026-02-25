import express from "express";
import { adicionarServico } from "./servico.js"

const app = express();

app.get("/hello", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

app.post("/adicionar-servico", (req, res) => {
    const servico = req.body
    adicionarServico(servico)
})

app.listen(8080, () => {
    console.log("server running on port 8080");
});