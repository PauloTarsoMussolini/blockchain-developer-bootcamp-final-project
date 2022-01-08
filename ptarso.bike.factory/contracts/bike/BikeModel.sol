// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract BikeModel {
    enum StatusBikeEnum {NEW, USED,FOR_SALE, STOLEN, BLOCKED, ENDED}
    struct BikeModelStruct {
            uint256 CreateDate;
            uint256 EndDate;
            uint256 WeiValue;
            StatusBikeEnum Status;
            uint8 TypeId;
            uint8 ColorId;
            string Type;
            string Color;
    }
}
