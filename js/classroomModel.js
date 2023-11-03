import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//場景生成
const scene = new THREE.Scene();

//加入燈光
const light = new THREE.AmbientLight(0x404040, 80);
scene.add(light);

//攝影機生成
const camera = new THREE.PerspectiveCamera(75, 1280 / 720, 0.1, 5000);

//渲染器生成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1280, 720);
document.getElementById('gamebox').appendChild(renderer.domElement);

//設定背景色
const color = new THREE.Color(0xeeeeee);

//動畫變數宣告(承接後func的就可以用)
let mixer;
let clips = [];
let flag = 0;
let alertflag = 0;


//模型生成
const loader = new GLTFLoader();
//上傳模型
loader.load(
    // resource URL
    '../model/723classroom11.gltf',
    // called when the resource is loaded
    function (gltf) {
        const model = gltf.scene
        scene.add(model);
        //動畫的部分
        mixer = new THREE.AnimationMixer(model);
        clips = gltf.animations;
        console.dir(clips);

        //時鐘轉動
        let clockClips = clips.filter(clip => clip.name.includes('clock'));

        clockClips.forEach(function (clip) {
            const clockAction = mixer.clipAction(clip);
            clockAction.play();
        });

        //監視器轉動
        let monitorClips = clips.filter(clip => clip.name.includes('monitor'));

        monitorClips.forEach(function (clip) {
            const monitorAction = mixer.clipAction(clip);
            monitorAction.play();
        });

        //角色動作
        let chenClips = clips.filter(clip => clip.name.includes('chen'));

        chenClips.forEach(function (clip) {
            const chenAction = mixer.clipAction(clip);
            chenAction.play();
        });
        let codeClips = clips.filter(clip => clip.name.includes('code'));

        codeClips.forEach(function (clip) {
            const codeAction = mixer.clipAction(clip);
            codeAction.play();
        });

        let tongClips = clips.filter(clip => clip.name.includes('tong'));

        tongClips.forEach(function (clip) {
            const tongAction = mixer.clipAction(clip);
            tongAction.play();
        });
        let yingClips = clips.filter(clip => clip.name.includes('ying'));

        yingClips.forEach(function (clip) {
            const yingAction = mixer.clipAction(clip);
            yingAction.play();
        });
        let rongClips = clips.filter(clip => clip.name.includes('rong'));

        rongClips.forEach(function (clip) {
            const rongAction = mixer.clipAction(clip);
            rongAction.play();
        });

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);

scene.background = color;
//攝影機位置
camera.position.set(3, 3, 3);


//設置時鐘
const clock = new THREE.Clock();
console.dir(clock);

//重複更新渲染畫面
function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

animate();

//raycaster使用
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const gamebox = document.querySelector("#gamebox canvas");
console.dir(gamebox);

//音樂
const audioMusic = document.createElement("audio");
audioMusic.src = "../audio/LemonCake.mp3";
let bgMusicPlay = true;

const messageMusic = document.createElement("audio");
messageMusic.src = "../audio/ring.m4a";

//抓滑鼠位置
function onclick(event) {
    pointer.x = (event.offsetX / gamebox.offsetWidth) * 2 - 1;
    pointer.y = - (event.offsetY / gamebox.offsetHeight) * 2 + 1;


    // 用攝影機更新射線
    raycaster.setFromCamera(pointer, camera);

    // 計算焦點
    const intersects = raycaster.intersectObjects(scene.children);

    // console.log(intersects[0].object.name);
    if (intersects[0].object.name.includes('fan01')) {
        flag = 1;
        flagFunc();
    } else if (intersects[0].object.name.includes('fan02')) {
        flag = 2;
        flagFunc();
    } else if (intersects[0].object.name.includes('chair_Action_1')) {
        flag = 3;
        flagFunc();
    } else if (intersects[0].object.name.includes('Audio')) {
        flag = 4;
        flagFunc();

        if (bgMusicPlay) {
            audioMusic.play();
        } else {
            audioMusic.pause();
            audioMusic.currentTime = 0;
        }
        bgMusicPlay = !bgMusicPlay;

    } else if (intersects[0].object.name.includes('projection')) {
        flag = 5;
        flagFunc();
    } else if (intersects[0].object.name.includes('cellphone')) {
        flag = 6;
        flagFunc();
    } else if (intersects[0].object.name.includes('Computer_host_controllable')) {
        flag = 7;
        flagFunc();
    } else if (intersects[0].object.name.includes('air_conditioner01')) {
        flag = 8;
        flagFunc();
    } else if (intersects[0].object.name.includes('air_conditioner02')) {
        flag = 9;
        flagFunc();
    } else if (intersects[0].object.name.includes('curtains01')) {
        flag = 10;
        flagFunc();
    } else if (intersects[0].object.name.includes('curtains02')) {
        flag = 11;
        flagFunc();
    } else if (intersects[0].object.name.includes('curtains03')) {
        flag = 12;
        flagFunc();
    } else if (intersects[0].object.name.includes('whiteboard')) {
        alertflag = 1;
        alertFunc();
    } else if (intersects[0].object.name.includes("Teacher's_computer")) {
        alertflag = 2;
        alertFunc();
    } else if (intersects[0].object.name.includes('rong')) {
        alertflag = 3;
        alertFunc();
    } else if (intersects[0].object.name.includes('chen')) {
        alertflag = 4;
        alertFunc();
    } else if (intersects[0].object.name.includes('ying')) {
        alertflag = 5;
        alertFunc();
    } else if (intersects[0].object.name.includes('tong')) {
        alertflag = 6;
        alertFunc();
    } else {
        console.log('nothing');
        console.log(intersects[0].object.name);
        flag = 0;
    };

    // if (intersects[0].object.name == '') {
    //     console.log(intersects[1].object.name)
    // } else {
    //     console.log(intersects[0].object.name)
    // };
}

//滑鼠移動到互動物件
function mouseMove(event) {
    pointer.x = (event.offsetX / gamebox.offsetWidth) * 2 - 1;
    pointer.y = - (event.offsetY / gamebox.offsetHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects[0].object.name.includes('fan01')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('fan02')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('chair_Action_2')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('Audio')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('projection')) {
        gamebox.style.cursor = 'pointer';
    }else if (intersects[0].object.name.includes('cellphone')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('Computer_host_controllable')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('air_conditioner01')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('air_conditioner02')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('curtains01')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('curtains02')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('curtains03')) {
        gamebox.style.cursor = 'pointer';
    }else if (intersects[0].object.name.includes('whiteboard')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes("Teacher's_computer")) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('rong')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('chen')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('ying')) {
        gamebox.style.cursor = 'pointer';
    } else if (intersects[0].object.name.includes('tong')) {
        gamebox.style.cursor = 'pointer';
    } else {
        gamebox.style.cursor = 'default';
    }
}

