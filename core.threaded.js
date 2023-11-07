function returnVal(message) {
    self.postMessage(message)
}

function errorReceiver(event) {
  throw event.data;
}
console.log(self)
function MessageWorkerLoop(snapshot, snapshotRev) {
    snapshot.forEach(data2 => {
        self.window.newMessage(data2)
        snapshotRev.pop()
    });
    return snapshotRev
}
onmessage = (event) => {
    console.log(event.data)
    if (event.data == "called") {
        self.working = true
        self.postMessage('console.log("called");')
        self.postMessage('return window.processingMessage;')
        var snapshot = self.processingMessage.reverse()
        self.snapshotRev = snapshot.reverse()
        var arr = snapshot
        self.chunks = [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2, arr.length)]
        var chunks = window.chunk
        self.MessageCalc = 0
        chunks.forEach(chunk => {
            self.chunks[window.MessageCalc] = MessageWorkerLoop(chunk, chunk.reverse())
            self.MessageCalc++
        });
        var snapshotRev = self.snapshotRev
        self.postMessage(snapshotRev)
        self.postMessage('MessageWorkerEnd(window.snapshotRev)')
    } else {
        if (self.working) {
            self.processingMessage = event.data
        }
    }
}
