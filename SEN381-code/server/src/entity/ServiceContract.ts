import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Contract } from "./Contract";
import { Service } from "./Service";

@Entity({ name: "ServiceContract" })
export class ServiceContract {

    @PrimaryColumn({ type: 'int' })
    ServiceId!: number;

    @PrimaryColumn({ type: 'int' })
    ContractId!: number;

    @ManyToOne(() => Contract, (contract) => contract.services)
    @JoinColumn({ name: "ContractId" })
    contract!: Contract;

    @ManyToOne(() => Service, (service) => service.contracts)
    @JoinColumn({ name: "ServiceId" })
    service!: Service;
}
