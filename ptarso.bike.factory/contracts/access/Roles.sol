// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

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