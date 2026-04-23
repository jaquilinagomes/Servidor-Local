import { EmpresaModel } from "../../models/empresa.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { UserModel } from "../../models/users.model.js";
import type { PrestadorDBType } from "../../utils/types.js";


export const prestadorResolver = {
    Query: {
        getAllPrestador: async () => {
            return await PrestadorModel.getAll();
        },

        getPrestadorById: async (_: any, args: { id: string}) => {
                return await PrestadorModel.get(args.id);
        }
    },

    Mutation: {
        createPrestador: async (_: any, args: { prestador: PrestadorDBType}) => {
                return await PrestadorModel.create(args.prestador);
        },
    
        updatePrestador: async (_: any, args: { id: string, prestador: PrestadorDBType}) => {
                return await PrestadorModel.update(args.id, args.prestador);
        },
    
        deletePrestador: async (_: any, args: { id: string }) => {
                return await PrestadorModel.delete(args.id);
        }
        },
    
        // Relacionamento de tabelas
    prestador: {
        empresa: async (parent: { id_empresa: string }) => {
            return await EmpresaModel.get(parent.id_empresa);
        },
        
        utilizador: async (parent: { id_utilizador: string }) => {
            return await UserModel.get(parent.id_utilizador)
        }
    }
    }