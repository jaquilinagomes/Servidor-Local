import db from "../lib/db.js";
import type { OrcamentoDBType } from "../utils/types.js";

export const OrcamentoModel = {
    async create(newOrcamento: OrcamentoDBType) {
        try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_prestador
            ( id, total, id_utilizadores, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    null,
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

                id,
                OrcamentoAtualizado.id,
                OrcamentoAtualizado.total,
                OrcamentoAtualizado.id_utilizadores,
                OrcamentoAtualizado.enabled,
                Date()
            ]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

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