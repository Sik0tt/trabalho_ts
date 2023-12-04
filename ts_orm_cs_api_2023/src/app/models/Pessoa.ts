import {Entity, Column, PrimaryColumn,TableInheritance } from 'typeorm';

@Entity('tb_pessoa')

@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Pessoa {
   
    @PrimaryColumn("text")
    cpf: string;

    @Column("text")
    rg: string;

    @Column("text")
    nome: string;
    

    @Column("text")
    numero_celular: string;

    @Column("text")
    email: string;

    @Column('date', {nullable: true})
    data_nascimento: Date;

    @Column("text")
    endereco: string;
    
    @Column("text")
    cep: string;

    @Column("text")
    complemento: string;
}
