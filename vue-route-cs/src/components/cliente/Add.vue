<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputCpf">Cpf:</label>
            <input type="text" v-model="cliente.cpf" class="form-control" id="inputCpf">
        </div>

        <div class = "form-group">
        <label for="inputRg">Rg:</label>
            <input type="text" v-model="cliente.rg" class="form-control" id="inputRg">
        </div>

        <div class = "form-group">
        <label for="inputNome">Nome:</label>
            <input type="text" v-model="cliente.nome" class="form-control" id="inputNome">
        </div>

         <div class = "form-group">
        <label for="inputNumero_celular">Numero_celular:</label>
            <input type="text" v-model="cliente.numero_celular" class="form-control" id="inputNumero_celular">
        </div>

         <div class = "form-group">
        <label for="inputEmail">Email:</label>
            <input type="text" v-model="cliente.email" class="form-control" id="inputEmail">
        </div>

         <div class = "form-group">
        <label for="inputDataNascimento">Data_nascimento:</label>
            <input type="date" v-model="cliente.data_nascimento" class="form-control" id="inputDataNascimento">
        </div>

         <div class = "form-group">
        <label for="inputEndereco">Endereço:</label>
            <input type="text" v-model="cliente.endereco" class="form-control" id="inputEndereco">
        </div>

         <div class = "form-group">
        <label for="inputCep">Cep</label>
            <input type="text" v-model="cliente.cep" class="form-control" id="inputCep">
        </div>

         <div class = "form-group">
        <label for="inputComplemento">Complemento:</label>
            <input type="text" v-model="cliente.complemento" class="form-control" id="inputComplemento">
        </div>

         <div class = "form-group">
        <label for="inputData_cadastro">Data de cadastro:</label>
            <input type="date" v-model="cliente.data_cadastro" class="form-control" id="inputData_cadastro">
        </div>

  
        <button @click="saveCliente" class="btn btn-success">Salvar</button>
        <router-link to="/clientes" class="btn btn-success">Voltar</router-link>                 

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newCliente">Novo</button>
        <router-link to="/clientes" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import ClienteDataService from '../../services/ClienteDataService'

    export default {
        name: "addCliente",
        data(){
            return {
                cliente: { 
                                    cpf: '', 
                                    rg: '',  
                                    nome: '',
                                    numero_celular: '',
                                    email: '',
                                    data_nascimento: '',
                                    endereco: '', 
                                    cep: '',
                                    complemento: '',
                                    data_cadastro: ''
                                    
                                                                                                       
                               
                                    
                                },
                submitted: false,
            }            
        },
        methods: {

            saveCliente(){

                var cli = jQuery.extend({}, this.cliente);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.                                                                   

                if (cli.cpf.trim().length > 0 && cli.rg.trim().length > 0 && 
                    cli.nome.trim().length > 0 && cli.numero_celular.trim().length > 0 &&
                    cli.email.trim().length > 0 && cli.data_nascimento.trim().length > 0 &&
                    cli.endereco.trim().length > 0 && cli.cep.trim().length > 0 &&
                    cli.complemento.trim().length > 0 && cli.data_cadastro.trim().length > 0 ) {
                
                    ClienteDataService.create(cli)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newCliente(){

                this.submitted = false;
                this.cliente = {};
            },
        },

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>