function returnVal(message) {
    postMessage(message)
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
        var snapshot = self.window.processingMessage.reverse()
        self.window.snapshotRev = snapshot.reverse()
        var arr = snapshot
        self.window.chunks = [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2, arr.length)]
        var chunks = window.chunk
        self.window.MessageCalc = 0
        chunks.forEach(chunk => {
            self.window.chunks[window.MessageCalc] = MessageWorkerLoop(chunk, chunk.reverse())
            self.window.MessageCalc++
        });
        var snapshotRev = self.window.snapshotRev
    }
}
