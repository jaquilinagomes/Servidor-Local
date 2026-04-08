import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestacaoServicoDBType} from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const PrestacaoServicoModel = {
    async create(newPrestacaoServico: PrestacaoServicoDBType) {
        try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_prestador_servico
            ( id, designacao, subtotal, horas_estimadas, id_prestador, id_servicos, preco_hora, estado, id_orcamento, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    generateUUID(),
                    newPrestacaoServico.designacao,
                    newPrestacaoServico.subtotal,
                    newPrestacaoServico.horas_estimadas,
                    newPrestacaoServico.id_prestador,
                    newPrestacaoServico.id_servico,
                    newPrestacaoServico.preco_hora,
                    newPrestacaoServico.estado,
                    newPrestacaoServico.id_orcamento,
                    newPrestacaoServico.enabled,
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
            const query = `SELECT * FROM tbl_prestador_de_servico`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }

    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_prestador_de_servico WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },
    
    async update(id: string, PrestacaoServicoAtualizado: PrestacaoServicoDBType) {
        try {
            const query = `UPDATE tbl_prestador_de_servico 
                    SET 
                    designacao=?, subtotal=?, horas_estimadas=?, id_prestador=?, id_servicos=?, preco_hora=?, estado=?, id_orcamento=?, enabled=?, updated_at=?

                    WHERE id = ?`;

            const values = [
                PrestacaoServicoAtualizado.designacao,
                PrestacaoServicoAtualizado.subtotal,
                PrestacaoServicoAtualizado.horas_estimadas,
                PrestacaoServicoAtualizado.id_prestador,
                PrestacaoServicoAtualizado.id_servico,
                PrestacaoServicoAtualizado.preco_hora,
                PrestacaoServicoAtualizado.estado,
                PrestacaoServicoAtualizado.id_orcamento,
                PrestacaoServicoAtualizado.enabled,
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
    
    async delete(id: string) {
        try {
            const query = `DELETE FROM tbl_prestador_de_servico WHERE id=?`

            const value = [id]

            const rows: any = await db.execute(query, value)
            
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getByIdOrcamento(id_orcamento: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_servico
                WHERE tbl_prestacao_servico.id_orcamento = ?`,

                [id_orcamento]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PrestacaoServicoDBType : null
        } catch(error) {
            console.log(error)
            return null
        }
    }
}