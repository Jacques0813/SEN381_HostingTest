import { Router, Request, Response } from 'express';
import { Operations } from '../database_operations/operations';
import { JobController } from '../database_operations/JobController';
import { JobDescriptionController } from '../database_operations/JobDescriptionController';
import { ProblemCallController } from '../database_operations/ProblemCallController';
import { ProblemController } from '../database_operations/ProblemController';
import { ServiceContractController } from '../database_operations/ServiceContractController';
import { ServiceController } from '../database_operations/ServiceController';
import { TechnicianSkillController } from '../database_operations/TechnicianSkillController';
import { ClientController } from '../database_operations/ClientController';
import { Console, log } from 'console';
import { CallCentreController } from '../database_operations/CallCentreController';
import { EmployeeController } from '../database_operations/EmployeeController';
import { contractController } from '../database_operations/ContractController';
import { ClientUserController } from '../database_operations/ClientUserController';
import { ClientContractController } from '../database_operations/ClientContractController';


const router = Router();
const operations = new Operations();
const CC = new ClientController();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// JOB TABLE
const JC = new JobController();

// Gets the entire table
router.get('/AllJob', async (req: Request, res: Response) => {
    res.send(await JC.SelectAll());
});

router.get('/TechData/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JC.TechData(id));
});

router.get('/CustomJob', async (req: Request, res: Response) => {
    res.send(await JC.CustomJobScript());
});

router.get('/CustomJobFilter/:status', async (req: Request, res: Response) => {
    const status = req.params.status;
    res.send(await JC.CustomJobScriptFilter(status));
});

// gets all jobs done on a specific problem
router.get('/JobByProblem/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JC.SelectByProblem(id));
});

// Gets all jobs assigned to an employee
router.get('/JobByEmp/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JC.SelectByTechnician(id));
});

// Gets all jobs made by an admin
router.get('/JobByAdmin/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JC.SelectByAdmin(id));
});

// Gets all jobs done for a client
router.get('/ClientJob/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JC.SelectClientJobs(id));
});

// Inserts a job
router.post('/InsertJob', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await JC.InsertJob(Data.ProblemId, Data.EmpId, Data.CreatedBy, Data.Description, Data.Start, Data.End));
});

// Updates a job (Give all values even if they don't change)
router.put('/UpdateJob/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await JC.UpdateJob(id, Data.ProblemId, Data.EmpId, Data.CreatedBy, Data.Description, Data.Start, Data.End));
});

// Updates a job (Give all values even if they don't change)
router.put('/UpdateJobCustom/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await JC.CustomJobUpdate(id, Data.ProblemId, Data.EmpId, Data.Description, Data.Start, Data.End));
});

// Deletes a job
router.delete('/DeleteJob/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JC.DeleteJob(id));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// JOB DESCRIPTION TABLE
const JDC = new JobDescriptionController();

// Gets the entire table
router.get('/AllJD', async (req: Request, res: Response) => {
    res.send(await JDC.SelectAll());
});

// Gets all descriptions for specific jobs
router.get('/JDByJob/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JDC.SelectByJob(id));
});

// Gets all descriptions for specific jobs
router.get('/JDStatus/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JDC.CustomJDScript(id));
});

// Inserts a job description
router.post('/InsertJD', async (req: Request, res: Response) => {
    const Data = req.body;
    // res.send(JSON.stringify({ "Message": Data.Description }));
    res.send(await JDC.InsertJD(Data.JobId, Data.Status, Data.Description));
});

// Updates a job description (Give all values even if they don't change)
router.put('/UpdateJD/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await JDC.UpdateJD(id, Data.jobId, Data.Status, Data.Description));
});

// Deletes a job description
router.delete('/DeleteJD/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await JDC.DeleteJD(id));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PROBLEM TABLE
const PC = new ProblemController();

// Gets the entire table
router.get('/AllProblem', async (req: Request, res: Response) => {
    res.send(await PC.SelectAll());
});

// Gets unassigned problems
router.get('/UnassignedProblem', async (req: Request, res: Response) => {
    res.send(await PC.UnassignedProblem());
});

// Gets all problems for specific client
router.get('/ProblemByClient/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await PC.SelectByClient(id));
});

