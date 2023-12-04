<template>
    <div id="tab_aut">
     
       <div v-if="currentPagamento" class="edit-form">
            <h3>Pagamento</h3>
            <form>
                <div class="form-group">
                    <label for="inputid">Id:</label>
                    <input type="text" v-model="currentPagamento.id" class="form-control" id="inputid" disabled>
                </div>
                <div class="form-group">
                        <label for="inputFP">Forma de pagamento:</label>
                        <input type="text" v-model="currentPagamento.forma_pagamento" class="form-control" id="inputFP">
                </div>
                
                                 
            </form>
            <button class="badge badge-success" @click="updatePagamento">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deletePagamento">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Pagamento...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import PagamentoDataService from '../../services/PagamentoDataService'
     
 
     export default{
      name:'updatepagamento',
      data() {
             return {                
                 currentPagamento: null,
                 message: '',
                 
             }
         },
         methods: {

            getPagamento(id){

                PagamentoDataService.get(id)
                .then(response => {
                    
                    console.log(response.data);

                    this.currentPagamento = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
           
            updatePagamento(){

                PagamentoDataService.update(this.currentPagamento)
                .then(response => {
                    console.log('PagamentoDataService.update');
                    this.message = 'Pagamento alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deletePagamento(){

                PagamentoDataService.delete(this.currentPagamento.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "pagamento-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "pagamento-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getPagamento(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>