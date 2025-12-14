


export const connectLiveStream = (req, res) => {

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  // Required for AWS / Nginx
  res.flushHeaders?.();

  const clientId = req.user.email
  addClient(clientId, res);

  // Initial ping
  res.write(`data: ${JSON.stringify({ status: "connected" })}\n\n`);

  req.on("close", () => {
    removeClient(clientId);
  });
};
