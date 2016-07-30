var canvasBuffer = require('electron-canvas-to-buffer')
var fs = require('fs')
var path = require('path')
require('bluebird').promisifyAll(fs)

angular.module('app', [])

angular.module('app')
    .controller('mainController', function($scope, $timeout, frameService){
        $scope.mainImagePath = undefined
        $scope.onSelectMainImage = (event, element) => {
            $timeout(function(){
                $scope.mainImagePath = event.target.files[0].path
                angular.element(element).val(null)
            })
        }

        $scope.onFolderSelected = (event,element) => {
            $timeout(function(){
                $scope.selectedFolder = event.target.files[0].path
                frameService.saveSelections(spriteSplitter.selectedSelections, $scope.selectedFolder, onFramesSaved)
                angular.element(element).val(null)
            })
        }

        function onFramesSaved(){
            alert('Frames Saved on disc')
        }
    })

    .directive('sourceSprite', function(){
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: function(scope, element){

                scope.$watch('ngModel', function(value){
                    if(!value) return;

                    console.log(value)

                    spriteSplitter.selectImages({
                        fileUrl:value,
                        canvas:element[0],
                        startX:0,
                        startY:0
                    }, function(selections){})

                    element[0].addEventListener('click', spriteSplitter.onCanvasClick, false)
                })
            }
        }
    })

    .factory('frameService', function(){
        return {
            saveSelections: function(selections, folder, onSaveEnd){
                let index = 0
                let saved = 0
                selections.forEach(function(selection){
                    var canvas = document.createElement('canvas')
                    var context = canvas.getContext('2d')

                    canvas.width = selection.width
                    canvas.height = selection.height

                    console.log(spriteSplitter.imageObj)

                    context.drawImage(spriteSplitter.imageObj, selection.x, selection.y, selection.width, selection.height, 0, 0, selection.width, selection.height)

                    // as a buffer
                    var buffer = canvasBuffer(canvas, 'image/png')


                    // write canvas to file
                    fs.existsSync(folder) || fs.mkdirSync(folder)

                    fs.writeFileAsync(folder + '/' + index + '.png', buffer)
                        .then((response) => {
                            saved ++
                            if(saved === selections.length){
                                if(onSaveEnd){
                                    onSaveEnd()
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    index++

                })
            }
        }
    })

    .factory('fileInputsManager', function(){
        var fileInputs = []
        return {
            register: function(fileInput){
                fileInputs.push(fileInput)
            },

            trigger: function(id){
                var found = fileInputs.filter(function(inp){
                    return inp.id === id
                })

                if(found.length > 0){
                    found[0].element.click()
                }
            }
        }
    })

    .directive('fileInput', function(fileInputsManager){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                fileInputsManager.register({
                    id: attrs.fileInput,
                    element: element[0]
                })
            }
        }
    })

    .directive('fileTrigger', function(fileInputsManager){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element[0].addEventListener('click', function(){
                    fileInputsManager.trigger(attrs.fileTrigger)
                }, false)

            }
        }
    })



    .directive('fileChangeCallback', () => {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                let onChangeHandler = scope.$eval(attrs.fileChangeCallback)
                element.bind('change', function(event){
                    onChangeHandler(event, element)

                })
            }
        }
    })