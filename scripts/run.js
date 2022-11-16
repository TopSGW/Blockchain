
const main = async () =>{
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract addy:", waveContract.address);

///////////////////////// Get Contract Balance /////////////////////
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));
/////////////////Send Wave ///////////////////////////////

    let waveTxn =await waveContract.wave("This is wave #1");
    await waveTxn.wait();

    let waveTxn2 =await waveContract.wave("This is wave #2");
    await waveTxn2.wait();
   
    /*
    * Get Contract balance to see what happened!
    */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
}
const runMain = async() =>{
    try{
        await main();
        process.exit(0);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

runMain();