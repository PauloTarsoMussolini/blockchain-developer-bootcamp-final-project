$(function() {
    fnAnima('Administrators');
    $('#btnAdd').unbind('click').bind("click", ( () => {
            AddAdmin();
    }));
    $('#btnAdd').css("display","block");

    getAdmins();
});

$('#btnAdminConfirm').bind("click", ( () => {
        if(textValid($("#Admin").val()))
            addAdmin($("#Admin").val());
}));

AddAdmin = function(){
    $('#wndOperacao').css("display","block");
    $('#Admin').focus();
};

$('#btnAdminConfirm').click(function(){
    $('#wndOperacao').css("display","none");
});

getAdmins = async function(){
    await getBikeAdmins()
};
function getBikeAdmins(){
 
      contract.methods.admins().call().then( ( admins )=>  { 
  
      
        var Admins = [];
        for (var i = 0; i < admins.length; i++){
            Admins.push({ "Address": admins[i]},)
        }
  
        var dataSourceAdmin = new kendo.data.DataSource({
        data: Admins,
        pageSize: 10,
        schema: {
        model: {
            fields: {
                Address: { editable: false  },                                
            }
        }
        }	
        });	
    
        $("#grdAdmins").kendoGrid({
                dataSource:   dataSourceAdmin,
                height: 455,
                width: '50%',
                sortable: true,
                filterable: true,
                selectable: true,
                columnMenu: true,
                dataBound: onDataBoundAdmin,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [{
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },				
                    field: "Address",
                    title: "Address"
                }
                ]
        });
    });
};

function addAdmin(value) {
    kendo.ui.progress($("#grdAdmins"), true);
    $("#messageTx").css("display","block");

    contract.methods.addAdmin(value).send( {from: account})
        .on('transactionHash', function(hash){
            console.log('transactionHash: ',hash);
            ModalDialog("addAdmin", "addAdmin transaction sucessful send to blockchain <br /> Wait for Metamask confirmation <br /> <br /> <br /> Transaction: " + hash );
            kendo.ui.progress($("#grdAdmins"), false);
            $("#messageTx").css("display","none");
        })
        .on('receipt', function(receipt){
            console.log('receipt');
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log('confirmation', confirmationNumber);
        })
        .on('error', function(error){
            console.log(error.code)
            $("#messageTx").css("display","none")
            $('#wndOperacao').css("display","none")
            kendo.ui.progress($("#grdAdmins"), false);
            ModalDialog("addAdmin Bike", "addAdmin ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message )
    })


    // contract.methods.addAdmin(value).send( {from: account}).then( (tx) => { 
    //   ModalDialog("addAdmin", "addAdmin sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
    //   document.getElementById('Admin').value = '';
    //   let gridColor = $("#grdAdmins").data("kendoGrid");
    //   let dataSource = gridColor.dataSource;
    //   gridColor.dataSource.add({ Address:  value });
    
    //   setSelectedRow("grdBikeColor");
    // }).catch( ( error ) =>{
    //   ModalDialog("addAdmin", "addAdmin ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
    //   console.log( "ERRO: ", error ); 
    //   $("#messageTx").css("display","none");
    //   $('#wndOperacao').css("display","none");
    //   }
    // );
};


function onDataBoundAdmin(evt){
    $('.k-i-reload').bind("click", ( function(){
        getBikeAdmins();
      }
    ));
  };