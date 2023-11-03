import { ProblemCall } from "../entity/ProblemCall";
import { AppDataSource } from "../../index";

export class ProblemCallController {
    private PCRepository;

    constructor() {
        this.PCRepository = AppDataSource.getRepository(ProblemCall);
    }

    public async SelectAll(){
        try{
            const PCs = await this.PCRepository.find();
            return PCs;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async CallsByProblem(ID: number){
        try{
            return await this.PCRepository.query(
                `SELECT * FROM CallCentre WHERE CallId IN (SELECT CallId FROM ProblemCall WHERE ProblemId = ${ID});`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }     
    }

    public async ProblemsByCall(ID: number){
        try{
            return await this.PCRepository.query(
                `SELECT * FROM Problem WHERE ProblemId IN (SELECT ProblemId FROM ProblemCall WHERE ProblemId = ${ID});`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        } 
    }

    public async InsertPC(ProbId: number, CallId: number){
        try{
            return await this.PCRepository.createQueryBuilder().insert()
            .into(ProblemCall)
            .values([
                { ProblemId: ProbId, CallId: CallId },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        } 
    }

    public async DeletePCByCall(CallID: number, ProbID: number){
        try{
            return await this.PCRepository.createQueryBuilder("job")
            .delete()
            .from(ProblemCall)
            .where("CallId = :id", { id: CallID })
            .andWhere("ProblemId = :id", { id: ProbID })
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        } 
    }

    public async DeleteByProblem(ProbID: number){
        try{
            return await this.PCRepository.createQueryBuilder("job")
            .delete()
            .from(ProblemCall)
            .where("ProblemId = :id", { id: ProbID })
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        } 
    }
}