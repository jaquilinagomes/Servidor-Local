import type { RowDataPacket } from "mysql2"
import type { CategoriaBDType } from "../utils/types.js"
import db from "../lib/db.js"



export const CategoriaModel = {
    async create(categoria: CategoriaBDType): Promise<CategoriaBDType | null> {
        try {
        const [rows] = await db.execute<CategoriaBDType & RowDataPacket[]>(
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

async getAll(): Promise<CategoriaBDType[] | null> {
    const [rows] = await db.execute<CategoriaBDType[] & RowDataPacket[]>("SELECT * FROM tbl_categoria")

    return rows
},

async get(id: string): Promise<CategoriaBDType | null>{
    try {
        const [rows] = await db.execute<CategoriaBDType[] & RowDataPacket[]>(
            `SELECT * FROM tbl_categoria
        WHERE tbl_categoria.id = ?`,

            [id]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] as CategoriaBDType : null
    } catch (error) {
        console.log(error)
        return null
    }
},

async update(id: string, categoriaAtualizada: CategoriaBDType) {
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

async delete(id: string): Promise<CategoriaBDType | null> {
    try {
        const query = `
        DELETE FROM tbl_categoria
        WHERE id = ?
        `
        const values = [id]

        const rows: any = await db.execute<CategoriaBDType & RowDataPacket[]>(query, values)
        return rows[0]?.affectedRows === 0 ? null : rows

    } catch(error) {
        console.log(error)
        return null
    }
}

}