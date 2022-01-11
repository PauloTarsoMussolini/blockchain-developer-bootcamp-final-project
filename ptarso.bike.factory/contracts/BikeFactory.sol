// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./access/roles/AdminRole.sol";
import "./bike/BikeModel.sol";
import "./Bike.sol";
import "./bike/BikeTypeModel.sol";
import "./bike/BikeColorModel.sol";
import "./company/CompanyModel.sol";

contract BikeFactory is
AdminRole,

            BikeModel,
            BikeTypeModel,
            BikeColorModel,
            CompanyModel {

    struct BikeInstance {
        address instanceAddress;
        address instanceAddressOwner;
    }

    mapping(uint256 => BikeInstance) private _bikeInstanceMap;
    uint private _bikeInstanceMapCounter; 

    mapping(address => CompanyModelStruct) private _companyMap;
    address[] private _companyAddresses; 

    address[] private _bikeForSell;

    event BikeGenerated(
        address indexed instancecAddress
    );
    event TransferedBike(
        address indexed bike,
        address from,
        address to
    );
    event CompanyCreated(
        address indexed instanceAddress,
        string name
    );

    constructor(){

        addColor("White");
        addColor("Yellow");
        addColor("Blue");
        addColor("Greeen");
        addColor("Black");
        addColor("Red");

        addType("Urban");
        addType("Montain");
        addType("Electric");
        addType("Hybrid");
    }

    function createCompany(address companyAddress, string memory name) public onlyOwner{
     require(companyAddress != address(0), 'Create Company: account address is not valid');
     require(
         !_companyMap[companyAddress].Exist,
         "Company address already exists"
         );
        CompanyModelStruct storage newCompany = _companyMap[companyAddress];
        newCompany.Name = name;
        newCompany.Status = StatusCompanyEnum.ACTIVE;
        newCompany.Exist = true;
        newCompany.Owner = companyAddress;
        _companyAddresses.push(companyAddress);

        emit CompanyCreated(
            companyAddress,
            name
        );
    }

    function getCompanyByAddress(address companyAddress) public view returns (CompanyModelStruct memory company){
        return _companyMap[companyAddress];
    }

    function getCompanyList() 
        public view 
        returns(string[] memory, StatusCompanyEnum[] memory, address[] memory){

        string[] memory names = new string[](_companyAddresses.length);
        StatusCompanyEnum[] memory status = new StatusCompanyEnum[](_companyAddresses.length);
        address[] memory owners = new address[](_companyAddresses.length);

        //CompanyModelStruct[] memory companyModelList = new CompanyModelStruct[](_companyAddresses.length);

        for (uint i = 0; i < _companyAddresses.length; i++){
             CompanyModelStruct storage company = _companyMap[_companyAddresses[i]];
         names[i] = company.Name;
         status[i] = company.Status;
         owners[i] = company.Owner;
        }
        return (names, status, owners);
    }

    function generateBike(BikeModelStruct memory bikeModel) 
    public
         onlyAdmin
    {
        require(hasType(bikeModel.TypeId) == true, "Invalid Type!");
        require(hasColorId(bikeModel.ColorId) == true, "Invalid Color!");
        require(
            _companyMap[msg.sender].Exist,
            "Company address not exists"
         );

        // bikeModel.Type = getTypeById(bikeModel.TypeId);
        // bikeModel.Color = getColorById(bikeModel.ColorId);

        Bike instance = new Bike(
            bikeModel
        );

        address instanceAddress = address(instance);
        _bikeInstanceMapCounter++;
        _bikeInstanceMap[_bikeInstanceMapCounter] = BikeInstance(
            instanceAddress,
            msg.sender
        );
        emit BikeGenerated(instanceAddress);
    }

    function getBikeInstance(uint id) public view returns 
    (BikeModelStruct memory bike)
    {
      return getBase(_bikeInstanceMap[id].instanceAddress).getBike();
    }

    function getBikeList() public view 
    returns (
        uint256[] memory id,
        address[] memory owner,
        string[] memory bikeType,
        string[] memory bikeColor,
        StatusBikeEnum[] memory bikeStatus,
        uint256[] memory WeiValue)
        {
        uint256[] memory ids = new uint256[](_bikeInstanceMapCounter);
        address[] memory owners = new address[](_bikeInstanceMapCounter);
        string[] memory types = new string[](_bikeInstanceMapCounter);
        string[] memory colors = new string[](_bikeInstanceMapCounter);
        StatusBikeEnum[] memory status = new StatusBikeEnum[](_bikeInstanceMapCounter);
        uint256[] memory weiValues = new uint256[](_bikeInstanceMapCounter);
        
        for (uint i = 0; i < _bikeInstanceMapCounter; i++){
            BikeModelStruct memory bike = getBase(_bikeInstanceMap[i+1].instanceAddress).getBike();
            ids[i] = i+1;
            types[i] = getTypeById(bike.TypeId);
            status[i] = bike.Status;
            colors[i] = getColorById(bike.ColorId);
            weiValues[i] = bike.WeiValue;
            owners[i] = _bikeInstanceMap[i+1].instanceAddressOwner;
        }
        return (ids, owners, types, colors, status, weiValues);
    }

    function putBikeToSell(uint id, uint weiValue) public returns (bool result){
        require(
            _bikeInstanceMap[id].instanceAddressOwner == msg.sender, 
            "Only Owner's Bike can sell Bike"
            );
        _bikeForSell.push(_bikeInstanceMap[id].instanceAddress);
        return getBase(_bikeInstanceMap[id].instanceAddress).setBikeStatus(StatusBikeEnum.FOR_SALE, weiValue);

    }

    function getBikeToSellList() public view returns (BikeModelStruct[] memory bikeList){
        BikeModelStruct[] memory bikeModelList = new BikeModelStruct[](_bikeForSell.length);
        for (uint i = 0; i < _bikeForSell.length; i++){
            bikeModelList[i] = getBase(_bikeForSell[i]).getBike();
        }
        return bikeModelList;
    }
    function GetBikeListByOwner() public view returns (BikeModelStruct[] memory bikeList)
    {
        BikeModelStruct[] memory bikeModelList = new BikeModelStruct[](_bikeInstanceMapCounter);

        for (uint i = 1; i <= _bikeInstanceMapCounter; i++){
            if (_bikeInstanceMap[i].instanceAddressOwner == msg.sender){
                bikeModelList[i-1] = getBase(_bikeInstanceMap[i].instanceAddress).getBike();
            }
        }
        return bikeModelList;
    }

    function buyBike(uint id) public payable returns (bool result){
        require(
            getBase(_bikeInstanceMap[id].instanceAddress).getBike().Status == StatusBikeEnum.FOR_SALE,
            
            "Bike not for Sell"
            
        );
        address _to = _bikeInstanceMap[id].instanceAddressOwner; 
        require(
            _to != msg.sender, 
            "Owner's Bike can not buy your Bike"
        );

        require(
            msg.value == getBase(_bikeInstanceMap[id].instanceAddress).getBike().WeiValue,
            "Insuficient or wrong value"
        );

        (bool sent, ) = _to.call{ value: msg.value }("");
        require(sent, "Failed to send Ether");
        
        address from = _bikeInstanceMap[id].instanceAddressOwner;
        _bikeInstanceMap[id].instanceAddressOwner = msg.sender;

        for (uint i = 0; i < _bikeForSell.length; i++){
            if (_bikeForSell[i] == _bikeInstanceMap[id].instanceAddress) {
                for (uint j = i; j < _bikeForSell.length-1; j++){
                    _bikeForSell[j] = _bikeForSell[j+1];
                }
                _bikeForSell.pop();
            }
        }
        emit TransferedBike(
            _bikeInstanceMap[id].instanceAddress,
            from,
            msg.sender
        );
        return getBase(_bikeInstanceMap[id].instanceAddress).transferBike();
    }

    function getBase(address _baseAddress) internal pure returns(Bike){
        Bike baseContract = Bike(_baseAddress);
        return baseContract;
    }

}