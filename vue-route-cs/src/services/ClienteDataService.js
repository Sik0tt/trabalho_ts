
import http from "../http-common";

class ClienteDataService {

 

    async get(cpf){

        console.log('ClienteDataService.get: ', data);
        return await http.get('/findcliente/'+data);
    }

    async list(){

        console.log('ClienteDataService.list: ');
        return await http.get(`/listcliente`);
    }

    async delete(cpf){

        console.log('ClienteDataService.delete: ', cpf);
        return await http.delete(`/deletecliente/`+cpf);
    }

    async update(data){

        console.log('ClienteDataService.update: ', data);
        return await http.put(`/updatecliente`, data);
    }
    
    async create(data){

        console.log('ClienteDataService.create: ', data);
        return await http.post(`/insertcliente/`, data);

    }  

}

export default new ClienteDataService();
