// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

contract Company
{
    string private name;
    address private deployer;
    address private companyAddress;
    address[] private routes;


    constructor(string memory _name)
    {
        deployer = msg.sender;
        name = _name;
        companyAddress = address(this);
    }

    function addRoute(address route) public 
    {
        require(msg.sender == deployer, "Only owner can call this function.");
        routes.push(route);           
    }

    function getRoute(uint32 index) public view returns (address)
    {
        return routes[index];
    }

    function getRoutes() public view returns (address[] memory)
    {
        return routes;
    }

    function getAddress() public view returns(address)
    {
        return companyAddress;
    }
    
    function getName() public view returns (string memory)
    {
        return name;
    }

}