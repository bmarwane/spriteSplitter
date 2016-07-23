QUnit.module("module", function (obj) {
    let canvas
    obj.beforeEach(function () {
        canvas = document.createElement("canvas")
    });
    obj.afterEach(function () {
        canvas = undefined
    });
    /*
    QUnit.test("Can select a rectangle", function (assert) {
        var done = assert.async();
        selectImages({
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
    //*/

    QUnit.test("Can select a complex shape", function (assert) {
        var done = assert.async();
        selectImages({
            fileUrl: './test2.png',
            canvas: canvas,
            startX: 0,
            startY: 0
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

});

