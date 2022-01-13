const Assert = require("truffle-assertions");
const Artifact = artifacts.require("../contracts/BikeFactory");

const Bike = require('./mock/Bike.mock');
const BikeColorInvalid = require('./mock/BikeColorInvalid.mock');
const BikeTypeInvalid = require('./mock/BikeTypeInvalid.mock');

contract("BikeFactory", accounts => {
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

    // describe('Create Company', async () => {

    //     it('create Company success', async () => {
    //       //  await contractInstance.addAdmin(multuaAddress, { from: ownerAddress });
    //       //  await contractInstance.addMutual(multuaAddress, { from: ownerAddress });
    //         const result = await contractInstance.createCompany(ownerAddress, "CompanyName") });

    //         Assert.eventEmitted(
    //             result,
    //             'CompanyCreated',
    //             event =>
    //                 event.instancecAddress != '0x0000000000000000000000000000000000000000');
    // });
    describe('Bike Generation', async () => {
        it('Generate Bike success', async () => {
            // await contractInstance.addColor('White' , { from: ownerAddress });
            // await contractInstance.addColor('Silver' , { from: ownerAddress });
            // await contractInstance.addColor('Black' , { from: ownerAddress });
            // await contractInstance.addType('Urban' , { from: ownerAddress });
            // await contractInstance.addType('Montain' , { from: ownerAddress });
            // await contractInstance.addType('Electric' , { from: ownerAddress });
            // await contractInstance.addType('Electric' , { from: ownerAddress });
            await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });

            const result =  await contractInstance.generateBike(Bike, { from: ownerAddress });

            Assert.eventEmitted(
                result,
                'BikeGenerated',
                event =>
                    event.instanceAddress != '0x0000000000000000000000000000000000000000');

        });

        it('Should throw if sender is not Admin', async () => {

            await Assert.reverts(
                contractInstance.generateBike(Bike, { from: addressOne }),
                'Caller does not have the admin role'
            );
        });
        it('Should throw if sender is not Company', async () => {
            await contractInstance.addAdmin(addressOne, { from: ownerAddress });
            await Assert.reverts(
                contractInstance.generateBike(Bike, { from: addressOne }),
                'Company address not exists'
            );
        });
        it('Should throw if bike Color invalid', async () => {
            await contractInstance.addAdmin(addressOne, { from: ownerAddress });
            await Assert.reverts(
                contractInstance.generateBike(BikeColorInvalid, { from: addressOne }),
                'Invalid Color!'
            );
        });
        
        it('Should throw if bike Type invalid', async () => {
            await contractInstance.addAdmin(addressOne, { from: ownerAddress });
            await Assert.reverts(
                contractInstance.generateBike(BikeTypeInvalid, { from: addressOne }),
                'Invalid Type!'
            );
        });
        
    });

        // it('generate Bike success', async () => {
        //   //  await contractInstance.addAdmin(multuaAddress, { from: ownerAddress });
        //   //  await contractInstance.addMutual(multuaAddress, { from: ownerAddress });
        //     const result = await contractInstance.generateBike(Bike, { from: ownerAddress });

        //     Assert.eventEmitted(
        //         result,
        //         'BikeGenerated',
        //         event =>
        //             event.instancecAddress != '0x0000000000000000000000000000000000000000');
        // });
   // });

    // describe('consultMutuaBikes', async () => {

    //     it('should throw if sender is not multua or admin', async () => {
    //         Bike.mutual.wallets = [multuaAddress];

    //         await contractInstance.addAdmin(multuaAddress, { from: ownerAddress });
    //         await contractInstance.addMutual(multuaAddress, { from: ownerAddress });
    //         await contractInstance.generateBike(Bike, { from: multuaAddress });

    //         await Assert.reverts(
    //             contractInstance.consultMutuaBikes(multuaAddress, { from: clientAddress }),
    //             'BikeFactory: must be multual or Admin'
    //         );
    //     });

    //     it('list Bike instance address and who created by multua', async () => {
    //         Bike.mutual.wallets = [multuaAddress];

    //         await contractInstance.addAdmin(multuaAddress, { from: ownerAddress });
    //         await contractInstance.addMutual(multuaAddress, { from: ownerAddress });
    //         await contractInstance.generateBike(Bike, { from: multuaAddress });

    //         const result = await contractInstance.consultMutuaBikes(multuaAddress, { from: multuaAddress });

    //         assert.equal(result.ownerAddress, Bike.mutual.wallets[0], 'wrong owner');
    //         assert.equal(result.BikeAddress.length, 1, 'wrong length');
    //     });

    //     it('list Bike instance address and who created by admin', async () => {
    //         Bike.mutual.wallets = [multuaAddress];

    //         await contractInstance.addAdmin(multuaAddress, { from: ownerAddress });
    //         await contractInstance.addMutual(multuaAddress, { from: ownerAddress });
    //         await contractInstance.generateBike(Bike, { from: multuaAddress });

    //         const result = await contractInstance.consultMutuaBikes(multuaAddress, { from: ownerAddress });

    //         assert.equal(result.ownerAddress, Bike.mutual.wallets[0], 'wrong owner');
    //         assert.equal(result.BikeAddress.length, 1, 'wrong length');
    //     });
    // });
});