
import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
        ADMIN = "admin",
        CLIENTE = "cliente",
        PRESTADOR = "prestador",
        EMPRESA = "empresa"
    }

    enum EstadoProposta {
        PENDENTE = "pendente",
        ACEITE = "aceite",
        CANCELADO = "cancelado"
    }

    enum EstadoPrestacaoServico {
        PENDENTE = "pendente",
        EM_PROGRESSO = "em_progresso",
        FINALIZADO = "finalizado",
        CANCELADO = "cancelado"
    }

    enum TipoPrestador {
        PARTICULAR = "particular",
        EMPRESA = "empresa"
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
        createdAt: String,
        updatedAt: String
    }

    type Servico {
        id: ID!,
        nome: String!,
        descricao: String,
        categoria: String,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
    }

    type Prestador {
        id: ID!,
        nif: String!,
        profissao: String,
        taxa_urgencia: String,
        minimo_desconto: String,
        percentagem_desconto: String,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
    }

    type Orcamento {
        id : ID!,
        total: Float,
        id_utilizadores: ID!,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
    }

    type Proposta {
        id: ID!,
        id_prestacao_servico: ID!,
        preco_hora: Float!,
        horas_estimadas: Int!,
        estado: EstadoProposta,
        id_prestador: ID!,
        owner: String,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
    }

    type PrestacaoServico {
        id: ID!,
        designacao: String,
        subtotal: Float,
        horas_estimadas: Int!,
        id_prestador: ID!,
        id_servico: ID!,
        preco_hora: Float!, 
        estado: EstadoPrestacaoServico,
        id_orcamento: ID!,
        id_utilizador: ID!,
        id_empresa: ID!,
        tipo_prestador: TipoPrestador,
        urgente: Boolean,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
    }

    type Categoria {
        id: ID!,
        designacao: String,
        icone: String,
        owner: String,
        createdAt: String,
        updatedAt: String
    }

    type Empresa {
        id: ID!,
        designacao: String,
        descricao: String,
        nif: String!,
        icone: String,
        id_utilizador: ID!,
        localizacao: String,
        owner: String,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
}


`
