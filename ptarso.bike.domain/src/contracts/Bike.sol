// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;


contract Ownable {
  address private _owner;

  constructor() {
    _owner = msg.sender;
  }

  modifier onlyOwner() {
    require(isOwner(), 'Ownable: caller is not the owner');
    _;
  }

//   function owner(
//   ) public view returns (address) {
//     return _owner;
//   }

  function isOwner() internal view returns (bool) {
    return msg.sender == _owner;
  }
}
library Roles {

    struct Role {
        mapping(address => uint) _pointers;
        address[] _bearers;
    }

    function has(
        Role storage _role,
        address _account
    ) internal view returns (bool)
    {
        require(_account != address(0), 'Roles: account address is not valid');

        if (_role._bearers.length == 0) {
            return false;
        }

        return _role._bearers[_role._pointers[_account]] == _account;
    }

    function add(
        Role storage _role,
        address _account
    ) internal
    {
        require(!has(_role, _account), 'Roles: account already has role');
        _role._bearers.push(_account);
        _role._pointers[_account] = _role._bearers.length - 1;
    }

    function remove(
        Role storage _role,
        address _account
    ) internal
    {
        require(has(_role, _account), 'Roles: account does not have role');

        address keyToMove = _role._bearers[count(_role) - 1];
        uint rowToReplace = _role._pointers[_account];
        _role._pointers[keyToMove] = rowToReplace;
        _role._bearers[rowToReplace] = keyToMove;
        delete _role._pointers[_account];
        uint indexToRemove = _role._bearers.length -1;
        delete _role._bearers[indexToRemove];
    }

    function count(
        Role storage _role
    ) internal view returns (uint)
    {
        return _role._bearers.length;
    }

    function bearers(
        Role storage _role
    ) internal view returns (address[] memory)
    {
        return _role._bearers;
    }
}
// library SingleUseWhitelist {
//     enum State {NOT_USED, IN_USE, USED}

//     struct Data {
//         mapping(address => State) _whitelist;
//     }

//     function addWhitelist(Data storage self, address _address) public {
//         require(
//             _address != address(0),
//             "SingleUseWhitelist: address is not valid"
//         );
//         require(
//             self._whitelist[_address] == State.NOT_USED,
//             "SingleUseWhitelist: address already used or in use"
//         );

//         self._whitelist[_address] = State.IN_USE;
//     }

//     function removeWhitelist(Data storage self, address _address) public {
//         require(
//             _address != address(0),
//             "SingleUseWhitelist: address is not valid"
//         );
//         require(
//             self._whitelist[_address] == State.IN_USE,
//             "SingleUseWhitelist: address is not in use"
//         );

//         self._whitelist[_address] = State.USED;
//     }

//     function hasInWhitelist(Data storage self, address _address)
//         public
//         view
//         returns (bool)
//     {
//         return self._whitelist[_address] == State.IN_USE;
//     }
// }

