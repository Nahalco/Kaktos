/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 21-07-2017
 * |
 * | File Name:     index.js
 * +===============================================
 */
const SerialPort = require('serialport')
const readline = require('readline')

const nrf = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200
})

const rl = readline.createInterface({
  input: nrf,
  output: nrf
})

rl.on('line', (input) => {
  console.log('Data:', input.toString())
})
