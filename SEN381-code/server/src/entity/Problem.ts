import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Client } from "./Client"; // Import the Client entity
import { Employee } from "./Employee"; // Import the Employee entity
import { Job } from "./Job"; // Import the Job entity
import { ProblemCall } from "./ProblemCall";

@Entity({ name: "Problem" })
export class Problem {

    @PrimaryGeneratedColumn()
    ProblemId!: number;

    @Column({ type: "int" })
    ClientId!: number;

    @Column({ type: "int" })
    CreatedBy!: number;

    @Column({ type: "nvarchar", length: 255 })
    Description!: string;

    @Column({ type: "date" })
    AvailableStart!: Date;

    @Column({ type: "date", nullable: true })
    AvailableEnd!: Date | null;

    @ManyToOne(() => Client, (client) => client.problems)
    @JoinColumn({ name: "ClientId" })
    client!: Client;

    @ManyToOne(() => Employee, (employee) => employee.problems)
    @JoinColumn({ name: "CreatedBy" })
    employee!: Employee;

    @OneToMany(() => Job, (job) => job.problem)
    jobs!: Job[];

    @OneToMany(() => ProblemCall, (problemCall) => problemCall.problem)
    calls!: ProblemCall[];
}
