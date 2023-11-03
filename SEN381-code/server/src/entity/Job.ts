import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Problem } from "./Problem"; // Import the Problem entity
import { Employee } from "./Employee"; // Import the Employee entity
import { JobDescription } from "./JobDescription";

@Entity({ name: "Job" })
export class Job {

    @PrimaryGeneratedColumn()
    JobId!: number;

    @Column({ type: "int" })
    ProblemId!: number;

    @Column({ type: "int" })
    EmpId!: number;

    @Column({ type: "int" })
    CreatedBy!: number;

    @Column({ type: "varchar", length: 255 })
    Description!: string;

    @Column({ type: "date" })
    Start!: Date;

    @Column({ type: "date", nullable: true })
    End!: Date | null;

    @ManyToOne(() => Problem, (problem) => problem.jobs)
    @JoinColumn({ name: "ProblemId" })
    problem!: Problem;

    @ManyToOne(() => Employee, (employee) => employee.jobs)
    @JoinColumn({ name: "EmpId" })
    @JoinColumn({ name: "CreatedBy" })
    employee!: Employee;

    @OneToMany(() => JobDescription, (jobdescription) => jobdescription.job)
    descriptions!: JobDescription[];
}
