let age = 20


// query selector = id
// query selector all = class

const h1 = document.querySelectorAll('h1')

// id pick
// document.getElementById('demo').innerText = 'hello demo'

// [] , variable 
const heading = document.getElementsByClassName('heading')[0]
const heading1 = document.getElementsByClassName('heading')[1]


const data = document.querySelectorAll('.heading')
console.log(data.length)

for(let i = 0 ; i < data.length ; i++){
    console.log(data[i])
    data[i].innerText = `Heading no ${i}`
}


// let username = prompt("enter your name")
// if(username === 'uswa'){
//     console.log('She is uswa')
// }else {
//     console.log("she is bisma")
// }
// ternary operator 


// login / logout
let username = prompt("Enter your name")
if(username){
    h1[1].innerText = `Your are login successfully ${username}`

}else {
h1[1].innerText = `Your are not login `

}

// username === 'uswa' ?  console.log('She is uswa') : console.log("she is bisma")


// heading.innerText = 'Heading no 01'
// heading1.innerHTML = '<h3>Hello heading no 01</h3>'


export {username ,age}