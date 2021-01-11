(function(){
    //设置基础的字体大小适配
    var docEl=document.documentElement;

    function setRemUnit() {
        var rem=docEl.clientWidth/10;
        docEl.style.fontSize=rem+'px';
    }
    setRemUnit();
    window.addEventListener('resize',setRemUnit);
    window.addEventListener('pageshow',function (e) {
        if(e.persisted){
            setRemUnit();
        }
    })
})();