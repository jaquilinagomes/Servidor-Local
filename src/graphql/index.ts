import { typeDefs } from "./typedefs/typedefs.js";
import { userResolver } from "./resolvers/users.resolver.js";
import { serviceResolver } from "./resolvers/servico.resolver.js";
import { propostaResolver } from "./resolvers/proposta.resolver.js";
import { prestadorResolver } from "./resolvers/prestador.resolver.js";
import { prestacaoServicoResolver } from "./resolvers/prestacao-servico.resolver.js";
import { orcamentoResolver } from "./resolvers/orcamento.resolver.js";
import { empresaResolver } from "./resolvers/empresa.resolver.js";
import { categoriaResolver } from "./resolvers/categoria.resolver.js";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...serviceResolver.Query,
        ...propostaResolver.Query,
        ...prestadorResolver.Query,
        ...prestacaoServicoResolver.Query,
        ...orcamentoResolver.Query,
        ...empresaResolver.Query,
        ...categoriaResolver.Query
    },

    Mutation: {
        ...userResolver.Mutation,
        ...serviceResolver.Mutation,
        ...propostaResolver.Mutation,
        ...prestadorResolver.Mutation,
        ...prestacaoServicoResolver.Mutation,
        ...orcamentoResolver.Mutation,
        ...empresaResolver.Mutation,
        ...categoriaResolver.Mutation
    }
}

export { typeDefs }