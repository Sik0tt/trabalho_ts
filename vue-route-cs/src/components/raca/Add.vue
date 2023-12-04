<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="raca.nome" class="form-control" id="inputNome">
        </div> 
  
        <button @click="saveRaca" class="btn btn-success">Salvar</button>
        <router-link to="/listraca" class="btn btn-success">Voltar</router-link>                 

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newRaca">Novo</button>
        <router-link to="/listraca" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import RacaDataService from '../../services/RacaDataService'

    export default {
        name: "addRaca",
        data(){
            return {
                raca: {             indice: '', 
                                    nome: '',
                                                                          
                                },
                submitted: false,
            }            
        },
        methods: {

            saveRaca(){

                var raca = jQuery.extend({}, this.raca);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.                                                                   

                if (raca.nome.trim().length > 0) {
                
                    RacaDataService.create(raca)
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
            newRaca(){

                this.submitted = false;
                this.raca = {};
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