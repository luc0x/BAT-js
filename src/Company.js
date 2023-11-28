import path from "path";
import { web3, account } from "./Global.js";
import fs from 'fs';
const cPath = path.resolve("./builds/Company.json");

var company_build = JSON.parse(fs.readFileSync(cPath));

export class Company
{
    get = (address) =>
    {
        this.company = new web3.eth.Contract(
            company_build.abi,
            address
        );
    }

    deploy = async (name) =>
    {
        this.company = new web3.eth.Contract(
            company_build.abi
        )

        this.company.options.data = company_build.data.bytecode.object;
        const deploy_tx = this.company.deploy(
            {
                arguments: [name]
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
            });
        this.get(deployed_contract._address);         
    }

    addRoute = async (address) => 
    {
        return await this.company.methods.addRoute(address).send({from: account.address}); 
    }

    getName = async () =>
    {
        return await this.company.methods.getName().call({from: account.address});
    }

    getRoute = async (index) =>
    {
        return await this.company.methods.getRoute(index).call({from:account.address});
    }
    

    getRoutes = async () => 
    {   
        return await this.company.methods.getRoutes().call({from: account.address});;
    }

    getAddress = async ()=>
    {
        return await this.company.methods.getAddress().call({from: account.address});
    }

}