// Gets all problems for specific admin creator
router.get('/ProblemByCreate/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await PC.SelectByCreator(id));
});

// Inserts a problem
router.post('/InsertProblem', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await PC.InsertProblem(Data.ClientId, Data.CreatedBy, Data.Description, Data.Start, Data.End));
});

// Updates a problem (Give all values even if they don't change)
router.put('/UpdateProblem/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await PC.UpdateProblem(id, Data.ClientId, Data.CreatedBy, Data.Description, Data.Start, Data.End));
});

// Deletes a problem
router.delete('/DeleteProblem/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await PC.DeleteProblem(id));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PROBLEM CALL TABLE
const PCC = new ProblemCallController();

// Gets the entire table
router.get('/AllPC', async (req: Request, res: Response) => {
    res.send(await PCC.SelectAll());
});

// Gets all calls for a specific problem
router.get('/CallsByProblem/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await PCC.CallsByProblem(id));
});

// Gets all problems for a specific call
router.get('/ProblemsByCall/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await PCC.ProblemsByCall(id));
});

// Inserts a Problem Call
router.post('/InsertPC', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await PCC.InsertPC(Data.ProblemId, Data.CallId));
});

// Deletes a problem call
router.delete('/DeletePC/:CallId/:ProbId', async (req: Request, res: Response) => {
    const Callid = parseInt(req.params.Callid);
    const ProbId = parseInt(req.params.ProbId);
    res.send(await PCC.DeletePCByCall(Callid, ProbId));
});

// Deletes a problem call by the problem ID
router.delete('/DeleteByProblemId/:ProbId', async (req: Request, res: Response) => {
    const ProbId = parseInt(req.params.ProbId);
    res.send(await PCC.DeleteByProblem(ProbId));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SERVICE TABLE
const SC = new ServiceController();

// Gets the entire table
router.get('/AllService', async (req: Request, res: Response) => {
    res.send(await SC.SelectAll());
});

// Inserts a Service
router.post('/InsertService', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await SC.InsertService(Data.Name, Data.Price, Data.Description));
});

// Updates a service (Give all values even if they don't change)
router.put('/UpdateService/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await SC.UpdateService(id, Data.Name, Data.Price, Data.Description));
});

// Deletes a service
router.delete('/DeleteService/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await SC.DeleteService(id));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SERVICE CONTRACT TABLE
const SCC = new ServiceContractController();

// Gets the entire table
router.get('/AllSC', async (req: Request, res: Response) => {
    res.send(await SCC.SelectAll());
});

// router.get('/SelectSByCId/:id', async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     res.send(await SCC.SelectSByCId(id));
// });

// router.get('/SelectSByCId/:id', async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     res.send(await SCC.SelectSByCId(id));
// });

// Gets all services for a specific contract
router.get('/ServiceByContract/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await SCC.ServiceByContract(id));
});

// Gets all contracts for a specific service
router.get('/ContractByService/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await SCC.ContractByService(id));
});

// Inserts a service contract
router.post('/InsertSC', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await SCC.InsertSC(Data.ServiceId, Data.ContractId));
});

// Deletes a service contract
router.delete('/DeleteSC/:ServId/:ContrId', async (req: Request, res: Response) => {
    const ServId = parseInt(req.params.ServId);
    const ContrId = parseInt(req.params.ContrId);
    res.send(await SCC.DeleteSC(ServId, ContrId));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TECHNICIAN SSKILL TABLE
const TSC = new TechnicianSkillController();

// Gets the entire table
router.get('/AllTS', async (req: Request, res: Response) => {
    res.send(await TSC.SelectAll());
});

// Gets all skills for a technician
router.get('/SkillByTechnician/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await TSC.SelectByTechnician(id));
});

// Inserts a technician skill
router.post('/InsertTS', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await TSC.InsertTS(Data.EmpId, Data.Skill));
});

// Updates a technician skill (Give all values even if they don't change)
router.put('/UpdateTS/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await TSC.UpdateTS(id, Data.EmpId, Data.Skill));
});

