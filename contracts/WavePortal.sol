// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;
    mapping (uint=>address) public CunstomerAdress;
    mapping (address => uint256) public lastWaveAt;
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("We have been constructed!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public{

        // require(
        //     lastWaveAt[msg.sender] + 15 minutes < block.timestamp,
        //     "Wait 15m"
        // );
        console.log(lastWaveAt[msg.sender] + 30 seconds,"::::", block.timestamp);
        require(
            lastWaveAt[msg.sender] + 30 seconds < block.timestamp , 
            "Must wait 30 seconds before waving again."
        );

        lastWaveAt[msg.sender] = block.timestamp;

        totalWaves = totalWaves + 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender,_message , block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100; 

        console.log("Random # generated: %d", seed);

        //Give 50% chance that the user wins the prize
        if(seed < 50){
            console.log("%s, won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than has the contract has"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewWave(msg.sender, block.timestamp, _message);
    }
    function getAllWaves()public view returns(Wave[]memory){
        return waves;
    }   

    function getTotalWaves() public view returns (uint256){
        console.log("we have %d total wave!", totalWaves);
        return totalWaves;
    }
    function getAddress(uint _i) public view returns (address) {
        return CunstomerAdress[_i];
    }
}