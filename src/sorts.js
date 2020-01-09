function selectionSort(self)
{
    if (self.startIndex >= self.randoms.length - 1) clearInterval(this);
    else {
        let smallestIndex = self.startIndex;
        for(let i = self.startIndex + 1; i < self.randoms.length; i++) {
            if(self.randoms[i].val < self.randoms[smallestIndex].val) {
                smallestIndex = i
            }
        }
        let temp = self.randoms[self.startIndex];
        self.randoms[self.startIndex] = self.randoms[smallestIndex];
        self.randoms[smallestIndex] = temp;
        self.highlight(self.startIndex, smallestIndex);
        self.startIndex++;
    }
}

function bubbleSort(self)
{
    if(self.sorted) clearInterval(this);
    self.sorted = true;
    for(let i=0;i<self.randoms.length -1 ; i++) {
        if(self.randoms[i].val > self.randoms[i+1].val){
            let temp = self.randoms[i];
            self.randoms[i] = self.randoms[i+1];
            self.randoms[i+1] = temp;
            let x = i + 1;
            self.highlight(i,x);
            self.sorted = false;
        }
    }
}

function insertionSort(self)
{
    if (self.startIndex >= self.randoms.length ) clearInterval(this);
    else {
        let j = self.startIndex;
        while(j > 0 && self.randoms[j].val < self.randoms[j-1].val){
            let temp = self.randoms[j];
            self.randoms[j] = self.randoms[j-1];
            self.randoms[j-1] = temp;
            self.highlight(j, --j);
        }
        self.startIndex++;
    }
}

export {selectionSort, bubbleSort, insertionSort}