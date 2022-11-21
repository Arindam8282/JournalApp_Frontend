const express = require('express')
const app = express()
const chokidar = require('chokidar')
const { exec } = require('child_process')

const watcher = chokidar.watch('src',{
  persistent: false,
  ignoreInitial: true
})
watcher.on('ready',(path)=>{
    console.log("I am ready to watch files")
})
watcher.on('change',(path)=>{
  console.log("change detected")
  exec('npm run build',(error,stdout,stderr)=>{
    console.log("command terminated",error,stdout,stderr)
  })
})

app.listen(4888,()=>{
  console.log("App running on port : ",4888)
})