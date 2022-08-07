class Produto {

    constructor(){
        this.id = 1
        this.produtos = []
        this.idEditar = null
        
        
    }

    salvar(){
        const produto = this.lerDados()

        if(this.validarCampos(produto)){
            this.idEditar == null? this.adicionar(produto) : this.atualizar(this.idEditar, produto)
            this.listarTabela()
            this.cancelar()
        }  
    }

    lerDados(){
        const produto = {}
        produto.id = this.id
        produto.nome = document.getElementById('produto').value
        produto.preco = Number.parseFloat(document.getElementById('preco').value)

        return produto
    }

    validarCampos(produto){
        let msgErro = ''

        if (produto.nome === ''){
            msgErro += '- Informe o nome do produto\n'
        }
        if (produto.preco === NaN){
            msgErro += '- Informe o preço do produto\n'
        }

        if (msgErro != ''){
            alert(msgErro)
            return false
        }
        
        return true;
    }

    adicionar(produto){
        this.produtos.push(produto)
        this.id++;
    }

    listarTabela(){
        const tabela = document.getElementById('tabela')
        tabela.innerText = ''

        this.produtos.forEach(produto => {
            const linhaTabela = tabela.insertRow()

            /*
            let celulaId = linhaTabela.insertCell()
            let celulaNome = linhaTabela.insertCell()
            let celulaPreco = linhaTabela.insertCell()
            let celulaAcoes = linhaTabela.insertCell()

            celulaId.innerText = produto.id
            celulaNome.innerText = produto.nome
            celulaPreco.innerText = produto.preco

            const imagemEditar = this.criarImagem('editar')
            const imagemDeletar = this.criarImagem('deletar')

            imagemEditar.addEventListener('onclick', () => {
                console.log(imagemEditar.innerHTML)
            })
            
            imagemDeletar.setAttribute('onclick', `produto.deletar(${produto.id})`)

            celulaAcoes.appendChild(imagemEditar)
            celulaAcoes.appendChild(imagemDeletar)
            
            celulaId.classList.add('center')
            */

           Object.values(produto).forEach(dado => {
            let celula = linhaTabela.insertCell()
            celula.innerHTML = dado
           })

            const imagens = this.criarImagens('editar', 'deletar')
            imagens.forEach(imagem => {
                let celula = linhaTabela.insertCell()
                celula.appendChild(imagem)
                celula.classList.add('action')
            })

            const [imagemEditar, imagemDeletar] = imagens

            imagemEditar.setAttribute('onclick', `produto.editar(${JSON.stringify(produto)})`)
            imagemDeletar.setAttribute('onclick', `produto.deletar(${produto.id})`)

        })

        
    }

    criarImagem(nomeImagem){
        const imagem = document.createElement('img')
        imagem.src = `imagens/${nomeImagem}.png`
        imagem.alt = nomeImagem

        return imagem
    }

    criarImagens(nomesImagens){
        return Array.from(arguments).map(arg => this.criarImagem(arg))
    }

    atualizar(id, novoProduto){
        const produto = this.pegarProduto(id)
        
        produto.nome = novoProduto.nome
        produto.preco = novoProduto.preco

        document.querySelector("button#save").innerText = "Salvar"
        this.idEditar = null
    }

    editar(dados){
        this.idEditar = dados.id
        document.getElementById('produto').value = dados.nome
        document.getElementById('preco').value = dados.preco
        document.querySelector("button#save").innerText = "Atualizar"
    }

    deletar(id){
        const tabela = document.getElementById('tabela')
        const indiceProduto = this.pegarIndiceProduto(id)
        const produto = this.produtos[indiceProduto]

        if (confirm(`Deseja remover ${produto.nome}?`)){
            this.produtos.splice(indiceProduto, 1)
            tabela.deleteRow(indiceProduto)
        }
        
    }

    pegarIndiceProduto(id){
        return buscaBinaria(this.produtos.map(produto => produto.id), id)
    }

    pegarProduto(id){
        return this.produtos[this.pegarIndiceProduto(id)]
    }

    cancelar(){
        document.getElementById('produto').value = ''
        document.getElementById('preco').value = ''
    }

    

}

const produto = new Produto()

const buscaBinaria = (lista, item, inicio = 0, fim = lista.length) => {
    const indice = Number.parseInt((fim + inicio) / 2)
    if (inicio > fim){
        return -1
    }
    if (lista[indice] > item){
        return buscaBinaria(lista, item, inicio, fim = indice - 1)
    }
    if (lista[indice] < item){
        return buscaBinaria(lista, item, inicio = indice + 1, fim)
    }
    return indice 
}

