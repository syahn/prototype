
var startOption = document.getElementById("start_month");
var endOption = document.getElementById("end_month");

var startMonth = startOption.options[startOption.selectedIndex].value;
var endMonth = endOption.options[endOption.selectedIndex].value;

$(document).ready(function() {

    $("._close").click(function() {
        window.close();
    })

    $("#button-print").click(function (){
        startMonth = startOption.options[startOption.selectedIndex].value;
        endMonth = endOption.options[endOption.selectedIndex].value;
        var landscape = document.getElementById("rdo2_0").checked;
        var orientation = landscape ? 1 : 0;

        var element = document.createElement("iframe");
        element.style.visibility = "hidden";
        element.style.position = "fixed";
        element.style.right = "0";
        element.style.bottom = "0";
        element.src = "http://localhost:8080/convert/"+startMonth+"/"+endMonth+"/"+orientation + "/print";
        document.body.appendChild(element);
    })
});

//convert url request
function save() {

    //시작 월과 끝 월 파라미터 보내줌
    startMonth = startOption.options[startOption.selectedIndex].value;
    endMonth = endOption.options[endOption.selectedIndex].value;

    //인쇄 방향 설정
    var landscape = document.getElementById("rdo2_0").checked;
    var orientation = landscape ? 1 : 0;

    location.href = "http://localhost:8080/convert/"+startMonth+"/"+endMonth+"/"+orientation + "/save";

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
//
// function closePrint () {
//     document.body.removeChild(this.__container__);
// }
//
// function setPrint () {
//     this.contentWindow.__container__ = this;
//     this.contentWindow.onbeforeunload = closePrint;
//     this.contentWindow.onafterprint = closePrint;
//     this.contentWindow.focus(); // Required for IE
//     this.contentWindow.print();
// }
//
// function printPage (sURL) {
//     var oHiddFrame = document.createElement("iframe");
//     oHiddFrame.onload = setPrint;
//     oHiddFrame.style.visibility = "hidden";
//     oHiddFrame.style.position = "fixed";
//     oHiddFrame.style.right = "0";
//     oHiddFrame.style.bottom = "0";
//     oHiddFrame.src = sURL;
//     document.body.appendChild(oHiddFrame);
// }
