import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

let scene, camera, renderer;
let bgpoints, bokeh1, bokeh2, bokeh3, bokeh4, points;
var storedlocation = [];

var initDone = false;
var initAnim = false;

// var cnt = document.getElementById("count");
// var water = document.getElementById("water");
// var percent = cnt.innerText;
// var interval;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
        alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = true;
    renderer.setClearColor(0x000000, 0.0);
    camera.position.setZ(10);

    ///////////////object/////////////////////////////////////////////////
    const pointlight = new THREE.PointLight(0xffffff);
    pointlight.position.set(0, 3, 0);

    const ambientlight = new THREE.AmbientLight(0xffffff);
    scene.add(pointlight, ambientlight);

    // const lighthelper = new THREE.PointLightHelper(pointlight);
    // const gridhelper = new THREE.GridHelper(50, 20);
    // scene.add(lighthelper, gridhelper);  
    renderObjects();
}

function renderObjects() {
    document.getElementById("contentbox").appendChild(titlediv);
    document.getElementById("contentbox").appendChild(contentdiv);
    document.getElementById("arrow-icon").style.visibility = 'visible';
    document.getElementById("arrow-icon").classList.add("showanim");
    ///Bokeh///
    const bokehPoints1 = [];
    const bokehPoints2 = [];
    const bokehPoints3 = [];
    const bokehPoints4 = [];

    for (let i = 0; i < 50; i++) {
        bokehPoints1.push(
            THREE.MathUtils.randFloatSpread(50),
            THREE.MathUtils.randFloatSpread(50),
            THREE.MathUtils.randFloatSpread(50)
        );
        bokehPoints2.push(
            THREE.MathUtils.randFloatSpread(50),
            THREE.MathUtils.randFloatSpread(50),
            THREE.MathUtils.randFloatSpread(50)
        );
        bokehPoints3.push(
            THREE.MathUtils.randFloatSpread(80),
            THREE.MathUtils.randFloatSpread(80),
            THREE.MathUtils.randFloatSpread(80)
        );
        bokehPoints4.push(
            THREE.MathUtils.randFloatSpread(80),
            THREE.MathUtils.randFloatSpread(80),
            THREE.MathUtils.randFloatSpread(80)
        );
    }

    const bgeometry1 = new THREE.BufferGeometry();
    const bgeometry2 = new THREE.BufferGeometry();
    const bgeometry3 = new THREE.BufferGeometry();
    const bgeometry4 = new THREE.BufferGeometry();
    bgeometry1.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(bokehPoints1, 3)
    );
    bgeometry2.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(bokehPoints2, 3)
    );
    bgeometry3.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(bokehPoints3, 3)
    );
    bgeometry4.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(bokehPoints4, 3)
    );

    const bmaterial1 = new THREE.PointsMaterial({
        size: 7,
        sizeAttenuation: true,
        alphaTest: 0.5,
        transparent: true,
        alphaTest: 0.01,
        opacity: 0.02,
        blending: THREE.NormalBlending,
        map: new THREE.TextureLoader().load("/assets/bokeh.png"),
    });

    const bmaterial2 = new THREE.PointsMaterial({
        size: 12,
        sizeAttenuation: true,
        alphaTest: 0.5,
        transparent: true,
        alphaTest: 0.01,
        opacity: 0.02,
        blending: THREE.NormalBlending,
        map: new THREE.TextureLoader().load("/assets/bokeh.png"),
    });

    bokeh1 = new THREE.Points(bgeometry1, bmaterial1);
    bokeh2 = new THREE.Points(bgeometry2, bmaterial1);
    bokeh3 = new THREE.Points(bgeometry3, bmaterial2);
    bokeh4 = new THREE.Points(bgeometry4, bmaterial2);
    scene.add(bokeh1);
    scene.add(bokeh2);
    scene.add(bokeh3);
    scene.add(bokeh4);
    ////////
    const particles = [];

    for (let i = 0; i < 3000; i++) {
        particles.push(
            THREE.MathUtils.randFloatSpread(50),
            THREE.MathUtils.randFloatSpread(50),
            THREE.MathUtils.randFloatSpread(50)
        );
    }

    const pgeometry = new THREE.BufferGeometry();
    pgeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(particles, 3)
    );

    const pmaterial = new THREE.PointsMaterial({
        size: 0.2,
        sizeAttenuation: true,
        alphaTest: 0.5,
        transparent: true,
        alphaTest: 0.01,
        opacity: 0.5,
        blending: THREE.NormalBlending,
        depthWrite: false,
        map: new THREE.TextureLoader().load("/assets/dot.png"),
    });

    bgpoints = new THREE.Points(pgeometry, pmaterial);
    scene.add(bgpoints);

    ////new wave////
    const vertices = [];
    storedlocation = [];
    const particlenum = 70;

    for (let i = 0; i < particlenum; i++) {
        for (let j = 0; j < particlenum; j++) {
            var x, y, z;
            if (i > particlenum / 2) {
                x = i - particlenum / 2;
            } else {
                x = -i;
            }
            y = 0;
            if (j > particlenum / 2) {
                z = j - particlenum / 2;
            } else {
                z = -j;
            }

            vertices.push(x / 3, y, z / 3);
        }
    }

    for (var i = 0; i < 5; i++) {
        var randnum = Math.floor(
            THREE.MathUtils.randFloat(0, particlenum * particlenum - 1)
        );
        storedlocation.push(randnum);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        alphaTest: 0.5,
        transparent: true,
        alphaTest: 0.01,
        opacity: 0.5,
        blending: THREE.NormalBlending,
        depthWrite: false,
        map: new THREE.TextureLoader().load("/assets/dot.png"),
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
    initDone = true;

}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function fitCameraToObject(camera, objectX, objectY, objectZ) {
    camera.lookAt(objectX, objectY, objectZ);

    var newPosX = camera.position.x * 0.95 + (objectX + 0.3) * 0.05;
    var newPosY = camera.position.y * 0.95 + (objectY + 0.2) * 0.05;
    var newPosZ = camera.position.z * 0.95 + (objectZ + 0.3) * 0.05;
    camera.position.setX(newPosX);
    camera.position.setY(newPosY);
    camera.position.setZ(newPosZ);
}
var lastIndex = 0;
var currentIndex = 0;
window.addEventListener(
    "wheel",
    function(e) {
        if (isMainZoom == true) {
            lastIndex = currentIndex;
            currentIndex += storedlocation.length;

            if (e.deltaY > 0) {
                currentIndex++;
            } else {
                currentIndex--;
            }
            currentIndex %= storedlocation.length;
            showText();
        }
    },
    true
);

