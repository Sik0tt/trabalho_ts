<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputPagamento">Forma de pagamento:</label>
            <input type="text" v-model="pagamento.forma_pagamento" class="form-control" id="inputPagamento">
        </div>            
        
        <button @click="savePagamento" class="btn btn-success">Salvar</button>
        <router-link to="/listpagamento" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newPagamento">Novo</button>
        <router-link to="/listpagamento" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import PagamentoDataService from '../../services/PagamentoDataService'
    

    export default {
        name: "addpagamento",
        data(){
            return {
                pagamento: {              indice: '',  
                                    forma_pagamento: ''},
                submitted: false
                
            }            
        },
        methods: {

            savePagamento(){

                var pagamento = jQuery.extend({}, this.pagamento);//clona o this.novo_equipamento e armazena na variavel equipamento. dessa forma alteracoes em this.novo_equipamento nao irao refletir em equipamento.             
                                         
                
                console.log(this.pagamento)

                if (pagamento.forma_pagamento.trim().length > 0) {
                
                    PagamentoDataService.create(pagamento)
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
            newPagamento(){

                this.submitted = false;
                this.pagamento = {};
            },
            

        },
        mounted() {                        
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>