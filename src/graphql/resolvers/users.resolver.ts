
import { EmpresaModel } from "../../models/empresa.model.js";
import { UserModel } from "../../models/users.model.js";
import type { userDBType } from "../../utils/types.js";

export const userResolver = {
    Query: {
        getAllUsers: async () => {
            return await UserModel.getAll();
        },

        getUserById: async (_: any, args: { id: string}) => {
            return await UserModel.get(args.id);
        }
    },

    Mutation: {
        createUser: async (_: any, args: { user: userDBType }) => {
            return await UserModel.create(args.user);
        },

        updateUser: async (_: any, args: { id: string, user: userDBType}) => {
            return await UserModel.update(args.id, args.user);
        },

        deleteUser: async (_: any, args: { id: string }) => {
            return await UserModel.delete(args.id);
        }
    },

    // Relacionamento de tabelas
    empresa: async (parent: { id: string }) => {
            return await EmpresaModel.get(parent.id);
    }
}