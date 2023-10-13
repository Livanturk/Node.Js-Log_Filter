const fs = require('fs')
const path = require('path')

function log_data_reading() {
    const file_path = path.join(__dirname, 'log_data.json')
    try {
        const raw_data = fs.readFileSync(file_path)
        return JSON.parse(raw_data)
    } catch (e) {
        console.error('JSON dosyasından log datası okunurken hata oldu...', e)
        throw e
    }
}

const log_data = log_data_reading()

function list_logs(req, res){
    const log_type = req.query.type
    if (log_type) {
        const filtered_logs = log_data.filter((log) => log.type === log_type);
        res.json(filtered_logs);
    } else {
        res.json(log_data);
    }
}

function create_report(req, res) {
    const log_type = req.query.type
    if (log_type) {
        const filtered_logs = log_data.filter((log) => log.type === log_type);
        res.json({ report: filtered_logs });
    } else {
        res.json({ report: log_data });
    }
}

module.exports = {
    list_logs,
    create_report,
}