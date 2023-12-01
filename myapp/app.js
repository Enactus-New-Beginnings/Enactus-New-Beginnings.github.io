const express = require('express')
const app = express()
const port = 3000
var bodyParser = require("body-parser")
app.use(bodyParser.json())

const fs = require('fs');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/users/:uid', (req, res) => {
  res.send(req.params.uid)
  // res.json(req.params)
})

// var bodyParser = require('body-parser')


// const content = 'Some content!';


app.post('/write', (req, res) => {
    const firstName=req.body.firstName
    const lastName=req.body.lastName
     const content = JSON.stringify({firstName: firstName, lastName: lastName})

  fs.writeFile('data.json', content, err => {
  if (err) {
    console.error(err);
    res.status(404).send(err)
  }
  else {
    res.status(200).json({firstName: firstName, lastName: lastName})
  }
  // file written successfully
  });
   })

// app.post('/write', (req, res)=>{
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   fs.writeFile('data.json', JSON.stringify({firstName: firstName, lastName: lastName}), err => {
//       if (err) {
//         res.status(500).json({err: err})
//       } else{
//           res.status(200).send("file written successfully")
//       }
//       // file written successfully
//     });
// })

