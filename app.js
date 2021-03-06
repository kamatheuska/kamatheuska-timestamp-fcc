import express from 'express'
import fetch from 'node-fetch'
import morgan from 'morgan'
import cors from 'cors'

const app = express()


const PORT = process.env.PORT || 6000;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000'

const timestampEndpoint = `${API_BASE_URL}/api/timestamp`;

app.use(morgan('dev'));
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

/*
* To see the code for this answer
* go to https://github.com/kamatheuska/portfolio/blob/master/controllers/timestamp.js#L5
*/
app.get('/api', async (req, res, next) => {
  try {
    const response = await fetch(timestampEndpoint)
    const timestamp = await response.json();

    res.send(timestamp)
  } catch (error) {
    next(error)
  }
})

/*
* To see the code for this answer
* go to https://github.com/kamatheuska/portfolio/blob/master/controllers/timestamp.js#L6
*/
app.get('/api/:date', async (req, res, next) => {
  try {
    const date = req.params.date
    const response = await fetch(`${timestampEndpoint}/${date}`)

    const timestamp = await response.json();

    res.send(timestamp)
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(400).send()
})

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`)
})