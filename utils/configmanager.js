const fs = require("fs")
const path = "./config.json"

module.exports = {
    getConfig() {
        return JSON.parse(fs.readFileSync(path))
    },
    saveConfig(data) {
        fs.writeFileSync(path, JSON.stringify(data, null, 2))
    }
}