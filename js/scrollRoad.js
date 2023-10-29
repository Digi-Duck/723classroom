// 宣告路徑
let path = document.querySelector('.theRoad');
let pathLength = path.getTotalLength();
// console.log(pathLength);
path.style.strokeDasharray = pathLength + ' ' + pathLength;

// 設定速度倍數，调整滾動速度
let speedMultiplier = 2.5;

window.addEventListener('scroll', () => {
    // 獲取滾動的位置
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY;

    // 获取 Plan 元素的位置
    var plan = document.querySelector('.plan');
    var planPosition = plan.offsetTop;

    if (scrollPosition >= planPosition) {
        // 滚动到 plan 时开始绘制路径
        var drawPosition = (scrollPosition - planPosition) * speedMultiplier - (windowHeight / 2);
        path.style.strokeDashoffset = pathLength - drawPosition;
    }
});