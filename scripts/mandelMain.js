const workers = []
const numOfWorkers = 4


document.getElementById("mandelCanvas").height = window.innerHeight + "px"
document.getElementById("mandelCanvas").width = window.innerWidth + "px"

let workerWidth = window.innerWidth / 4
let workerHeight = window.innerHeight

let maxIterations = 1000    //todo: zrob jakis input z tym


for(let i = 0; i < numOfWorkers; i++){
    const worker = new Worker("mandelWorker.js")
    workers.push(worker)

    const workerData = {
        width: workerWidth,
        height: workerHeight,
        xStartingPoint: workerWidth * i,
        yStartingPoint: 0,
        maxIterations: maxIterations
    }

    worker.postMessage(workerData)

    worker.onmessage = function(msg){
        const imageData = ctx.createImageData(workerWidth, workerHeight)
        imageData.data.set(msg.data)
        ctx.putImageData(imageData, workerData.xStartingPoint, workerData.yStartingPoint)
    }
}