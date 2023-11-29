import {web3, account} from "./Global.js";
import { Company } from "./Company.js";
import { Route } from "./Route.js";
// Contract builds

import path from "path";
import fs from 'fs';
const bPath = path.resolve("./builds/Back2.json");

var back_build = JSON.parse(fs.readFileSync(bPath));



export class Back
{
    get = (address) => // Obtiene un contrato que ya fue emitido
    {
        this.back = new web3.eth.Contract(
            back_build.abi,
            address
        );
    }

    deploy = async () => //  Crea un nuevo contrato y lo emite
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

    updateRoute = async (route, temperature, humidity, weight, time) =>
    {
        await route.update(temperature, humidity, weight, time);
    }

    endRoute = async (route, time) =>
    {
        await route.end(time);
    }

    getCompanies = async () =>
    {
        return await this.back.methods.getCompanies().call({from: account.address});
    }

    getRoutes = async () => 
    {
        return await this.back.methods.getRoutes().call({from: account.address});
    }

    getAddress  = async () =>
    {
        return this.back.methods.getAddress().call({from: account.address});
    }
}

