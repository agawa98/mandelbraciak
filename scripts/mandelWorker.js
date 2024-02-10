onmessage = (msg)=>{
    const data = msg.data
    const width = data.width
    const height = data.height
    const xStartingPoint = data.xStartingPoint
    const yStartingPoint = data.yStartingPoint
    const maxIterations = data.maxIterations

    const magniFactor = 2000
    const panX = 2
    const panY = 1.5
    const imageData = new Uint8ClampedArray(width * height * 4)




    function iterate(x, y, maxIterations){
        let zx = 0
        let zy = 0
        let iteration = 0
        
        while(zx * zx + zy * zy < 4 && iteration < maxIterations){
            let xtemp = zx * zx - zy * zy + x
            zy = 2 * zx * zy + y
            zx = xtemp
            iteration++
        }

        return iteration
    }

    for(let xx = 0; xx < width; xx++){               // xx - szerokosc   yy - wysoksoc
        for(let yy = 0; yy< height; yy++){
            let x = (xx + xStartingPoint) / magniFactor - panX
            let y = (yy + yStartingPoint) / magniFactor - panY

            let iteration = iterate(x, y, maxIterations)
            let color = (iteration === maxIterations) ? 0 : 255 - Math.floor(iteration * 255 / maxIterations)
            let index = (xx + yy * width) * 4

            imageData[index] = color          // red
            imageData[index + 1] = color      // green
            imageData[index + 2] = color      // blue
            imageData[index + 3] = 255        // alpha
        }
    }

    iterate(xStartingPoint,yStartingPoint,maxIterations)


    //postuje meessage
    postMessage(imageData.buffer, [imageData.buffer])
}