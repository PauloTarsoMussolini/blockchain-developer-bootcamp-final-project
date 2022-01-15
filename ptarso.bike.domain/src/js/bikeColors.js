$(function() {
    fnAnima('Bike Colors');
    $('#btnAdd').unbind('click').bind("click", ( () => {
            AddColor();
    }));
    $('#btnAdd').css("display","block");

    getColors();
});

$('#btnColorConfirm').bind("click", ( () => {
        if(textValid($("#bikeColor").val()))
            addColor($("#bikeColor").val());
}));

AddColor = function(){
    $('#wndOperacao').css("display","block");
    $('#bikeColor').focus();
}

$('#btnColorConfirm').click(function(){
    $('#wndOperacao').css("display","none");
})

getColors = async function(){
    await getBikeColors()
}
function getBikeColors(){
 
      contract.methods.getBikeColorList().call().then( ( colors )=>  { 
  
      
        var Colors = [];
        for (var i = 0; i < colors.length; i++){
            Colors.push({ "ColorId": i, "Color": colors[i]},)
        }
  
        var dataSourceColor = new kendo.data.DataSource({
        data: Colors,
        pageSize: 10,
        schema: {
        model: {
            fields: {
            ColorId: { editable: false  },                                
            Color: {editable: false  }
            }
        }
        }	
        });	
    
        $("#grdBikeColor").kendoGrid({
                dataSource:   dataSourceColor,
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
                    field: "ColorId",
                    title: "Id",
                    width: 100
                },  {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "Color",
                    title: "Color",
                    width: 180
                }
                ]
        });
    });
}

function addColor(value) {
    kendo.ui.progress($("#grdBikeColor"), true);
    $("#messageTx").css("display","block");
    contract.methods.addColor(value).send( {from: account}).then( (tx) => { 
      ModalDialog("addColor", "addColor sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
      let gridColor = $("#grdBikeColor").data("kendoGrid");
      let dataSource = gridColor.dataSource;
      gridColor.dataSource.add({ ColorId: dataSource.total(), Color: value });
    
      setSelectedRow("grdBikeColor");
    }).catch( ( error ) =>{
      ModalDialog("addColor", "addColor ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    ).finally(() => {
        kendo.ui.progress($("#grdBikeColor"), false);
        $("#messageTx").css("display","none");
        document.getElementById('bikeColor').value = '';
    });
}