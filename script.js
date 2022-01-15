let body = document.querySelector("body")
async function getData(path) {
    try {
        let d = await fetch(path)
        d = await d.json()
        return d
    } catch (error) {
        console.log(error)
    }
}

async function onStart() {
    let path = "data.json"
    let data = await getData(path)

    fjoldi(data)
    body.appendChild(gagnaRit(data))
}

function fjoldi(data) {
    let fjoldi = document.createElement("div")
    fjoldi.classList.add("fjoldi")
    let fP = document.createElement("p")
    fP.textContent = "fjöldi færsla: " + data.length
    body.appendChild(fP)
}

function gagnaRit(data) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("width","530px")
    svg.setAttribute("height","350px")
    let xAs = document.createElementNS('http://www.w3.org/2000/svg',"line")
    let yAs = document.createElementNS('http://www.w3.org/2000/svg',"line")
    xAs.setAttribute("x1","20");
    xAs.setAttribute("y1","10");
    xAs.setAttribute("x2","20");
    xAs.setAttribute("y2","250");
    xAs.setAttribute("stroke","#000")
    for (let i = 1; i <= 10; i++) {
        let t = createXText(i)
        let l = createXLine(i)    
        svg.append(t,l)
    }

    yAs.setAttribute("x1","20");
    yAs.setAttribute("y1","250");
    yAs.setAttribute("x2","520");
    yAs.setAttribute("y2","250");
    yAs.setAttribute("stroke","#000")
    for (let i = 1; i <= data.length; i++) {
        let line = createYLine(i,data.length)
        svg.appendChild(line)
    }
    svg.append(xAs,yAs)

    let kl = document.createElement("p")
    kl.textContent = "kl: "
    let kSp = document.createElement("span")
    kSp.id = "kl"
    kSp.textContent = "ekkert valið"
    kl.appendChild(kSp)
    body.appendChild(kl)

    let m = document.createElement("p")
    m.textContent = "Skilaboð: "
    let sp = document.createElement("span")
    sp.textContent = "engin skilaboð"
    sp.id = "message"
    m.appendChild(sp)
    body.appendChild(m)

    for (const key in data) {
        let whole = data.length
        let date = new Date((data[data.length-1-key].date)*1000)
        svg.appendChild(createNode(data,date,key,whole))
        svg.appendChild(createNodeText(date,key,whole))
    }
    return svg
}

function createXText(counter) {
    let t = document.createElementNS('http://www.w3.org/2000/svg',"text")
    t.textContent = counter + 4
    t.setAttribute("x",0) 
    t.setAttribute("y",254 - counter*24) 
    t.setAttribute("font-size","0.5em")
    return t
}

function createXLine(counter) {
    let l = document.createElementNS('http://www.w3.org/2000/svg',"line")
    l.setAttribute("x1",15)
    l.setAttribute("x2",25)
    l.setAttribute("y1",250 - counter*24)
    l.setAttribute("y2",250 - counter*24)
    l.setAttribute("stroke","#000")
    return l
}

function createYLine(counter,whole) {
    let xCoord = (counter/whole)*500
    let l = document.createElementNS('http://www.w3.org/2000/svg',"line")
    l.setAttribute("x1",xCoord)
    l.setAttribute("x2",xCoord)
    l.setAttribute("y1",245)
    l.setAttribute("y2",255)
    l.setAttribute("stroke","#000")
    return l
}

function createNode(data,date,key,whole) {
    let m = document.querySelector("#message")
    let k = document.querySelector("#kl")
    let node = document.createElementNS("http://www.w3.org/2000/svg","circle")
    let xhnit = 500-((key/whole)*500)
    let yhnit = date.getHours()
    yhnit = yhnit - 4
    yhnit += Math.round(((date.getMinutes()/60) + Number.EPSILON) * 10) / 10
    yhnit = 250 - ((yhnit) * 24)
    console.log(yhnit)

    node.setAttribute("cy",yhnit)
    node.setAttribute("cx",xhnit)
    node.setAttribute("r",5)
    if (date.getDay() === 0 || date.getDay() === 6) {
        node.setAttribute("fill","#e40000")
    }
    else {  
        node.setAttribute("fill","#24ae00")
    }

    node.addEventListener("click",()=> {
        let nodes = document.querySelectorAll("circle")
        nodes.forEach(element => {
            // console.log(element.getAttribute("r"))
            if (element.getAttribute("r") === "7.5") {
                element.setAttribute("r","5")
            }
        });
        node.setAttribute("r",7.5)
        let klst = "0" + date.getHours()
        klst = klst.slice(-2)
        let min = "0"+date.getMinutes()
        min = min.slice(-2)
        k.textContent = klst + ":" + min
        m.textContent = data[data.length-1-key].message
    })
    return node
}

function createNodeText(date,key,whole) {
    let xCoord = 495 - ((key/whole)*500)
    let t = document.createElementNS('http://www.w3.org/2000/svg',"text")
    t.textContent = date.getDate()
    t.textContent += "/" + (date.getMonth()+1)
    t.textContent += "/" + (date.getYear()-100)
    t.setAttribute("transform","rotate(90)")
    t.setAttribute("y",-xCoord)
    t.setAttribute("x",265)
    if (date.getDay() === 0 || date.getDay() === 6) {
        t.setAttribute("fill","#e40000")
    }
    else {  
        t.setAttribute("fill","#24ae00")
    }
    // t.setAttribute("x",0)
    // t.setAttribute("y",0)
    return t
}

onStart()