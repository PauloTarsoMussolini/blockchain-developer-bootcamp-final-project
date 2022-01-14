const Assert = require("truffle-assertions");
const Artifact = artifacts.require("../contracts/BikeFactory");


contract("Company", accounts => {
    let contractInstance;

    const ownerAddress = accounts[0];
    const addressOne = accounts[1];
    const addressTwo = accounts[2];

    before(async () => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await Artifact.new();
    });

    describe('Company Creation', async () => {
        it('Create Company success', async () => {
            const result = await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });

            Assert.eventEmitted(
                result,
                'CompanyCreated',
                event =>
                    event.instanceAddress != '0x0000000000000000000000000000000000000000');

        })
        it('Should throw if Company address already exists', async () => {
            const result = await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });

            await Assert.reverts(
                contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress }),
                'Company address already exists'
            );
        })
        it('Should throw if send is not Admin', async () => {
            await Assert.reverts(
                contractInstance.createCompany(ownerAddress, "CompanyName", { from: addressOne }),
                'Caller is not the owner'
            );
        })



    });

});