// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "../ownership/Ownable.sol";
contract BikeTypeModel is Ownable {

    event AddedBikeType(uint indexed bikeType, string _type);

    string[] private bikeTypeArray;
    constructor(){
        bikeTypeArray.push('None');
    }

    function addType(string memory bikeType) public onlyOwner returns (uint id){
        bikeTypeArray.push(bikeType);
        emit AddedBikeType(bikeTypeArray.length -1, bikeType);
        return bikeTypeArray.length;
    }

    function getTypeById(uint id) public view returns (string memory name){
        return bikeTypeArray[id];
    }

    function hasType(uint bikeType) public view returns (bool has){
        return (bikeTypeArray.length > bikeType && bikeType > 0);
    }

    function getBikeTypeList() public view returns (string[] memory typeList){
        return bikeTypeArray;
    }
}