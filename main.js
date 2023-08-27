function setup() {
    canvas = createCanvas(640, 480);
    background("white")
    video = createCapture(VIDEO)
    video.hide()
    frameRate(5)
}

function draw() {
    image(
        video, 0, 0, 640, 840
    )
    analizar()
}

function preload() {
    ia = ml5.imageClassifier("MobileNet")
}
function analizar() {
    ia.classify(canvas, respuesta);
}

function respuesta(error, resultados) {
    if (!error) {
        console.log(resultados)
        dibujo = resultados[0].label;
        confianza = Math.round(resultados[0].confidence * 100);
        if (confianza > 40) {
            document.getElementById("confianza").
                innerHTML = confianza + "%";

            fetch("https://api.mymemory.translated.net/get?q=" + dibujo + "&langpair=en|es")
                .then(response => response.json())
                .then(data => {
                    traduccion = data.responseData.translatedText;
                });
            document.getElementById("dibujo").innerHTML = traduccion;
        }
    }
}