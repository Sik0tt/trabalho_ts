import {Column, ChildEntity, ManyToOne, JoinColumn} from 'typeorm';
import Pessoa from './Pessoa';


@ChildEntity()
export default class Funionario extends Pessoa {

    @Column("text")
    ctps: string;

    @Column("text")
    pis: string;

    @Column('text')
    senha: string;

   
}
