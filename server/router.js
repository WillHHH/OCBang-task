const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('/json', async (req, res) => {
  const { type, page, size } = req.query
  const jsonData = await getJson(type)
  const result = type === "jd" ? jsonData : handlePaginate(jsonData, page, size)
  if (result.error) {
    res.json({ success: false, data: result })
  } else res.json({ success: true, status: 200, data: result })
})

const getJson = (type) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `/mockData/${type}Dataset.json`), function (err, data) {
      if (err) {
        resolve({ error: 'Failed' + err })
        return console.error(err);
      } else {
        const jsonData = JSON.parse(data.toString())
        resolve({ count: jsonData.length, data: jsonData })
      }
    })
  })
}

const handlePaginate = (jsonData, page = 1, size = 10) => {
  const { count, data } = jsonData
  const maxPage = Math.ceil(count / size);

  if (count < size) {
    return { data, maxPage };
  }
  const skip = (page - 1) * size;
  const paged = data.slice(
    skip,
    skip + parseInt(size) > count ? count : skip + parseInt(size),
  );

  return { paged, maxPage, count };
}



module.exports = router