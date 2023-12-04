<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputObs">Observação:</label>
            <input type="text" v-model="venda.observacao" class="form-control" id="inputObs">
        </div>

        <div class = "form-group">
        <label for="inputVT">Valor Total:</label>
            <input type="text" v-model="venda.valor_total" class="form-control" id="inputVT">
        </div>

        <div class = "form-group">
        <label for="inputDC">Data da compra:</label>
            <input type="date" v-model="venda.data_compra" class="form-control" id="inputDC">
        </div>

        <!--Select Pagamento-->
        <div class="form-group">
                <label for="selectPagamento">Pagamento:</label>
                <select v-model="venda.Pagamento" class="form-control" id="selectPagamento" >
                    <option v-for="p in pagamentos" :key="p.id" v-bind:value="p">
                        {{ p.id }}
                    </option>
                </select>
            </div>

          <!--Select Cliente-->
          <div class="form-group">
                <label for="selectCliente">Cliente:</label>
                <select v-model="venda.Cliente" class="form-control" id="selectCliente" >
                    <option v-for="c in cliente" :key="c.cpf" v-bind:value="c">
                        {{ c.nome }}
                    </option>
                </select>
            </div>

            <!--Select Funcionario-->
            <div class="form-group">
                <label for="selectFuncionario">Funcionarios:</label>
                <select v-model="venda.Funcionario" class="form-control" id="selectFuncionario" >
                    <option v-for="f in funcionario" :key="f.cpf" v-bind:value="f">
                        {{ f.nome }}
                    </option>
                </select>
            </div>            

         <!--Select Pet-->
         <div class="form-group">
                <label for="selectPet">Pet:</label>
                <select v-model="venda.Pet" class="form-control" id="selectPet">
                    <option v-for="p in pet" :key="p.id" v-bind:value="p">
                        {{ p.valor }}
                    </option>
                </select>
            </div>

  
        <button @click="saveVenda()" class="btn btn-success">Salvar</button>
        <router-link to="/listvenda" class="btn btn-success">Voltar</router-link>                 

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newVenda">Novo</button>
        <router-link to="/listvenda" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import VendaDataService from '../../services/VendaDataService'
    import FuncionarioDataService from '../../services/FuncionarioDataService'
    import ClienteDataService from '../../services/ClienteDataService'
    import PetDataService from '../../services/PetDataService'
    import PagamentoDataService from '../../services/PagamentoDataService'


    export default {
        name: "addvenda",
        data(){
            return {
                venda: { 

                    indice: '',
                    observacao: '',
                    valor_total: "",
                    data_compra: "",
                    Pagamento: {},
                    Cliente: {},
                    Funcionario: {},
                    Pet: []
                                    
                                },
                    submitted: false,
                    cliente: [],
                    funcionario: [],
                    pet: [],
                    pagamentos: []
            }            
        },
        methods: {

            saveVenda(){

                console.log("chegou");
                var venda = jQuery.extend({}, this.venda);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.                                                                   
                var cli = jQuery.extend({}, this.venda.Cliente);//clona o this.novo_servico.cliente                  
                var func = jQuery.extend({}, this.venda.Funcionario);//clona o this.novo_servico.funcionario
                var pet = jQuery.extend({}, this.venda.Pet);//clona o this.novo_servico.pet
                var pag = jQuery.extend({}, this.venda.Pagamento);

                venda.Cliente.cpf = cli.cpf;
                venda.Funcionario.cpf = func.cpf;
                venda.Pet.id = pet.id;
                venda.Pagamento.id = pag.id;


                if (venda.observacao.trim().length > 0 ) {
                
                    VendaDataService.create(venda)
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
            newVenda(){

                this.submitted = false;
                this.venda = {};
            },

            //List cliente
            listCliente() {
                ClienteDataService.list().then(response => {
                    console.log("Retorno do seviço ClienteDataService.list", response.status);
                    for (let c of response.data) {
                        this.cliente.push(c);
                    }
                }).catch(response => {
                    // error callback
                    alert('Não conectou no serviço ClienteDataService.list');
                    console.log(response);
                });
            },
            //List funcionario
            listFuncionario() {
                FuncionarioDataService.list().then(response => {
                    console.log("Retorno do seviço FuncionarioDataService.list", response.status);
                    for (let f of response.data) {
                        this.funcionario.push(f);
                    }
                }).catch(response => {
                    // error callback
                    alert('Não conectou no serviço FuncionarioDataService.list');
                    console.log(response);
                });
            },
            //List equipamento
            listPet() {
                PetDataService.list().then(response => {
                    console.log("Retorno do seviço PetDataService.list", response.status);
                    for (let p of response.data) {
                        this.pet.push(p);
                    }
                }).catch(response => {
                    // error callback
                    alert('Não conectou no serviço EquipamentoDataService.list');
                    console.log(response);
                });
            },

            listPagamento() {
                PagamentoDataService.list().then(response => {
                    console.log("Retorno do seviço PagamentoDataService.list", response.status);
                    for (let e of response.data) {
                        this.pagamentos.push(e);
                    }
                }).catch(response => {
                    // error callback
                    alert('Não conectou no serviço PagamentoDataService.list');
                    console.log(response);
                });
            }

        },
        mounted(){
            this.listCliente();
            this.listFuncionario();
            this.listPet();
            this.listPagamento();
        }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>