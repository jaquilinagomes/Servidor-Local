import db from "./lib/db.js";

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

export async function createUser(users: any) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_utilizadores
    (id, nome, numero_identificacao, data_nascimento, email, telefone, pais, localidade, password, enabled, created_at, updated_at)
    values(?,?,?,?,?,?,?,?,?,?,?,?)
    `,
            [
                users.id,
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

export async function userPrestacaoServico(prestacaoservico: any) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_prestacao_servico
        (id, designacao, subtotal, horas_estimadas, id_prestador, id_servico, preco_hora, estado, id_orcamento,enabled, created_at, updated_at)
        values (?,?,?,?,?,?,?,?,?,?,?,?)
        `,

            [
                null,
                prestacaoservico.designacao,
                prestacaoservico.subtotal,
                prestacaoservico.horas_estimadas,
                prestacaoservico.id_prestador,
                prestacaoservico.id_servico,
                prestacaoservico.preco_hora,
                prestacaoservico.estado,
                prestacaoservico.id_orcamento,
                prestacaoservico.enabled,
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

export async function userProposta(proposta: any) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_proposta
            (id, id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
        values (?,?,?,?,?,?,?,?,?,?,?,?)
        `,

            [
                null,
                proposta.id_prestacao_servico,
                proposta.preco_hora,
                proposta.horas_estimadas,
                proposta.estado,
                proposta.enabled,
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



