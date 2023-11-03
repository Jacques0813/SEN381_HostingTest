import { Service } from "../entity/Service";
import { AppDataSource } from "../../index";

export class ServiceController {
    private serviceRepository;

    constructor() {
        this.serviceRepository = AppDataSource.getRepository(Service);
    }

    public async SelectAll(){
        try{
            const problems = await this.serviceRepository.find();
            return problems;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    // public async SelectSByCId(ID: number) {
    //     try {
    //         const query = `
    //             SELECT *
    //             FROM Service
    //             WHERE ContractId IN (
    //                 SELECT ContractId
    //                 FROM ClientContract
    //                 WHERE ContractId = ?
    //             )
    //         `;
    
    //         const result = await this.serviceRepository.query(query, [ID]);
    //         return result;
    //     } catch (err) {
    //         return [{
    //             "Message": err
    //         }];
    //     }
    // }

    public async InsertService(Name: string, Price: number, Desc: string){
        try{
            return await this.serviceRepository.createQueryBuilder().insert()
            .into(Service)
            .values([
                { ServiceName: Name, Price: Price, Description: Desc},
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateService(ID: number, Name: string, Price: number, Desc: string){
        try{
            return await this.serviceRepository.createQueryBuilder("job")
            .update(Service)
            .set({ ServiceName: Name, Price: Price, Description: Desc})
            .where("ServiceId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteService(ID: number){
        try{
            return await this.serviceRepository.createQueryBuilder("job")
            .delete()
            .from(Service)
            .where("ServiceId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}