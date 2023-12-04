<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Clientes</h4>
            <table class="table table-striped" >
                <tr>

                    <th scope="col">Cpf</th>
                    <th scope="col">RG</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nascimento</th>
                    <th scope="col">Endereço</th> 
                    <th scope="col">Cep</th>
                    <th scope="col">Complemento</th>
                    <th scope="col">Data de cadastro</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(c, indice) in clientes" :key ="c.cpf" :class="{ active: indice == currentIndex }">

                            <td>{{c.cpf}}</td>
                            <td>{{c.rg}}</td>
                            <td>{{c.nome}}</td>
                            <td>{{c.numero_celular}}</td>
                            <td>{{c.email}}</td>
                            <td>{{c.data_nascimento}}</td>
                            <td>{{c.endereco}}</td>
                            <td>{{c.cep}}</td>
                            <td>{{c.complemento}}</td>
                            <td>{{c.data_cadastro}}</td>         
                                
                            <td><button v-on:click="setCurrentCliente(c, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remCliente(c, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentCliente">
                    <h4>Cliente</h4>

                    <div>
                    <label><strong>CPF:</strong></label> {{ currentCliente.cpf }}
                    </div>

                    <div>
                    <label><strong>RG:</strong></label> {{ currentCliente.rg}}
                    </div>

                    <div>
                    <label><strong>Nome:</strong></label> {{ currentCliente.nome}}
                    </div>

                    <div>
                    <label><strong>Numero do celular:</strong></label> {{ currentCliente.numero_celular}}
                    </div>

                    <div>
                    <label><strong>Email:</strong></label> {{ currentCliente.email}}
                    </div>

                    <div>
                    <label><strong>Data de Nascimento:</strong></label> {{ currentCliente.data_nascimento }}
                    </div>

                    <div>
                    <label><strong>Endereço:</strong></label> {{ currentCliente.endereco}}
                    </div>

                    <div>
                    <label><strong>Cep:</strong></label> {{ currentCliente.cep}}
                    </div>

                    <div>
                    <label><strong>Complemento:</strong></label> {{ currentCliente.complemento}}
                    </div>

                    <div>
                    <label><strong>Pis:</strong></label> {{ currentCliente.data_cadastro}}
                    </div>

                    

                    <a class="badge badge-warning"
                    :href="'/updatecliente/' + currentCliente.cpf"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Clique em um Cliente...</p>
                <router-link to="/addcliente" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ClienteDataService from '../../services/ClienteDataService'     
 
     export default{
      name:'listClientes',
      data() {
             return {
                 clientes: [],
                 currentFuncionario: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarClientes(){

                
                ClienteDataService.list().then(response =>{

                   

                   this.clientes = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listCliente');
                    console.log(response);
                });
            },
            setCurrentCliente(cliente, index){

                this.currentCliente = cliente;
                this.currentIndex = index;
            },
            remCliente(cliente, index){

                ClienteDataService.delete(cliente.cpf)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarClientes();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarClientes();
         }
 
     }
 </script>
    
 <style scoped>

    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>