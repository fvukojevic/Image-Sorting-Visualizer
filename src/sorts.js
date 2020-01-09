function selectionSort(arrayCopy, animations) {
    let startIdx = 0;
    while(startIdx < arrayCopy.length - 1) {
        let smallestIdx = startIdx;
        for(let i = startIdx + 1; i < arrayCopy.length; i++) {
            if(arrayCopy[i].val < arrayCopy[smallestIdx].val) {
                smallestIdx = i
            }
        }
        let temp = arrayCopy[startIdx];
        arrayCopy[startIdx] = arrayCopy[smallestIdx];
        arrayCopy[smallestIdx] = temp;
        animations.push([smallestIdx, startIdx]);
        startIdx++
    }
}

function bubbleSort(arrayCopy, animations) {
    let sorted = false;
    let counter = 0;
    while(!sorted){
        sorted = true;
        for(let i=0;i<arrayCopy.length -1 - counter; i++) {
            if(arrayCopy[i].val > arrayCopy[i+1].val){
                let temp = arrayCopy[i];
                arrayCopy[i] = arrayCopy[i+1];
                arrayCopy[i+1] = temp;
                sorted = false;
                animations.push([i, i+1]);
            }
        }
        counter++
    }
}

function insertionSort(arrayCopy, animations) {
    for(let i = 0; i < arrayCopy.length; i++) {
        let j = i;
        while(j > 0 && arrayCopy[j].val < arrayCopy[j-1].val){
            let temp = arrayCopy[j];
            arrayCopy[j] = arrayCopy[j-1];
            arrayCopy[j-1] = temp;
            animations.push([j, --j])
        }
    }
}

function quickSort(self, startIdx, endIdx) {
    if (startIdx >= endIdx) clearInterval(this)
    const pivot = startIdx;
    let leftIndex = startIdx + 1;
    let rightIndex = endIdx;
    while (rightIndex >= leftIndex) {
        if (self.randoms[leftIndex].val > self.randoms[pivot].val && self.randoms[rightIndex].val < self.randoms[pivot].val) {
            swap(leftIndex, rightIndex, self.randoms);
        }
        self.highlight(leftIndex, rightIndex, self.randoms)
        if (self.randoms[leftIndex].val <= self.randoms[pivot].val) leftIndex++;
        if (self.randoms[rightIndex].val >= self.randoms[pivot].val) rightIndex--;
    }
    swap(pivot, rightIndex, self.randoms);
    const leftSubarrayIsSmaller = rightIndex - 1 - startIdx < endIdx - (rightIndex + 1);
    if (leftSubarrayIsSmaller) {
        quickSort(self, startIdx, rightIndex - 1);
        quickSort(self, rightIndex + 1, endIdx);
    } else {
        quickSort(self, rightIndex + 1, endIdx);
        quickSort(self, startIdx, rightIndex - 1);
    }
}

function swap(i, j, array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

export {selectionSort, bubbleSort, insertionSort, quickSort}