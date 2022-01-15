$(function() {

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    
    var contractAddress = '0xE9F012ee12C87fe20895Cb976013d607B979A0ec';
    var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"color","type":"string"}],"name":"addColor","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"bikeType","type":"string"}],"name":"addType","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_bikeColor","type":"uint256"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"AddedBikeColor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bikeType","type":"uint256"},{"indexed":false,"internalType":"string","name":"_type","type":"string"}],"name":"AddedBikeType","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"}],"name":"BikeGenerated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"bike","type":"uint256"}],"name":"BikePlacedToSell","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"buyBike","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"instanceAddress","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyCreated","type":"event"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"createCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bikeModel","type":"tuple"}],"name":"generateBike","outputs":[{"internalType":"address","name":"bikeAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"weiValue","type":"uint256"}],"name":"putBikeToSell","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bike","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"TransferedBike","type":"event"},{"inputs":[],"name":"admins","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeColorList","outputs":[{"internalType":"string[]","name":"colorList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBikeInstance","outputs":[{"components":[{"internalType":"enum BikeModel.StatusBikeEnum","name":"Status","type":"uint8"},{"internalType":"uint8","name":"TypeId","type":"uint8"},{"internalType":"uint8","name":"ColorId","type":"uint8"},{"internalType":"uint256","name":"WeiValue","type":"uint256"}],"internalType":"struct BikeModel.BikeModelStruct","name":"bike","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"forSell","type":"bool"}],"name":"getBikeList","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeListByOwner","outputs":[{"internalType":"uint256[]","name":"id","type":"uint256[]"},{"internalType":"address[]","name":"owner","type":"address[]"},{"internalType":"string[]","name":"bikeType","type":"string[]"},{"internalType":"string[]","name":"bikeColor","type":"string[]"},{"internalType":"enum BikeModel.StatusBikeEnum[]","name":"bikeStatus","type":"uint8[]"},{"internalType":"uint256[]","name":"WeiValue","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBikeTypeList","outputs":[{"internalType":"string[]","name":"typeList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getColorById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"companyAddress","type":"address"}],"name":"getCompanyByAddress","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"enum CompanyModel.StatusCompanyEnum","name":"Status","type":"uint8"},{"internalType":"bool","name":"Exist","type":"bool"},{"internalType":"address","name":"Owner","type":"address"}],"internalType":"struct CompanyModel.CompanyModelStruct","name":"company","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCompanyList","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"enum CompanyModel.StatusCompanyEnum[]","name":"","type":"uint8[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getTypeById","outputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeColor","type":"uint256"}],"name":"hasColorId","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"bikeColor","type":"string"}],"name":"hasColorName","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bikeType","type":"uint256"}],"name":"hasType","outputs":[{"internalType":"bool","name":"has","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');
    contract = new web3.eth.Contract(abi, contractAddress);
    
    // Busca contas
    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
            alert("Ocorreu um erro ao buscar suas contas.");
            return;
        }
    
        if (accs.length == 0) {
            alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
            return;
        }
    
        accounts = accs;
        account = accounts[0];
        web3.eth.defaultAccount = account;
    });
  });

function addressValid(address){
  if(!web3.utils.isAddress(address)){
    ModalDialog("Address invalid", "Address " + address + " is invalid!");
    return false;
  }
  return true;
}

function valueValid(value){
  if(value < 1){
    ModalDialog("Value invalid", "Value must be greater than 0");
    kendo.ui.progress($("#grdBike"), false);
    $("#messageTx").css("display","none");
    return false;
  }
  return true;
}

function textValid(value){
  if((!value || value.length === 0 )){
    ModalDialog("Value invalid", "Value must be diferent than empty");
    kendo.ui.progress($("#grdBike"), false);
    $("#messageTx").css("display","none");
    return false;
  }
  return true;
}

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

var bikeId;
var weiValue;
var bikeOwner;
var forSale;

function getbikes(){
 
  contract.methods.getBikeList(forSale).call().then( ( bikes )=>  { 

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
      
    var dataSourceBike = new kendo.data.DataSource({
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

    $("#grdBike").kendoGrid({
            dataSource:   dataSourceBike,
            change: function(e) {
              var selectedRows = this.select();
              var rowData = this.dataItem(selectedRows[0]);
              
              $('#wndOperacao').css("display",(forSale ? "block" : "none"));
              bikeId = rowData.Id;
              weiValue = rowData.WeiValue;
              bikeOwner = rowData.Owner;
            },
            height: 455,
            width: '95%',
            sortable: true,
            filterable: true,
            selectable: true,
            columnMenu: true,
            dataBound: onDataBound,
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
                }, {
                    headerAttributes: {
                            style: "font-weight: bold; text-align:center; vertical-align:middle;"
                            },	
                    attributes: {
                            style: "font-weight: bold; text-align:left; vertical-align:middle;"
                            },	
                    field: "WeiValue",
                    title: "Wei Value",
                    format: "{0:n0}",
                    width: 100
                }
            ]
    });
});

}

function setSelectedRow(gridName){
  var grid = $("#"+gridName).data("kendoGrid"); 

  var models = grid.dataSource.data();
  
  var model = models[models.length - 1]; 
  var lastRowUid = model.uid;
  
  var row = grid.table.find("[data-uid=" + lastRowUid + "]");
  
  grid.select(row);
}

function ModalDialog(titulo, texto) {
  var random = Math.random().toString().replace('.', '');
  var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
      '        <div class="modal-dialog">                                                                                 ' +
      '            <div class="modal-content">                                                                            ' +
      '                <div class="modal-header">                                                                         ' +
      '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
      '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
      '                </div>                                                                                             ' +
      '                <div class="modal-body">                                                                           ' +
      '                    <p>' + texto + '</p>                                                                           ' +
      '                </div>                                                                                             ' +
      '                <div class="modal-footer">                                                                         ' +
      '                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>              ' +
      '                                                                                                                   ' +
      '                </div>                                                                                             ' +
      '            </div><!-- /.modal-content -->                                                                         ' +
      '  </div><!-- /.modal-dialog -->                                                                                    ' +
      '</div> <!-- /.modal -->                                                                                        ';

  $('body').append(texto);
  $('#' + random).modal('show');
}

function confirmOp(titulo, texto){
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                           ' +
    '        <div class="modal-dialog">                                                                                 ' +
    '            <div class="modal-content">                                                                            ' +
    '                <div class="modal-header">                                                                         ' +
    '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
    '                </div>                                                                                             ' +
    '                <div class="modal-body">                                                                           ' +
    '                    <p>' + texto + '</p>                                                                           ' +
    '                </div>                                                                                             ' +
    '                <div class="modal-footer">                                                                         ' +
    '                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>             ' +
    '                    <button onclick="OpConfirm()" type="button" class="btn btn-default" data-dismiss="">Confirm</button>             ' +
    '                </div>                                                                                             ' +
    '            </div><!-- /.modal-content -->                                                                         ' +
    '  </div><!-- /.modal-dialog -->                                                                                    ' +
    '</div> <!-- /.modal -->                                                                                            ';

    $('body').append(texto);
    $('#' + random).modal('show');
  
}

function onDataBound(evt){

  $('.k-i-reload').bind("click", ( function(){
    getbikes();
    }
  ));
}


