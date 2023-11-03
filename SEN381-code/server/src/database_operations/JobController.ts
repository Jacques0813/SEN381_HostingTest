import { Job } from "../entity/Job";
import { AppDataSource } from "../../index";

export class JobController {
    private jobRepository;

    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job);
    }

    public async SelectAll(){
        try{
            const jobs = await this.jobRepository.find();
            return jobs;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectByProblem(ID: number){
        try{
            return await this.jobRepository.createQueryBuilder("job")
            .where("job.ProblemId = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectByTechnician(ID: number){
        try{
            return await this.jobRepository.createQueryBuilder("job")
            .where("job.EmpId = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectByAdmin(ID: number){
        try{
            return await this.jobRepository.createQueryBuilder("job")
            .where("job.CreatedBy = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectClientJobs(ID: number){
        try{
            return await this.jobRepository.query(
                `SELECT J.Description AS Description,
                    J.Start AS StartDate,
                    J.End AS EndDate,
                    E.Name AS EmployeeName,
                    C_Employee.Name AS CreatedByName
                FROM Job J
                JOIN Problem P ON J.ProblemId = P.ProblemId
                JOIN Client C ON P.ClientId = C.ClientId
                JOIN Employee E ON J.EmpId = E.EmpId
                JOIN Employee C_Employee ON J.CreatedBy = C_Employee.EmpId
                WHERE C.ClientId = 6;`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async TechData(ID: number){
        try{
            return await this.jobRepository.query(
                `SELECT DISTINCT J.JobId, J.Description, J.Start, J.End, C.Name as ClientName, C.Street, C.Suburb, C.City, E.Name as EmpName 
                FROM Job J 
                JOIN JobDescription JD ON JD.JobId = J.JobId 
                JOIN Problem P ON J.ProblemId = P.ProblemId 
                JOIN Client C ON C.ClientId = P.ClientId 
                JOIN Employee E ON E.EmpId = J.EmpId 
                JOIN ClientContract CC ON CC.ClientId = C.ClientId 
                JOIN Contract Co ON Co.ContractId = CC.ContractId 
                WHERE J.EmpId = ${ID};`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async CustomJobScript(){
        try{
            return await this.jobRepository.query(
                `SELECT J.JobId, J.ProblemId, 
                (SELECT COALESCE((SELECT Status FROM JobDescription WHERE JobId = J.JobId ORDER BY DescriptionId DESC LIMIT 1), 'None') AS CurrentStatus) AS CurrentStatus,
                E.Name AS AssignedTo, EM.Name AS CreatedBy, J.Description, J.Start, J.End
                FROM Job J JOIN Employee E ON E.EmpId = J.EmpId JOIN Employee EM ON EM.EmpId = J.CreatedBy;`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async CustomJobScriptFilter(status: string){
        try{
            return await this.jobRepository.query(
                `SELECT J.JobId, J.ProblemId, (SELECT COALESCE((SELECT Status FROM JobDescription WHERE JobId = J.JobId ORDER BY DescriptionId DESC LIMIT 1), 'None') AS CurrentStatus) AS CurrentStatus, 
                E.Name AS AssignedTo, EM.Name AS CreatedBy, J.Description, J.Start, J.End 
                FROM Job J JOIN Employee E ON E.EmpId = J.EmpId JOIN Employee EM ON EM.EmpId = J.CreatedBy 
                WHERE (SELECT COALESCE((SELECT Status FROM JobDescription WHERE JobId = J.JobId ORDER BY DescriptionId DESC LIMIT 1), 'None') AS CurrentStatus) = "${status}";`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertJob(ProbId: number, EmpId: number, CreatedBy: number, Desc: string, Start: Date, End: Date){
        try{
            return await this.jobRepository.createQueryBuilder().insert()
            .into(Job)
            .values([
                { ProblemId: ProbId, EmpId: EmpId, CreatedBy: CreatedBy, Description: Desc, Start: Start, End: End },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateJob(ID: number, ProbId: number, EmpId: number, CreatedBy: number, Desc: string, Start: Date, End: Date){
        try{
            return await this.jobRepository.createQueryBuilder("job")
            .update(Job)
            .set({ ProblemId: ProbId, EmpId: EmpId, CreatedBy: CreatedBy, Description: Desc, Start: Start, End: End })
            .where("JobId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async CustomJobUpdate(ID: number, ProbId: number, EmpId: number, Desc: string, Start: Date, End: Date){
        try{
            return await this.jobRepository.createQueryBuilder("job")
            .update(Job)
            .set({ ProblemId: ProbId, EmpId: EmpId, Description: Desc, Start: Start, End: End })
            .where("JobId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteJob(ID: number){
        try{
            return await this.jobRepository.createQueryBuilder("job")
            .delete()
            .from(Job)
            .where("JobId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}