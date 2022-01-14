const Assert = require("truffle-assertions");
const Artifact = artifacts.require("../contracts/BikeFactory");

contract("AdminRole", accounts => {
    let contractInstance;

    const ownerAddress = accounts[0];
    const AddressOne = accounts[1];
    const AddressTwo = accounts[2];
    const AddressThree = accounts[3];
    const AddressFour = accounts[4];

    before(async () => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await Artifact.new();
    });

    describe('Constructor', async () => {
        it("must register owner as Admin at deploy", async () => {
            const result = await Assert.createTransactionResult(
                contractInstance,
                contractInstance.transactionHash
            );
            Assert.eventEmitted(result, "AdminAdded");
        });
    });

    describe('addAdmin', async () => {
        it('should throw if sender is not admin', async () => {
            await Assert.reverts(
                contractInstance.addAdmin(AddressOne, { from: AddressTwo }),
                'Caller does not have the admin role'
            );
        });

        it('add success', async () => {
            await contractInstance.addAdmin(AddressOne, { from: ownerAddress })
            const result = await contractInstance.isAdmin(AddressOne);

            assert.equal(true, result, 'not seted owner as admin');
        });
    });

    describe('isAdmin', async () => {
        it('is admin', async () => {
            await contractInstance.addAdmin(AddressOne, { from: ownerAddress })
            const result = await contractInstance.isAdmin(AddressOne);

            assert.equal(true, result, 'not seted addressOwner as admin');
        });

        it('is not admin', async () => {
            const result = await contractInstance.isAdmin(AddressTwo);

            assert.equal(false, result, 'not seted AddressOne as admin');
        });
    });

    describe('listAdmins', async () => {
        it('list admins', async () => {
            await contractInstance.addAdmin(AddressOne, { from: ownerAddress })
            await contractInstance.addAdmin(AddressTwo, { from: ownerAddress })
            const result = await contractInstance.admins();

            assert.equal(3, result.length, 'correct admins number');
            assert.equal(AddressOne, result[1], 'correct admin AddressOne');
            assert.equal(AddressTwo, result[2], 'correct admin AddressTwo');
        });
    });

    describe('removeAdmin', async () => {
        it('should throw if sender is not admin', async () => {
            await Assert.reverts(
                contractInstance.removeAdmin(ownerAddress, { from: AddressOne }),
                'Caller does not have the admin role'
            );
        });

        it('should throw if sender try to remove yourself', async () => {
            await Assert.reverts(
                contractInstance.removeAdmin(ownerAddress, { from: ownerAddress }),
                'Caller can not renounce itself'
            );
        });

        it('remove success', async () => {
            await contractInstance.addAdmin(AddressOne, { from: ownerAddress });
            const resultBeforeRemove = await contractInstance.isAdmin(AddressOne);
            await contractInstance.removeAdmin(AddressOne, { from: ownerAddress });
            const resultAfterRemove = await contractInstance.isAdmin(AddressOne);

            assert.equal(true, resultBeforeRemove, 'not seted AddressOne as admin');
            assert.equal(false, resultAfterRemove, 'not removed AddressOne as admin');
        });
    });
});