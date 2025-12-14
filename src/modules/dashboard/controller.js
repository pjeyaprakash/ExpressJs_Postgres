const clientsByCustomer = new Map()


export const connectLiveStream = (req, res) => {

    res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const customerId = "INV001"

    if (!clientsByCustomer.has(customerId)) {
    clientsByCustomer.set(customerId, [])
  }

  clientsByCustomer.get(customerId).push(res)

  // Required for AWS / Nginx
  res.flushHeaders?.();

  

  

   res.write(`data: ${JSON.stringify({ status: "connected" })}\n\n`);
 

  req.on('close', () => {
  const clients = clientsByCustomer.get(customerId).filter(r => r !== res)

  if (clients.length === 0) {
    clientsByCustomer.delete(customerId)
  } else {
    clientsByCustomer.set(customerId, clients)
  }
  })
};


export const sendToSSE = (customerId, payload) => {
  const clients = clientsByCustomer.get(customerId) || []
  clients.forEach(res => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
  })
}


setInterval(() => {
  sendToSSE("INV001", {
    name: "ddddd",
    colt: "dddd",
    time: new Date()
  })
}, 5000)





// function sendToSSE(customerId, payload) {
//   const clients = clientsByCustomer.get(customerId) || []
//   clients.forEach(res => {
//     res.write(`data: ${JSON.stringify(payload)}\n\n`)
//   })
// }
