<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Racas</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(r, indice) in racas" :key ="r.id" :class="{ active: indice == currentIndex }">
                            <td>{{r.id}}</td>
                            <td>{{r.nome}}</td> 
                            <td><button v-on:click="setCurrentRaca(r, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remRaca(r, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentRaca">
                    <h4>Raca</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentRaca.id }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentRaca.nome }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updateraca' + currentRaca.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Clique em um Raca...</p>
                <router-link to="/addraca" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import RacaDataService from '../../services/RacaDataService'     
 
     export default{
      name:'listRacas',
      data() {
             return {
                 racas: [],
                 currentRaca: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarRacas(){

                
                RacaDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateRaca", response.status);

                   this.racas = response.data;
                  

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listraca');
                    console.log(response);
                });
            },
            setCurrentRaca(raca, index){

                this.currentRaca = raca;
                this.currentIndex = index;
            },
            remRaca(raca, index){

                RacaDataService.delete(raca.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarRacas();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarRacas();
            console.log(this.racas);
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