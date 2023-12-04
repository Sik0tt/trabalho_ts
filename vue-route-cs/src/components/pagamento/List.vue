<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Pagamentos</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Forma de pagamento</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(p, indice) in pagamento" :key ="p.id" :class="{ active: indice == currentIndex }">
                            <td>{{p.id}}</td>
                            <td>{{p.forma_pagamento}}</td>
               
                            <td><button v-on:click="setCurrentPagamento(p, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remPagamento(p, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentPagamento">
                    <h4>Pagamento</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentPagamento.id }}
                    </div>
                    <div>
                    <label><strong>forma_pagamento:</strong></label> {{ currentPagamento.forma_pagamento }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updatepagamento' + currentPagamento.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Pagamento...</p>
                <router-link to="/addpagamento" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import PagamentoDataService from '../../services/PagamentoDataService'     
 
     export default{
      name:'listpagamento',
      data() {
             return {
                 pagamento: [],
                 pets: [],
                 currentPagamento: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarPagamento(){

                
                PagamentoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticatePagamento", response.status);

                   this.pagamento = response.data;
                   console.log(response.data);

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listpagamento');
                    console.log(response);
                });
            },
            setCurrentPagamento(pagamento, index){

                this.currentPagamento = pagamento;
                this.currentIndex = index;
            },
            remPagamento(pagamento, index){

                PagamentoDataService.delete(pagamento.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarPagamento();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarPagamento();
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