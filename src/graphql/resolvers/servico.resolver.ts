import { CategoriaModel } from "../../models/categoria.model.js";
import { ServiceModel } from "../../models/servico.model.js"
import type { servicoDBType } from "../../utils/types.js";


export const serviceResolver = {
    Query: {
        getAllServices: async () => {
            return await ServiceModel.getAll();
        },

        getServiceById: async (_: any, args: { id: string}) => {
            return await ServiceModel.get(args.id);
        }
    },

    Mutation: {
        createService: async (_: any, args: { service: servicoDBType}) => {
                return await ServiceModel.create(args.service);
        },
    
        updateService: async (_: any, args: { id: string, service: servicoDBType}) => {
                return await ServiceModel.update(args.id, args.service);
        },
    
        deleteService: async (_: any, args: { id: string }) => {
                return await ServiceModel.delete(args.id);
        }
    },
    
        // Relacionamento de tabelas
    servico: {
        categoria: async (parent: { id: string }) => {
            return await CategoriaModel.get(parent.id);
        }
    }
}