pragma solidity ^0.4.24;

contract Voting {


    // owner of the contract
    address public owner;

    //White list of addresses that are allowed to by a token
    mapping(address => bool) public whitelist;

    // Index of unique addresses
    uint256 public addressCount = 0;

    // Map of unique addresses
    mapping(uint256 => address) public addressMap;
    mapping(address => bool) public addressAvailabilityMap;

    mapping(address => string) public votingMap;

    /*
     * modifier which gives specific rights to owner
     */
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }


    /*
    *
    *modifier which gives possibility to purchase
    *
    */
    modifier onlyWhiteList(address _address){
        require(whitelist[_address] == true);
        _;
    }


    /**
     * Fail if address already voted
     */
    modifier isVoteCasted(address _address){
        bytes memory tempEmptyStringTest = bytes(votingMap[_address]); // Uses memory
        if (tempEmptyStringTest.length != 0) {
            require(false);
        }
        _;
    }


    /**
     * Constructor
     */
    constructor() public{
        owner = msg.sender;
    }


    function vote(string ballot) public onlyWhiteList(msg.sender) isVoteCasted(msg.sender){

        votingMap[msg.sender] = ballot;

    }

    function getVote(address voterAddress) public view returns (string){
        return votingMap[voterAddress];
    }



    //Unique address managment
    /**
   * Add address to unique map if it is not added
   */
    function addAddressToUniqueMap(address _addr) private returns (bool) {
        if (addressAvailabilityMap[_addr] == true) {
            return true;
        }

        addressAvailabilityMap[_addr] = true;
        addressMap[addressCount++] = _addr;

        return true;
    }


    /**
    * Get address by index from map of unique addresses
    */
    function getUniqueAddressByIndex(uint256 _addressIndex) public view returns (address) {
        return addressMap[_addressIndex];
    }






    //
    //
    // White list
    //

    /*
     * function for adding address to whitelist
     * @_whitelistAddress - address to add
     */
    function addToWhiteList(address _whitelistAddress) public onlyOwner {

        addAddressToUniqueMap(_whitelistAddress);

        whitelist[_whitelistAddress] = true;
    }

    // /*
    //  * function for removing address from whitelist
    //  * @_whitelistAddress - address to remove
    //  */
    // function removeWhiteList(address _whitelistAddress) public onlyOwner {
    //     delete whitelist[_whitelistAddress];
    // }
}