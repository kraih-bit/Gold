
const chart = LightweightCharts.createChart(
document.getElementById('chart'),
{ width: 1000, height: 600 }
);

const candleSeries = chart.addCandlestickSeries();

let candles=[]
let index=0
let timer
let balance=10000
let position=null
let entryPrice=0
let pl=0

fetch("/candles")
.then(res=>res.json())
.then(data=>{candles=data})

function play(){
let speed=document.getElementById("speed").value
timer=setInterval(()=>{
if(index>=candles.length) return
candleSeries.update({
time:index,
open:candles[index].open,
high:candles[index].high,
low:candles[index].low,
close:candles[index].close
})
index++
updatePL()
},speed)
}

function pause(){clearInterval(timer)}

function buy(){
if(!position){
position='buy'
entryPrice=candles[index].close
document.getElementById("position").innerText=position
}
}

function sell(){
if(!position){
position='sell'
entryPrice=candles[index].close
document.getElementById("position").innerText=position
}
}

function closeTrade(){
if(!position) return
let currentPrice=candles[index].close
if(position==='buy') pl=currentPrice-entryPrice
if(position==='sell') pl=entryPrice-currentPrice
balance+=pl*100
document.getElementById("balance").innerText=balance.toFixed(2)
document.getElementById("pl").innerText=pl.toFixed(2)
position=null
document.getElementById("position").innerText='None'
}
function updatePL(){
if(!position) return
let currentPrice=candles[index].close
if(position==='buy') pl=currentPrice-entryPrice
if(position==='sell') pl=entryPrice-currentPrice
document.getElementById("pl").innerText=pl.toFixed(2)
}
