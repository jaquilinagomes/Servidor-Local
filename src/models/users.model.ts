import db from "../lib/db.js";
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { userDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";


export const UserModel = {
    async create(user: userDBType) {
        try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_utilizadores VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,

            [
                generateUUID(),
                user.nome,
                user.numero_identificacao,
                formatDateDDMMYYYY(user.data_nascimento),
                user.email,
                user.telefone,
                user.pais,
                user.localidade,
                await hashPassword(user.password),
                user.enabled,
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

async getAll() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

    return rows
},

async get(id: string) {
    try {
        const [rows] = await db.execute(
            `SELECT * FROM tbl_utilizadores 
        WHERE tbl_utilizadores.id = ?`,

            [id]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] : null
    } catch (error) {
        console.log(error)
        return null
    }
},

async getByEmail(email: string): Promise<userDBType | null> {
    try {
        const [rows] = await db.execute(
            `SELECT * FROM tbl_utilizadores
            WHERE tbl_utilizadores.email = ?`,
            [email]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows [0] as userDBType : null
    } catch(error) {
        console.log(error)
        return null
    }
},

async update(id: string, userAtualizado: userDBType) {
    try {
        const query = 
        `UPDATE FROM tbl_utilizadores
        SET
            nome = ?,
            numero_identificacao = ?,
            data_nascimento = ?,
            email = ?,
            telefone = ?,
            pais = ?,
            localidade = ?,
            password = ?,
            enabled = ?,
            updated_at = ?
        WHERE id = ?
        `
        const values = [
            userAtualizado.nome,
            userAtualizado.numero_identificacao,
            formatDateDDMMYYYY(userAtualizado.data_nascimento),
            userAtualizado.email,
            userAtualizado.telefone,
            userAtualizado.pais,
            userAtualizado.localidade,
            await hashPassword(userAtualizado.password),
            userAtualizado.enabled,
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

async updatePassword(id: string, password: string) {
    try {
        const updateUser = await db.execute("UPDATE tbl_utilizadores SET password = ?, updated_at = ? WHERE id = ?", [
            await hashPassword(password),
            new Date(),
            id
        ])
        return updateUser
    } catch(error) {
        console.log(error)
        return null
    }
},

async delete(id: string) {
    try {
        const query = `
        DELETE FROM tbl_utilizadores
        WHERE id = ?
        `
        const values = [id]

        const rows: any = await db.execute(query, values)
        return rows[0]?.affectedRows === 0 ? null : rows

    } catch(error) {
        console.log(error)
        return null
    }
}

}
