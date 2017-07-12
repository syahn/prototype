
//option variables
var startOption = document.getElementById("start_month");
var endOption = document.getElementById("end_month");
var landscape = document.getElementById("rdo2_0");
var orientation = 1;

//print 및 save에서 쓰일 프레임
var element = document.createElement("iframe");

windw.onload = function () {

}

function optionApply() {

    //시작 월과 끝 월 파라미터 재설정
    startMonth = startOption.options[startOption.selectedIndex].value;
    endMonth = endOption.options[endOption.selectedIndex].value;

    //용지방향 재설정
    orientation = landscape.checked ? 1 : 0;

    //iframe
    element.style.visibility = "hidden";
    element.style.position = "fixed";
    element.style.right = "0";
    element.style.bottom = "0";

}

$(document).ready(function() {

    $("._close").click(function() {
        window.close();
    })

    $("#button-print").click(function (){

        optionApply();

        element.src = "http://localhost:8080/convert/"+startMonth+"/"+endMonth+"/"+orientation + "/print";
        document.body.appendChild(element);
    })
});

//convert url request
function save() {

    //인쇄 방향 설정
    optionApply();

    element.src = "http://localhost:8080/convert/"+startMonth+"/"+endMonth+"/"+orientation + "/save";
    document.body.appendChild(element);

}

//총 페이지 수 표시
function change() {

    // startMonth = startOption.options[startOption.selectedIndex].value;
    // endMonth = endOption.options[endOption.selectedIndex].value;

    //인쇄 방향 설정
    optionApply();

    var pageNum = document.getElementById("pageNum");

    if(startOption.selectedIndex != null){
        var num = parseInt(endMonth)-parseInt(startMonth)+1;
        pageNum.innerHTML = " 총 페이지 개수: "+num.toString();
        pageNum.style.display="inline";
    }

    element.src = "http://localhost:8080/convert/"+startMonth+"/"+endMonth+"/"+orientation + "/image";
    document.body.appendChild(element);

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