// Deletes a technician skill
router.delete('/DeleteTS/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await TSC.DeleteTS(id));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/AllTS', async (req: Request, res: Response) => {
    res.send(await operations.AllTechnicianSkill());
});

router.get('/AllCalls', async (req: Request, res: Response) => {
    res.send(await operations.AllCalls());
});

router.get('/AllUsers', async (req: Request, res: Response) => {
    res.send(await operations.AllUsers());
});

router.get('/AllContracts', async (req: Request, res: Response) => {
    res.send(await operations.AllContracts());
});

router.get('/AllEmployees', async (req: Request, res: Response) => {
    res.send(await operations.AllEmployees());
});

router.get('/AllProblems', async (req: Request, res: Response) => {
    res.send(await operations.AllProblems());
});

router.get('/AllClientContracts', async (req: Request, res: Response) => {
    res.send(await operations.AllClientContracts());
});

router.get('/AllServiceContracts', async (req: Request, res: Response) => {
    res.send(await operations.AllServiceContracts());
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Client Table
const ClientC = new ClientController();

router.get('/AllClient', async (req: Request, res: Response) => {
    res.send(await ClientC.AllClient());
});

router.get('/ClientById/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await ClientC.FindClientById(id));
});

//Insert new client into client table
router.post('/InsertClient', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await ClientC.InsertClient(Data.Name, Data.Type, Data.Active, Data.BankAccount, Data.AccountHolder, Data.Bank, Data.AccountType, Data.Street, Data.Suburb, Data.City, Data.Notes));
});

//Update Client based on ID
router.put('/UpdateClient/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await ClientC.UpdateClient(id, Data.Name, Data.Type, Data.Active, Data.BankAccount, Data.AccountHolder, Data.Bank, Data.AccountType, Data.Street, Data.Suburb, Data.City, Data.Notes));
});

//Delete client based on ID
router.delete('/DeleteClient/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await ClientC.DeleteClient(id));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CallCentre Table
const CallC = new CallCentreController();

router.get('/AllCallCentre', async (req: Request, res: Response) => {
    res.send(await CallC.AllCallCentre());
});

//Insert new cc into client table
router.post('/InsertCallCentre', async (req: Request, res: Response) => {
    const Data = req.body;
    //console.log(Data);
    res.send(await CallC.InsertCallCentre(Data.CliendId, Data.EmpId, Data.Start, Data.End));
});

//Delete cc based on ID
router.delete('/DeleteCallCentre/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CallC.DeleteCallCentre(id));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Employee Table
const EC = new EmployeeController();

router.get('/AllEmployee', async (req: Request, res: Response) => {
    res.send(await EC.AllEmployee());
});

router.get('/GetTechnician', async (req: Request, res: Response) => {
    res.send(await EC.GetTechnicians());
});

router.get('/GetEmpById/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await EC.GetEmployeeById(id));
});

router.get('/LoginEmp/:cred/:pass', async (req: Request, res: Response) => {
    const cred = req.params.cred;
    const pass = req.params.pass;
    res.send(await EC.LoginEmployee(cred, pass));
});

//Insert new employee into client table
router.post('/InsertEmployee', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await EC.InsertEmployee(Data.Name, Data.Surname, Data.Username, Data.Phone, Data.Email, Data.Password, Data.Title,
                                     Data.StreetName, Data.Suburb, Data.City, Data.BankAccount, Data.AccountHolder,
                                    Data.Bank, Data.AccountType, Data.TaxNumber));
                                    
});

//Update employee based on ID
router.put('/UpdateEmployee/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await EC.UpdateEmployee(id, Data.Name, Data.Surname, Data.Username, Data.Phone, Data.Email, Data.Password, Data.Title,
                                    Data.StreetName, Data.Suburb, Data.City, Data.BankAccount, Data.AccountHolder,
                                    Data.Bank, Data.AccountType, Data.TaxNumber));
});

//Update employee password based on ID
router.put('/UpdateEmpPassword/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await EC.UpdateEmpPassword(id, Data.Password));
});

