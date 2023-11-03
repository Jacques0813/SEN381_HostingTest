import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Client } from "./Client"; // Import the Client entity
import { Employee } from "./Employee"; // Import the Employee entity
import { ProblemCall } from "./ProblemCall";

@Entity({ name: "CallCentre" })
export class CallCentre {

    @PrimaryGeneratedColumn()
    CallId!: number;

    @Column({ type: "int" })
    ClientId!: number;

    @Column({ type: "int" })
    EmpId!: number;

    @Column({ type: "timestamp" })
    Start!: Date;

    @Column({ type: "timestamp" })
    End!: Date;

    @ManyToOne(() => Client, (client) => client.calls)
    @JoinColumn({ name: "ClientId" })
    client!: Client;

    @ManyToOne(() => Employee, (employee) => employee.calls)
    @JoinColumn({ name: "EmpId" })
    employee!: Employee;

    @OneToMany(() => ProblemCall, (problemCall) => problemCall.call) 
    problems!: ProblemCall[];
}
