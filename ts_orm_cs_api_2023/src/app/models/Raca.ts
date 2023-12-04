import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';


@Entity('tb_raca')
class Raca {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column('text')
    nome: string

    
}
export default Raca;