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

Download Binary
---------------

Here are a some precompiled binaries : 

Mac : http://apprendre-le-js.com/wp-content/uploads/2016/08/sprite-splitter-darwin-x64.zip

Windows : http://apprendre-le-js.com/wp-content/uploads/2016/08/sprite-splitter-win32-x64.zip

Linux : http://apprendre-le-js.com/wp-content/uploads/2016/08/sprite-splitter-linux-x64.zip


How to use ?
------------

**load a spritesheet :** 

Load a sprite using the top left button as indicated in the image below : 


![](/Screenshots/load_sprite.png?raw=true)

**click on the frames that you want** 

![](/Screenshots/choose_frame.png?raw=true)

**Save on disk !**

![](/Screenshots/save_frames.png?raw=true)



Important
---------

The pixel at the top left corner is used as a reference to detect empty areas, i will maybe add a configuration screen to change the position of the reference.


Licence
-------

MIT License

Copyright (c) 2016 Belahcen Marwane (b.marwane@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
