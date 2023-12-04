
import http from "../http-common";

class VendaDataService {

 

    async get(id){

        console.log('ClienteDataService.get: ', id);
        return await http.get('/cliente/'+id);
    }

    async list(){

        console.log('VendaDataService.list: ');
        return await http.get(`/listvenda`);
    }

    async delete(id){

        console.log('VendaDataService.delete: ', id);
        return await http.delete(`/deletecliente/`+id);
    }

    async update(data){

        console.log('VendaDataService.update: ', data);
        return await http.put(`/updatevenda`, data);
    }
    
    async create(data){

        console.log('VendaDataService.create: ', data);
        return await http.post(`/addvenda`, data);

    }  

}

export default new VendaDataService();
