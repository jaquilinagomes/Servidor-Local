

interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

function processarPedido(
    pedido: PedidoServico,
    precoHora: number
) {
    const valorBase = pedido.horasEstimadas * precoHora
    const taxaUrgencia = pedido.urgente ? valorBase * 0.3 : 0;
    const valorTotal = valorBase + taxaUrgencia

    return {
        valorTotal: valorTotal
    }
}