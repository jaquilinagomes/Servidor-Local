import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const Options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Servidor Local",
            description: 'Plataforma de Gestão de Prestadores e Serviços',
            version: '1.0.0',
        },
        serves: [
            {
                url: 'http://localhost:8080',
                descripition: 'dev',
            }
        ]
    },

    apis: [
        path.join(process.cwd(), "./src/docs/schemas/*.yaml"),
        path.join(process.cwd(), "./src/docs/paths/*.yaml"),
    ]
}

export const swaggerSpec = swaggerJsdoc(Options);