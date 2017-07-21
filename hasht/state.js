/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 22-07-2017
 * |
 * | File Name:     state.js
 * +===============================================
 */

class HashtState {
  static getStateName (stateCode) {
    switch (stateCode) {
      case 't':
        return 'temperature'
      case 'l':
        return 'light'
      case 'h':
        return 'humidity'
      case 'm':
        return 'motion'
    }
  }

  constructor (message) {
    let result = message.match(/^@(\d),((\w\d\d+,)+)(\d+)\.$/)
    if (result && result.length === 5) {
      this.nodeId = result[1]
      this.battery = result[4]
      this.states = []

      let statesResults = result[2].match(/\w\d\d+,/g)
      statesResults.forEach((statesResult) => {
        let stateResult = statesResult.match(/(\w)(\d)(\d+),/)
        this.states.push({
          name: HashtState.getStateName(stateResult[1]),
          id: stateResult[2],
          value: stateResult[3]
        })
      })
      console.log(this.nodeId, this.battery, this.states)
    }
  }
}

module.exports = HashtState
