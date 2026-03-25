function calculo_parcela(primeira_parcela) {
    
    const dias = 30;
    let valor_parcelas = primeira_parcela; // preco / dias;
    let valor_final = primeira_parcela;
    let valor_acumulado = 0

    for(let i = 1; i <= dias; i++) {
        valor_final += valor_parcelas;
        valor_acumulado = valor_final

        console.log(
                `dia:${i} , valor: ${valor_parcelas} , valor_acumulado: ${valor_final}`
            )

        valor_parcelas *= 2;
    }

    return valor_acumulado;
}

console.log(calculo_parcela(1))