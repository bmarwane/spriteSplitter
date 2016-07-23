selectImages({
    fileUrl:'test.gif',
    canvas:document.getElementById('canvas'),
    startX:0,
    startY:0
}, function(selections){
    console.log(selections)
})