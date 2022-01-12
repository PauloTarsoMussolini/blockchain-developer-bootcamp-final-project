var bikeId;
var weiValue;
$(function() {
    fnAnima('My Bikes');
    $('#btnSellConfirm').unbind('click').bind("click", ( () => {
        if(valueValid($("#weiValue").val()))
                SellBike();
    }));
    $('#btnOpConfirm').unbind('click').bind("click", ( () => {
        ConfirmSell();
    }));
    $('#btnAdd').css("display","none");
    $('#btnSellConfirm').css("display","block");
    $('#wndOperacao').css("display","none");
    getMyBikes();
});


function getMyBikes(){
 
    contract.methods.getBikeListByOwner().call({from: account}).then( ( bikes )=>  { 

        console.log("Bikes = ", bikes);
        
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
        
        console.log('BikeStructs =', BikeStructs)    
        
        var dataSourceMyBike = new kendo.data.DataSource({
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
        
        $("#grdMyBike").kendoGrid({
                dataSource:   dataSourceMyBike,
                change: function(e) {
                        var selectedRows = this.select();
                        var rowData = this.dataItem(selectedRows[0]);
                        
                        $('#wndOperacao').css("display",(rowData.BikeStatus == 1 ? "block" : "none"));
                        bikeId = rowData.Id;
                        weiValue = rowData.WeiValue;
                },
                height: 455,
                width: '90%',
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
                        },  {
                        headerAttributes: {
                                style: "font-weight: bold; text-align:center; vertical-align:middle;"
                                },	
                        attributes: {
                                style: "font-weight: bold; text-align:left; vertical-align:middle;"
                                },	
                        field: "WeiValue",
                        title: "Wei Value",
                        format: "{0:n0}",
                        width: 180
                        }
                ]
        });
        });
}

// function ConfirmSell(){
//       //  confirmOp("Confirm Sell", "Confirm selected Bike Sell?");

// }

// function OpConfirm(){
//        // ModalDialog("Confirm Bike Sell", "Confirm Bike Sell! <br /> <br /> " );
//       //  confirmOp("Confirm Sell", "Confirm selected Bike Sell?");
//       alert("Confirm");
// }

function SellBike() {
        kendo.ui.progress($("#grdMyBike"), true);
        $("#messageTx").css("display","block");
        alert(bikeId,weiValue);
        contract.methods.putBikeToSell(bikeId,$("#weiValue").val()).send( {from: account}).then( (tx) => { 
          ModalDialog("Sell Bike", "Bike set to Sell sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
        }).catch( ( error ) =>{
          ModalDialog("Sell Bike", "Bike set to Sell ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
          console.log( "ERRO: ", error ); 
          }
        ).finally(() => {
            kendo.ui.progress($("#grdMyBike"), false);
            $("#messageTx").css("display","none");
            $('#wndOperacao').css("display","none");
            getMyBikes();
        });
    }