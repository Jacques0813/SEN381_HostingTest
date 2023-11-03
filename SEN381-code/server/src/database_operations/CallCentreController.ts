import { AppDataSource } from "../../index";
import { CallCentre } from "../entity/CallCentre";

export class CallCentreController {
    private callcentreRepository;

    constructor() {
        this.callcentreRepository = AppDataSource.getRepository(CallCentre);
    }

    public async AllCallCentre(){
        try{
            const CallCentres = await this.callcentreRepository.find();
            return CallCentres;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertCallCentre(ClientId: number, EmpId: number, Start: Date, End: Date){ //issue on Foreignkey ClientId
        try{
            return await this.callcentreRepository.createQueryBuilder().insert()
            .into(CallCentre)
            .values([
                { ClientId: ClientId, EmpId: EmpId, Start: Start, End: End },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteCallCentre(ID: number){
        try{
            return await this.callcentreRepository.createQueryBuilder("CallCentre") //issue on foereignkey ClientID
            .delete()
            .from(CallCentre)
            .where("CallCentreId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertCC(ClientId: number, EmpId: number, Start: Date, End: Date){
        try{
            return await this.callcentreRepository.createQueryBuilder().insert()
            .into(CallCentre)
            .values([
                { ClientId: ClientId, EmpId: EmpId, Start: Start, End: End },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    // public async UpdateCC(ID: number, ProbId: number, EmpId: number, CreatedBy: number, Desc: string, Start: Date, End: Date){
    //     try{
    //         return await this.jobRepository.createQueryBuilder("job")
    //         .update(Job)
    //         .set({ ProblemId: ProbId, EmpId: EmpId, CreatedBy: CreatedBy, Description: Desc, Start: Start, End: End })
    //         .where("JobId = :id", { id: ID })
    //         .execute()
    //     } catch (err) {
    //         return ([{
    //             "Message": err
    //         }]);
    //     }
    // }

    // public async DeleteCC(ID: number){
    //     try{
    //         return await this.jobRepository.createQueryBuilder("job")
    //         .delete()
    //         .from(Job)
    //         .where("JobId = :id", { id: ID })
    //         .execute()
    //     } catch (err) {
    //         return ([{
    //             "Message": err
    //         }]);
    //     }
    // }
}