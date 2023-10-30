// 宣告路徑
let path = document.querySelector('.theRoad');
let straightPath = document.querySelector('.theRoad-s');
let pathLength = path.getTotalLength();
let pathLengthStraight = straightPath.getTotalLength();
// console.log(pathLength);
path.style.strokeDasharray = pathLength + ' ' + pathLength;
straightPath.style.strokeDasharray = pathLengthStraight + ' ' + pathLengthStraight;

// 設定速度倍數，调整滾動速度
let speedMultiplier = 2.5;
let speedMultiplierStraight = 1.5;

window.addEventListener('scroll', () => {
    // 獲取滾動的位置
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY;

    // 获取 Plan 元素的位置
    var plan = document.querySelector('.plan');
    var planPosition = plan.offsetTop;

    if (scrollPosition >= planPosition) {
        // 滾動到plan時開始有滾動
        var drawPosition = (scrollPosition - planPosition) * speedMultiplier - (windowHeight / 2);
        path.style.strokeDashoffset = pathLength - drawPosition;

        var drawPositionS = (scrollPosition - planPosition) * speedMultiplierStraight - (windowHeight / 2);
        straightPath.style.strokeDashoffset = pathLengthStraight - drawPositionS;
    }
});

//當992px時移除.theRoad-s
// window.addEventListener("resize", function () {
//     // 目前現在的大小
//     const windowWidth = window.innerWidth;
//     // 尺寸小於992px時移除class
//     if (windowWidth < 992) {
//         straightPath.classList.remove("theRoad-s");
//     }
// });