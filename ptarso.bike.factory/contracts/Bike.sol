// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

// import "./access/roles/AdminRole.sol";
import "./ownership/Ownable.sol";
import "./bike/BikeModel.sol";

contract Bike is 
            BikeModel
                ,Ownable
            //    AdminRole

                //  ,BikeTypeModel
                //  BikeColorModel 
                 {
    BikeModelStruct private _bike;
    event BikeStatusUpdated(address bike, StatusBikeEnum status);
    event BikeTransfered(address bike);

    constructor (BikeModelStruct memory bikeModelStruct)
    {
        _bike = bikeModelStruct;
        _bike.Status = StatusBikeEnum.USED;
    }

    function getBike() public view returns (BikeModelStruct memory bike) {
        return _bike; // bikeViewModelStruct
    }

    function setBikeStatus(StatusBikeEnum status, uint weiValue) 
    public 
    onlyOwner
    returns (bool result){

        emit BikeStatusUpdated(address(this), status);
        _bike.Status = status;
        _bike.WeiValue = weiValue;
        return true;
    }

    function transferBike() public onlyOwner returns (bool result) {
        emit BikeTransfered(address(this));
        _bike.Status = StatusBikeEnum.USED;
        return true;
    }

}