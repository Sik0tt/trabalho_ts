import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from 'typeorm';
import Pet from '../models/Pet';
import Pagamento from '../models/Pagamento';
import Cliente from '../models/Cliente'
import Funcionario from '../models/Funcionario'

@Entity('tb_venda')
class Venda {

    @PrimaryGeneratedColumn() 
    id: number

    @Column('text')
    observacao: string;

    @Column('float')
    valor_total: Number;

    @Column('date', {nullable: true})
    data_compra: Date;

     //associação (flecha)
     @ManyToOne(type => Pagamento)
     @JoinColumn({name: "Pagamento", referencedColumnName: "id"})
     Pagamento: Pagamento; 

     @ManyToOne(type => Cliente)
     @JoinColumn({name: "Cliente", referencedColumnName: "cpf"})
     Cliente: Cliente; 

     @ManyToOne(type => Funcionario)
     @JoinColumn({name: "Funcionario", referencedColumnName: "cpf"})
     Funcionario: Funcionario;

    //agregacao (losango não preenchido)
    @ManyToMany(() => Pet)
    @JoinTable({name : "tb_venda_pet", 
                joinColumn: {name: "venda_id", 
                             referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "pet_id", 
                                    referencedColumnName: "id"}})
    Pet: Pet[];
}
export default Venda;