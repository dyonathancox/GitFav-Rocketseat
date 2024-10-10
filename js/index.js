import { GithubUser } from "./GithubUser.js"

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.load();
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
    }

    // salvando no localstorage
    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries));
    }

    // adicionando user e tratando erro de não localizar o user
    async add(username) {
        try {
            const userExists = this.entries.find(entry => entry.login === username);

            if (userExists) {
                throw new Error('Usuário já cadastrado!');
            }

            const user = await GithubUser.search(username);

            if (user.login === undefined) {
                throw new Error('Usuário não encontrado!');
            }

            this.entries = [user, ...this.entries];
            this.update();
            this.save();

        } catch (error) {
            alert(error.message);
        }
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login);

        this.entries = filteredEntries;
        this.update();
        this.save();
    }
}

// classe que vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root); // chama o primeiro construtor e entra do primeiro this.root

        this.tbody = this.root.querySelector('table tbody');
        this.noFavMessage = this.root.querySelector('.noFav');

        this.update();
        this.onAdd();
    }

    onAdd() {
        const addButton = this.root.querySelector('.search button');
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input');
            this.add(value);
        }
    }

    update() {
        this.removeAllTr();  
    
        if (this.entries.length === 0) {
            this.noFavMessage.classList.remove('hide');
            this.tbody.style.display = 'none';
        } else {
            this.noFavMessage.classList.add('hide'); // Esconde se tiver favoritos
            this.tbody.style.display = 'table-row-group';
    
            this.entries.forEach(user => {
                const row = this.createRow();
    
                row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
                row.querySelector('.user img').alt = `Imagem de ${user.name}`;
                row.querySelector('.user a').href = `https://github.com/${user.login}`;
                row.querySelector('.user p').textContent = user.name;
                row.querySelector('.user span').textContent = user.login;
                row.querySelector('.repositories').textContent = user.public_repos;
                row.querySelector('.followers').textContent = user.followers;
    
                row.querySelector('.remove').onclick = () => {
                    const isOk = confirm('Tem certeza que deseja deletar essa linha?');
    
                    if (isOk) {
                        this.delete(user);
                    }
                }
    
                this.tbody.append(row);
            });
        }
    }
    

    createRow() {
        const tr = document.createElement('tr');

        tr.innerHTML = 
            `
                <td class="user">
                    <img src="https://github.com/dyonathancox.png" alt="imagem de dyonathan cox">
                    <a href="https://github.com/dyonathancox" target="_blank">
                        <p>Dyonathan Cox</p>
                        <span>/dyonathancox</span>
                    </a>
                </td>
                <td class="repositories">21</td>
                <td class="followers">0</td>
                <td>
                    <button class="remove">Remover</button>
                </td>
            `;

        return tr;
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove();
        });
    }

    noFav() {
        if (this.entries.length === 0) {
            this.noFavMessage.classList.remove('hide');
            this.tbody.style.display = 'none';
        } else {
            this.noFavMessage.classList.add('hide'); // Esconde a mensagem se tiver alguma linha
            this.tbody.style.display = 'table-row-group';
        }
    }
}
