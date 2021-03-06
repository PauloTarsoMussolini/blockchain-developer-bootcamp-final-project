// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "../Roles.sol";
import "../../ownership/Ownable.sol";


contract AdminRole is Ownable {
    using Roles for Roles.Role;

    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);

    Roles.Role private _admins;

    modifier onlyAdmin() {
        require(
            isAdmin(msg.sender),
            "Caller does not have the admin role"
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
            "Caller can not renounce itself"
        );
        _admins.remove(_account);
        emit AdminRemoved(_account);
    }
}
