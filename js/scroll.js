export function initScroll() {
    document.addEventListener('DOMContentLoaded', () => {
        const tabelaContainer = document.querySelector('.tabela-container');

        if (tabelaContainer) {
            tabelaContainer.style.overflowY = 'auto'; // Habilita a rolagem

            // Ajusta a altura dinamicamente, se necessário
            const maxHeight = window.innerHeight * 0.5; // Exemplo: 50% da altura da janela
            tabelaContainer.style.maxHeight = `${maxHeight}px`;
        } else {
            console.error('Elemento .tabela-container não encontrado');
        }
    });
}

// Chama a função de inicialização
initScroll();
