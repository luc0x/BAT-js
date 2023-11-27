import { Web3 } from 'web3';

// Contract Builds


export var web3 = new Web3();
export var account;

export const connect = (host, port) => // Se conecta a la red
{
    web3.setProvider('http://' + host + ':' + port);
    web3.eth.net.isListening().catch(e => console.error("[BAT] Ha ocurrido un error al intentar conectarse a la red:", e.message)); 
};

export const setAccount = (private_key) => // crea la address que se va a estar utilizando
{
    account = web3.eth.accounts.privateKeyToAccount(
        "0x" + private_key
    );

    web3.eth.accounts.wallet.add(account);
}
