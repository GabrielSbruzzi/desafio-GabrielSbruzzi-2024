class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', espaçoTotal: 10, espaçoLivre: 7, animais: [{ tipo: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', espaçoTotal: 5, espaçoLivre: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', espaçoTotal: 7, espaçoLivre: 5, animais: [{ tipo: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', espaçoTotal: 8, espaçoLivre: 8, animais: [] },
            { numero: 5, bioma: 'savana', espaçoTotal: 9, espaçoLivre: 6, animais: [{ tipo: 'LEAO', quantidade: 1 }] }
        ];

        this.animaisValidos = [
            { especie: 'LEAO', tamanho: 3, biomas: ['savana'] },
            { especie: 'LEOPARDO', tamanho: 2, biomas: ['savana'] },
            { especie: 'CROCODILO', tamanho: 3, biomas: ['rio'] },
            { especie: 'MACACO', tamanho: 1, biomas: ['savana', 'floresta'] },
            { especie: 'GAZELA', tamanho: 2, biomas: ['savana'] },
            { especie: 'HIPOPOTAMO', tamanho: 4, biomas: ['savana e rio'] }
        ];

        this.animaisCarnivoros = ['LEAO', 'LEOPARDO', 'CROCODILO'];
    }

    analisaRecintos(animal, quantidade) {
        let animalInfo = this.animaisValidos.find(a => a.especie === animal);
        if (!animalInfo) {
            return { erro: 'Animal inválido', recintosViaveis: null };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida', recintosViaveis: null };
        }

        let recintosViaveis = [];

        for (let recinto of this.recintos) {
            let espaçoNecessario = quantidade * animalInfo.tamanho;
            let biomaCompativel = animalInfo.biomas.some(bioma => recinto.bioma.includes(bioma));

            if (!biomaCompativel) {
                continue;
            }

            if (this.animaisCarnivoros.includes(animal)) {
                if (recinto.animais.length > 0 && recinto.animais.some(a => a.tipo !== animal)) {
                    continue;
                }
            }

            let espaçoLivreAtual = recinto.espaçoLivre;

            let animaisDiferentes = recinto.animais.some(a => a.tipo !== animal);
            if (animaisDiferentes && recinto.animais.length > 0) {
                espaçoNecessario += 1;
            }

            if (espaçoNecessario <= espaçoLivreAtual) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espaçoLivre: espaçoLivreAtual - espaçoNecessario,
                    espaçoTotal: recinto.espaçoTotal
                });
            }
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        if (recintosViaveis.length > 3) {
            recintosViaveis = recintosViaveis.slice(0, 3);
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável', recintosViaveis: null };
        }

        return {
            recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espaçoLivre} total: ${r.espaçoTotal})`)
        };
    }
}

export { RecintosZoo as RecintosZoo };
