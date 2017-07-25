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
const i1820 = require('@i1820/rpi.js')

const HashtState = require('./hasht/state')

const client = new i1820.I1820Client('mqtt://127.0.0.1', 'parham_home', 'Rooman')
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
