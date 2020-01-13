<template id="image-capture">
    <div>
        <div v-show="!started">
            <div class="container h-100 d-flex justify-content-center">
                <div class="my-auto">
                    <h1 class="text-center">Sorting Image Visualizer</h1>
                    <hr>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Rows</span>
                        </div>
                        <input type="text" class="form-control" v-model="rows" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Columns</span>
                        </div>
                        <input type="text" class="form-control" v-model="cols" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Image URL</span>
                        </div>
                        <input type="text" class="form-control" v-model="link" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <button class="btn-success col text-center" @click="start">Process Image</button>
                </div>
            </div>
        </div>
        <div v-show="started">
              <div class="row">
                <div class="container h-100 d-flex justify-content-center">
                    <h1 class="text-center">Choose a sorting algorithm</h1>
                </div>
                <div class="container h-100 d-flex justify-content-center">
                    <div class="col-md-12">
                        <button class="btn btn-outline-success btn-space" @click="insertion">Insertion sort</button>
                        <button class="btn btn-outline-success btn-space" @click="selection">Selection sort</button>
                        <button class="btn btn-outline-success btn-space" @click="bubble">Bubble sort</button>
                        <button class="btn btn-outline-success btn-space" @click="quick">Quick sort</button>
                        <button class="btn btn-outline-success btn-space" @click="heap">Heap sort</button>
                    </div>
               </div>
                <div class="container h-100 d-flex justify-content-center" v-if="this.finished">
                    <button class="btn btn-success btn-space" @click="reloadPage">Finished! Start again?</button>
                </div>
              </div>
            <br>
            <div class="container h-100 d-flex justify-content-center">
                <canvas id="canvas" ref="canvas" style="width:80%; height:80%">
                </canvas>
            </div>
            <br>
            <div class="container h-100 d-flex justify-content-center" v-if="this.chosen !== null">
                <h5 class="text-center">Choosen: {{ this.chosen.name }}</h5>
            </div>
            <div class="container h-100 d-flex justify-content-center" v-if="this.chosen !== null">
                <h5 class="text-center">Time complexity for {{ this.chosen.name }}: <b>{{ this.chosen.complexity }}</b></h5>
            </div>
            <div class="container h-100 d-flex justify-content-center" v-if="this.chosen !== null">
                <h5 class="text-center">Number of animations(swaps) : <b>{{this.animations.length}}</b></h5>
            </div>
            <div class="container h-100 d-flex justify-content-center" v-if="this.chosen !== null">
                <h5 class="text-center">Execution time in the background: <b>{{(this.endTimer - this.startTimer).toFixed(2)}}</b> ms</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import {selectionSort, bubbleSort, insertionSort, quickSort, heapSort} from "../assets/scripts/sorts";

    export default {
        name: 'ImageVisualizer',
        data: function () {
            return {
                randoms: [],
                canvas: null,
                ctx: null,
                rows: 3,
                cols: 3,
                img: null,
                link: null,
                pieceWidth: null,
                pieceHeight: null,
                started: false,
                chosen: null,
                startIndex:0,
                startTimer: null,
                endTimer: null,
                animations:[],
                finished:false,
            }
        },
        methods: {
            insertion: function() {
                this.chosen = {'name': 'Insertion Sort','complexity': 'O(n^2)'}
                this.animations = [];
                let postDataCopy = this.randoms.slice();

                this.startTimer = performance.now();
                insertionSort(postDataCopy, this.animations);
                this.endTimer = performance.now();
                this.processAnimation();
            },
            bubble: function() {
                this.chosen = {'name': 'Bubble Sort','complexity': 'O(n^2)'}
                this.animations = [];
                let postDataCopy = this.randoms.slice();

                this.startTimer = performance.now();
                bubbleSort(postDataCopy, this.animations);
                this.endTimer = performance.now();
                this.processAnimation();
            },
            selection: function() {
                this.chosen = {'name': 'Selection Sort','complexity': 'O(n^2)'}
                this.animations = [];
                let postDataCopy = this.randoms.slice();

                this.startTimer = performance.now();
                selectionSort(postDataCopy, this.animations);
                this.endTimer = performance.now();
                this.processAnimation();
            },
            quick: function() {
                this.chosen = {'name': 'Quick Sort','complexity': 'O(n*log(n))'}
                this.animations = [];
                let postDataCopy = this.randoms.slice();

                this.startTimer = performance.now();
                quickSort(postDataCopy, this.animations, 0, this.randoms.length - 1);
                this.endTimer = performance.now();
                this.processAnimation();
            },
            heap: function() {
                this.chosen = {'name': 'Heap Sort','complexity': 'O(n*log(n))'}
                this.animations = [];
                let postDataCopy = this.randoms.slice();

                this.startTimer = performance.now();
                heapSort(postDataCopy, this.animations);
                this.endTimer = performance.now();
                this.processAnimation();
            },
            start: function() {
                this.checkForInvalidInput();
                this.started = true;
                this.canvas=this.$refs.canvas;
                this.ctx =this.canvas.getContext("2d");
                let self = this;

                this.img=new Image();
                this.img.src=this.link;
                this.img.onload= function() {
                    self.canvas.width=self.img.width;
                    self.canvas.height=self.img.height;
                    self.pieceWidth=self.canvas.width/self.cols;
                    self.pieceHeight=self.canvas.height/self.rows;

                    for(let i = 0; i < self.rows; i++) {
                        for(let j = 0; j<self.cols; j++) {
                            let part = {col:j, row:i, val: (i*10)+j}
                            self.randoms.push(part)
                        }
                    }
                    for(let j, x, i = self.randoms.length; i; j = Math.floor(Math.random() * i), x = self.randoms[--i], self.randoms[i] = self.randoms[j], self.randoms[j] = x);
                    self.drawImage();
                };
            },
            reloadPage: function() {
              location.reload();
            },
            checkForInvalidInput: function() {
                if(this.rows < 1) this.rows = 1;
                if(this.rows > 10) this.rows = 10;
                if(this.cols < 1) this.cols = 1;
                if(this.cols > 10) this.cols = 10;
            },
            processAnimation: function() {
                let self = this;
                setInterval(function(){
                    if(self.startIndex >= self.animations.length) {
                        self.finished = true;
                        return;
                    }
                    let part = self.animations[self.startIndex];
                    let temp = self.randoms[part[0]];
                    self.randoms[part[0]] = self.randoms[part[1]];
                    self.randoms[part[1]] = temp;
                    self.highlight(part[1], part[0]);
                    self.startIndex++;
                }, 1000);
            },
            highlight: function(first, second) {
                this.ctx.strokeStyle = "#cfe627";
                this.ctx.lineWidth = 5;
                this.ctx.strokeRect(this.randoms[first].col* this.pieceWidth,this.randoms[first].row * this.pieceHeight, this.pieceWidth, this.pieceHeight )
                this.ctx.strokeStyle = "#cfe627";
                this.ctx.lineWidth = 5;
                this.ctx.strokeRect(this.randoms[second].col * this.pieceWidth, this.randoms[second].row * this.pieceHeight, this.pieceWidth, this.pieceHeight)
                this.drawImage();
            },
            drawImage: function() {
                let self = this
                setTimeout(function(){
                    let i=0;
                    for(let y=0;y<self.rows;y++){
                        for(let x=0;x<self.cols;x++){
                            let p=self.randoms[i++];
                            self.ctx.drawImage(
                                self.img,
                                x*self.pieceWidth, y*self.pieceHeight, self.pieceWidth, self.pieceHeight,
                                p.col*self.pieceWidth, p.row*self.pieceHeight, self.pieceWidth, self.pieceHeight
                            );
                        }}
                }, 500)
            }
        }
    }
</script>