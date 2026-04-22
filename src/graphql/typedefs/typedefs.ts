
import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
        ADMIN,
        CLIENTE,
        PRESTADOR,
        EMPRESA,
    }

    enum EstadoProposta {
        PENDENTE,
        ACEITE,
        CANCELADO
    }

    enum EstadoPrestacaoServico {
        PENDENTE,
        EM_PROGRESSO,
        FINALIZADO,
        CANCELADO
    }

    enum TipoPrestador {
        PARTICULAR,
        EMPRESA
    }

    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificacao: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String,
        role: Role,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Servico {
        id: ID!,
        nome: String!,
        descricao: String,
        id_categoria: Categoria,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Prestador {
        id: ID!,
        nif: String!,
        profissao: String,
        taxa_urgencia: Int!,
        minimo_desconto: Int!,
        percentagem_desconto: Int!,
        id_empresa: Empresa,
        id_utilizador: Utilizador,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Orcamento {
        id : ID!,
        total: Float,
        id_utilizadores: Utilizador,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Proposta {
        id: ID!,
        id_prestacao_servico: PrestacaoServico,
        preco_hora: Float!,
        horas_estimadas: Int!,
        estado: EstadoProposta,
        id_prestador: Prestador,
        owner: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type PrestacaoServico {
        id: ID!,
        designacao: String,
        subtotal: Float,
        horas_estimadas: Int!,
        id_prestador: Prestador,
        id_servico: Servico,
        preco_hora: Float!, 
        estado: EstadoPrestacaoServico,
        id_orcamento: Orcamento,
        id_utilizador: Utilizador,
        id_empresa: Empresa,
        tipo_prestador: TipoPrestador,
        urgente: Boolean,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Categoria {
        id: ID!,
        designacao: String,
        icone: String,
        created_at: String,
        updated_at: String
    }

    type Empresa {
        id: ID!,
        designacao: String,
        descricao: String,
        nif: String!,
        icone: String,
        id_utilizador: Utilizador,
        localizacao: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
}
    type Query {
        getAllUsers: [Utilizador]
        getUserById(id: ID!): Utilizador
        getAllServices: [Servico]
        getServiceById(id: ID!): Servico
    }

    type Mutation {
        createUser(
            nome: String!,
            numero_identificacao: String!,
            data_nascimento: String!,
            email: String!,
            telefone: String!,
            pais: String!,
            localidade: String,
            password: String,
            role: Role,
            enabled: Boolean): Utilizador,
        updateUser(
            id: ID!,
            nome: String!,
            numero_identificacao: String!,
            data_nascimento: String!,
            email: String!,
            telefone: String!,
            pais: String!,
            localidade: String,
            password: String,
            role: Role,
            enabled: Boolean): Utilizador,
        deleteUser(id: ID!): Utilizador
        createService(
            nome: String!,
            descricao: String!,
            categoria: Categoria,
            enabled: Boolean): Servico
        )
        updateService(
            id: ID!, 
            nome: String!, 
            descricao: String, 
            categoria: Categoria,
            enabled: Boolean): Servico
        deleteService(id: ID!): Servico
    }


`
