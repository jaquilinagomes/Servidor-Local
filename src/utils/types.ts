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

export interface prestadorType {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number
}

export interface PrestadorDBType {
id: string,
nif: string,
profissao: string,
taxa_urgencia: number,
minimo_desconto: number,
percentagem_desconto: number,
enabled: boolean,
created_at: string,
updated_at: string
}

export interface userDBType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone:string ,
    pais: string ,
    localidade:string ,
    password: string ,
    enabled: boolean,
    created_at: string,
    updated_at: string

}

export interface servicoDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface OrcamentoDBType {
    id : string,
    total: number,
    id_utilizadores: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PropostaDBType {
    id: string,
    id_prestacao_servico: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: EstadoProposta,
    id_prestador: string,
    enabled:boolean,
    created_at: string,
    updated_at: string
}

export interface PrestacaoServicoDBType {
    id: string,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    estado: EstadoPrestacaoServico,
    id_orcamento: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export enum EstadoProposta {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado"
}

export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    EM_PROGRESSO = "em_progresso",
    FINALIZADO = "finalizado",
    CANCELADO = "cancelado"
}