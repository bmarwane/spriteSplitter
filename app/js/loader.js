(
    function(window){
        function reset(){
            imageData = undefined
            canvas = undefined
            context = undefined
            imageObj = undefined
            rawImageData = undefined
            refPixel = undefined
            window.spriteSplitter.selectedSelections = []
            window.spriteSplitter.finalListSelections = []
            window.spriteSplitter.imageObj = undefined
            finalListSelections = []
        }
        var imageData, canvas, context, imageObj, refPixel, finalListSelections = [], rawImageData

        window.spriteSplitter = {
            selectImages : selectImages,
            isPixelInSelections : isPixelInSelections,
            loadFileInCanvas : loadFileInCanvas,
            onCanvasClick:onCanvasClick,
            selectFrameAndOverlayIt: selectFrameAndOverlayIt,
            selectFrameAt: selectFrameAt,
            resetSelections: resetSelections,
            selectedSelections: [],
            finalListSelections: [],
            imageObj: undefined
        }

        function resetSelections(){
            window.spriteSplitter.selectedSelections = []
            window.spriteSplitter.finalListSelections = []
            context.putImageData(rawImageData,0,0);
        }

        function selectImages(conf, onSelectionsFound){
            reset()
            let fileUrl = conf.fileUrl
            let canvas = conf.canvas
            let startX = conf.startX
            loadFileInCanvas(fileUrl, canvas, function (imageObj, context) {

                if(onSelectionsFound){
                    onSelectionsFound(findFramesFrom(0, 0))
                }
            })

        }


        function loadFileInCanvas(dataURL, cnv, callback) {
            canvas = cnv;
            context = canvas.getContext('2d');

            // load image from data url
            imageObj = new Image();
            imageObj.onload = function () {
                canvas.width = imageObj.width
                canvas.height = imageObj.height
                context.drawImage(this, 0, 0)

                spriteSplitter.imageObj = imageObj
                var w = imageObj.width, h = imageObj.height;
                rawImageData = context.getImageData(0, 0, w, h)
                imageData = rawImageData.data
                refPixel = getPixel(0, 0)

                callback(imageObj, context)
            };

            imageObj.src = dataURL;
        }

        function getPixel(x, y) {
            return {
                x: x,
                y:y,
                red:   imageData[(imageObj.width * y + x) * 4],
                green: imageData[(imageObj.width * y + x) * 4 + 1],
                blue:  imageData[(imageObj.width * y + x) * 4 + 2],
                alpha: imageData[(imageObj.width * y + x) * 4 + 3]
            }
        }

        function putOverlay(selection){
            if(spriteSplitter.selectedSelections.indexOf(selection) !== -1) return
            
            spriteSplitter.selectedSelections.push(selection)
            context.globalCompositeOperation="lighter"
            context.fillStyle="#F44336"
            context.fillRect(selection.x, selection.y, selection.width, selection.height)
        }

        /*******************************/


        function isEmptyPixel(targetPixel){
             return targetPixel.red === refPixel.red
             && targetPixel.blue === refPixel.blue
             && targetPixel.green === refPixel.green
             &&   targetPixel.alpha === refPixel.alpha
        }

        function isPixelInSelections(selections, pixel){
            return findSelectionOfPixel(selections, pixel).length > 0
        }

        function findSelectionOfPixel(selections, pixel){
            return selections.filter(function(selection){
                let minX = selection.x
                let minY = selection.y

                let maxX = selection.x + selection.width
                let maxY = selection.y + selection.height

                if(    pixel.x >= minX && pixel.x <= maxX
                    && pixel.y >= minY && pixel.y <= maxY  ){
                    return selection
                } else {
                    return false
                }
            })
        }


        function findFramesFrom(startX, startY){
            let selections = []

            //selections.push(selectFrame(startX, startY))

            selectFrameAndNext(startX, startY, selections)

            finalListSelections = selections
            spriteSplitter.finalListSelections = finalListSelections
            return selections
        }

        function selectFrameAt(startX, startY){
            if(spriteSplitter.finalListSelections === undefined){
                spriteSplitter.finalListSelections = []
            }

            let firstPixel = findNextStartPixel(startX, startY, spriteSplitter.finalListSelections)

            if(isFinalPixel(firstPixel)){
                return;
            }

            let selection = selectFrame(firstPixel)

            if(selection) {
                spriteSplitter.finalListSelections.push(selection)
            }

            return spriteSplitter.finalListSelections;

        }

        function selectFrameAndNext(startX, startY, selections){

            let firstPixel = findNextStartPixel(startX, startY, selections)

            if(isFinalPixel(firstPixel)){
                return;
            }

            let selection = selectFrame(firstPixel)
            if(selection){
                selections.push(selection)

                let nextPixel = findNextPixel()

                selectFrameAndNext(nextPixel.x, nextPixel.y, selections)

                function findNextPixel(){
                    let nextStartX = selection.x + selection.width
                    let nextStartY = selection.y

                    let retPixel = {
                        x: nextStartX,
                        y: nextStartY
                    }

                    if(nextStartX >= selection.width){
                        retPixel.x = 0
                        retPixel.y = selection.y + 1
                    }

                    return retPixel
                }
            }
        }

        function isFinalPixel(pixel){
            return pixel === undefined || (pixel.x === imageObj.width -1 && pixel.y === imageObj.height -1)
        }

        function selectFrame(firstPixel){

            let selection = {
                x: firstPixel.x,
                y: firstPixel.y,
                width:1,
                height:1
            }

            expandFromPixel(selection)

            return selection
        }

        var lastPixel
        function findNextStartPixel(beginX, beginY, selections){
            return searchPixel(beginX, beginY)

            function searchPixel(tx, ty){
                for(let y = ty, max = imageObj.height; y < max; y++){
                    for(let x = tx, maxX = imageObj.width; x < maxX; x++){
                        let targetPixel = getPixel(x, y)
                        if(!isEmptyPixel(targetPixel) && !isPixelInSelections(selections, targetPixel)){
                            lastPixel = targetPixel
                            return targetPixel
                        }
                    }
                }
            }



        }

        function firstFirstContentInLineFromZero(y, selections){
            for(let x = 0, maxX = imageObj.width; x < maxX; x++){
                let targetPixel = getPixel(x, y)
                if(!isEmptyPixel(targetPixel) && !isPixelInSelections(selections, targetPixel)){
                    return targetPixel
                }

            }
        }

        function findFirstContentInLine(y, beginX){
            for(let x = beginX, maxX = imageObj.width; x < maxX; x++){
                let targetPixel = getPixel(x, y)
                if(!isEmptyPixel(targetPixel)){
                    return targetPixel
                }

            }
        }


        function expandFromPixel(selection){


            let isFinished = false

            while(!isFinished){
                let offset = expandFromAllDirections(selection)

                if(offset === 0){
                    isFinished = true
                }
            }
        }

        function isLineEmptyToTheRight(selection){
            let xToCheck = selection.x + selection.width
            let yToCheck = selection.y

            if(xToCheck > imageObj.width) return true


            for(let y = yToCheck, max = (yToCheck + selection.height); y < max; y++){
                if(!isEmptyPixel(getPixel(xToCheck, y))){
                    return false
                }
            }

            return true
        }

        function isLineEmptyToTheLeft(selection){
            let xToCheck = selection.x - 1
            let yToCheck = selection.y

            if(xToCheck < 0) return true


            for(let y = yToCheck, max =  (yToCheck + selection.height); y < max; y++){
                if(!isEmptyPixel(getPixel(xToCheck, y))){
                    return false
                }
            }

            return true
        }


        function isLineEmptyToTheBottom(selection){
            let xToCheck = selection.x
            let yToCheck = selection.y + selection.height

            if(yToCheck > imageObj.height) return true


            for(let x = xToCheck, max =  ( xToCheck + selection.width); x < max; x++){
                if(!isEmptyPixel(getPixel(x, yToCheck))){
                    return false
                }
            }

            return true
        }

        function isLineEmptyToTheTop(selection){
            let xToCheck = selection.x
            let yToCheck = selection.y - 1

            if(yToCheck < 0) return true


            for(let x = xToCheck, max =  ( xToCheck + selection.width); x < max; x++){
                if(!isEmptyPixel(getPixel(x, yToCheck))){
                    return false
                }
            }

            return true
        }


        function expandFromAllDirections(selection){
            let offset = 0

            offset += expandToTheRight(selection)
            offset += expandToTheBottom(selection)
            offset += expandToTheLeft(selection)
            offset += expandToTheTop(selection)

            return offset
        }

        function expandToTheRight(selection){
            let offset = 0

            let isFinished = false
            while(!isFinished){


                if(isLineEmptyToTheRight(selection)){
                    isFinished = true
                    break
                }

                offset += 1
                selection.width += 1
            }

            return offset
        }

        function expandToTheLeft(selection){
            let offset = 0

            let isFinished = false
            while(!isFinished){


                if(isLineEmptyToTheLeft(selection)){
                    isFinished = true
                    break
                }

                offset += 1
                selection.x -= 1
                selection.width += 1
            }

            return offset
        }

        function expandToTheBottom(selection){
            let offset = 0

            let isFinished = false
            while(!isFinished){


                if(isLineEmptyToTheBottom(selection)){
                    isFinished = true
                    break
                } else {
                    offset += 1
                    selection.height += 1
                }
            }


            return offset
        }

        function expandToTheTop(selection){
            let offset = 0

            let isFinished = false
            while(!isFinished){
                if(isLineEmptyToTheTop(selection)){
                    isFinished = true
                    break
                }

                offset += 1
                selection.y -= 1
                selection.height += 1
            }


            return offset
        }

        function selectFrameAndOverlayIt(e){
            let mousePos = getMousePos(e)
            let selections = selectFrameAt(mousePos.x, mousePos.y)

            selections.forEach(function(selection){
                putOverlay(selection)
            })
        }
        function onCanvasClick(e){
            let selections = findSelectionOfPixel(finalListSelections, getMousePos(e))

            if(selections.length > 0){
                putOverlay(selections[0])
            }
        }

        function getMousePos(evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

    }
)(window)