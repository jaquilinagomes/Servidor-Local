import db from "./lib/db.js"; 

export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores;")

    return rows
}

export async function getUserById(id: string) {
    const [rows] = await db.execute(
        `SELECT * FROM tbl_utilizadores 
        WHERE tbl_utilizadores.id = ?`,

        [id]
    )

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}

export async function insertUsers() {
    const [rows] = await db.execute("6138f738-c217-4266-a877-4c3a48f99c5e")

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}

// new Date()