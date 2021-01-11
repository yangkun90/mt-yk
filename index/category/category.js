(function () {
    var itemTmp = `<div class="category-item">
<img class="item-icon" src="$url"/>
<p class="item-name">$name</p>

</div>`;

    function initCategory() {
        $.get('../json/head.json', function (data) {
            var list=data.data.primary_filter.splice(0,8);
            list.forEach((item,index) => {
                var str=itemTmp.replace('$url',item.url).replace('$name',item.name);
                $('.category-content').append(str);
            });
        })
    }
    function addClick() {
        $('.category-content').on('click','.category-item',function () {
            alert(1);
        })
    }
    function init() {
        initCategory()
        addClick();
    }
    init()
})()