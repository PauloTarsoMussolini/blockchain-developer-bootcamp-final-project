// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract CompanyModel {
    enum StatusCompanyEnum {ACTIVE, INACTIVE, BLOCKED}
    struct CompanyModelStruct{
        string Name;
        StatusCompanyEnum Status;
        bool Exist;
        address Owner;
    }
}