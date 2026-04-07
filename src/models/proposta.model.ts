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

async aceitarProposta(id: string) {
        try {
            const selectQuery = "SELECT * FROM tbl_proposta WHERE id = ?"
            const selectValue = [id]
            const [rows] = await db.execute(selectQuery, selectValue) as [any[], any];
            if (!rows || rows.length === 0) {
                return null;
            }
            const { id_orcamento, id_prestacao_servico } = rows[0];
            const upProposalQuery = "UPDATE tbl_proposta SET estado = 'aceite', updated_at=? WHERE id=?"
            const upProposalValue = [new Date(), id]
            await db.execute(upProposalQuery,upProposalValue);
            const upPSQuery = "UPDATE tbl_prestacao_servicos SET estado = 'pendente', updated_at=? WHERE id=?"
            const upPSValue =[new Date(), id_prestacao_servico]
            await db.execute(upPSQuery, upPSValue);
            const upProposalRejectQuery ="UPDATE tbl_proposta SET estado = 'Rejeitada', updated_at=? WHERE id_prestacao_servico=? AND id<>?"
            const upProposalRejectvalue = [new Date(), id_prestacao_servico, id]
            await db.execute(upProposalRejectQuery, upProposalRejectvalue);

            return { id, id_orcamento, id_prestacao_servico, estado: "aceite" };
        } catch (err) {
            console.error(err);
            return null;
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
}

}