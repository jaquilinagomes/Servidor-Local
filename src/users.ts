import db from "./lib/db.js";
import type { userType } from "./utils/types.js";
import { generateUUID } from "./utils/uuid.js";

export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

    return rows
}

export async function getUserById(id: string) {
    // track query execution in function db.execute
    console.log("getUserById", id)

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
}

export async function createUser(users: userType) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_utilizadores
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                generateUUID(),
                users.nome,
                users.numero_identificacao,
                users.data_nascimento,
                users.email,
                users.telefone,
                users.pais,
                users.localidade,
                users.password,
                users.enabled,
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
}

export async function updateUser(id: string, updateUser: userType) {
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
        WHERE id=?
        `
        const values = [
            updateUser.nome,
            updateUser.numero_identificacao,
            updateUser.data_nascimento,
            updateUser.email,
            updateUser.telefone,
            updateUser.pais,
            updateUser.localidade,
            updateUser.password,
            updateUser.enabled,
            new Date(),
            id
        ]

        const rows = await db.execute(query, values)
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

    }catch(error) {
        console.log(error)
        return null
    }
}

export async function deleteUser(id: string) {
    try {
        const query = `
        DELETE FROM tbl_utilizadores
        WHERE id = ?
        `
        const values = [id]

        const rows = await db.execute(query, values)
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : rows

    } catch(error) {
        console.log(error)
        return null
    }
}