//滑鼠監聽事件
gamebox.addEventListener('click', onclick);
gamebox.addEventListener('mousemove',mouseMove);

//滑鼠點擊後彈跳視窗物件
function alertFunc() {
    if (alertflag === 1) {
        console.log('whiteboard');
        Swal.fire({
            title: '<strong>想與我們說些什麼嗎？</strong>',
            footer: '<a class="alert" href="#message">留言去</a>',
            icon: 'warning',
            // showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
        });
    } else if (alertflag === 2) {
        console.log("teacher's computer");
        Swal.fire({
            title: '<strong>專屬我們的謬思女神,無數創意在此誕生</strong>',
            footer: '<a class="alert" href="#introduce">創意在此</a>',
            icon: 'warning',
            // showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
        });
    } else if (alertflag === 3) {
        console.log('慶龍');
        Swal.fire({
            title: '<strong>這模型為什麼修不好？？</strong>',
            footer: '<a class="alert" href="#aboutUs">關心我</a>',
            // showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
        });
    } else if (alertflag === 4) {
        console.log('惠貞');
        Swal.fire({
            title: '<strong>程式要怎麼寫好呢．．．</strong>',
            footer: '<a class="alert" href="#aboutUs">救救我</a>',
            // showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
        });
    } else if (alertflag === 5) {
        console.log('承穎');
        Swal.fire({
            title: '<strong>模型好像可以再更好！</strong>',
            footer: '<a class="alert" href="#aboutUs">認識我</a>',
            // showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
        });
    } else if (alertflag === 6) {
        console.log('芸同');
        Swal.fire({
            title: '<strong>邊可以再對齊一點嗎？</strong>',
            footer: '<a class="alert" href="#aboutUs">設計我</a>',
            // showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
        });
    } else {
        alertflag = 0;
    }
}

