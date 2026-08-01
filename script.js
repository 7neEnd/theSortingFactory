const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let korean=false;

const names=[
"Alex",
"Emma",
"James",
"Sophia",
"Lucas",
"Olivia"
];

function shuffle(array){

let a=[...array];

for(let i=a.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[a[i],a[j]]=[a[j],a[i]];

}

return a;

}

function countBubble(arr){

arr=[...arr];

let swaps=0;

for(let i=0;i<arr.length;i++){

for(let j=0;j<arr.length-i-1;j++){

if(arr[j]>arr[j+1]){

[arr[j],arr[j+1]]=[arr[j+1],arr[j]];

swaps++;

}

}

}

return swaps;

}

function countInsertion(arr){

arr=[...arr];

let moves=0;

for(let i=1;i<arr.length;i++){

let key=arr[i];

let j=i-1;

while(j>=0&&arr[j]>key){

arr[j+1]=arr[j];

moves++;

j--;

}

arr[j+1]=key;

}

return moves;

}

function countSelection(arr){

arr=[...arr];

let swaps=0;

for(let i=0;i<arr.length;i++){

let min=i;

for(let j=i+1;j<arr.length;j++){

if(arr[j]<arr[min])

min=j;

}

if(min!=i){

[arr[min],arr[i]]=[arr[i],arr[min]];

swaps++;

}

}

return swaps;

}

function countMerge(arr){

let moves=0;

function mergeSort(a){

if(a.length<=1)return a;

let mid=Math.floor(a.length/2);

let left=mergeSort(a.slice(0,mid));

let right=mergeSort(a.slice(mid));

let out=[];

while(left.length&&right.length){

moves++;

if(left[0]<right[0])

out.push(left.shift());

else

out.push(right.shift());

}

return out.concat(left,right);

}

mergeSort([...arr]);

return moves;

}

let books=[];

let patience=0;

let best=0;

function newCustomer(){

let size=Math.floor(Math.random()*12)+5;

books=shuffle(letters.slice(0,size));

document.getElementById("books").innerHTML=books.join(" ");

document.getElementById("customerName").innerHTML=
(korean?"손님 ":"Customer ")
+names[Math.floor(Math.random()*names.length)];

let bubble=countBubble(books);

let insertion=countInsertion(books);

let selection=countSelection(books);

let merge=countMerge(books);

best=Math.min(bubble,insertion,selection,merge);

patience=best*10+Math.floor(Math.random()*60)+30;

document.getElementById("patience").innerHTML=
patience+" sec";

document.getElementById("face").innerHTML="🙂";

document.getElementById("result").innerHTML="";

}

function choose(type){

let ops=0;

if(type=="bubble") ops=countBubble(books);

if(type=="insertion") ops=countInsertion(books);

if(type=="selection") ops=countSelection(books);

if(type=="merge") ops=countMerge(books);

let time=ops*10;

let late=time-patience;

let face="🙂";

if(late>0&&late<=60) face="😐";
if(late>60&&late<=120) face="☹️";
if(late>120) face="😡";

document.getElementById("face").innerHTML=face;

document.getElementById("result").innerHTML=
"Sorting took "+time+" seconds.";

setTimeout(newCustomer,2000);

}

document.getElementById("languageButton").onclick=function(){

korean=!korean;

document.getElementById("title").innerHTML=
korean?
"🏭 정렬공장":
"🏭 The Sorting Factory";

this.innerHTML=korean?"English":"한국어";

newCustomer();

}

newCustomer();
