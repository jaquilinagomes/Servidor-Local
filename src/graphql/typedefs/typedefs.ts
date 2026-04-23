
import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
        ADMIN,
        CLIENTE,
        PRESTADOR,
        EMPRESA
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
        owner: String,
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
        owner: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Query {
        getAllUsers: [Utilizador]
        getUserById(id: ID!): Utilizador
        getAllServices: [Servico]
        getServiceById(id: ID!): Servico
        getAllProposta: [Proposta]
        getPropostaById(id: ID!): Proposta
        getAllPrestador: [Prestador]
        getPrestadorById(id: ID!): Prestador
        getAllPrestacaoServico: [PrestacaoServico]
        getPrestacaoServicoById(id: ID!): PrestacaoServico
        getAllOrcamento: [Orcamento]
        getOrcamentoById(id: ID!): Orcamento
        getAllEmpresa: [Empresa]
        getEmpresaById(id: ID!): Empresa
        getAllCategoria: [Categoria]
        getCategoriaById(id: ID!): Categoria
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
            id_categoria: String,
            enabled: Boolean): Servico,
        updateService(
            id: ID!, 
            nome: String!, 
            descricao: String, 
            id_categoria: String,
            enabled: Boolean): Servico,
        deleteService(id: ID!): Servico
        createProposta(
            id_prestacao_servico: String,
            preco_hora: Float!,
            horas_estimadas: Int!,
            estado: EstadoProposta,
            id_prestador: String,
            owner: String,
            enabled: Boolean): Proposta
        updateProposta(
            id: ID!,
            id_prestacao_servico: String,
            preco_hora: Float!,
            horas_estimadas: Int!,
            estado: EstadoProposta,
            id_prestador: String,
            owner: String,
            enabled: Boolean): Proposta,
        deleteProposta(id: ID!): Proposta
        createPrestador(
            nif: String!,
            profissao: String,
            taxa_urgencia: Int!,
            minimo_desconto: Int!,
            percentagem_desconto: Int!,
            id_empresa: String,
            id_utilizador: String,
            enabled: Boolean): Prestador,
        updatePrestador(
            id: ID!,
            nif: String!,
            profissao: String,
            taxa_urgencia: Int!,
            minimo_desconto: Int!,
            percentagem_desconto: Int!,
            id_empresa: String,
            id_utilizador: String,
            enabled: Boolean): Prestador,
        deletePrestador(id: ID!): Prestador
        createPrestacaoServico(
            designacao: String,
            subtotal: Float,
            horas_estimadas: Int!,
            id_prestador: String,
            id_servico: String,
            preco_hora: Float!, 
            estado: EstadoPrestacaoServico,
            id_orcamento: String,
            id_utilizador: String,
            id_empresa: String,
            tipo_prestador: TipoPrestador,
            urgente: Boolean,
            enabled: Boolean): PrestacaoServico,
        updatePrestacaoServico(
            id: ID!,
            designacao: String,
            subtotal: Float,
            horas_estimadas: Int!,
            id_prestador: String,
            id_servico: String,
            preco_hora: Float!, 
            estado: EstadoPrestacaoServico,
            id_orcamento: String,
            id_utilizador: String,
            id_empresa: String,
            tipo_prestador: TipoPrestador,
            urgente: Boolean,
            enabled: Boolean): PrestacaoServico,
        deletePrestacaoServico(id: ID!): PrestacaoServico
        createOrcamento(
            total,: Float,
            id_utilizadores: String,
            enabled: Boolean): Orcamento,
        updateOrcamento(
            id : ID!,
            total: Float,
            id_utilizadores: String,
            enabled: Boolean): Orcamento,
        deleteOrcamento(id: ID!): Orcamento
        createEmpresa(
            designacao: String,
            descricao: String,
            nif: String!,
            icone: String,
            id_utilizador: String,
            localizacao: String,
            owner: String,
            enabled: Boolean): Empresa,
        updateEmpresa(
            id: ID!,
            designacao: String,
            descricao: String,
            nif: String!,
            icone: String,
            id_utilizador: String,
            localizacao: String,
            owner: String,
            enabled: Boolean): Empresa,
        deleteEmpresa(id: ID!): Empresa
        createCategoria(
            designacao: String,
            icone: String): Categoria,
        updateCategoria(
            id: ID!,
            designacao: String,
            icone: String): Categoria,
        deleteCategoria(id: ID!): Categoria
    }

`
