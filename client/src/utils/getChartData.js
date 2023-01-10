export const parseTickerChatData = (data) => {
    let highLow = []
    for (let d in data){
        let dp = {
            x: new Date(data[d].t),
            open: data[d].o,
            close: data[d].c,
            high: data[d].h,
            low: data[d].l,
        }
        highLow.push(dp)
    }
    return highLow
}

export const get_equity_value = (arr) => {
    let val = 0
    arr.forEach(element => {
        val += element.last_updated_price*element.quantity
    });
    return val
}

export const get_pnl = (arr) =>{
    let p = 0
    let l = 0
    arr.forEach(el =>{
        el.profit_loss>0 ? p+=parseFloat(el.profit_loss) : l-=parseFloat(el.profit_loss)
    })
    return [{x:'Loss',y:l},{x:'Profit',y:p}]
}

export const getDiversity = (arr,usersCurrentBuyingPower) =>{
    let chartData = [{x:'Cash',y:parseFloat(usersCurrentBuyingPower)}]
    let d = {}
    for (let data in arr){
        const dictKeys = Object.keys(d)
        let s = arr[data].sector
        dictKeys.includes(s) ?
        d[s] = d[s]+(arr[data].last_updated_price*arr[data].quantity) :
        d[s] = arr[data].last_updated_price*arr[data].quantity
    }
    for (let ds in d){
        chartData.push({x: ds, y:d[ds]});
    }
    return chartData
}

export const buildUserHistoryChartData = () => {
    let balance = Math.floor(Math.random()*10000)
    let data = []
    for (let i=0; i<25; i++){
        Math.random() < 0.7 ?
            balance += (Math.random()*1000) :
            balance -= Math.random()*500
        data.push({x:`${i+1}`,y:parseFloat(balance.toFixed(2))})
    }
    return data
}