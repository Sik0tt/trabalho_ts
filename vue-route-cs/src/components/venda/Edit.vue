<template>
    <div id="tab_aut">

        <div v-if="currentVenda" class="edit-form">
            <h3>Venda</h3>
            <form>
                <div class="form-group">
                    <label for="inputid">Id:</label>
                    <input type="text" v-model="currentVenda.id" class="form-control" id="inputid" disabled>
                </div>
                <div class="form-group">
                    <label for="inputObs">Observacao:</label>
                    <input type="text" v-model="currentVenda.observacao" class="form-control" id="inputObs">
                </div>
                <div class="form-group">
                    <label for="inputVT">Valor total:</label>
                    <input type="text" v-model="currentVenda.valor_total" class="form-control" id="inputVT">
                </div>
                <div class="form-group">
                <label for="inputDTo">Data da compra:</label>
                <input type="text" v-model="currentVenda.data_compra" class="form-control" id="inputDT">
            </div>

            <!--Select Cliente-->
            <div class="form-group">
                <label for="selectCliente">Clientes:</label>
                <select v-model="currentVend.cliente" class="form-control" id="selectCliente" >
                    <option v-for="c in cliente" :key="c.cpf" v-bind:value="c">
                        {{ c.nome }}
                    </option>
                </select>
            </div>

            <!--Select Funcionario-->
            <div class="form-group">
                <label for="selectFuncionario">Funcionarios:</label>
                <select v-model="currentVenda.funcionario" class="form-control" id="selectFuncionario" >
                    <option v-for="f in funcionario" :key="f.cpf" v-bind:value="f">
                        {{ f.nome }}
                    </option>
                </select>
            </div>

            <!--Select Equipamento-->
            <div class="form-group">
                <label for="selectPet">Pet:</label>
                <select v-model="currentVenda.pet" class="form-control" id="selectPet" multiple>
                    <option v-for="p in pet" :key="p.id" v-bind:value="p">
                        {{ p.id }}
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
import ClienteDataService from '../../services/ClienteDataService'
import FuncionarioDataService from '../../services/FuncionarioDataService'
import VendaDataService from '../../services/VendaDataService'

export default {
    name: 'editVendas',
    data() {
        return {
            currentVenda: null,
            message: '',
            funcionario: [],
            cliente: [],
            pet: []
        }
    },
    methods: {
        getPet(id) {
            PetDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentPet = response.data;
                    console.log(this.currentPet)
                })
                .catch(e => {
                    console.log(e);
                })
        },

        //List cliente
        listCliente() {
            ClienteDataService.list().then(response => {
                console.log("Retorno do seviço ClienteDataService.list", response.status);
                for (let e of response.data) {
                    this.cliente.push(e);
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
                for (let e of response.data) {
                    this.funcionario.push(e);
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
                for (let e of response.data) {
                    this.pet.push(e);
                }
            }).catch(response => {
                // error callback
                alert('Não conectou no serviço PetDataService.list');
                console.log(response);
            });
        },

        updateVend() {

            VendaDataService.update(this.currentVenda)
                .then(response => {
                    console.log('VendaDataService.update');
                    this.message = 'Venda alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteVenda() {

           VendaDataService.delete(this.currentVenda.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "venda-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "venda-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listCliente();
        this.listFuncionario();
        this.listPet();
        this.getVenda(this.$route.params.id);
        console.log(this.currentVenda)
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>