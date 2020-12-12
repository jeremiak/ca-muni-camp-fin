const { exec: execWithCallback } = require("child_process")
const path = require("path")

function exec(cmd, opts) {
  return new Promise((resolve, reject) => {
    execWithCallback(cmd, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = exec
