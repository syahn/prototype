
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

    var element = document.createElement("iframe");
    element.style.visibility = "hidden";
    element.style.position = "fixed";
    element.style.right = "0";
    element.style.bottom = "0";
    element.src = "http://localhost:8080/convert/"+startMonth+"/"+endMonth+"/"+orientation + "/save";
    document.body.appendChild(element);

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

