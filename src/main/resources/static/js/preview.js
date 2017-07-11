

var startOption = document.getElementById("start_month");
var endOption = document.getElementById("end_month");

var startMonth = startOption.options[startOption.selectedIndex].value;
var endMonth = endOption.options[endOption.selectedIndex].value;


$(document).ready(function() {

    $("._close").click(function() {
        window.close();
    })


    // $("._print .normal").click(function(){
    //     printPage('externalPage.html');
    // })

    $("#button-print").click(function (){
        startMonth = startOption.options[startOption.selectedIndex].value;
        endMonth = endOption.options[endOption.selectedIndex].value;
        console.log(startMonth, endMonth, "hello");
        printPage('/tempPdf/month_result' + startMonth + 'to' + endMonth +  '.pdf');
    })


});

//convert url request
function save() {

    //시작 월과 끝 월 파라미터 보내줌
    startMonth = startOption.options[startOption.selectedIndex].value;
    endMonth = endOption.options[endOption.selectedIndex].value;

    //가로, 세로 설정
    var orientation = 0; // 세로
    var landscape = document.getElementById("rdo2_0").checked;
    if(landscape){
        orientation = 1;//가로
    }

    location.href = "http://localhost:8080/convert/"+startMonth+"/"+endMonth+"/"+orientation;
}

//총 페이지 수 표시
function change() {

    startMonth = startOption.options[startOption.selectedIndex].value;
    endMonth = endOption.options[endOption.selectedIndex].value;
    var pageNum = document.getElementById("pageNum");

    if(startOption.selectedIndex != null){
        var num = parseInt(endMonth)-parseInt(startMonth)+1;
        pageNum.innerHTML = " 총 페이지 개수: "+num.toString();
        pageNum.style.display="inline";
    }

}



function closePrint () {
    document.body.removeChild(this.__container__);
}

function setPrint () {
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.focus(); // Required for IE
    this.contentWindow.print();
}

function printPage (sURL) {
    var oHiddFrame = document.createElement("iframe");
    oHiddFrame.onload = setPrint;
    oHiddFrame.style.visibility = "hidden";
    oHiddFrame.style.position = "fixed";
    oHiddFrame.style.right = "0";
    oHiddFrame.style.bottom = "0";
    oHiddFrame.src = sURL;
    document.body.appendChild(oHiddFrame);
}
