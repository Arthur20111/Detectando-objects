var img = "";
var objects = [];
var modeloStatus = "";

function preload() {
    img = loadImage('click.png');
}

function setup() {
    var canvas = createCanvas(640, 420);
    canvas.center();
    objetoDetectado = ml5.objectDetector('cocossd', modeloCarregado);
    document.getElementById("status").innerHTML = "Status: Detectando objetos";
}

function modeloCarregado() {
    console.log("Modelo carregado");
    modeloStatus = true;
    objetoDetectado.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (modeloStatus != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objeto Detectado";
            fill("red");
            porcentagem = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + porcentagem + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}