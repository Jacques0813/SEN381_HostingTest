import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ServiceContract } from "./ServiceContract";

@Entity({ name: "Service" })
export class Service {

    @PrimaryGeneratedColumn()
    ServiceId!: number;

    @Column({ type: "varchar", length: 50 })
    ServiceName!: string;

    @Column({ type: "double" })
    Price!: number;

    @Column({ type: "varchar", length: 255 })
    Description!: string;

    @OneToMany(() => ServiceContract, (serviceContract) => serviceContract.service)
    contracts!: ServiceContract[];
}