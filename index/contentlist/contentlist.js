(function () {
    var itemTmp = 
`<div class="r-item-content">
    <img class="item-img" src="$pic_url"/>
    $brand
    <div class="item-info-content">
        <p class="item-title">$name</p>
        <div class="item-desc clearfix">
            <div class="item-score">$wm_poi_score</div>
            <div class="item-count">月售$monthNum</div>
            <div class="item-distance">&nbsp;$distance</div>
            <div class="item-time">$mt_delivery_time&nbsp;</div>
        </div>
        <div class="item-price">
            <div class="item-pre-price">$min_price_tip</div>
        </div>
        <div class="item-others">
            $others
        </div>
    </div>

</div>`;
    var page=0;//页码
    var isLoading=false;//限流
    function getList() {
        page++;
        isLoading=true
        $.get('../json/homelist.json', function (data) {
            var list=data.data.poilist || [];
            console.log(data);
            initContentList(list)
            isLoading=false;
        })
    }
    function initContentList(list) {
        list.forEach((item,index) => {
            var str=itemTmp.replace('$pic_url',item.pic_url)
            .replace('$name',item.name)
            .replace('$distance',item.distance)
            .replace('$min_price_tip',item.min_price_tip)
            .replace('$brand',getBrand(item))
            .replace('$monthNum',getMonthNum(item))
            .replace('$mt_delivery_time',item.mt_delivery_time)
            .replace('$others',getOthers(item))
            .replace('$wm_poi_score',new StarScore(item.wm_poi_score).getStars());

            $('.list-wrap').append(str)
        });
    }
    function getOthers(data){
      var  array=data.discounts2;
      var str='';
      array.forEach(function (item,index) {
          var _str=`<div class="other-info">
          <img src="$icon_url" class="other-tag">
          <p class="other-content one-line">$info</p>
          </div>`
          _str=_str.replace('$icon_url',item.icon_url)
                    .replace('$info',item.info);
          str += _str
      })
      return str;

    }
    function getMonthNum(data) {
        var num=data.month_sale_num;
        if(num>999){
            return '999+'
        }
        return num;
    }
    function getBrand(data) {
        if(data.brand_type){
            return `<div class="brand brand-pin">品牌</div>`;
        }else{
            return `<div class="brand brand-xin">新到</div>`;
        }
    }
    function addEvent() {
        window.addEventListener('scroll',function () {
            var clientHeight=document.documentElement.clientHeight;
            var scrollHeight=document.body.scrollHeight;
            var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
            //阈值判断
            var proDis=30;
            if(scrollTop+clientHeight>=scrollHeight-proDis){
                if(page>3) return; 
                if(isLoading) return
                getList()
            }
        })
    }
    function init() {
        getList()
        addEvent()
    }
    init()
})()