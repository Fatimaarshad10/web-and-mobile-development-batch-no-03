//  let username = prompt("Enter your name")
//  let age = prompt("Enter your age")

// export  {username , age}



// try , catch 
// async and await 

export async function PostData() {
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        const response = await data.json()
       return response
    }
    catch (error) {
        console.log(error)
    }
}