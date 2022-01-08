// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "../ownership/Ownable.sol";

contract BikeColorModel is Ownable {
    event AddedBikeColor(uint indexed _bikeColor, string color);
    
    string[] private bikeColorArray;
    constructor(){
        bikeColorArray.push('Undefined');
    }
    
    function addColor(string memory color) public onlyOwner returns (uint id){
        require(
            !hasColorName(color),
            "Color already exist"
        );
        bikeColorArray.push(color);
        emit AddedBikeColor(bikeColorArray.length -1, color);
        return bikeColorArray.length -1;
    }

    function getColorById(uint id) public view returns (string memory name){
        return bikeColorArray[id];
    }

    function hasColorId(uint bikeColor) public view returns (bool has){
        return (bikeColorArray.length > bikeColor && bikeColor > 0);
    }

    function hasColorName(string memory bikeColor) public view returns (bool has){
        
        for (uint i = 0; i < bikeColorArray.length; i++){
            if (keccak256(abi.encodePacked(bikeColorArray[i])) == keccak256(abi.encodePacked(bikeColor)))
                return true;
        }
        return false;
    }
}