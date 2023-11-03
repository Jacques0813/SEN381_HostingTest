import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Problem } from "./Problem"; // Import the Problem entity
import { Job } from "./Job"; // Import the Job entity
import { TechnicianSkill } from "./TechnicianSkill";
import { CallCentre } from "./CallCentre";
import { Contract } from "./Contract";

@Entity({ name: "Employee" })
export class Employee {

    @PrimaryGeneratedColumn()
    EmpId!: number;

    @Column({ type: "varchar", length: 50 })
    Name!: string;

    @Column({ type: "varchar", length: 50 })
    Surname!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    Username!: string | null;

    @Column({ type: "varchar", length: 12 })
    Phone!: string;

    @Column({ type: "varchar", length: 50 })
    Email!: string;

    @Column({ type: "varchar", length: 100 })
    Password!: string;

    @Column({ type: "varchar", length: 50 })
    Title!: string;

    @Column({ type: "varchar", length: 50 })
    Street!: string;

    @Column({ type: "varchar", length: 50 })
    Suburb!: string;

    @Column({ type: "varchar", length: 50 })
    City!: string;

    @Column({ type: "varchar", length: 40 })
    BankAccount!: string;

    @Column({ type: "varchar", length: 50 })
    AccountHolder!: string;

    @Column({ type: "varchar", length: 20 })
    Bank!: string;

    @Column({ type: "varchar", length: 20 })
    AccountType!: string;

    @Column({ type: "varchar", length: 10 })
    TaxNumber!: string;

    @OneToMany(() => Problem, (problem) => problem.employee)
    problems!: Problem[];

    @OneToMany(() => CallCentre, (callCentre) => callCentre.employee)
    calls!: CallCentre[];

    @OneToMany(() => Contract, (contract) => contract.employee)
    contracts!: Contract[];

    @OneToMany(() => TechnicianSkill, (technicianSkill) => technicianSkill.employee)
    skills!: TechnicianSkill[];

    @OneToMany(() => Job, (job) => job.employee)
    jobs!: Job[];
}