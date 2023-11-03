import { AppDataSource } from "../../index";
import { ClientContract } from "../entity/ClientContract";
import { Contract } from "../entity/Contract"

export class ClientContractController {
    private clientcontractRepository;

    constructor() {
        this.clientcontractRepository = AppDataSource.getRepository(ClientContract);
    }

    public async AllClientContract(){
        try{
            const clients = await this.clientcontractRepository.find();
            return clients;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UnusedCCByCId (ID: number) {
        try {
            const query = `
            SELECT DISTINCT C.ContractId, C.ContractName, C.StartDate, C.EndDate, C.Price 
            FROM Contract C 
            JOIN ClientContract CC 
            ON C.ContractId = CC.ContractId 
            WHERE C.ContractId 
            NOT IN (SELECT ContractId FROM ClientContract WHERE ClientId = ${ID});
            `;
    
            const result = await this.clientcontractRepository.query(query, [ID]);
            return result;
        } catch (err) {
            return [{
                "Message": err
            }];
        }
    }


    public async SelectCCByCId(ID: number) {
        try {
            const query = `
                SELECT ContractId, CreatedBy, ContractName, StartDate, EndDate, Price, Status, Priority
                FROM Contract
                WHERE ContractId IN (
                    SELECT ContractId
                    FROM ClientContract
                    WHERE ClientId = ?
                )
            `;
    
            const result = await this.clientcontractRepository.query(query, [ID]);
            return result;
        } catch (err) {
            return [{
                "Message": err
            }];
        }
    }

    public async InsertClientContract(ClientId: number, ContractId: number){
        try{
            return await this.clientcontractRepository.createQueryBuilder().insert()
            .into(ClientContract)
            .values([
                { ClientId: ClientId, ContractId: ContractId },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteClientContract(ID: number, CID: number) {
        try {
            return await this.clientcontractRepository.createQueryBuilder("Client")
                .delete()
                .from(ClientContract)
                .where("ContractId = :id AND ClientId = :cid", { id: ID, cid: CID })
                .execute();
        } catch (err) {
            return [{
                "Message": err
            }];
        }
    }

    public async DeleteAllCCByCId(ClientId: number) {
        try {
            return await this.clientcontractRepository.createQueryBuilder()
                .delete()
                .from(ClientContract)
                .where("ClientId = :id", { id: ClientId })
                .execute();
        } catch (err) {
            return [{
                "Message": err
            }];
        }
    }
}