//針對播放的音樂
let projectionPlay = true;
let curtainPlay01 = true;
let curtainPlay02 = true;
let curtainPlay03 = true;

//滑鼠點擊後動畫物件
function flagFunc() {
    if (flag === 1) {
        let fanClips = clips.filter(clip => clip.name.includes('fan01'));
        fanClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
        animate();
    } else if (flag === 2) {
        let fanClips02 = clips.filter(clip => clip.name.includes('fan02'));

        fanClips02.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
        animate();
    } else if (flag === 3) {
        let chairClips = clips.filter(clip => clip.name.includes('chair'));
        chairClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
            action.loop = THREE.LoopOnce;
            action.reset();
        });
        animate();
    } else if (flag === 4) {
        let audioClips = clips.filter(clip => clip.name.includes('audio'));
        audioClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            if (bgMusicPlay) {
                action.play();
            } else {
                action.paused = true;
                action.reset();
            }
        });
        animate();
    } else if (flag === 5) {
        let projectionClips = clips.filter(clip => clip.name.includes('projection'));
        projectionClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            if (projectionPlay) {
                action.play();
                action.setLoop(THREE.LoopOnce);
                action.reset();
                action.timeScale = 1;
                action.clampWhenFinished = true;
            } else {
                action.timeScale = -1;
                action.paused = false;
            }
        });
        projectionPlay = !projectionPlay;
        animate();
    } else if (flag === 6) {
        messageMusic.play();
        let messageClips = clips.filter(clip => clip.name.includes('message'));
        messageClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
            action.loop = THREE.LoopOnce;
            action.reset();
        });

        let cellphoneClips = clips.filter(clip => clip.name.includes('cellphone'));
        cellphoneClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
            action.loop = THREE.LoopOnce;
            action.reset();
        });
        animate();
    } else if (flag === 7) {
        let DVDClips = clips.filter(clip => clip.name.includes('DVD'));
        DVDClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
            action.loop = THREE.LoopOnce;
            action.reset();
        });
        animate();
    } else if (flag === 8) {
        let conditionerClips = clips.filter(clip => clip.name.includes('conditioner01'));

        conditionerClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
        animate();
    } else if (flag === 9) {
        let conditionerClips02 = clips.filter(clip => clip.name.includes('conditioner02'));

        conditionerClips02.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
        animate();
    } else if (flag === 10) {
        let windowClips = clips.filter(clip => clip.name.includes('curtains01'));
        windowClips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            //宣告一個play變數來判定
            if (curtainPlay01) {
                //播放動畫
                action.play();
                //播放一次
                action.setLoop(THREE.LoopOnce);
                //重置動畫
                action.reset();
                //順播放動畫
                action.timeScale = 1;
                //當結束時停止在最後一幀
                action.clampWhenFinished = true;
            } else {
                //倒播動畫
                action.timeScale = -1;
                //把暫停取消
                action.paused = false;

            }
        });
        //動畫播放完後要把變數反轉
        curtainPlay01 = !curtainPlay01;
        animate();
    } else if (flag === 11) {
        let windowClips02 = clips.filter(clip => clip.name.includes('curtains02'));
        windowClips02.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            if (curtainPlay02) {
                action.play();
                action.setLoop(THREE.LoopOnce);
                action.reset();
                action.timeScale = 1;
                action.clampWhenFinished = true;
            } else {
                action.timeScale = -1;
                action.paused = false;

            }
        });
        curtainPlay02 = !curtainPlay02;
        animate();
    } else if (flag === 12) {
        let windowClips03 = clips.filter(clip => clip.name.includes('curtains03'));
        windowClips03.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            if (curtainPlay03) {
                action.play();
                action.setLoop(THREE.LoopOnce);
                action.reset();
                action.timeScale = 1;
                action.clampWhenFinished = true;
            } else {
                action.timeScale = -1;
                action.paused = false;
            }
        });
        curtainPlay03 = !curtainPlay03;
        animate();
    } else {
        flag = 0;
        animate();
    }
}

//滑鼠轉動模型
const controls = new OrbitControls(camera, renderer.domElement);

