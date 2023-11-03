import { AppDataSource } from "../../index";
import { Client } from "../entity/Client";

export class ClientController {
    private clientRepository;

    constructor() {
        this.clientRepository = AppDataSource.getRepository(Client);
    }

    public async AllClient(){
        try{
            const clients = await this.clientRepository.find();
            return clients;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async FindClientById(id: number){
        try{
            return await this.clientRepository.query(
                `SELECT * FROM Client WHERE ClientId = ${id};`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertClient(Name: string, Type: string, Active: boolean, BankAcc: string, AccHolder: string, Bank: string, AccType: string, Street: string, Suburb: string, City: string, Notes: string){
        try{
            return await this.clientRepository.createQueryBuilder().insert()
            .into(Client)
            .values([
                { Name: Name, Type: Type, Active: Active, BankAccount: BankAcc, AccountHolder: AccHolder, Bank: Bank, AccountType: AccType, Street: Street, Suburb: Suburb, City: City, Notes: Notes },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateClient(ClientId: number, Name: string, Type: string, Active: boolean, BankAcc: string, AccHolder: string, Bank: string, AccType: string, Street: string, Suburb: string, City: string, Notes: string){
        try{
            return await this.clientRepository.createQueryBuilder("Client")
            .update(Client)
            .set({ Name: Name, Type: Type, Active: Active, BankAccount: BankAcc, AccountHolder: AccHolder, Bank: Bank, AccountType: AccType, Street: Street, Suburb: Suburb, City: City, Notes: Notes })
            .where("ClientId = :id", { id: ClientId })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteClient(ID: number){
        try{ 
            return await this.clientRepository.createQueryBuilder("Client")
            .delete()
            .from(Client)
            .where("ClientId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}