QUnit.module("module", function (obj) {
    let canvas
    obj.beforeEach(function () {
        canvas = document.createElement("canvas")
    });
    obj.afterEach(function () {
        canvas = undefined
    });

    //*
    QUnit.test("Can select a rectangle", function (assert) {
        var done = assert.async();
        spriteSplitter.selectImages({
            fileUrl: './test1.png',
            canvas: canvas,
            startX: 27,
            startY: 22
        }, function (selections) {
            assert.deepEqual(selections,[
                {
                    "height": 56,
                    "width": 40,
                    "x": 4,
                    "y": 4
                }
            ])
            done()
        })
    })

    QUnit.test("Can select a complex shape", function (assert) {
        var done = assert.async();
        spriteSplitter.selectImages({
            fileUrl: './test2.png',
            canvas: canvas,
            startX: 16,
            startY: 15
        }, function (selections) {
            assert.deepEqual(selections,[
                {
                    "x": 2,
                    "y": 4,
                    "width": 30,
                    "height": 46


                }
            ])
            done()
        })
    })

    QUnit.test('Find pixel in selections', function(assert){
        var done = assert.async();

        spriteSplitter.loadFileInCanvas('./test3.png', canvas, function (imageObj, context) {
            let selections = [
                {
                    "x": 4,
                    "y": 5,
                    "width": 40,
                    "height": 56
                },
                {
                    "x": 53,
                    "y": 5,
                    "width": 16,
                    "height": 16
                }

            ]

            let found = spriteSplitter.isPixelInSelections(selections, {x: 19, y: 31})
            let found2 = spriteSplitter.isPixelInSelections(selections, {x: 61, y: 13})
            let notFound = spriteSplitter.isPixelInSelections(selections, {x: 1, y: 1})
            let notFound2 = spriteSplitter.isPixelInSelections(selections, {x: 57, y: 39})

            assert.equal(found, true)
            assert.equal(found2, true)
            assert.equal(notFound, false)
            assert.equal(notFound2, false)

            done()
        })

    })
//*/


    //*
    QUnit.test("Two images in a row", function (assert) {
        var done = assert.async();
        spriteSplitter.selectImages({
            fileUrl: './test3.png',
            canvas: canvas,
            startX: 0,
            startY: 0
        }, function (selections) {
            assert.deepEqual(selections,[
                {
                    "x": 4,
                    "y": 5,
                    "width": 40,
                    "height": 56
                },
                {
                    "x": 53,
                    "y": 5,
                    "width": 16,
                    "height": 16
                }

            ])
            done()
        })
    })
    //*/

    QUnit.test("Images im multiple position", function (assert) {
        var done = assert.async();
        spriteSplitter.selectImages({
            fileUrl: './test4.png',
            canvas: canvas,
            startX: 0,
            startY: 0
        }, function (selections) {
            assert.deepEqual(selections,[
                {
                    "x": 4,
                    "y": 4,
                    "width": 40,
                    "height": 56
                },
                {
                    "x": 75,
                    "y": 4,
                    "width": 16,
                    "height": 16
                },
                {
                    "x": 54,
                    "y": 24,
                    "width": 13,
                    "height": 16
                }

            ])
            done()
        })
    })



});

