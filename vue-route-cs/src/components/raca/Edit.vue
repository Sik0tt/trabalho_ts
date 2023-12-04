<template>
    <div id="tab_aut">
     
       <div v-if="currentRaca" class="edit-form">
            <h3>Raca</h3>
            <form>
                <div class="form-group">
                    <label for="inputid">Id:</label>
                    <input type="text" v-model="currentRaca.id" class="form-control" id="inputid" disabled>
                </div>
                <div class="form-group">
                    <label for="inputnome">Mome:</label>
                    <input type="text" v-model="currentRaca.nome" class="form-control" id="inputnome">
                </div>
                
            </form>
            <button class="badge badge-success" @click="updateRaca">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteRaca">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Raca...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import RacaDataService from '../../services/RacaDataService'
 
     export default{
      name:'editRaca',
      data() {
             return {                
                 currentRaca: null,
                 message: '',
             }
         },
         methods: {

            getRaca(id){

                RacaDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentRaca = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateRaca(){

                RacaDataService.update(this.currentRaca)
                .then(response => {
                    console.log('RacaDataService.update');
                    this.message = 'raca alterado com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteRaca(){

                RacaDataService.delete(this.currentRaca.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "raca-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "raca-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getRaca(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>