<template>
    <div id="tab_aut">
     
       <div v-if="currentCliente" class="edit-form">
            <h3>Cliente</h3>
            <form>
                <div class="form-group">
            <label for="inputCpf">Cpf:</label>
            <input type="text" v-model="currentCliente.cpf" class="form-control" id="inputCpf">
        </div>

        <div class = "form-group">
        <label for="inputRg">Rg:</label>
            <input type="text" v-model="currentCliente.rg" class="form-control" id="inputRg">
        </div>

        <div class = "form-group">
        <label for="inputNome">Nome:</label>
            <input type="text" v-model="currentCliente.nome" class="form-control" id="inputNome">
        </div>

         <div class = "form-group">
        <label for="inputNumero_celular">Numero_celular:</label>
            <input type="text" v-model="currentCliente.numero_celular" class="form-control" id="inputNumero_celular">
        </div>

         <div class = "form-group">
        <label for="inputEmail">Email:</label>
            <input type="text" v-model="currentCliente.email" class="form-control" id="inputEmail">
        </div>

         <div class = "form-group">
        <label for="inputDataNascimento">Data_nascimento:</label>
            <input type="text" v-model="currentCliente.data_nascimento" class="form-control" id="inputDataNascimento">
        </div>

         <div class = "form-group">
        <label for="inputEndereco">Endereço:</label>
            <input type="text" v-model="currentCliente.endereco" class="form-control" id="inputEndereco">
        </div>

         <div class = "form-group">
        <label for="inputCep">Cep</label>
            <input type="text" v-model="currentCliente.cep" class="form-control" id="inputCep">
        </div>

         <div class = "form-group">
        <label for="inputComplemento">Complemento:</label>
            <input type="text" v-model="currentCliente.complemento" class="form-control" id="inputComplemento">
        </div>

         <div class = "form-group">
        <label for="inputData_cadastro">Data de cadastro:</label>
            <input type="text" v-model="currentCliente.data_cadastro" class="form-control" id="inputData_cadastro">
        </div>
    

            </form>
            <button class="badge badge-success" @click="updateCliente">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteCliente">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Cliente...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ClienteDataService from '../../services/ClienteDataService'
 
     export default{
      name:'editCliente',
      data() {
             return {                
                 currentCliente: null,
                 message: '',
             }
         },
         methods: {

            getCliente(cpf){

               ClienteDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentCliente = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateCliente(){

                ClienteDataService.update(this.currentCliente)
                .then(response => {
                    console.log('ClienteDataService.update');
                    this.message = 'Cliente alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteCliente(){

                ClienteDataService.delete(this.currentCliente.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "cliente-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "cliente-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getCliente(this.$route.params.cpf);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>