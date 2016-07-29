/*
spriteSplitter.selectImages({
    fileUrl:'test.gif',
    canvas:document.getElementById('canvas'),
    startX:0,
    startY:0
}, function(selections){})
//*/


angular.module('app', [])

angular.module('app')
    .controller('mainController', function($scope, $timeout){
        $scope.mainImagePath = undefined
        $scope.onSelectMainImage = (event) => {
            $timeout(function(){
                $scope.mainImagePath = event.target.files[0].path
               // console.log($scope.mainImagePath)
            })
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

    .factory('fileInputsManager', function(){
        var fileInputs = []
        return {
            register: function(fileInput){
                fileInputs.push(fileInput)
            },

            trigger: function(){
                console.log(fileInputs)
                fileInputs[0].click()
            }
        }
    })

    .directive('fileInput', function(fileInputsManager){
        return {
            restrict: 'A',
            link: function(scope, element){
                fileInputsManager.register(element[0])
            }
        }
    })

    .directive('fileTrigger', function(fileInputsManager){
        return {
            restrict: 'A',
            link: function(scope, element){
                element[0].addEventListener('click', function(){
                    fileInputsManager.trigger()
                }, false)

            }
        }
    })



    .directive('fileChangeCallback', () => {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                let onChangeHandler = scope.$eval(attrs.fileChangeCallback)
                element.bind('change', onChangeHandler)
            }
        }
    })