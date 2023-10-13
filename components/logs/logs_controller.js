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

function add_log(req, res){
    const log_entry = req.body
    log_data.push(log_entry)
    res.status(201).json(log_entry)
}

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
    let filtered_logs = log_data
    if (log_type) {
        filtered_logs = log_data.filter((log) => log.type === log_type)
    }
    const create_report = filtered_logs.map((log) =>`Type: ${log.type}, Message: ${log.message}`)
        .join('\n')
    res.set('Content-Type', 'text/plain')
    res.send(create_report)
}



module.exports = {
    list_logs,
    create_report,
    add_log,
}
