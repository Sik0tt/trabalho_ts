<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Pets</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>                     
                <tbody>
                    <tr v-for="(p, indice) in pets" :key ="p.id" :class="{ active: indice == currentIndex }">
                            <td>{{p.id}}</td>
                            <td>{{p.valor}}</td>
                            <td>{{p.quantidade}}</td>
               
                            <td><button v-on:click="setCurrentPet(p, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remPet(p, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentPet">
                    <h4>Pet</h4>
                    <div>
                    <label><strong>Id:</strong></label> {{ currentPet.id }}
                    </div>
                    <div>
                    <label><strong>valor:</strong></label> {{ currentPet.valor }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/updatepet' + currentPet.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Pet...</p>
                <router-link to="/addpet" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import PetDataService from '../../services/PetDataService'     
 
     export default{
      name:'listPets',
      data() {
             return {
                 pets: [],
                 currentPet: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarPets(){

                
                PetDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticatePet", response.status);

                   this.pets = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listpet');
                    console.log(response);
                });
            },
            setCurrentPet(pet, index){

                this.currentPet = pet;
                this.currentIndex = index;
            },
            remPet(pet, index){

                PetDataService.delete(pet.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarPets();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }
            
         },
         mounted() {
            this.listarPets();
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