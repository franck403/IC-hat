function returnVal(message) {
    postMessage(message)
}

function errorReceiver(event) {
  throw event.data;
}

function MessageWorkerLoop(snapshot, snapshotRev) {
    snapshot.forEach(data2 => {
        self.newMessage(data2)
        snapshotRev.pop()
    });
    return snapshotRev
}
onmessage = (event) => {
    console.log(event)
}
