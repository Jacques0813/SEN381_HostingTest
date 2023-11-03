import { Problem } from "../entity/Problem";
import { AppDataSource } from "../../index";

export class ProblemController {
    private problemRepository;

    constructor() {
        this.problemRepository = AppDataSource.getRepository(Problem);
    }

    public async SelectAll(){
        try{
            const problems = await this.problemRepository.find();
            return problems;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectByClient(ID: number){
        try{
            return await this.problemRepository.createQueryBuilder("prob")
            .where("prob.ClientId = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    
    public async UnassignedProblem(){
        try{
            return await this.problemRepository.query(
                `SELECT * FROM Problem 
                WHERE ProblemId 
                NOT IN (SELECT ProblemId FROM Job);`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectByCreator(ID: number){
        try{
            return await this.problemRepository.createQueryBuilder("prob")
            .where("prob.CreatedBy = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertProblem(ClientId: number, CreatedBy: number, Desc: string, Start: Date, End: Date){
        try{
            return await this.problemRepository.createQueryBuilder().insert()
            .into(Problem)
            .values([
                { ClientId: ClientId, CreatedBy: CreatedBy, Description: Desc, AvailableStart: Start, AvailableEnd: End },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateProblem(ID: number, ClientId: number, CreatedBy: number, Desc: string, Start: Date, End: Date){
        try{
            return await this.problemRepository.createQueryBuilder("job")
            .update(Problem)
            .set({ ClientId: ClientId, CreatedBy: CreatedBy, Description: Desc, AvailableStart: Start, AvailableEnd: End })
            .where("ProblemId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteProblem(ID: number){
        try{
            return await this.problemRepository.createQueryBuilder("job")
            .delete()
            .from(Problem)
            .where("ProblemId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}