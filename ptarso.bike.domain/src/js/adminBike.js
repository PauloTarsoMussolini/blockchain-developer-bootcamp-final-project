$(function() {
    fnAnima('All Bikes');
    $('#btnAdd').unbind('click').bind("click", ( () => {
            AddBike();
    }));
    $('#btnAdd').css("display","block");


    getTypes();
    getColors();
    getbikes(false);
// const typeList = contract.methods.getBikeTypeList().call();
// console.log(typeList);

//     var categories = $("#categories").kendoDropDownList({
//         optionLabel: "Select Bike Type...",
//         TypeId: "TypeId",
//         TypeId: "TypeId",
//         height: 310,
//         dataSource: {
//             type: "odata",
//             serverFiltering: true,
//             transport: {
//                 dataType: "jsonp",
//               //  read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
//               read: typeList
//             }
//         }
//     }).data("kendoDropDownList");
// $(".k-pager-refresh").click(alert("oi"));
// $('.k-i-refresh').click( alert("oioi"));

});

function getTypes(){
    contract.methods.getBikeTypeList().call().then( ( types )=>  { 
      
        var Types = [];
        for (var i = 0; i < types.length; i++){
            Types.push({ "value": i, "text": types[i]},)
        }
        $("#bikeType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: Types,
            index: 0,
        });
       
    });
} 

function getColors(){
    contract.methods.getBikeColorList().call().then( ( types )=>  { 
      
        var Types = [];
        for (var i = 0; i < types.length; i++){
            Types.push({ "value": i, "text": types[i]},)
        }
        $("#bikeColor").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: Types,
            index: 0,
        });
       
    });
} 

$('#btnBikeConfirm').bind("click", ( () => {
    $(".k-icon.k-i-refresh").hide();
    if(valueValid($("#weiValue").val()))
        generateBike($("#bikeType").val(),$("#bikeColor").val(),$("#weiValue").val());
}));




function fnGetBikeEnum(val){
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

AddBike = function(){
    $('#wndOperacao').css("display","block");
    $('#bikeType').focus();
}


function generateBike(bikeType, bikeColor, weiValue) {
    
    kendo.ui.progress($("#grdBike"), true);
    $("#messageTx").css("display","block");


    contract.methods.generateBike([0,parseInt(bikeType),parseInt(bikeColor),parseInt(weiValue)]).send({from: account})
        .on('transactionHash', function(hash){
            console.log('transactionHash: ',hash);
            ModalDialog("generateBike", "generateBike transaction sucessful send to blockchain <br /> Wait for Metamask confirmation <br /> <br /> <br /> Transaction: " + hash );
            kendo.ui.progress($("#grdBike"), false);
            $("#messageTx").css("display","none");
        })
        .on('receipt', function(receipt){
            console.log('receipt');
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log('confirmation', confirmationNumber);
        })
        .on('error', console.error);



    
    // contract.methods.generateBike([0,parseInt(bikeType),parseInt(bikeColor),parseInt(weiValue)])
    // .send({from: account}).then( (tx) => { 

    //   ModalDialog("generateBike", "generateBike sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
    // }).catch( ( error ) =>{
    //   ModalDialog("generateBike", "generateBike ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
    //   console.log( "ERRO: ", error ); 
    //   }
    // ).finally(() => {
    //     kendo.ui.progress($("#grdBike"), false);
    //     $("#messageTx").css("display","none");
    // });


}