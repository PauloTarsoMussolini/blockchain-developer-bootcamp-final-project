// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract BikeModel {
    enum StatusBikeEnum {NEW, USED,FOR_SALE, STOLEN, BLOCKED, ENDED}
    struct BikeModelStruct {
            // uint256 CreateDate;
            // uint256 EndDate;
            StatusBikeEnum Status;
            uint8 TypeId;
            uint8 ColorId;
            uint256 WeiValue;
            // string Type;
            // string Color;
    }
}
