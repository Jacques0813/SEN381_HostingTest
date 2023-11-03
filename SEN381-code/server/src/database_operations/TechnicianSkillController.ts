import { TechnicianSkill } from "../entity/TechnicianSkill";
import { AppDataSource } from "../../index";

export class TechnicianSkillController {
    private TSRepository;

    constructor() {
        this.TSRepository = AppDataSource.getRepository(TechnicianSkill);
    }

    public async SelectAll(){
        const problems = await this.TSRepository.find();
        return problems;
    }

    public async SelectByTechnician(ID: number){
        try{
            return await this.TSRepository.createQueryBuilder("TS")
            .where("TS.EmpId = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertTS(EmpId: number, Skill: string){
        try{
            return await this.TSRepository.createQueryBuilder().insert()
            .into(TechnicianSkill)
            .values([
                { EmpId: EmpId, Skill: Skill },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateTS(ID: number, EmpId: number, Skill: string){
        try{
            return await this.TSRepository.createQueryBuilder("TS")
            .update(TechnicianSkill)
            .set({ EmpId: EmpId, Skill: Skill })
            .where("SkillId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteTS(ID: number){
        try{
            return await this.TSRepository.createQueryBuilder("TS")
            .delete()
            .from(TechnicianSkill)
            .where("SkillId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}