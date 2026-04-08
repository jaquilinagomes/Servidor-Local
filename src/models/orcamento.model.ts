import db from "../lib/db.js";
import type { calcularOrcamento } from "../orcamento.js";
import type { OrcamentoDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const OrcamentoModel = {
    async create(newOrcamento: OrcamentoDBType) {
        try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_prestador
            ( id, total, id_utilizadores, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    generateUUID(),
                    newOrcamento.total,
                    newOrcamento.id_utilizadores,
                    newOrcamento.enabled,
                    new Date(),
                    new Date()
                ]
            );

            console.log({ rows });

            return rows;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {
        try {
            const query = `SELECT * FROM tbl_orcamento`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_orcamento WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },


    async update(id: string, OrcamentoAtualizado: OrcamentoDBType) {
        try {
            const query = `UPDATE tbl_prestador 
                    SET 
                        id=?,
                        total=?,
                        id_utilizadores=?,
                        enabled=?,
                        uptaded=?
                    WHERE 
                        id=?
                            ;`
            const values = [

                OrcamentoAtualizado.total,
                OrcamentoAtualizado.id_utilizadores,
                OrcamentoAtualizado.enabled,
                new Date(),
                id
            ]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    /* async calcularOrcamento(id: string) {
    try {
        const queryServices = `
            SELECT preco_hora, horas_estimadas, id_prestador 
            FROM tbl_prestacao_servico
            WHERE id_orcamento = ?`;
        const [services] = await db.execute(queryServices, [id]) as [any[], any];
        if (!services || services.length === 0) {
            return null;
        }
        let total = 0;
        for (const item of services) {
            let subtotal = item.preco_hora * item.horas_estimadas;
            const queryUrgencia = `
                SELECT taxa_urgencia, percentagem_desconto 
                FROM tbl_prestadores 
                WHERE id = ?`;
            const [prestadorData] = await db.execute(queryUrgencia, [item.id_prestador]) as [any[], any];
            if (prestadorData && prestadorData.length > 0) {
                const { taxa_Urgencia, percentagem_desconto } = prestadorData[0];
                if (taxa_Urgencia) {
                    subtotal += subtotal * taxa_Urgencia;
                }
                if (percentagem_desconto) {
                    subtotal -= subtotal * percentagem_desconto;
                }
            }
            total += subtotal;
        }
        const updateQuery = "UPDATE tbl_orcamento SET total=?, updated_at=? WHERE id=?";
        await db.execute(updateQuery, [total, new Date(), id]);

        return { id, total };
    } catch (err) {
        console.error(err);
        return null;
    }
}, */

    async delete(id: string) {
        try {
            const query = `DELETE FROM tbl_orcamento WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    }
}