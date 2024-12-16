const EventEmitter = require('events');

class WeatherStation extends EventEmitter {
    constructor() {
        super();
    }

    setTemperature(temp) {
        if (typeof temp !== 'number' || temp < -50 || temp > 50) {
            this.emit('error', new Error(`Incorrect temperature: ${temp}. Enter a value from -50 to 50°C.`));
        } else {
            this.emit('temperatureChange', temp);
        }
    }
}