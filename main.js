var status = ""
var objects = []

function preload() { }

function setup() {
    canvas = createCanvas(400, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded() {
    console.log("Model Loaded!")
    document.getElementById("modelStatus").innerHTML = "Status: Detecting Objects"
    status = true
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        //console.log(results[2].label, results[2].width, results[2].height, results[2].x, results[2].y)
        objects = results
        console.log(objects)
    }
}

function draw() {
    image(video, 0, 0, 400, 400)
    if (status != "") {
        objectDetector.detect(video, gotResults)
        r = random(255)
        g = random(255)
        b = random(255)

        for (var i = 0; i < objects.length; i++) {
            document.getElementById("modelStatus").innerHTML = "Status: Objects Detected"
            noFill()
            stroke(r, g, b)
            var confidence = Math.floor(objects[i].confidence * 100) + "%"
            text(objects[i].label + " " + confidence, objects[i].x + 20, objects[i].y + 20)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

    var detect = document.getElementById("objectInput").value
    console.log(detect)

    if (objects = detect) {
        console.log("Yes")
        document.getElementById("modelStatus").innerHTML = "Status: Objects Detected"

        var synth = window.speechSynthesis
        var speakData = "The object has been detected"
        var utter = new SpeechSynthesisUtterance(speakData)
        synth.speak(utter)

        document.getElementById("modelStatus").innerHTML = "Status: Objects Detected"
    }else if (objects != detect){
        document.getElementById("modelObject").innerHTML = "Objects: " + objects

        var synth = window.speechSynthesis
        var speakData = "The object has not been detected"
        var utter = new SpeechSynthesisUtterance(speakData)
        synth.speak(utter)
    }
}