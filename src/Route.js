import { web3, account } from "./Global.js";

import fs from 'fs';
import path from "path";
const rPath = path.resolve("./builds/Route.json");

var route_build = JSON.parse(fs.readFileSync(rPath));

export class Route
{
    get = (address) => 
    {
        this.route = new web3.eth.Contract(
            route_build.abi,
            address
        );
    }

    deploy = async (time, name) =>
    {
        this.route = new web3.eth.Contract(
            route_build.abi
        );

        this.route.options.data = route_build.data.bytecode.object;

        const deploy_tx = this.route.deploy(
            {
                arguments: [time, name]
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

    update = async (temperature, humidity, weight, date) =>
    {
        return await this.route.methods.update(temperature, humidity, weight, date).send({from: account.address}); 
    }

    end = async (time) =>
    {
        return await this.route.methods.end(time).send({from: account.address}); 
    }

    getResume = async () =>
    {
        return await this.route.methods.getResume().call({from: account.address});
    }

    getAddress = async () => 
    {
        return await this.route.methods.getAddress().call({from: account.address});
    }

    getRawData = async () => 
    {
        return await this.route.methods.getRawData().call({from: account.address});
    }

    getDataByIndex = async (index) =>
    {
        return await this.route.methods.getDataByIndex(index).call({from: account.address});
    }

    getName = async (name) =>
    {
        return await this.route.methods.getName().call({from: account.address});
    }
}   