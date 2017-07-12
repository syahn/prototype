
//option variables
var startOption = document.getElementById("start_month");
var endOption = document.getElementById("end_month");
var landscape = document.getElementById("rdo2_0");
var orientation = 1;

function optionApply() {

    //시작 월과 끝 월 파라미터 재설정
    startMonth = startOption.options[startOption.selectedIndex].value;
    endMonth = endOption.options[endOption.selectedIndex].value;

    //용지방향 재설정
    orientation = landscape.checked ? 1 : 0;

}

$(document).ready(function() {

    $("._close").click(function () {
        window.close();
    })

    $("#button-print").click(function () {

        optionApply();

        $.ajax({

            url: "http://localhost:8080/convert/" + startMonth + "/" + endMonth + "/" + orientation + "/print",
            success: function () {
                printPage("/tempPdf/month_result.pdf");


                function closePrint() {
                    document.body.removeChild(this.__container__);

                }

                function setPrint() {
                    this.contentWindow.__container__ = this;
                    this.contentWindow.onbeforeunload = closePrint;
                    this.contentWindow.onafterprint = closePrint;
                    this.contentWindow.focus(); // Required for IE
                    this.contentWindow.print();
                }

                function printPage(sURL) {
                    var oHiddFrame = document.createElement("iframe");
                    oHiddFrame.onload = setPrint;
                    oHiddFrame.style.visibility = "hidden";
                    oHiddFrame.style.position = "fixed";
                    oHiddFrame.style.right = "0";
                    oHiddFrame.style.bottom = "0";
                    oHiddFrame.src = sURL;
                    document.body.appendChild(oHiddFrame);
                }

            }
        })
    })
}

//convert url request
function save() {

    optionApply();

    $.ajax({
        url: "http://localhost:8080/convert/" + startMonth + "/" + endMonth + "/" + orientation + "/save",
        success: function () {

            // 서버 임시 pdf 변환 파일 불러온 후 save box 팝업
            var dataURI = '/tempPdf/month_result.pdf';

            var fileName = 'Calendar';

            var link = document.getElementById("saveLink");

            link.setAttribute("href", dataURI);
            link.setAttribute("download", fileName);
            link.click();

        }
    })
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

//미리보기 세로방향, 가로방향 보여주기
function checkBox(month) {

    var vertical = document.getElementById("rdo2_1").checked;
    var image = document.getElementById("previewImage");
    var preview = image.parentNode;

    if(vertical){
        preview.removeChild(image);
        var newImage = '<img id="previewImage" src="/images/sample_vertical.png" style="width: 180px; height: 250px;" alt="월간 인쇄 미리보기" title="월간 인쇄 미리보기"/>';
        preview.innerHTML = newImage;
    }else{
        preview.removeChild(image);
        var path = "/images/sample"+month+".png";
        var newImage = '<img id="previewImage" src='+path+' style="width: 343px; height: 252px;" alt="월간 인쇄 미리보기" title="월간 인쇄 미리보기"/>';
        preview.innerHTML = newImage;
    }

}