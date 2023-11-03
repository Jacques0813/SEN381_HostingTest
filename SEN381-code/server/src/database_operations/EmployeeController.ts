import { AppDataSource } from "../../index";
import { Employee } from "../entity/Employee";

export class EmployeeController {
    private EmployeeRepository;

    constructor() {
        this.EmployeeRepository = AppDataSource.getRepository(Employee);
    }

    public async AllEmployee(){
        try{
            const Employees = await this.EmployeeRepository.find();
            return Employees;
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async GetTechnicians(){
        try{
            return await this.EmployeeRepository.query(
                `SELECT * FROM Employee WHERE Title = "Technician";`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async GetEmployeeById(ID: number){
        try{
            return await this.EmployeeRepository.createQueryBuilder("Emp")
            .where("Emp.EmpId = :id", { id: ID})
            .getMany();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async LoginEmployee(Credentials: string, Password: string){
        try{
            return await this.EmployeeRepository.query(
                `SELECT * FROM Employee 
                WHERE ((Username = "${Credentials}" || Email = "${Credentials}") && (Password = "${Password}"));`
            )
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async InsertEmployee(Name: string, Surname: string, Username: string, Phone: string, Email: string, Password: string, Title: string,
                                 StreetName: string, Suburb: string, City: string, BankAccount: string, AccountHolder: string,
                                Bank: string, AccountType: string, TaxNumber: string){
                                   
        try{                            
            return await this.EmployeeRepository.createQueryBuilder().insert()
            .into(Employee)
            .values([
                { Name: Name, Surname: Surname, Username: Username, Phone: Phone, Email: Email, Password: Password, Title: Title,
                  Street: StreetName, Suburb: Suburb, City: City, BankAccount: BankAccount, AccountHolder: AccountHolder,
                Bank: Bank, AccountType: AccountType, TaxNumber: TaxNumber },
            ])
            .execute();
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateEmployee(EmpId: number, Name: string, Surname: string, Username: string, Phone: string, Email: string, Password: string, Title: string,
                                StreetName: string, Suburb: string, City: string, BankAccount: string, AccountHolder: string,
                                Bank: string, AccountType: string, TaxNumber: string){
        try{
            return await this.EmployeeRepository.createQueryBuilder("Employee")
            .update(Employee)
            .set({ Name: Name, Surname: Surname, Username: Username, Phone: Phone, Email: Email, Password: Password, Title: Title,
                Street: StreetName, Suburb: Suburb, City: City, BankAccount: BankAccount, AccountHolder: AccountHolder,
                Bank: Bank, AccountType: AccountType, TaxNumber: TaxNumber })
            .where("EmpId = :id", { id: EmpId })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }

    public async UpdateEmpPassword(EmpId: number, Password: string){
        try{
        return await this.EmployeeRepository.createQueryBuilder("Employee")
            .update(Employee)
            .set({ Password: Password })
            .where("EmpId = :id", { id: EmpId })
            .execute()
        } catch (err) {
            return ([{
            "Message": err
            }]);
        }
        }

    public async UpdateEmployeeAcc(EmpId: number, Name: string, Surname: string, Username: string, Phone: string, Email: string,
    StreetName: string, Suburb: string, City: string, BankAccount: string, AccountHolder: string,
    Bank: string, AccountType: string, TaxNumber: string){
        try{
        return await this.EmployeeRepository.createQueryBuilder("Employee")
            .update(Employee)
            .set({ Name: Name, Surname: Surname, Username: Username, Phone: Phone, Email: Email,
            Street: StreetName, Suburb: Suburb, City: City, BankAccount: BankAccount, AccountHolder: AccountHolder,
            Bank: Bank, AccountType: AccountType, TaxNumber: TaxNumber })
            .where("EmpId = :id", { id: EmpId })
            .execute()
        } catch (err) {
            return ([{
            "Message": err
        }]);
    }
    }

    public async DeleteEmployee(ID: number){
        try{
            return await this.EmployeeRepository.createQueryBuilder("Employee")
            .delete()
            .from(Employee)
            .where("EmpId = :id", { id: ID })
            .execute()
        } catch (err) {
            return ([{
                "Message": err
            }]);
        }
    }
}