// Source code to interact with smart contract

//connection with node



/* const Web3 = require("web3");
const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}

alert(ethEnabled);

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
} else
{
	console.log('MetaMask is  NOT installed!');
}
 */


// window.addEventListener('load', function() {

//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof web3 !== 'undefined') {
//     // Use Mist/MetaMask's provider
//     web3js = new Web3(web3.currentProvider);
//   } else {
//     console.log('No web3? You should consider trying MetaMask!')
//     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//     web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }


// })



if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }

// Variáveis preenchidas a partir da publicação do contrato
// var contractAddress = '0xcf2980fb984046ed27370281a73c65692be6f0c9';
// var contractAddress = '0x1BDaAD303eD3ff56aa86203e7Cc4701265267cf0';
// var contractAddress = '0x4b18C95A8d4eE5E2e425C5e5e010BDcBAec604bE';
// var contractAddress = '0x66ba7222eEDbeF8782b9C16F1841F472275cFaEA';
// var contractAddress = '0x3AD4875Ebc281950e3B139271FCad883C63dAd70';
// var contractAddress = '0xeDb82571ac5A4102A2b77519013C60B0eC58E498';
// var contractAddress = '0x9e220834ddBe707821177B2C7d5f3F7DC24E92b3';
// var contractAddress = '0xA41348825921337b0126beed1f87B1f8BE6bca6B';
var contractAddress = '0x4F0C61De489ba3C2B15511cf1D90AC6818418334';

// var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_bikeForSell","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_baseAddress","type":"address"}],"name":"getBase","outputs":[{"internalType":"contract Bike","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeList","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GetBikeListByOwner","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeToSellList","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct[]","name":"companyList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');
// var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"GetBikeListByOwner","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeList","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeToSellList","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct[]","name":"companyList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
// var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeList","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GetBikeListByOwner","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeToSellList","outputs":[{"components":[{"internalType":"uint256","name":"CreateDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"WeiValue","type":"uint256"},{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"string","name":"Type","type":"string"},{"internalType":"string","name":"Color","type":"string"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');
// var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"GetBikeListByOwner","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeList","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeToSellList","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
// var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeList","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GetBikeListByOwner","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeToSellList","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct[]","name":"bikeList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');
// var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"scope","type":"uint8"}],"name":"getBikeList","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeListByOwner","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
// var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"forSell","type":"bool"}],"name":"getBikeList","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeListByOwner","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');
// var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[{"internalType":"address","name":"bikeAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"forSell","type":"bool"}],"name":"getBikeList","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeListByOwner","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');
var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instancecAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[{"internalType":"address","name":"bikeAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"forSell","type":"bool"}],"name":"getBikeList","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeListByOwner","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');


//baseContract = web3.eth.contract(abi);
//contract = baseContract.at(contractAddress);
contract = new web3.eth.Contract(abi, contractAddress);

// Busca contas
web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
        alert("Ocorreu um erro ao buscar suas contas.");
        return;
    }

    if (accs.length == 0) {
        alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
        return;
    }

    accounts = accs;
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
    console.log(contract);
    console.log(accs.length);
});

// window.ethereum.on('accountsChanged', function (accounts) {
//   alert("Change Account");
//   // Time to reload your interface with accounts[0]!
// })


// web3.eth.on('accountsChanged', function (accounts) {
//   // Time to reload your interface with accounts[0]!
//   console.log(accounts[0])
//  });





// function getDecimals(){
//   contract.methods.decimals().call().then( ( info )=>  { 
//       console.log( "info: ", info ) 
//       document.getElementById('tokenDecimals').innerHTML = info;
//   });
// }
// function getSymbol(){
//   contract.methods.symbol().call().then( ( info )=>  { 
//       console.log( "info: ", info ) 
//       document.getElementById('tokenSymbol').innerHTML = info;
//   });
// }
// function getTotalSupply(){
//   contract.methods.totalSupply().call().then( ( info )=>  { 
//       console.log( "info: ", info ) 
//       document.getElementById('tokenTotalSupply').innerHTML = info;
//   });
// }

