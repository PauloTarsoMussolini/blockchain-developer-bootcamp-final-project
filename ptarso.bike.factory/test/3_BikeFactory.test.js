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
    describe('Put Bike to Sell', async () => {
        it('Should throw Sell Bike if sender is not bike Owner', async () => {
            await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });
            const result =  await contractInstance.generateBike(Bike, { from: ownerAddress });

            await Assert.reverts(
                contractInstance.putBikeToSell(1, 12345, { from: addressOne }),
                'Only Owners Bike can sell Bike'
            );
        });

        it('Put bike to sell success', async () => {
            await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });
            await contractInstance.generateBike(Bike, { from: ownerAddress });

            const result = await contractInstance.putBikeToSell(1, 12345, { from: ownerAddress });

            assert.equal(true, Boolean(result));
            // Assert.eventEmitted(
            //     result,
            //     'BikePlacedToSell',
            //     event =>
            //         event.bike == 1);
        });

    });
    describe('Buy Bike', async () => {
        it('Should throw Buy Bike if sender is your own bike', async () => {
            await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });
            await contractInstance.generateBike(Bike, { from: ownerAddress });
            await contractInstance.putBikeToSell(1, 12345, { from: ownerAddress });

            await Assert.reverts(
                contractInstance.buyBike(1, { from: ownerAddress }),
                'Owners Bike can not buy your Bike'
            );
        });
        it('Should throw Buy Bike if bike is not for sell', async () => {
            await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });
            await contractInstance.generateBike(Bike, { from: ownerAddress });

            await Assert.reverts(
                contractInstance.buyBike(1, { from: addressOne }),
                'Bike not for Sell'
            );
        });
        it('Buy Bike Success', async () => {
            await contractInstance.createCompany(ownerAddress, "CompanyName", { from: ownerAddress });
            await contractInstance.generateBike(Bike, { from: ownerAddress });
            await contractInstance.putBikeToSell(1, 12345, { from: ownerAddress });
            const result = await contractInstance.buyBike(1, { from: addressOne, value: 12345 });
            Assert.eventEmitted(
                result,
                'TransferedBike',
                event =>
                    event.to === addressOne);

        });
    });
        describe('Bike Color and Type', async () => {
        
        it('Shoud throw Add Color if sender is not Owner', async () => {
            await Assert.reverts(
                contractInstance.addColor('New Color', { from: addressOne }),
                'Caller is not the owner'
            );

        });
        it('Add Color Successfuly', async () => {
            const result = await contractInstance.addColor('New Color', { from: ownerAddress });
            Assert.eventEmitted(
                result,
                'AddedBikeColor',
                event =>
                    event.color === 'New Color');
        });
        it('Shoud throw Add Type if sender is not Owner', async () => {
            await Assert.reverts(
                contractInstance.addType('New Type', { from: addressOne }),
                'Caller is not the owner'
            );

        });
        it('Add Type Successfuly', async () => {
            const result = await contractInstance.addType('New Type', { from: ownerAddress });
            Assert.eventEmitted(
                result,
                'AddedBikeType',
                event =>
                    event._type === 'New Type');
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