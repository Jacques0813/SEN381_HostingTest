import { AppDataSource } from "../../index";
import { Contract } from "../entity/Contract";

export class contractController {
    private contractRepository;

    constructor() {
        this.contractRepository = AppDataSource.getRepository(Contract);
    }

    public async AllContract(){
        try{
            const Contracts = await this.contractRepository.find();
            return Contracts;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertContract(CreatedBy: number, ContractName: string, StartDate: Date, EndDate: Date, Price: number, Status: string, PriorityLevel: string){
        try{
            return await this.contractRepository.createQueryBuilder().insert()
            .into(Contract)
            .values([
                { CreatedBy: CreatedBy, ContractName: ContractName, StartDate: StartDate, EndDate: EndDate, Price: Price, Status: Status, Priority: PriorityLevel },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateContract(ContractId: number, CreatedBy: number, ContractName: string, StartDate: Date, EndDate: Date, Price: number, Status: string, PriorityLevel: string){
        try{
            return await this.contractRepository.createQueryBuilder("Contract")
            .update(Contract)
            .set({ CreatedBy: CreatedBy, ContractName: ContractName, StartDate: StartDate, EndDate: EndDate, Price: Price, Status: Status, Priority: PriorityLevel })
            .where("ContractId = :id", { id: ContractId })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteContract(ID: number){
        try{ 
            return await this.contractRepository.createQueryBuilder("Contract")
            .delete()
            .from(Contract)
            .where("ContractId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}