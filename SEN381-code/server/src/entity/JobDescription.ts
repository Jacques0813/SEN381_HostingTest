import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Job } from "./Job"; // Import the Job entity

@Entity({ name: "JobDescription" })
export class JobDescription {

    @PrimaryGeneratedColumn()
    DescriptionId!: number;

    @Column({ type: "int" })
    JobId!: number;

    @Column({ type: "varchar", length: 15, nullable: true })
    Status!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    Description!: string | null;

    @ManyToOne(() => Job, (job) => job.descriptions)
    @JoinColumn({ name: "JobId" })
    job!: Job;
}
