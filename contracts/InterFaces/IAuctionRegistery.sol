pragma solidity ^0.5.9;

contract AuctionRegisteryContracts{
    
    bytes32 internal constant MAIN_TOKEN = "MAIN_TOKEN";
    bytes32 internal constant AUCTION_FORMULA = "AUCTION_FORMULA";
    bytes32 internal constant DOWNSIDE_PROTECTION = "DOWNSIDE_PROTECTION";
    
    bytes32 internal constant WHITE_LIST = "WHITE_LIST";
    bytes32 internal constant AUCTION = "AUCTION";
    bytes32 internal constant LIQUADITY = "LIQUADITY";
    bytes32 internal constant CURRENCY = "CURRENCY";
    bytes32 internal constant INDIDUAL_BONUS = "INDIDUAL_BONUS";
    bytes32 internal constant VAULT = "VAULT";

    bytes32 internal constant TAG_ALONG = "TAG_ALONG";
    
}

contract IAuctionRegistery {
    function getAddressOf(bytes32 _contractName) external view returns (address);
}

