import type { RowDataPacket } from "mysql2"
import type { categoriaBDType } from "../utils/types.js"
import db from "../lib/db.js"



export const CategoriaModel = {
    async create(categoria: categoriaBDType): Promise<categoriaBDType | null> {
        try {
        const [rows] = await db.execute<categoriaBDType & RowDataPacket[]>(
            `INSERT INTO tbl_categoria VALUES (?,?,?,?,?)`,

            [
                categoria.id,
                categoria.designacao,
                categoria.icone,
                new Date(),
                new Date()
            ],
        )
    
    console.log({ rows })
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
},

async getAll(): Promise<categoriaBDType[] | null> {
    const [rows] = await db.execute<categoriaBDType[] & RowDataPacket[]>("SELECT * FROM tbl_categoria")

    return rows
},

async get(id: string): Promise<categoriaBDType | null>{
    try {
        const [rows] = await db.execute<categoriaBDType[] & RowDataPacket[]>(
            `SELECT * FROM tbl_categoria
        WHERE tbl_categoria.id = ?`,

            [id]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] as categoriaBDType : null
    } catch (error) {
        console.log(error)
        return null
    }
},

async update(id: string, categoriaAtualizada: categoriaBDType) {
    try {
        const query = 
        `UPDATE FROM tbl_categoria
        SET
            id = ?,
            designacao = ?,
            icone = ?,
            updated_at = ?
        WHERE id = ?
        `
        const values = [
                categoriaAtualizada.designacao,
                categoriaAtualizada.icone,
                new Date(),
                id
        ]

        const rows = await db.execute(query, values)
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

    }catch(error) {
        console.log(error)
        return null
    }
},

async delete(id: string): Promise<categoriaBDType | null> {
    try {
        const query = `
        DELETE FROM tbl_categoria
        WHERE id = ?
        `
        const values = [id]

        const rows: any = await db.execute<categoriaBDType & RowDataPacket[]>(query, values)
        return rows[0]?.affectedRows === 0 ? null : rows

    } catch(error) {
        console.log(error)
        return null
    }
}

}