contract AdminRole is Ownable {
    using Roles for Roles.Role;

    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);

    Roles.Role private _admins;

    modifier onlyAdmin() {
        require(
            isAdmin(msg.sender),
            "AdminRole: caller does not have the admin role"
        );
        _;
    }

    constructor()  {
        _internalAddAdmin(msg.sender);
    }

    function isAdmin(address _account) public view returns (bool) {
        return _admins.has(_account);
    }

    function admins() public view returns (address[] memory) {
        return _admins.bearers();
    }

    function addAdmin(address _account) public onlyAdmin {
        _internalAddAdmin(_account);
    }

    function removeAdmin(address _account) public onlyAdmin {
        _internalRemoveAdmin(_account);
    }

    function _internalAddAdmin(address _account) internal {
        _admins.add(_account);
        emit AdminAdded(_account);
    }

    function _internalRemoveAdmin(address _account) internal {
        require(
            _account != msg.sender,
            "AdminRole: caller can not renounce itself"
        );
        _admins.remove(_account);
        emit AdminRemoved(_account);
    }
}
contract Pausable is AdminRole {

    event Paused(address account);
    event Unpaused(address account);

    bool private _paused;

    modifier whenNotPaused() 
    {
        require(!_paused, "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "Pausable: not paused");
        _;
    }

    constructor() {}

    function paused(
    ) public view returns (bool) 
    {
        return _paused;
    }

    function pause(
    ) public 
        onlyAdmin 
        whenNotPaused 
    {
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpause(
    ) public 
        onlyAdmin 
        whenPaused 
    {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}
// contract WhitelistManagerRole is AdminRole {
//     using Roles for Roles.Role;

//     event WhitelistManagerAdded(address indexed account);
//     event WhitelistManagerRemoved(address indexed account);

//     Roles.Role private _informers;

//     modifier onlyWhitelistManager() {
//         require(
//             isWhitelistManager(msg.sender),
//             'WhitelistManagerRole: caller does not have the whitelist manager role'
//         );
//         _;
//     }

//     constructor()  {
//         _internalAddWhitelistManager(msg.sender);
//     }

//     function isWhitelistManager(address _account) public view returns (bool) {
//         return _informers.has(_account);
//     }

//     // function profitInformers() public view returns (address[] memory) {
//     //     return _informers.bearers();
//     // }

//     function addWhitelistManager(address _account) public onlyAdmin {
//         _internalAddWhitelistManager(_account);
//     }

//     function removeWhitelistManager(address _account) public onlyAdmin {
//         _internalRemoveWhitelistManager(_account);
//     }

//     function _internalAddWhitelistManager(address _account) internal {
//         _informers.add(_account);
//         emit WhitelistManagerAdded(_account);
//     }

//     function _internalRemoveWhitelistManager(address _account) internal {
//         _informers.remove(_account);
//         emit WhitelistManagerRemoved(_account);
//     }
// }

//import "../ownership/Ownable.sol";
contract BikeTypeModel is Ownable {

    event AddedBikeType(uint indexed bikeType, string _type);

    string[] private bikeTypeArray;
    constructor(){
        bikeTypeArray.push('Undefined');
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

contract BikeColorModel is Ownable {
    event AddedBikeColor(uint indexed _bikeColor, string color);
    
    string[] private bikeColorArray;
    constructor(){
        bikeColorArray.push('None');
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
    function getBikeColorList() public view returns (string[] memory colorList){
        return bikeColorArray;
    }
}

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

contract CompanyModel {
    enum StatusCompanyEnum {ACTIVE, INACTIVE, BLOCKED}
    struct CompanyModelStruct{
        string Name;
        StatusCompanyEnum Status;
        bool Exist;
        address Owner;
    }
}

contract Company is CompanyModel {

}
// import './bike/BikeModel.sol';
contract Bike is 
            BikeModel
            ,Ownable
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
        return _bike; 
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

// contract AbstractFactory is Ownable, Pausable {
//     event AddedToWhitelist(address indexed addr);
//     event RemovedFromWhitelist(address indexed addr);

//     using SingleUseWhitelist for SingleUseWhitelist.Data;

//     SingleUseWhitelist.Data whitelist;

//     modifier onlyWhitelisted(address addr) {
//         require(
//             isOnWhitelist(addr),
//             "AbstractFactory: wallet is not whitelisted"
//         );
//         _;
//     }

//     // function kill(
//     // ) public
//     //     onlyOwner
//     // {
//     //     selfdestruct(msg.sender);
//     // }

//     function addToWhitelist(address addr) public onlyWhitelistManager {
//         whitelist.addWhitelist(addr);
//         emit AddedToWhitelist(addr);
//     }

//     function removeFromWhitelist(address addr) public onlyWhitelistManager {
//         whitelist.removeWhitelist(addr);
//         emit RemovedFromWhitelist(addr);
//     }

//     function isOnWhitelist(address addr) public view returns (bool) {
//         return whitelist.hasInWhitelist(addr);
//     }
// }
contract BikeFactory is
AdminRole,
// Ownable, 
//             Pausable,
//            AbstractFactory,
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
    // uint _bikeForSellCounter;

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
        //addToWhitelist(msg.sender);

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

    //   generateBike([11111, 101010, 333, 0, 1, 1, "", ""]);

    }

    function createCompany(address companyAddress, string memory name) public onlyOwner{
        // require dont exist
     //   CompanyModelStruct _companyMap[companyAddress] = companyModel;
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

    function getCompanyList() public view returns(CompanyModelStruct[] memory companyList){
        CompanyModelStruct[] memory companyModelList = new CompanyModelStruct[](_companyAddresses.length);

        for (uint i = 0; i < _companyAddresses.length; i++){
            companyModelList[i] = _companyMap[_companyAddresses[i]];
        }
        return companyModelList;
    }



    // function getAll() public view returns (CompanyModelStruct[] memory){
    //     CompanyModelStruct[] memory ret = new CompanyModelStruct[](_companyAddresses.length);
    //     for (uint i = 0; i < _companyAddresses.length; i++) {
    //         ret[i] = _companyMap[_companyAddresses[i]];
    //     }
    //     return ret;
    // }

    function generateBike(BikeModelStruct memory bikeModel) 
    public
         onlyAdmin
        //  onlyWhitelisted(msg.sender)
    {
        require(hasType(bikeModel.TypeId) == true, "Invalid Type!");
        require(hasColorId(bikeModel.ColorId) == true, "Invalid Color!");
        require(
            _companyMap[msg.sender].Exist,
            "Company address not exists"
         );

        bikeModel.Type = getTypeById(bikeModel.TypeId);
        bikeModel.Color = getColorById(bikeModel.ColorId);

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

    function getBikeList() public view returns (BikeModelStruct[] memory bikeList){
        BikeModelStruct[] memory bikeModelList = new BikeModelStruct[](_bikeInstanceMapCounter);

        for (uint i = 1; i <= _bikeInstanceMapCounter; i++){
            bikeModelList[i-1] = getBase(_bikeInstanceMap[i].instanceAddress).getBike();
        }
        return bikeModelList;
    }

    function putBikeToSell(uint id, uint weiValue) public returns (bool result){
        require(
            _bikeInstanceMap[id].instanceAddressOwner == msg.sender, 
            "Only Owner's Bike can sell Bike"
            );
        _bikeForSell.push(_bikeInstanceMap[id].instanceAddress);
       // _bikeForSellCounter++;
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
     //   require(to != address(0), 'transferBike: account address to is not valid');
        require(
            getBase(_bikeInstanceMap[id].instanceAddress).getBike().Status == StatusBikeEnum.FOR_SALE,
            
            "buyBike: Bike not for Sell"
            
        );
        address _to = _bikeInstanceMap[id].instanceAddressOwner; 
        require(
            _to != msg.sender, 
            "Owner's Bike can not buy your Bike"
        );

        require(
            msg.value == getBase(_bikeInstanceMap[id].instanceAddress).getBike().WeiValue,
            "buyBike: Insuficient or wrong value"
        );

        (bool sent,) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        
        address from = _bikeInstanceMap[id].instanceAddressOwner;
        _bikeInstanceMap[id].instanceAddressOwner = msg.sender;

        // delete list
        // for (uint i = 0; i <= _bikeForSellCounter; i++){
        //     if (_bikeForSell[i] == from ) {
        //         for (uint j = i; j < _bikeForSellCounter; j++){
        //             _bikeForSell[j] = _bikeForSell[j+1];
        //         }
        //         _bikeForSell.pop();
        //         _bikeForSellCounter--;
        //     }
        // }

        for (uint i = 0; i < _bikeForSell.length; i++){
            if (_bikeForSell[i] == _bikeInstanceMap[id].instanceAddress) {
                for (uint j = i; j < _bikeForSell.length-1; j++){
                    _bikeForSell[j] = _bikeForSell[j+1];
                }
                _bikeForSell.pop();
            //    _bikeForSellCounter--;
            }
        }
       // _bikeForSell.pop();
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

/*
    struct BikeModelStruct {
            [12345, 67890,500,0,2,3, "", ""]
            [11111, 00000,333,0,1,1, "", ""]
            [22222, 00000,444,0,1,1, "", ""]
            [33333, 66666,777,0,1,1, "", ""]
    }

    company
    [0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, ["Company XPTOY",0 ,0]
    
    */
///////////////////////////////////