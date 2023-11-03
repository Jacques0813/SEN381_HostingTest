import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Client } from "./Client";
import { Contract } from "./Contract";

@Entity({ name: "ClientContract" })
export class ClientContract {

    @PrimaryColumn({ type: 'int' })
    ClientId!: number;

    @PrimaryColumn({ type: 'int' })
    ContractId!: number;

    //Many-to-one relationship to clients
    @ManyToOne(() => Client, (client) => client.contracts)
    @JoinColumn({ name: "ClientId" })
    client!: Client;

    // Many-to-One relationship with Contract
    @ManyToOne(() => Contract, (contract) => contract.clients)
    @JoinColumn({ name: "ContractId" })
    contract!: Contract;
}