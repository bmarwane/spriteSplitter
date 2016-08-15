Sprite Splitter
===================

A multi plateform tool to cut a spriteSheet into individual frames.

----------


Installation
-------------
**Clone this repo**
```
git clone git@github.com:bmarwane/spriteSplitter.git
```
**install dependencies**
```
npm install
```
**run tests**
```
npm run test
```
**run the app**
```
npm start
```

Create a binary
---------------

Refer to [Electron packager](https://github.com/electron-userland/electron-packager) to create a binary


How to use ?
------------

**load a spritesheet :** 

Load a sprite using the top left button as indicated in the image below : 


![](/Screenshots/load_sprite.png?raw=true)

click on the frame that you want 

![](/Screenshots/choose_frame.png?raw=true)

Save on disk !

![](/Screenshots/save_frames.png?raw=true)



Important
---------

The pixel at the top left corner is used as a reference to detect empty areas, i will maybe add a configuration screen to change the position of the reference.

