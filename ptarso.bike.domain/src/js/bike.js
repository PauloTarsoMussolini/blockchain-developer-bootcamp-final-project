$(function() {
    fnAnima('All Bikes');
    $('#btnConfirm').unbind('click').bind("click", ( () => {
            CreateBike();
    }));
    $('#btnConfirm').css("display","none");

    forSale = false;
    getbikes();
});




// function CreateBike(value) {
//     contract.methods.CreateBike(value).send( {from: account}).then( (tx) => { 
//       ModalDialog("CreateBike", "CreateBike sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
//       document.getElementById('bikeBike').value = '';
//     }).catch( ( error ) =>{
//       ModalDialog("CreateBike", "CreateBike ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     );
// }