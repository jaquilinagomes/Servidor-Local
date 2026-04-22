import { EmpresaModel } from "../../models/empresa.model.js";
import { OrcamentoModel } from "../../models/orcamento.model.js";
import { PrestacaoServicoModel } from "../../models/prestacao-servico.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import { UserModel } from "../../models/users.model.js";
import type { PrestacaoServicoDBType } from "../../utils/types.js";



export const prestacaoServicoResolver = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await PrestacaoServicoModel.getAll();
        },

        getPrestacaoServicoById: async (_: any, args: { id: string}) => {
                return await PrestacaoServicoModel.get(args.id);
                }
    },

    Mutation: {
            createPrestacaoServico: async (_: any, args: { prestacaoServico: PrestacaoServicoDBType}) => {
                return await PrestacaoServicoModel.create(args.prestacaoServico);
            },
    
            updatePrestacaoServico: async (_: any, args: { id: string, prestacaoServico: PrestacaoServicoDBType}) => {
                return await PrestacaoServicoModel.update(args.id, args.prestacaoServico);
            },
    
            deletePrestacaoServico: async (_: any, args: { id: string }) => {
                return await PrestacaoServicoModel.delete(args.id);
            }
        },

        // Relacionamento de tabelas
    prestacaoServico: {
        prestador: async (parent: { id_prestador: string }) => {
            return await PrestadorModel.get(parent.id_prestador);
        },

        servico: async (parent: { id_servico: string }) => {
            return await ServiceModel.get(parent.id_servico);
        },

        orcamento: async (parent: { id_orcamento: string }) => {
            return await OrcamentoModel.get(parent.id_orcamento);
        },

        utilizador: async (parent: { id_utilizador: string }) => {
            return await UserModel.get(parent.id_utilizador);
        },

        empresa: async (parent: { id_empresa: string }) => {
            return await EmpresaModel.get(parent.id_empresa);
        }
    }
}