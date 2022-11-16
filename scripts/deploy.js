const main= async() =>{

    const WavePortal = await hre.ethers.getContractFactory("WavePortal");
    const waveContract =await WavePortal.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });

    await waveContract.deployed();
    await waveContract.deployTransaction.wait()
    console.log("Contract deployed to :", waveContract.address);
}
const runMain = async()=>{
    try{
        await main();
        process.exit(0);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

runMain();