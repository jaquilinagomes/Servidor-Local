import db from "./lib/db.js";
import type { PrestacaoServicoDBType } from "./utils/types.js";


export async function create(newPrestacaoServico: PrestacaoServicoDBType) {
    try {

            const [rows] = await db.execute(
                `INSERT INTO tbl_prestador_servico
            ( id, designacao, subtotal, horas_estimadas, id_prestador, id_servicos, preco_hora, estado, id_orcamento, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                [
                    null,
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
}

export async function getAll() {
    try {
            const query = `SELECT * FROM tbl_prestador_de_servico`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
}

export async function get(id: string) {
    try {
            const query = `SELECT * FROM tbl_prestador_de_servico WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
}

export async function update(id: string, PrestacaoServicoAtualizado: PrestacaoServicoDBType) {
try {
            const query = `UPDATE tbl_prestador_de_servico 
                    SET 
                    designacao=?, subtotal=?, horas_estimadas=?, id_prestador=?, id_servicos=?, preco_hora=?, estado=?, id_orcamento=?, enabled=?, updated_at=?

                    WHERE 
                        id=?
                            ;`
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

                new Date()
            ]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
}

export async function deletePrestacaoServico(id: string) {
    try {
            const query = `DELETE FROM tbl_prestador_de_servico WHERE id=?`
            const value = [id]
            const rows: any = await db.execute(query, value)
            return rows[0]?.affectedRows === 0 ? null : rows

        } catch (error) {
            console.log(error)
            return null
        }
    }
