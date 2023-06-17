import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

/*constants*/
const app = express()
const port = process.env.PORT
const __dirname = process.cwd();


/*set up server*/

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`)
})

app.use('/', express.static(__dirname + '/public'));


