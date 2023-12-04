<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Vendas</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Observação</th>
                    <th scope="col">Valor total</th> 
                    <th scope="col">Data da compra</th> 
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(v, indice) in venda" :key ="v.id" :class="{ active: indice == currentIndex }">
                            <td>{{v.id}}</td>
                            <td>{{v.observacao}}</td>
                            <td>{{v.valor_total}}</td>
                            <td>{{v.data_compra | formataData}}</td>
               
                            <td><button v-on:click="setCurrentVenda(v, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remVenda(v, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentVenda">
                    <h4>Venda</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentVenda.id }}
                    </div>
                    <div>
                    <label><strong>Observação:</strong></label> {{ currentVenda.observacao }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updatevenda/' + currentVenda.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Venda...</p>
                <router-link to="/addvenda" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import VendaDataService from '../../services/VendaDataService'     
 
     export default{
      name:'listvendas',
      data() {
             return {
                venda: [],
                 currentVenda: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarVendas(){

                
                VendaDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateVenda", response.status);

                   this.venda = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listVenda');
                    console.log(response);
                });
            },
            setCurrentVenda(venda, index){
                this.currentVenda = venda;
                this.currentIndex = index;
            },
            remServico(venda, index){

                ServicoDataVenda.delete(venda.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarVendas();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarVendas();
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