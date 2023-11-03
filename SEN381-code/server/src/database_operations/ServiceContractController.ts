import { ServiceContract } from "../entity/ServiceContract";
import { AppDataSource } from "../../index";

export class ServiceContractController {
    private SCRepository;

    constructor() {
        this.SCRepository = AppDataSource.getRepository(ServiceContract);
    }

    public async SelectAll(){
        try{
            const problems = await this.SCRepository.find();
            return problems;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async ServiceByContract(ID: number){
        try{
            return await this.SCRepository.query(
                `SELECT * FROM Service WHERE ServiceId IN (SELECT ServiceId FROM ServiceContract WHERE ContractId = ${ID});`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }     
    }

    public async ContractByService(ID: number){
        try{
            return await this.SCRepository.query(
                `SELECT * FROM Contract WHERE ContractId IN (SELECT ContractId FROM ServiceContract WHERE ServiceId = ${ID});`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        } 
    }

    public async InsertSC(ServId: number, ContrId: number){
        try{
            return await this.SCRepository.createQueryBuilder().insert()
            .into(ServiceContract)
            .values([
                { ServiceId: ServId, ContractId: ContrId },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        } 
    }

    // TYPEORM DELETE FUNCTION DOES NOT WORK
    public async DeleteSC(ServiceID: number, ContractID: number){
        try{
            return await this.SCRepository.query(
                `DELETE FROM ServiceContract WHERE (ServiceId = ${ServiceID} AND ContractId = ${ContractID});`
            )
            // return await this.SCRepository.createQueryBuilder()
            // .delete()
            // .from(ServiceContract)
            // .where("ContractId = :id", { id: ContractID })
            // .andWhere("ServiceId = :id", { id: ServiceID })
            // .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}