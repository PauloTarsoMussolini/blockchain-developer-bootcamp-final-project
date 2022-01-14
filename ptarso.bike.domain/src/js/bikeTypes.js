$(function() {
    fnAnima('Bike Types');
    $('#btnAdd').unbind('click').bind("click", ( () => {
            AddType();
    }));
    $('#btnConfirm').css("display","block");

    getTypes();
});
$('#btnTypeConfirm').bind("click", ( () => {
    $(".k-icon.k-i-refresh").hide();
    if(textValid($("#bikeType").val()))
        addType($("#bikeType").val());
}));

AddType = function(){
    $('#wndOperacao').css("display","block");
    $('#bikeType').focus();
}

$('#btnTypeConfirm').click(function(){
    $('#wndOperacao').css("display","none");
})

getTypes = async function(){
    await getBikeTypes()
}

function getBikeTypes(){
 
      contract.methods.getBikeTypeList().call().then( ( types )=>  { 
      
        var Types = [];
        for (var i = 0; i < types.length; i++){
            Types.push({ "TypeId": i, "Type": types[i]},)
        }
  
        var dataSourceType = new kendo.data.DataSource({
        data: Types,
        pageSize: 10,
        schema: {
        model: {
            fields: {
            TypeId: { editable: false  },                                
            Type: {editable: false  }
            }
        }
        }	
        });	
    
        $("#grdBikeType").kendoGrid({
                dataSource:   dataSourceType,
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
                    field: "TypeId",
                    title: "Id",
                    width: 100
                },  {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "Type",
                    title: "Type",
                    width: 180
                }
                ]
        });
    });
}

function addType(value) {
    kendo.ui.progress($("#grdBikeType"), true);
    $("#messageTx").css("display","block");
    contract.methods.addType(value).send( {from: account}).then( (tx) => { 
      ModalDialog("addType", "addType sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
      let grid = $("#grdBikeType").data("kendoGrid");
      let dataSource = grid.dataSource;
      grid.dataSource.add({ TypeId: dataSource.total(), Type: value });
      setSelectedRow("grdBikeType");
    }).catch( ( error ) =>{
      ModalDialog("addType", "addType ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    ).finally(() => {
        kendo.ui.progress($("#grdBikeType"), false);
        $("#messageTx").css("display","none");
        document.getElementById('bikeType').value = '';
    });
}