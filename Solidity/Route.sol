// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

struct SensorsData
{
    int16 temperature;
    uint8 humidity;
    uint16 weight;
    int32 timestamp;
}
contract Route
{
    string private name;
    address private routeAddress;
    int32 private startTime;
    int32 private endTime;
    bool private finished;
    SensorsData[] private sensorsData;
    address private deployer;
    
    // Updater
    constructor(int32 _time, string memory _name)
    {
        deployer = msg.sender;
        routeAddress = address(this);
        name = _name;
        finished = false;
        startTime = _time;
    }

    function update(int16 _temperature, uint8 _humidity, uint16 _weight, int32  _date) public
    {
        require(!finished, "The route has ended");
        require(msg.sender == deployer, "Only owner can call this function.");
        sensorsData.push(SensorsData(_temperature, _humidity, _weight, _date));
    }

    function end(int32 _time) public
    {
        require(msg.sender == deployer, "Only owner can call this function.");
        finished = true;
        endTime = _time;
    }

    // Getters 
    function getResume() public view returns(bool, int32, int32)
    {
        return (finished, startTime, endTime);
    }

    function getAddress() public view returns(address)
    {
        return routeAddress;
    }

    function getRawData() public view returns(SensorsData[] memory)
    {
        return sensorsData;
    }

    function getDataByIndex(uint256 index) public view returns(SensorsData memory)
    {
        require(index < uint256(sensorsData.length), "Index out of range");
        return  sensorsData[index];
    }     

    function getName() public view returns(string memory)
    {
        return name;
    }
}