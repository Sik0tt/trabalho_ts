import http from "../http-common";

class PagamentoDataService {

 

    async get(id){

        console.log('PagamentoDataService.get: ', id);
        return await http.get('/pagamento/'+id);
    }

    async list(){

        console.log('PagamentoDataService.list: ');
        return await http.get(`/listpagamento`);
    }

    async delete(id){

        console.log('PagamentoDataService.delete: ', id);
        return await http.delete(`/deletepagamento/`+id);
    }

    async update(data){

        console.log('PagamentoDataService.update: ', data);
        return await http.put(`/updatepagamento`, data);
    }
    
    async create(data){

        console.log('PagamentoDataService.create: ', data);
        return await http.post(`/insertpagamento`, data);

    }  

}

export default new PagamentoDataService();