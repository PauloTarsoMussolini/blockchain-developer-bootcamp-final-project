$(function() {
    fnAnima('Administrators');
    $('#btnAdd').unbind('click').bind("click", ( () => {
            AddAdmin();
    }));
    $('#btnConfirm').css("display","block");

    getAdmins();
});

$('#btnAdminConfirm').bind("click", ( () => {
        if(textValid($("#Admin").val()))
            addAdmin($("#Admin").val());
}));

AddAdmin = function(){
    $('#wndOperacao').css("display","block");
    $('#Admin').focus();
}

$('#btnAdminConfirm').click(function(){
    $('#wndOperacao').css("display","none");
})

getAdmins = async function(){
    await getBikeAdmins()
}
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
}

function addAdmin(value) {
    kendo.ui.progress($("#grdAdmins"), true);
    $("#messageTx").css("display","block");
    contract.methods.addAdmin(value).send( {from: account}).then( (tx) => { 
      ModalDialog("addAdmin", "addAdmin sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
      document.getElementById('Admin').value = '';
      let gridColor = $("#grdAdmins").data("kendoGrid");
      let dataSource = gridColor.dataSource;
      gridColor.dataSource.add({ Address:  value });
    
      setSelectedRow("grdBikeColor");
    }).catch( ( error ) =>{
      ModalDialog("addAdmin", "addAdmin ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      $("#messageTx").css("display","none");
      $('#wndOperacao').css("display","none");
      }
    );
}