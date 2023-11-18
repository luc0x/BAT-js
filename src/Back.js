import {web3, account} from "./Global.js";
import { Company } from "./Company.js";
import { Route } from "./Route.js";
// Contract builds
import back_build from './../builds/Back2.json' assert  { type: "json" };



export class Back
{
    get = (address) => 
    {
        this.back = new web3.eth.Contract(
            back_build.abi,
            address
        );
    }

    deploy = async () =>
    {
        this.back = new web3.eth.Contract(
            back_build.abi
        );

        this.back.options.data = back_build.data.bytecode.object;

        const deploy_tx = this.back.deploy(
            {
                arguments: []
            }
        );

        const deployed_contract = await deploy_tx.send(
            {
                from: account.address,
                data: deploy_tx.encodeABI(),
                gasLimit: 6721975,
                gasPrice: 20000000000,
                nonce: await web3.eth.getTransactionCount(account.address),
            }
        ).on(
            'error',
            (error, receipt)=>
            {
                console.log('Error a la hora de subir el contrato', error, receipt);
            }
        );
        this.get(deployed_contract._address);
    }

    createCompany = async (name) =>
    {
        const company = new Company();

        await company.deploy(name);
        const company_address = await company.getAddress();
        
        this.back.methods.addCompany(company_address).send({from: account.address});
        
        return company;
    }

    initializeRoute = async (company, time, name) =>
    {
        const route = new Route();
        
        await route.deploy(time,name);
        const route_address = await route.getAddress();
        
        company.addRoute(route_address);
        
        this.back.methods.addRoute(route_address).send({from: account.address}); 

        return route;
    }

    updateRoute = async (route, temperature, humidity, weight, date) =>
    {
        await route.update(temperature, humidity, weight, date);
    }

    endRoute = async (route, time) =>
    {
        await route.end(time);
    }

    getCompanyByName = async (name, reciver_function) =>
    {
        const companies = await this.back.methods.getCompanies().call({from: account.address});
        var return_company = new Company();
        companies.forEach(async (address) =>
        {
            const company = new Company();

            console.log(await company.getName());
            if(await company.getName() == name)
            {
                return_company = company;
            }
        })
        return await return_company; 
    }

    getAddress  = async () =>
    {
        return this.back.methods.getAddress().call({from: account.address});
    }
}

