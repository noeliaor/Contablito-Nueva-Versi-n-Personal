const showData = () => {
    let tbody = document.getElementById("totransactions");
    let list = JSON.parse(localStorage.getItem("transInfo")).reverse(); //Extraigo lista de transacciones
    for (let i = 0; i < list.length - 1; i++) {
        tbody.innerHTML += `<tr class="${list[i].type}"><td>${list[i].type}</td><td>${list[i].IVAtype}</td><td>$${list[i].total}</td><td>${list[i].product}</td><td>${list[i].date}</td><td>${list[i].user}</td></tr>`;
    }
}



//Función que devuelve el total de ventas o compras para una fecha 
const getTotalSalePurchasesbyDay = (list, date, type) => {
    let total = 0;
    for (let i = 1; i < list.length; i++) {
        if ((date == list[i].date) && (type == list[i].type)) {
            total += parseInt(list[i].total);
        }
    }
    return total;
}


const viewChart = () => {
    //PARA EMPLEAR DATOS DE PRUEBA COMENTAR LÍNEA 25 Y DESCOMENTAR DE LA 26 A LA 59.
    let list = JSON.parse(localStorage.getItem("transInfo")); //lista de transacciones 
   /* let list=[{"total":"","IVAtype":"","product":"","type":"","date":"","user":""},
    {"total":3000,"IVAtype":"Basico","product":"Tornillo 3cm","type":"Compra","date":"25-11-2021","user":"admin"},
    {"total":2970,"IVAtype":"Basico","product":"Tornillo 3cm","type":"Compra","date":"25-11-2021","user":"admin"},
    {"total":4000,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"25-11-2021","user":"admin"},
    {"total":30000,"IVAtype":"Basico","product":"Tornillo 3cm","type":"Compra","date":"25-11-2021","user":"admin"},
    {"total":8000,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Venta","date":"25-11-2021","user":"admin"},
    {"total":10000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Compra","date":"25-11-2021","user":"admin"},
    {"total":2200,"IVAtype":"Basico","product":"Ladrillo común","type":"Compra","date":"25-11-2021","user":"admin"},
    {"total":1000,"IVAtype":"Basico","product":"Tornillo 2cm","type":"Compra","date":"25-11-2021","user":"admin"},
    {"total":48800,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"25-11-2021","user":"camila"},
    {"total":5000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Venta","date":"25-11-2021","user":"camila"},
    {"total":3000,"IVAtype":"Basico","product":"Tornillo 3cm","type":"Compra","date":"26-11-2021","user":"admin"},
    {"total":2927,"IVAtype":"Basico","product":"Tornillo 3cm","type":"Venta","date":"26-11-2021","user":"admin"},
    {"total":4060,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"26-11-2021","user":"admin"},
    {"total":3000,"IVAtype":"Basico","product":"Tornillo 3cm","type":"Compra","date":"26-11-2021","user":"admin"},
    {"total":8600,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Venta","date":"26-11-2021","user":"admin"},
    {"total":10000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Compra","date":"27-11-2021","user":"admin"},
    {"total":2200,"IVAtype":"Basico","product":"Ladrillo común","type":"Compra","date":"27-11-2021","user":"admin"},
    {"total":1000,"IVAtype":"Basico","product":"Tornillo 2cm","type":"Venta","date":"27-11-2021","user":"admin"},
    {"total":48800,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"27-11-2021","user":"camila"},
    {"total":5000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Venta","date":"27-11-2021","user":"camila"},
    {"total":1000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Compra","date":"28-11-2021","user":"admin"},
    {"total":2200,"IVAtype":"Basico","product":"Ladrillo común","type":"Compra","date":"28-11-2021","user":"admin"},
    {"total":6000,"IVAtype":"Basico","product":"Tornillo 2cm","type":"Venta","date":"28-11-2021","user":"admin"},
    {"total":4800,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"28-11-2021","user":"camila"},
    {"total":5000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Venta","date":"29-11-2021","user":"camila"},
    {"total":6090,"IVAtype":"Basico","product":"Tornillo 2cm","type":"Venta","date":"29-11-2021","user":"admin"},
    {"total":4800,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"29-11-2021","user":"camila"},
    {"total":9000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Venta","date":"29-11-2021","user":"camila"},
    {"total":4800,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"30-11-2021","user":"camila"},
    {"total":5000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Venta","date":"30-11-2021","user":"camila"},
    {"total":6000,"IVAtype":"Basico","product":"Tornillo 2cm","type":"Venta","date":"30-11-2021","user":"admin"},
    {"total":4800,"IVAtype":"Basico","product":"Tornillo 4cm","type":"Compra","date":"30-11-2021","user":"camila"},
    {"total":5000,"IVAtype":"Basico","product":"Tornillo 5cm","type":"Venta","date":"30-11-2021","user":"camila"}];*/
    let auxDate = "";
    let dates = [];
    let amountSale = 0, amountPurchases = 0;
    let colAmountSale = [], colAmountPurchases = [];

    for (let i = 1; i < list.length; i++) {

        if (auxDate != list[i].date) {
            auxDate = list[i].date;
            dates.push(list[i].date);

            amountSale = getTotalSalePurchasesbyDay(list, auxDate, 'Venta');
            amountPurchases = getTotalSalePurchasesbyDay(list, auxDate, 'Compra');

            colAmountSale.push(amountSale);
            colAmountPurchases.push(amountPurchases);
        }

    }


    Highcharts.chart('container', {

        title: {
            text: 'Compras - Ventas'
        },

        // subtitle: {
        //   text: 'Source: thesolarfoundation.com'
        // },

        yAxis: {
            title: {
                text: 'Importe'
            }
        },
        xAxis: {
            categories: dates, //fechas para el eje x, dates es un array
            /* accessibility: {
                 rangeDescription: 'Fecha'
             },*/
            title: {
                text: 'Fecha'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
                //     pointStart: 2010
            }
        },

        series: [{
            name: 'VENTA',
            data: colAmountSale //array de ventas
        }, {
            name: 'COMPRA',
            data: colAmountPurchases //array de compras
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
};


document.addEventListener("DOMContentLoaded", () => {
    showData();


    document.getElementById("btnChart").addEventListener("click", viewChart);

});
