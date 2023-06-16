import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class player{
    @PrimaryGeneratedColumn()

    id: number;

    @Column()
    name: string;

    @Column()
    position: string;

}