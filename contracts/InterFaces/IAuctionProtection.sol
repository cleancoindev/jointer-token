pragma solidity ^0.5.9;

import './IERC20Token.sol';

contract IAuctionProtection {
    
    function lockEther(address _which) public payable returns (bool);

    function depositToken(address _from, address _which, uint256 _amount)
        public
        returns (bool);

    function lockTokens(
        IERC20Token _token,
        address _from,
        address _which,
        uint256 _amount
    ) public returns (bool);
    
    function unLockTokens() external returns (bool);
    
    function stackToken() external returns (bool);
    
    function cancelInvestment() external returns (bool);
    
}