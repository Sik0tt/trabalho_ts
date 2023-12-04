import http from "../http-common";

class PetDataService {

    async get(id){

        console.log('PetDataService.get: ', id);
        return await http.get('/pet/'+id);
    }

    async list(){

        console.log('PetDataService.list: ');
        return await http.get(`/listpet`);
    }

    async delete(id){

        console.log('PetDataService.delete: ', id);
        return await http.delete(`/deletepet/`+id);
    }

    async update(data){

        console.log('PetDataService.update: ', data);
        return await http.put(`/updatepet`, data);
    }
    
    async create(data){

        console.log('PetDataService.create: ', data);
        return await http.post(`/insertpet`, data);
        console.log(data);
    }  

}

export default new PetDataService();