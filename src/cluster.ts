import cluster from "cluster";
import os from "os"
import { pid } from "process";

const clusterFunc = async () =>
{
const PORT = process.env.PORT || 3000;
  const numCPUs = os.cpus().length;
if ( cluster.isPrimary )
{
 (`Master running on port ${PORT}, Pid: ${pid}`)
for (let i = 0; i < numCPUs; i++) {
 const worker = cluster.fork();
      worker.on( 'exit',()=> {
  cluster.fork()
  })
}
} else
{

try {
    await import('./server');

  }
  catch(err) {
    console.log(err);
  }
  }

}

clusterFunc()
