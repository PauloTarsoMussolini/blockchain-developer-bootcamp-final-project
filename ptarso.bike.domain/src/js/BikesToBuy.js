$(function() {
    fnAnima('Bikes for Sale');
    $('#btnBuyConfirm').unbind('click').bind("click", ( () => {
      BuyBike();
}));
    $('#btnAdd').css("display","none");
    $('#btnBuyConfirm').css("display","block");
    $('#wndOperacao').css("display","none");

    forSale = true;
    getbikes();

});


function BuyBike() {

  if (bikeOwner == account){
    ModalDialog("BuyBike Error", "Can't Buy this Bike. Its Yours! <br /> <br />" );
    return;
  }
  kendo.ui.progress($("#grdBike"), true);
  $("#messageTx").css("display","block");
    contract.methods.buyBike(parseInt(bikeId)).send( {from: account, value: parseInt(weiValue)}).then( (tx) => { 
      ModalDialog("BuyBike", "Buy Bike sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
      getbikes();
    }).catch( ( error ) =>{
      ModalDialog("BuyBike", "Buy Bike ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERR: ", error ); 
      }
    ).finally(() => {
      kendo.ui.progress($("#grdBike"), false);
      $("#messageTx").css("display","none");
  });
}