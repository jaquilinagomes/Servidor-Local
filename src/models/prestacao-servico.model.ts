import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestacaoServicoDBType, PrestacaoServicoDetalhadoType} from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const PrestacaoServicoModel = {
    async create(newPrestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null> {
        try {

            const [rows] = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(
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
                    newPrestacaoServico.id_utilizador,
                    newPrestacaoServico.urgente,
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

    async getAll(): Promise<PrestacaoServicoDBType[] | null> {
        try {
            const query = `SELECT * FROM tbl_prestador_de_servico`

            const rows = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }

    },

    async get(id: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const query = `SELECT * FROM tbl_prestador_de_servico WHERE id = ?`

            const value = [id]

            const rows = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(query, value)

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
                PrestacaoServicoAtualizado.id_utilizador,
                PrestacaoServicoAtualizado.urgente,
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
    
    async delete(id: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const query = `DELETE FROM tbl_prestador_de_servico WHERE id=?`

            const value = [id]

            const rows: any = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(query, value)
            
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
    },

    async getAllPrestacaoServicoDetalhada(limit: number, offset: number) {
        try {
            const query = `
            SELECT
                ps.id as id_prestacao_servico,
                ps.designacao as descricao,
                u.nome as nome_utilizador,
                u.email as email_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgente
            FROM tbl_prestacao_servico ps
            INNER JOIN tbl_utilizadores u on ps.id_utilizador = u.id
            INNER JOIN tbl_servicos s on ps.id_servico = s.id
            ORDER BY ps.created_at DESC
            LIMIT ? OFFSET ?
            `
            const [rows] = await db.execute<PrestacaoServicoDetalhadoType[] & RowDataPacket[]> (
                query, 
                [
                    limit.toString(), 
                    offset.toString()
                ]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PrestacaoServicoDetalhadoType[] : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAllPrestacoesServicoByCategoria(limit: number, offset: number) {
        try {
            const query = `
            SELECT DISTINCT

            `
            const [rows] = await db.execute(query,
                [
                    limit.toString(),
                    offset.toString()
                ]
            )
            
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}