import http from "../http-common";

class RacaDataService {

    async get(id){

        console.log('RacaDataService.get: ', id);
        return await http.get('/raca/'+id);
    }

    async list(){

        console.log('RacaDataService.list: ');
        return await http.get(`/listraca`);
    }

    async delete(id){

        console.log('RacaDataService.delete: ', id);
        return await http.delete(`/deleteraca/`+id);
    }

    async update(data){

        console.log('RacaDataService.update: ', data);
        return await http.put(`/updateraca`, data);
    }
    
    async create(data){

        console.log('RacaDataService.create: ', data);
        return await http.post(`/insertraca`, data);

    }  

}

export default new RacaDataService();