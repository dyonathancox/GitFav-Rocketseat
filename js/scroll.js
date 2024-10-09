export function initScroll() {
    document.addEventListener('DOMContentLoaded', () => {
        const tabelaContainer = document.querySelector('.tabela-container');

        if (tabelaContainer) { // Verifica se o elemento existe
            tabelaContainer.style.overflowY = 'auto'; // Habilita rolagem permanentemente
        } else {
            console.error('Elemento .tabela-container não encontrado');
        }
    });
}


// Chama a função de inicialização
initScroll();
