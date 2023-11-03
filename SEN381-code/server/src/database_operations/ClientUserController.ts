import { AppDataSource } from "../../index";
import { ClientUser } from "../entity/ClientUser";
import { Client } from "../entity/Client";

export class ClientUserController {
    private clientuserRepository;

    constructor() {
        this.clientuserRepository = AppDataSource.getRepository(ClientUser);
    }

    public async AllClientUser(){
        try{
            const ClientUser = await this.clientuserRepository.find();
            return ClientUser;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async FindUserById(id: number){
        try{
            return await this.clientuserRepository.query(
                `SELECT * FROM ClientUser WHERE UserId = ${id};`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async LoginUser(cred: string, pass: string){
        try{
            return await this.clientuserRepository.query(
                `SELECT * FROM ClientUser 
                WHERE ((Username = "${cred}" || Email = "${cred}") && (Password = "${pass}"));`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectCUByCId(ID: number){
        try{
            return await this.clientuserRepository.createQueryBuilder("ClientUser")
            .where("ClientUser.ClientId = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async SelectUserDataByClientUserId(UserId: number) {
        try {
            const query = `
                SELECT
                    ClientUser.Name,
                    ClientUser.Surname,
                    ClientUser.Email,
                    ClientUser.Phone,
                    Client.BankAccount,
                    Client.AccountHolder,
                    Client.Bank,
                    Client.AccountType
                FROM ClientUser
                JOIN Client ON ClientUser.ClientId = Client.ClientId
                WHERE ClientUser.UserId = ?
            `;
    
            const result = await this.clientuserRepository.query(query, [UserId]);
            return result;
        } catch (err) {
            return [{
                "Message": err
            }];
        }
    }

    public async InsertClientUser(ClientId: number, Position: string, Name: string, Surname: string, Username: string, Phone: string, Email: string,
                                Password: string, Street: string, Suburb: string, City: string, Notes: string ){
        try{
            return await this.clientuserRepository.createQueryBuilder().insert()
            .into(ClientUser)
            .values([
                { ClientId: ClientId, Position: Position, Name: Name, Surname: Surname, Username: Username, Phone: Phone, Email: Email,
                    Password: Password, Street: Street, Suburb: Suburb, City: City, Notes: Notes },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateClientUser(UserId: number, ClientId: number, Position: string, Name: string, Surname: string, Username: string, Phone: string, Email: string,
                                Password: string, Street: string, Suburb: string, City: string, Notes: string){
        try{
            return await this.clientuserRepository.createQueryBuilder("ClientUser")
            .update(ClientUser)
            .set({ UserId: UserId, ClientId: ClientId, Position: Position, Name: Name, Surname: Surname, Username: Username, Phone: Phone, Email: Email,
                Password: Password, Street: Street, Suburb: Suburb, City: City, Notes: Notes })
            .where("UserId = :id", { id: UserId })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateAdminClientUser(UserId: number, Position: string, Name: string, Surname: string, Phone: string, Email: string,
    Street: string, Suburb: string, City: string, Notes: string){
        try{
            return await this.clientuserRepository.createQueryBuilder("ClientUser")
            .update(ClientUser)
            .set({ UserId: UserId, Position: Position, Name: Name, Surname: Surname, Phone: Phone, Email: Email,
            Street: Street, Suburb: Suburb, City: City, Notes: Notes })
            .where("UserId = :id", { id: UserId })
            .execute()
        } catch (err) {
            return ([{
            "Message": err
            }]);
        }
    }

    public async DeleteClientUser(ID: number){
        try{ 
            return await this.clientuserRepository.createQueryBuilder("ClientUser")
            .delete()
            .from(ClientUser)
            .where("UserId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async DeleteAllCUByCId(ClientId: number) {
        try {
            return await this.clientuserRepository.createQueryBuilder()
                .delete()
                .from(ClientUser)
                .where("ClientId = :id", { id: ClientId })
                .execute();
        } catch (err) {
            return [{
                "Message": err
            }];
        }
    }
}