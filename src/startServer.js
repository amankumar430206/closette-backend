import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

export const startServer = async (server) => {
  // config cluster for parallel processing
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // forking available workers..
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // This event is fired when worker died
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  }

  // initializing Each Process Workers
  else {
    const port = process.env.PORT;
    const IP = process.env.IP;
    server.listen(port, () => {
      console.log(`worker started ${process.pid} :: ${port} `);
    });
  }
};
