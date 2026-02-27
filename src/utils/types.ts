export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: ServicoType | null,
}

export interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    percentagemDesconto?: number;
}