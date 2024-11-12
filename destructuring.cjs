// Destructuring
const arr = ['foo', 'bar', 'baz']
const [a, b, c, d] = arr

console.log(a, b, c, d)

require('dotenv').config()
console.log(process.env.OPENAI_API_KEY)
console.log(process.env.PORT)