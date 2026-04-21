import { isOwner } from "../security/auth.middleware.js"
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

describe("Unit Test: isOner Middleware", () => {
    let mockRequest: any;
    let mockResponse: any;
    let nextFunction: any = jest.fn();
    //formatacao de resposta mockada para o teste
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    // 1. Simulacao de um utilizador logada (Id: user_123)
    it("Deve retornar 403 se o utilizador nao for o dono do recurso", async () => {

        mockRequest = {
            user: { id: "user_123 " },
            params: { id: "servico_999" }
        };

        //2. simulacao do model ( Id do dono na BD é "outro_user")
        const mockModel = {
            get: jest.fn<any>().mockResolvedValue({ id_utilizador: "outro_user" }),
        };

        const middleware = isOwner(mockModel, "id_utilizador");
        await middleware(mockRequest, mockResponse, nextFunction);

        // 3. Verficao: Deve bloquer com 403
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Permissao insuficiente",
        });
        expect(nextFunction).not.toHaveBeenCalled();
    })
})