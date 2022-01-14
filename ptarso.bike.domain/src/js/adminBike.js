$(function() {
    fnAnima('All Bikes');
    $('#btnAdd').unbind('click').bind("click", ( () => {
            AddBike();
    }));
    $('#btnAdd').css("display","block");


    getTypes();
    getColors();
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


getbikes(false);

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

AddBike = function(){
    // Recuperar tipos
    // Recuperar cores
    // [0,3,3,777]
    $('#wndOperacao').css("display","block");
    $('#bikeType').focus();
}

// function CreateBike(bikeType, bikeColor, weiValue) {

//     kendo.ui.progress($("#grdBike"), true);
//     $("#messageTx").css("display","block");


//     // contract.methods.generateBike([0,parseInt(bikeType),parseInt(bikeColor),parseInt(weiValue)]).send({from: account}, function(error, transactionHash){
//     //     console.log("Criou BIKE");
//     //     ModalDialog("generateBike", "generateBike sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
//     // });





//     contract.methods.generateBike([0,parseInt(bikeType),parseInt(bikeColor),parseInt(weiValue)]).send({from: account}).then( (tx) => { 
//         console.log("Criou BIKE");
//       ModalDialog("generateBike", "generateBike sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
//    //   let gridBike = $("#grdBike").data("kendoGrid");
//    //   let dataSource = gridBike.dataSource;
//     ////  gridBike.dataSource.add({ Id: dataSource.total(), Owner: "12345", BikeType: "Urban", BikeColor: "White", BikeStatus: "NEW", WeiValue: 76543 });
//     //  setSelectedRow("grdBike");
//     }).catch( ( error ) =>{
//       ModalDialog("generateBike", "generateBike ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
//       console.log( "ERRO: ", error ); 
//       }
//     ).finally(() => {
//         kendo.ui.progress($("#grdBike"), false);
//         $("#messageTx").css("display","none");
//       //  document.getElementById('bikeType').value = '';
//     });
// }

function generateBike(bikeType, bikeColor, weiValue) {
    
    kendo.ui.progress($("#grdBike"), true);
    $("#messageTx").css("display","block");
     
    contract.methods.generateBike([0,parseInt(bikeType),parseInt(bikeColor),parseInt(weiValue)])
    .send({from: account})
    .then( (tx) => { 
        console.log("Criou BIKE");
      ModalDialog("generateBike", "generateBike sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
    }).catch( ( error ) =>{
      ModalDialog("generateBike", "generateBike ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    ).finally(() => {
        kendo.ui.progress($("#grdBike"), false);
        $("#messageTx").css("display","none");
    });

}