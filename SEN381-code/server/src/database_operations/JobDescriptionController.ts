import { JobDescription } from "../entity/JobDescription";
import { AppDataSource } from "../../index";

export class JobDescriptionController {
    private JDRepository;

    constructor() {
        this.JDRepository = AppDataSource.getRepository(JobDescription);
    }

    public async SelectAll(){
        try{
            return await this.JDRepository.find();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectByJob(ID: number){
        try{
            return await this.JDRepository.createQueryBuilder("JD")
            .where("JD.JobId = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async CustomJDScript(ID : number){
        try{
            return await this.JDRepository.query(
                `SELECT Status FROM JobDescription WHERE JobId = ${ID};`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertJD(JobId: number, Status: string, Issue: string){
        try{
            return await this.JDRepository.createQueryBuilder().insert()
            .into(JobDescription)
            .values([
                { JobId: JobId, Status: Status, Description: Issue},
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateJD(ID: number, JobId: number, Status: string, Issue: string){
        try{
            return await this.JDRepository.createQueryBuilder("JD")
            .update(JobDescription)
            .set({ JobId: JobId, Status: Status, Description: Issue})
            .where("DescriptionId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteJD(ID: number){
        try{
            return await this.JDRepository.createQueryBuilder("JD")
            .delete()
            .from(JobDescription)
            .where("DescriptionId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}