// function getAllowance(owner, spender){
//     contract.methods.allowance(owner, spender).call().then( ( info )=>  { 
//         console.log( "info: ", info ) 
//         document.getElementById('allowedValue').innerHTML = info;
//     });
// }
// function getBalanceOf(address){
//     contract.methods.balanceOf(address).call().then( ( info )=>  { 
//         console.log( "info: ", info ) 
//         document.getElementById('balanceValue').innerHTML = info;
//     });
// }

// function setMintTo(address, value) {
//     contract.methods.mint(address, value).send( {from: account}).then( (tx) => { 
//       ModalDialog("Mint", "Mint sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
//       document.getElementById('value').value = '';
//     }).catch( ( error ) =>{
//       ModalDialog("Mint", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     );
// }
// function setApprove(spender, value) {
//     contract.methods.approve(spender, value).send( {from: account}).then( (tx) => { 
//         console.log( "Transaction: ", tx ); 
//     }).catch( ( error ) =>{
//       ModalDialog("setApprove", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     );
//     document.getElementById('value').value = '';
// }
// function SetDecreaseAllowance(spender, value) {
//     contract.methods.increaseAllowance(spender, value).send( {from: account}).then( (tx) => { 
//         console.log( "Transaction: ", tx ); 
//     }).catch( ( error ) =>{
//       ModalDialog("SetDecreaseAllowance", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     );
//     document.getElementById('value').value = '';
// }
// function SetIncreaseAllowance(spender, value) {
//     contract.methods.decreaseAllowance(spender, value).send( {from: account}).then( (tx) => { 
//         console.log( "Transaction: ", tx ); 
//     }).catch( ( error ) =>{
//       ModalDialog("SetIncreaseAllowance", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     );
//     document.getElementById('value').value = '';
// }
// function SetTransfer(to, value) {
//     contract.methods.transfer(to, value).send( {from: account}).then( (tx) => { 
//         console.log( "Transaction: ", tx ); 
//     }).catch( ( error ) =>{
//       ModalDialog("SetTransfer", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     );
//     document.getElementById('value').value = '';
// }
// function SetTransferFrom(from, to, value) {
//     contract.methods.transferFrom(from, to, value).send( {from: account}).then( (tx) => { 
//         console.log( "Transaction: ", tx ); 
//     }).catch( ( error ) =>{
//       ModalDialog("SetTransferFrom", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     );
//     document.getElementById('value').value = '';
// }



function addressValid(address){
  if(!web3.utils.isAddress(address)){
    ModalDialog("Address invalid", "Address " + address + " is invalid!");
    return false;
  }
  return true;
}

function valueValid(value){
  if(value < 1){
    ModalDialog("Value invalid", "Value must be greater than 0");
    kendo.ui.progress($("#grdBike"), false);
    $("#messageTx").css("display","none");
    return false;
  }
  return true;
}

function textValid(value){
  if((!value || value.length === 0 )){
    ModalDialog("Value invalid", "Value must be diferent than empty");
    kendo.ui.progress($("#grdBike"), false);
    $("#messageTx").css("display","none");
    return false;
  }
  return true;
}

function fnGetBikeEnum(val){
  console.log(val);
  var ret;
  switch (val) {
      case "0":
          ret = "NEW";
          break;
      case "1":
          ret = "USED";
          break;
      case "2":
          ret = "FOR_SALE";
          break;
      case "3":
          ret = "STOLEN";
          break;
      case "4":
          ret = "BLOCKED";
          break;
      case "5":
          ret = "ENDED";
          break;
  }
  return ret;
}

var bikeId;
var weiValue;
var bikeOwner;
var forSale;

