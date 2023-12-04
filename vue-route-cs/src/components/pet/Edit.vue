<template>
    <div id="tab_aut">
     
       <div v-if="currentPet" class="edit-form">
            <h3>Pet</h3>
            <form>
                <div class="form-group">
                    <label for="inputid">Id:</label>
                    <input type="text" v-model="currentPet.id" class="form-control" id="inputid" disabled>
                </div>
                <div class="form-group">
                        <label for="inputValor">Valor:</label>
                        <input type="text" v-model="currentPet.valor" class="form-control" id="inputValor">
                </div>
                <div class="form-group">
                    <label for="inputQuantidade">Quantidade:</label>
                    <input type="text" v-model="currentPet.quantidade" class="form-control" id="inputQuantidade" >
                </div>
                <div class="form-group">
                    <label for="selectPeca">Raça:</label>
                    <select v-model="currentPet.Raca" class="form-control" id="selectRaca">                                
                        <option v-for="r in racas" :key ="r.id" v-bind:value="r">
                            {{ r.nome }}
                            </option>
                    </select>
                    
                </div>                        
            </form>
            <button class="badge badge-success" @click="updatePet">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deletePet">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Pet...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import PetDataService from '../../services/PetDataService'
     import RacaDataService from '../../services/RacaDataService'
 
     export default{
      name:'editPets',
      data() {
             return {                
                 currentPet: null,
                 message: '',
                 racas: []
             }
         },
         methods: {

            getPet(id){

                PetDataService.get(id)
                .then(response => {
                    
                    console.log(response.data);

                    this.currentPet = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            listRacas(){

                RacaDataService.list().then(response =>{

                    console.log("Retorno do seviço RacaDataService.list", response.status);
                    console.log(response.data)
                    this.racas = response.data;                                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço RacaDataService.list');
                console.log(response);
                });               
            },
            updatePet(){

                PetDataService.update(this.currentPet)
                .then(response => {
                    console.log('PetDataService.update');
                    this.message = 'Pet alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deletePet(){

                PetDataService.delete(this.currentPet.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "pet-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "pet-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.listRacas();
            this.getPet(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>