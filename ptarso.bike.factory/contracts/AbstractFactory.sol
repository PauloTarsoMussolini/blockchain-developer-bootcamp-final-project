pragma solidity >=0.7.0 <0.9.0;

import "./ownership/Ownable.sol";
import "./lifecycle/Pausable.sol";

import "./access/roles/WhitelistManagerRole.sol";
import "./permissions/SingleUseWhitelist.sol";

contract AbstractFactory is Ownable, Pausable, WhitelistManagerRole {
    event AddedToWhitelist(address indexed addr);
    event RemovedFromWhitelist(address indexed addr);

    using SingleUseWhitelist for SingleUseWhitelist.Data;

    SingleUseWhitelist.Data whitelist;

    modifier onlyWhitelisted(address addr) {
        require(
            isOnWhitelist(addr),
            "AbstractFactory: wallet is not whitelisted"
        );
        _;
    }

    function kill(
    ) public
        onlyOwner
    {
        selfdestruct(msg.sender);
    }

    function addToWhitelist(address addr) public onlyWhitelistManager {
        whitelist.addWhitelist(addr);
        emit AddedToWhitelist(addr);
    }

    function removeFromWhitelist(address addr) public onlyWhitelistManager {
        whitelist.removeWhitelist(addr);
        emit RemovedFromWhitelist(addr);
    }

    function isOnWhitelist(address addr) public view returns (bool) {
        return whitelist.hasInWhitelist(addr);
    }
}