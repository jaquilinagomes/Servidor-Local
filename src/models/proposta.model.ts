import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PropostaDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";



export const PropostaModel = {
    async create(proposta: PropostaDBType) {
        try {

    const [rows] = await db.execute(
    `INSERT INTO tbl_proposta
    ( id, id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
    generateUUID(),
    proposta.id_prestacao_servico,
    proposta.preco_hora,
    proposta.horas_estimadas,
    proposta.estado,
    proposta.enabled,
    new Date(),
    new Date()
    ]
)

    console.log({ rows });

    return rows;

    } catch (error) {
    console.log(error);
    return null;
}
},

async getAll() {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos");

    return rows;
},

async get(id: string) {
    try {
    const [rows] = await db.execute(
 "SELECT * FROM tbl_propostas WHERE id = ?",

    [id]
);

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null;
} catch(error) {
    console.log(error)
    return null
} 
},

async update(id: string, proposta: PropostaDBType) {
    try {
        const [ rows ] = await db.execute(
            `UPDATE tbl_propostas
            SET id_prestacao_servico = ?,
            preco_hora = ?,
            horas_estimadas = ?,
            estado = ?,
            enabled = ?,
            updated_at = ?,
            WHERE id = ?`,

            [
                proposta.id_prestacao_servico,
                proposta.preco_hora,
                proposta.preco_hora,
                proposta.horas_estimadas,
                proposta.estado,
                proposta.enabled,
                new Date,
                id
            ]

        )
        console.log({ rows })
        return rows
    } catch(error) {
        console.log(error)
        return null
    }
},

async delete(id: string) {
    try {
        const rows:any = await db.execute(
            `DELETE FRom tbl_propostas
            WHERE id = ?`,

            [id]
        )

        return rows[0].affectedRows === 0 ? null : rows[0]
    } catch(error) {
        console.log(error)
        return null
    }
},

async getByPrestacaoServico(id_prestacao_servico: string): Promise<PropostaDBType[] | null> {
    try {
        const [ rows ] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
            `SELECT * FROM tbl_propostas
            WHERE tbl_propostas.id_prestacao_servico = ?`,

            [id_prestacao_servico]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows : null
    } catch(error) {
        console.log(error)
        return null
    }
},

async acceptProposal(id: string) {
    try {
        const [ rows ] = await db.execute(
            `UPDATE tbl_propostas`
        )
    } catch(error) {

    }
}

}