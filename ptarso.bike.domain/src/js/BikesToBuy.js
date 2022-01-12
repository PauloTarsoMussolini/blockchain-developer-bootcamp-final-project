$(function() {
    fnAnima('Bikes for Sale');
    $('#btnBuyConfirm').unbind('click').bind("click", ( () => {
        ConfirmBuy();
}));
    $('#btnAdd').css("display","none");
    $('#btnBuyConfirm').css("display","block");
    $('#wndOperacao').css("display","none");

    forSale = true;
    getbikes();

});

function BuyBike(id, value) {
    contract.methods.buyBike(parseInt(id, value)).send( {from: account, value: parseInt(value) }).then( (tx) => { 
      ModalDialog("CreateBike", "CreateBike sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
      document.getElementById('bikeBike').value = '';
    }).catch( ( error ) =>{
      ModalDialog("CreateBike", "CreateBike ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    );
}