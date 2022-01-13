$(function() {
    fnAnima('All Bikes');
    $('#btnConfirm').unbind('click').bind("click", ( () => {
            CreateBike();
    }));
    $('#btnConfirm').css("display","none");

    forSale = false;
    getbikes();
});

$('#btnIncluir').click(function() {
    var myWindow = $("#wndOperacao");

    myWindow.kendoWindow({
        width: "900px",
        maxHeight: 600,
        position: {
            top: 50,
            left: "20%"
        },
        title: "Bike Detail",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    
    }).data("kendoWindow").open();
    myWindow.data("kendoWindow").open();		  
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