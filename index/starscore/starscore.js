(function (window) {
    var itemTmpl=`
        <div class="star-score">$starstr</div>
    `;
    function _getStars() {
        var _score=this.score.toString();
        var scoreArray=_score.split('.');
        var fullstar=parseInt(scoreArray[0]);
        var halfstar=parseInt(scoreArray[1])>=5 ? 1:0;
        var nullstar=5-fullstar-halfstar;
        var starstr='';
        for(let i=0;i<fullstar;i++){
            starstr+=`<div class="star fullstar"></div>`
        }
        for(let i=0;i<halfstar;i++){
            starstr+=`<div class="star halfstar"></div>`
        }
        for(let i=0;i<nullstar;i++){
            starstr+=`<div class="star nullstar"></div>`
        }
        return itemTmpl.replace('$starstr',starstr);

    }
    window.StarScore=function (score) {
        this.score=score || '';
        this.getStars=_getStars;
    }
})(window)