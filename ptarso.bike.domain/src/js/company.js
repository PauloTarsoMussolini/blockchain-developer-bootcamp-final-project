$(function() {
    fnAnima('Companies');
    $('#btnAdd').unbind('click').bind("click", ( () => {
            createCompany();
    }));
    $('#btnConfirm').css("display","Create Company");

    getCompanys();
});

$('#btnCompanyConfirm').bind("click", ( () => {
        if(textValid($("#CompanyName").val()) && textValid($("#Addr").val()))
            CreateCompany($("#Addr").val(), $("#CompanyName").val());
}));

createCompany = function(){
    $('#wndOperacao').css("display","block");
    $('#CompanyName').focus();
}

$('#btnCompanyConfirm').click(function(){
    $('#wndOperacao').css("display","none");
})

getCompanys = async function(){
    await getCompanies()
}
function getCompanies(){
 
      contract.methods.getCompanyList().call().then( ( companies )=>  { 

        console.log("companies = ", companies);
  
        const FIELD_NAME  = 0;
        const FIELD_STATUS = 1;
        const FIELD_ADDRESS = 2;

        let companyStructs = []
        for (let i = 0; i < companies[0].length; i++) {
            const company = {
                Name:  companies[FIELD_NAME][i],
                Status: companies[FIELD_STATUS][i],
                Address: companies[FIELD_ADDRESS][i]
            }
            companyStructs.push(company)
        }
        
        console.log('companyStructs =', companyStructs)    

        // var Companies = [];
        // for (var i = 0; i < companies.length; i++){

        //     // var items = {};
        //     // items["Company"]="Company";
        //     // items["Status"]="Status";
        //     // items["Exist"]="Exist";
        //     // items["Address"]="Address";
        //     // const jsonString = JSON.stringify(companies.assign({}, items)) 
        //     // const json_obj = JSON.parse(jsonString);

        //     // console.log(json_obj)
        //     const array = ["Company", "Status", "Exist", "Address"]
        //     const jsonString = JSON.stringify(Object.assign({companies}, array))
        //     console.log(jsonString)

        //     Companies.push({ "CompanyId": i, "Company": companies[i]},)
        // }
  
        var dataSourceCompany = new kendo.data.DataSource({
        data: companyStructs,
        pageSize: 10,
        schema: {
        model: {
            fields: {                             
                Name: {editable: false  },
                Status: {editable: false},
                Address: {editable:false}

            }
        }
        }	
        });	
    
        $("#grdBikeCompany").kendoGrid({
                dataSource:   dataSourceCompany,
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
                        attributes: {
                                style: "font-weight: bold; text-align:left; vertical-align:middle;"
                                },	
                        field: "Name",
                        title: "Name",
                        width: 180
                    },  {
                        headerAttributes: {
                                style: "font-weight: bold; text-align:center; vertical-align:middle;"
                                },	
                        attributes: {
                                style: "font-weight: bold; text-align:left; vertical-align:middle;"
                                },	
                        field: "Status",
                        title: "Status",
                        template: function(dataItem) {
                            return  kendo.htmlEncode(fnGetEnum(dataItem.Status));
                          },
                        width: 100
                    },  {
                        headerAttributes: {
                                style: "font-weight: bold; text-align:center; vertical-align:middle;"
                                },	
                        attributes: {
                                style: "font-weight: bold; text-align:left; vertical-align:middle;"
                                },	
                        field: "Address",
                        title: "Address",
                        width: 330
                    }
                ]
        });
    });
}

function fnGetEnum(val){
    return (val == 0 ? "ACTIVE" : (val == 1 ? "INACTIVE": "BLOCKED"))
}

function CreateCompany(addr, companyName) {
    alert(companyName);
    kendo.ui.progress($("#grdBikeCompany"), true);
    $("#messageTx").css("display","block");
    contract.methods.createCompany(addr, companyName).send( {from: account}).then( (tx) => { 
      ModalDialog("CreateCompany", "CreateCompany sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
      getCompanies();
    }).catch( ( error ) =>{
      ModalDialog("CreateCompany", "CreateCompany ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    ).finally(() => {
        kendo.ui.progress($("#grdBikeCompany"), false);
        $("#messageTx").css("display","none");
        document.getElementById('CompanyName').value = '';
        document.getElementById('Addr').value = '';
    });
}