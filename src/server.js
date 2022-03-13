import { randomUUID } from 'crypto'
import http from 'http'
import { Readable } from 'stream'


function * run() {
    for (let index = 0; index <= 99; index++) {
        const data = {
            id: randomUUID(),
            name: `Herlon-${index}`
        }
        yield data
    }
}

function handler(request, response) {
    const readable = new Readable({
        read() {
            for (const data of run()) {
                console.log(`sending ${data}\n`)
                this.push(JSON.stringify(data))
            }
            // para informar que os dados acabaram
            this.push(null)
        }
    })

    readable
        .pipe(response)

}

http.createServer(handler)
    .listen(3000)
    .on('listening', () => console.log('Server running on port 3000.'))