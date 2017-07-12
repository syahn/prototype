/**
 * Created by NAVER on 2017-07-12.
 */
// convert url 요청 후 페이지 로드 시 즉시 실행
window.onload = function(){
    save();
    //이전 설정 화면으로 돌아가기
    window.history.back();
}

// 서버 임시 pdf 변환 파일 불러온 후 save box 팝업
function save() {

    var dataURI = '/tempPdf/month_result.pdf';

    var fileName = 'Calendar';

    var link = document.getElementById("saveLink");

    link.setAttribute("href", dataURI);
    link.setAttribute("download", fileName);
    link.click();
}
