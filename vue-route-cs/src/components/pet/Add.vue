<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputValor">Valor:</label>
            <input type="text" v-model="pet.valor" class="form-control" id="inputValor">
        </div>            
        <div class="form-group">
                <label for="inputQtd">Quantidade:</label>
                <input type="text" v-model="pet.quantidade" class="form-control" id="inputQtd">
        </div>
        
        <div class="form-group">
            <label for="selectRaca">Raça:</label>
            <select v-model="pet.Raca" class="form-control" id="selectRaca">                                
                <option v-for="r in racas" :key ="r.id" v-bind:value="r">
                    {{ r.nome }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="savePet" class="btn btn-success">Salvar</button>
        <router-link to="/listpets" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newPet">Novo</button>
        <router-link to="/listpets" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import PetDataService from '../../services/PetDataService'
    import RacaDataService from '../../services/RacaDataService'

    export default {
        name: "insertPet",
        data(){
            return {
                pet: {              indice: '',  
                                    valor: '',
                                    quantidade: "",                                                                       
                                    Raca: {}
                                },
                submitted: false,
                racas: []
            }            
        },
        methods: {

            savePet(){

                var pet = jQuery.extend({}, this.pet);
                //var raca = jQuery.extend({}, this.pet.racas);  
                //pet.raca = raca;                                                
                
                console.log(this.pet)

                if (    pet.valor.trim().length > 0 && 
                        pet.quantidade.trim().length > 0 ) {
                
                    PetDataService.create(pet)
                    .then(response => {
                        console.log("cadastrado");
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newPet(){

                this.submitted = false;
                this.pet = {};
            },
            listRacas(){

                RacaDataService.list().then(response =>{

                console.log("Retorno do seviço RacaDataService.list", response.status);

                for(let r of response.data){

                    this.racas.push(r);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço RacaDataService.list');
                console.log(response);
                });               
            }

        },
        mounted() {                        
            this.listRacas();

         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>