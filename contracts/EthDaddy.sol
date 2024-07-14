// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract EthDaddy is ERC721{

    address public owner;
    uint256 public maxSupply;
    uint256 public totalSupply;

    struct Domain{
        string name;
        uint256 cost;
        bool isOwned;
    }

    mapping(uint256 => Domain) domains;

    constructor()ERC721("EthDaddy", "ETD"){
        owner=msg.sender;
    } 

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }
    function list(string memory _name, uint _cost) public onlyOwner{
        maxSupply++;
        domains[maxSupply]=Domain(_name, _cost, false);
    }
    function getDomain(uint256 _id) public view returns(Domain memory){
        return domains[_id];
    }
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    function withdraw() public onlyOwner{
        (bool success, )=owner.call{value: address(this).balance}("");
        require(success);
    }
    function mint(uint256 _id) public payable{
        require(_id!=0);
        require(_id<=maxSupply);
        require(domains[_id].isOwned == false);
        require(msg.value >= domains[_id].cost);

        domains[_id].isOwned = true;
        totalSupply++;
        _safeMint(msg.sender, _id);
    }

}