//Update employee account
router.put('/UpdateEmployeeAcc/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await EC.UpdateEmployeeAcc(id, Data.Name, Data.Surname, Data.Username, Data.Phone, Data.Email,
                                    Data.StreetName, Data.Suburb, Data.City, Data.BankAccount, Data.AccountHolder,
                                    Data.Bank, Data.AccountType, Data.TaxNumber));
});

//Delete employee based on ID
router.delete('/DeleteEmployee/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await EC.DeleteEmployee(id));
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Contract Table
const CtrC = new contractController();

router.get('/AllContract', async (req: Request, res: Response) => {
    res.send(await CtrC.AllContract());
});


//Insert new contract into client table
router.post('/InsertContract', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await CtrC.InsertContract(Data.CreatedBy, Data.ContractName, Data.StartDate, Data.EndDate, Data.Price, Data.Status, Data.PriorityLevel));
});

//Update Contract based on ID
router.put('/UpdateContract/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await CtrC.UpdateContract(id, Data.CreatedBy, Data.ContractName, Data.StartDate, Data.EndDate, Data.Price, Data.Status, Data.PriorityLevel));
});

//Delete contract based on ID
router.delete('/DeleteContract/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CtrC.DeleteContract(id));
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ClientUser Table
const CUC = new ClientUserController();
//Select All
router.get('/AllClientUser', async (req: Request, res: Response) => {
    res.send(await CUC.AllClientUser());
});

router.get('/LoginUser/:cred/:pass', async (req: Request, res: Response) => {
    const cred = req.params.cred;
    const pass = req.params.pass;
    res.send(await CUC.LoginUser(cred, pass));
});

router.get('/UserById/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CUC.FindUserById(id));
});

router.get('/UserById/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CUC.FindUserById(id));
});

//Select on ClientId
router.get('/SelectCUByCId/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CUC.SelectCUByCId(id));
});

//Select combined
router.get('/SelectUserDataByClientUserId/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CUC.SelectUserDataByClientUserId(id));
});

//Insert new user into client table
router.post('/InsertClientUser', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await CUC.InsertClientUser(Data.ClientId, Data.Position, Data.Name, Data.Surname, Data.Username, Data.Phone, Data.Email,
                                        Data.Password, Data.Street, Data.Suburb, Data.City, Data.Notes));
});

//Update user based on ID
router.put('/UpdateClientUser/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await CUC.UpdateClientUser(id, Data.ClientId, Data.Position, Data.Name, Data.Surname, Data.Username, Data.Phone, Data.Email,
                                        Data.Password, Data.Street, Data.Suburb, Data.City, Data.Notes));
});

//Update user based on ID for Admin
router.put('/AdminUpdateClientUser/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const Data = req.body;
    res.send(await CUC.UpdateAdminClientUser(id, Data.Position, Data.Name, Data.Surname, Data.Phone, Data.Email
                                            ,Data.Street, Data.Suburb, Data.City, Data.Notes));
});

//Delete user based on ID
router.delete('/DeleteClientUser/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CUC.DeleteClientUser(id));
});

//Delete All based on ClientId
router.delete('/DeleteAllCUByCId/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CUC.DeleteAllCUByCId(id));
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ClientContract Table
const CCC = new ClientContractController();

router.get('/AllClientContract', async (req: Request, res: Response) => {
    res.send(await CCC.AllClientContract());
});

router.get('/UnusedContract/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CCC.UnusedCCByCId(id));
});

//Select by ClientID
router.get('/SelectCCByCId/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CCC.SelectCCByCId(id));
});


//Insert new user into client table
router.post('/InsertClientContract', async (req: Request, res: Response) => {
    const Data = req.body;
    res.send(await CCC.InsertClientContract(Data.ClientId, Data.ContractId));
});

//Delete user based on ID
router.delete('/DeleteClientContract/:CID/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const CID = parseInt(req.params.CID);
    res.send(await CCC.DeleteClientContract(id, CID));
});

//Delete all by ClientId
router.delete('/DeleteAllCCByCId/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.send(await CCC.DeleteAllCCByCId(id));
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default router;