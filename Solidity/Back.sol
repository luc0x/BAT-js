// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

contract Back2
{
    address private deployer;
    address[] private companies;
    address[] private routes;


    constructor()
    {
        deployer = msg.sender;
    }

    function addCompany(address company_address) public 
    {
        require(msg.sender == deployer, "Only owner can call this function.");
        companies.push(company_address);
    }

    function addRoute(address route_address) public
    {
        require(msg.sender == deployer, "Only owner can call this function.");
        routes.push(route_address);
    }

    function getCompanies() public view returns (address [] memory)
    {
        return companies; 
    }

    function getRoutes() public view returns (address [] memory)
    {
        return routes; 
    }

    function getAddress() public view returns(address)
    {
        return address(this);
    }
}
