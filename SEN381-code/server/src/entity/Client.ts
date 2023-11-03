import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Problem } from "./Problem"; // Import the Problem entity
import { ClientUser } from "./ClientUser"; // Import the ClientUser entity
import { ProblemCall } from "./ProblemCall"; // Import the ProblemCall entity
import { Employee } from "./Employee"; // Import the Employee entity
import { ClientContract } from "./ClientContract";
import { CallCentre } from "./CallCentre";

@Entity({ name: "Client" })
export class Client {

    @PrimaryGeneratedColumn()
    ClientId!: number;

    @Column({ type: "varchar", length: 255 })
    Name!: string;

    @Column({ type: "varchar", length: 255 })
    Type!: string;

    @Column({ type: "boolean" })
    Active!: boolean;

    @Column({ type: "varchar", length: 34 })
    BankAccount!: string;

    @Column({ type: "varchar", length: 255 })
    AccountHolder!: string;

    @Column({ type: "varchar", length: 255 })
    Bank!: string;

    @Column({ type: "varchar", length: 255 })
    AccountType!: string;

    @Column({ type: "varchar", length: 255 })
    Street!: string;

    @Column({ type: "varchar", length: 50 })
    Suburb!: string;

    @Column({ type: "varchar", length: 255 })
    City!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    Notes!: string;

    // One-to-Many relationship with Problem
    @OneToMany(() => Problem, (problem) => problem.client)
    problems!: Problem[];

    // One-to-Many relationship with ClientUser
    @OneToMany(() => CallCentre, (callCentre) => callCentre.client)
    calls!: CallCentre[];

    // One-to-Many relationship with ProblemCall
    @OneToMany(() => ClientUser, (clientUser) => clientUser.client)
    users!: ClientUser[];

    //One-to-many relationship with Clientcontracts
    @OneToMany(() => ClientContract, (clientcontract) => clientcontract.client)
    contracts!: ClientContract[];

}