var title = ["Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5"];
var content = [
    "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>"
];
var details = [
    "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>", "<div>Content  Content  Content  Content  Content  Content  Content  Content  Content  Content </div>"
];
var titlediv, contentdiv, detaildiv;

window.onload = function() {

    titlediv = document.createElement("div");
    titlediv.setAttribute("id", "title");
    titlediv.innerHTML = title[currentIndex];
    titlediv.classList.add("addedtitle");
    // document.getElementById("contentbox").appendChild(titlediv);
    contentdiv = document.createElement("div");
    contentdiv.setAttribute("id", "content");
    contentdiv.innerHTML = content[currentIndex];
    contentdiv.classList.add("addedcontent");
    // document.getElementById("contentbox").appendChild(contentdiv);
    init();
};

function showText() {
    // titlediv = document.createElement("div");
    titlediv.setAttribute("id", "title");
    titlediv.innerHTML = title[currentIndex];
    titlediv.classList.add("addedtitle");
    document.getElementById("contentbox").appendChild(titlediv);
    // contentdiv = document.createElement("div");
    contentdiv.setAttribute("id", "content");
    contentdiv.innerHTML = content[currentIndex];
    contentdiv.classList.add("addedcontent");
    document.getElementById("contentbox").appendChild(contentdiv);
}

function showDetailInfo() {
    detaildiv = document.createElement("div");
    detaildiv.setAttribute("id", "detail");
    detaildiv.innerHTML = details[currentIndex];
    detaildiv.classList.add("addeddetailcontent");
    document.getElementById("contentbox").appendChild(detaildiv);
    document.getElementById("content").remove();
}

var isMainZoom = true;

document.getElementById("arrow-icon").addEventListener("click", function() {
    document.getElementById("arrow-icon").classList.toggle("open");
    if (document.getElementById("arrow-icon").classList.contains("open")) {
        // console.log("open");
        showDetail(
            camera,
            points.geometry.attributes.position.array[
                storedlocation[currentIndex] * 3
            ],
            points.geometry.attributes.position.array[
                storedlocation[currentIndex] * 3 + 1
            ],
            points.geometry.attributes.position.array[
                storedlocation[currentIndex] * 3 + 2
            ]
        );
        showDetailInfo();
    } else {
        document.getElementById("detail").remove();
        document.getElementById("contentbox").appendChild(contentdiv);
        isMainZoom = true;
    }
});

function showDetail(camera, objectX, objectY, objectZ) {
    camera.lookAt(objectX, objectY + 10, objectZ);

    camera.position.setX(objectX);
    camera.position.setY(objectY + 5);
    camera.position.setZ(objectZ);
    isMainZoom = false;
    // console.log("called");
}

var sinAdd = 0;

function updateScene() {
    requestAnimationFrame(updateScene);

    if (!initDone) return;
    bgpoints.rotation.y += 0.001;
    bokeh1.rotation.y += 0.0005;
    bokeh2.rotation.y -= 0.0005;
    bokeh3.rotation.y += 0.0005;
    bokeh4.rotation.y -= 0.0005;

    sinAdd += 0.002;
    var x, y, z;
    for (
        var i = 0; i < points.geometry.attributes.position.array.length; i += 3
    ) {
        x = points.geometry.attributes.position.array[i];
        y = points.geometry.attributes.position.array[i + 1];
        z = points.geometry.attributes.position.array[i + 2];
        var yPos = noise.simplex3(x / 12, z / 12, sinAdd) * 1.5;

        points.geometry.attributes.position.array[i + 1] = yPos;
    }

    points.geometry.attributes.position.needsUpdate = true;

    if (isMainZoom == true) {
        fitCameraToObject(
            camera,
            points.geometry.attributes.position.array[
                storedlocation[currentIndex] * 3
            ],
            points.geometry.attributes.position.array[
                storedlocation[currentIndex] * 3 + 1
            ],
            points.geometry.attributes.position.array[
                storedlocation[currentIndex] * 3 + 2
            ]
        );
    }
    renderer.render(scene, camera);
}

updateScene();

//https://hackernoon.com/publishing-a-threejs-project-on-github-pages-1d1a33dn