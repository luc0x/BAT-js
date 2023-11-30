import { connect, setAccount } from "./Global.js";
import { Back } from "./Back.js";

//  
const IP_ADDRESS = '127.0.0.1';
const PORT_NUMBER = 7545;
const PRIVATE_KEY = "3b027ea11a25b38831bf4210198c54149b9bb8adabac560dd5e9a774ae2378f3";
// 


// 0.0.0.0 7545
connect(IP_ADDRESS, PORT_NUMBER);
setAccount(PRIVATE_KEY); 

const main = async () =>
{
    const back = new Back(); // creamos el objeto
    await back.deploy(); // Deployeamos el contrato
    
    
    console.log("Se deployeo el contrato back correctamente");
    console.log("Direccion " + await back.getAddress());

    const company = await back.createCompany("Hola"); // Funcion para crear la compania
    
    console.log("Se deployeo la compania correctamente");    
    console.log("Nombre " + await company.getName());
    console.log("Direccion " + await company.getAddress());
    
}
main();