function getbikes(){
 
  contract.methods.getBikeList(forSale).call().then( ( bikes )=>  { 

    const FIELD_ID  = 0;
    const FIELD_OWNER = 1;
    const FIELD_BIKE_TYPE = 2;
    const FIELD_BIKE_COLOR = 3;
    const FIELD_BIKE_STATUS = 4;
    const FIELD_WEI_VALUE = 5;

    let BikeStructs = []
    for (let i = 0; i < bikes[0].length; i++) {
        const Bike = {
            Id:  bikes[FIELD_ID][i],
            Owner: bikes[FIELD_OWNER][i],
            BikeType: bikes[FIELD_BIKE_TYPE][i],
            BikeColor: bikes[FIELD_BIKE_COLOR][i],
            BikeStatus: bikes[FIELD_BIKE_STATUS][i],
            WeiValue: bikes[FIELD_WEI_VALUE][i]

        }
        BikeStructs.push(Bike)
    }
      
    var dataSourceBike = new kendo.data.DataSource({
    data: BikeStructs,
    pageSize: 10,
    schema: {
    model: {
        fields: {                             
                Id: {editable: false  },
                Owner: {editable: false},
                BikeType: {editable:false},
                BikeColor: {editable:false},
                BikeStatus: {editable:false},
                WeiValue: {editable:false, type:"number"}
                }
        }
    }	
    });	

    $("#grdBike").kendoGrid({
            dataSource:   dataSourceBike,
            change: function(e) {
              var selectedRows = this.select();
              var rowData = this.dataItem(selectedRows[0]);
              
              $('#wndOperacao').css("display",(forSale ? "block" : "none"));
              bikeId = rowData.Id;
              weiValue = rowData.WeiValue;
              bikeOwner = rowData.Owner;
            },
            height: 455,
            width: '95%',
            sortable: true,
            filterable: true,
            selectable: true,
            columnMenu: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "Id",
                    title: "Id",
                    hidden: true
                },  {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "Owner",
                    title: "Owner",
                    width: 350
                },  {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "BikeType",
                    title: "Type",
                    width: 100
                },  {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "BikeColor",
                    title: "Color",
                    width: 100
                },  {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "BikeStatus",
                    title: "Status",
                    template: function(dataItem) {
                        return  kendo.htmlEncode(fnGetBikeEnum(dataItem.BikeStatus));
                      },
                    width: 100
                }, {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "WeiValue",
                    title: "Wei Value",
                    format: "{0:n0}",
                    width: 100
                }, {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                            template: " <input type='button' class='k-button info' name='info' value='...' />",
                            
                    title: "Details",

                    width: 80
                }
            ]
    });
});
}

function setSelectedRow(gridName){
  var grid = $("#"+gridName).data("kendoGrid"); 

  var models = grid.dataSource.data();
  
  var model = models[models.length - 1]; 
  var lastRowUid = model.uid;
  
  var row = grid.table.find("[data-uid=" + lastRowUid + "]");
  
  grid.select(row);
}

function ModalDialog(titulo, texto) {
  var random = Math.random().toString().replace('.', '');
  var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
      '        <div class="modal-dialog">                                                                                 ' +
      '            <div class="modal-content">                                                                            ' +
      '                <div class="modal-header">                                                                         ' +
      '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
      '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
      '                </div>                                                                                             ' +
      '                <div class="modal-body">                                                                           ' +
      '                    <p>' + texto + '</p>                                                                           ' +
      '                </div>                                                                                             ' +
      '                <div class="modal-footer">                                                                         ' +
      '                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>              ' +
      '                                                                                                                   ' +
      '                </div>                                                                                             ' +
      '            </div><!-- /.modal-content -->                                                                         ' +
      '  </div><!-- /.modal-dialog -->                                                                                    ' +
      '</div> <!-- /.modal -->                                                                                        ';

  $('body').append(texto);
  $('#' + random).modal('show');
}

function confirmOp(titulo, texto){
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                           ' +
    '        <div class="modal-dialog">                                                                                 ' +
    '            <div class="modal-content">                                                                            ' +
    '                <div class="modal-header">                                                                         ' +
    '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
    '                </div>                                                                                             ' +
    '                <div class="modal-body">                                                                           ' +
    '                    <p>' + texto + '</p>                                                                           ' +
    '                </div>                                                                                             ' +
    '                <div class="modal-footer">                                                                         ' +
    '                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>             ' +
    '                    <button onclick="OpConfirm()" type="button" class="btn btn-default" data-dismiss="">Confirm</button>             ' +
    '                </div>                                                                                             ' +
    '            </div><!-- /.modal-content -->                                                                         ' +
    '  </div><!-- /.modal-dialog -->                                                                                    ' +
    '</div> <!-- /.modal -->                                                                                            ';

    $('body').append(texto);
    $('#' + random).modal('show');
  
}

