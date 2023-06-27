const express = require('express')
const app = express()
const data = require('./assets/data.json')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/files', (req, res) => {
  const query = req.query.q

  if (query) {
    const filteredData = filterData(query)
    res.json(filteredData)
  } else {
    res.json(data)
  }
})

function filterData(query) {
  return searchItemsWithPrefix(data, query)
}

function searchItemsWithPrefix(data, prefix) {
  const result = []

  for (const item of data) {
    if (item.name.startsWith(prefix)) {
      result.push(item)
    }

    if (item.children) {
      const matchingChildren = searchItemsWithPrefix(item.children, prefix)
      result.push(...matchingChildren)
    }
  }

  return result
}

const port = 3000
app.listen(port, () => {
  console.log(`File Viewer Server is listening on port ${port}`)
})
