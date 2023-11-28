import { connect, setAccount } from "./Global.js";
import { Back } from "./Back.js";

var private_key = "3b027ea11a25b38831bf4210198c54149b9bb8adabac560dd5e9a774ae2378f3";

// 0.0.0.0 7545
connect('127.0.0.1', 7545);
setAccount(private_key); 

const main = async () =>
{
    const back = new Back();
    await back.deploy();
    console.log(await back.getAddress()); 
    
    /*
    const route = await back.initializeRoute(company, 0, "Ruta del pollo K");
    console.log(await route.getName());
    */
    // await back.deploy("6771a698cd261858da13d6df424a884d4520bb48e4c733e914b044dc72e09383");    
    
}
main();
/*
    const company = new Company();
    
    await company.deploy("0x33550bf453Df0083bC8741F73683276403904f7B", "6771a698cd261858da13d6df424a884d4520bb48e4c733e914b044dc72e09383", "pollo");
    
    company.getAddress().then((value) => {
        console.log(value);
    })
*/
/* 
const back_inst = new Back();

back_inst.deploy("0x33550bf453Df0083bC8741F73683276403904f7B", "6771a698cd261858da13d6df424a884d4520bb48e4c733e914b044dc72e09383");
*/

/*
const company = new Company("0xfb684F76828d53ced2C0E23847ff0cD11a909832");
company.setWalletAddress("0x33550bf453Df0083bC8741F73683276403904f7B");

company.getRoutes().then((value) => 
{
    console.log(value); 
});



let company_inst = new Company("0xfb684F76828d53ced2C0E23847ff0cD11a909832");
company_inst.setWalletAddress("0x33550bf453Df0083bC8741F73683276403904f7B");


// deploy("0x33550bf453Df0083bC8741F73683276403904f7B", "6771a698cd261858da13d6df424a884d4520bb48e4c733e914b044dc72e09383");

const route = new Route("0xCcE809b8EAf7a1a16665D2414ebDfd72B6C0f6D5");
route.setWalletAddress("0x33550bf453Df0083bC8741F73683276403904f7B");
/*
route.update(1, 2, 3, 4).then((value)=>
{
    console.log(value);
});
*/
/*
route.getResume().then((value)=>
{
    console.log(value);
});
*/
/*
route.getDataByIndex(1).then((value)=>{
    console.log(value);
});
*/