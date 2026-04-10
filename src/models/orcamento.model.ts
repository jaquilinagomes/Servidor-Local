import type { FieldPacket, RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { OrcamentoDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const OrcamentoModel = {
    async create(newOrcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {

            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(
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

    async getAll(): Promise<OrcamentoDBType[] | null> {
        try {
            const query = `SELECT * FROM tbl_orcamento`

            const rows = await db.execute<OrcamentoDBType[] & RowDataPacket[]>(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string): Promise<OrcamentoDBType | null> {
        try {
            const query = `SELECT * FROM tbl_orcamento WHERE id = ?`

            const value = [id]

            const rows = await db.execute<OrcamentoDBType & RowDataPacket[]>(query, value)

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

    async delete(id: string): Promise<OrcamentoDBType | null> {
        try {
            const query = `DELETE FROM tbl_orcamento WHERE id=?`
            const value = [id]
            const rows: any = await db.execute<OrcamentoDBType & RowDataPacket[]>(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async updateBudget(id: string, total: number) {
        try {
            const rows: any = await db.execute(
                `UPDATE tbl_orcamentos SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            )
            return rows[0].affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    }
}