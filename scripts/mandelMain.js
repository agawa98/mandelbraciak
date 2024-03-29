const workers = []
const numOfWorkers = 4



let workerWidth = window.innerWidth / 4
let workerHeight = window.innerHeight

document.getElementById("mandelCanvas").height = window.innerHeight
document.getElementById("mandelCanvas").width = window.innerWidth

let maxIterations = 1000    //todo: zrob jakis input z tym

const canvas = document.getElementById("mandelCanvas")
const ctx = canvas.getContext("2d")


for(let i = 0; i < numOfWorkers; i++){
    const worker = new Worker("scripts/mandelWorker.js")
    workers.push(worker)

    console.log("workers sent")

    const workerData = {
        width: workerWidth,
        height: workerHeight,
        xStartingPoint: workerWidth * i,
        yStartingPoint: 0,
        maxIterations: maxIterations
    }

    worker.postMessage(workerData)

    worker.onmessage = function(msg){

        console.log(msg)
        const imageData = ctx.createImageData(workerWidth, workerHeight)
        imageData.data.set(new Uint8ClampedArray(msg.data))
        console.log(imageData)
        ctx.putImageData(imageData, workerData.xStartingPoint, workerData.yStartingPoint)
    }
}