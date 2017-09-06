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
const bamboo = require('@ibamboo/rpi.js')

const HashtState = require('./hasht/state')

const client = new bamboo.BambooClient('mqtt://192.168.73.8', 'parham_home', 'Rooman')
client.on('ready', () => {
  console.log(client.hash)
})

const m7 = client.addThing('7', 'multisensor')

const nrf = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200
})

const rl = readline.createInterface({
  input: nrf,
  output: nrf
})

rl.on('line', (input) => {
  if (!input) {
    return
  }

  let hs = new HashtState(input.toString())

  if (hs) {
    let data = {}
    data[hs.states[0].name] = hs.states[0].value
    data[hs.states[1].name] = hs.states[1].value
    data[hs.states[2].name] = hs.states[2].value
    data[hs.states[3].name] = hs.states[3].value

    m7.log(data)
  }
})
