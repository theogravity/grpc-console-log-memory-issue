import grpc from 'grpc'
import helloProto from './proto'
import { wrapStream } from '../utils'

let server = null

export const SERVER_PORT = 50051

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
export function startGrpcServer () {
  server = new grpc.Server()
  server.addService(helloProto.HelloService.service, {
    HelloStream: sayHello
  })
  server.bind(`0.0.0.0:${SERVER_PORT}`, grpc.ServerCredentials.createInsecure())
  server.start()

  console.log('gRPC server started')
}

function sayHello (stream) {
  stream.on('data', (data) => {
    switch (data.command) {
      case 'LOG_ENABLED':
        const s = wrapStream(stream, { logPrefix: 'grpc-server' })
        writeDefault(s)
        break
      case 'LOG_DISABLED':
        writeDefault(stream)
        break
    }
  })
}

function writeDefault (stream) {
  stream.write({
    text: 'ok'
  })

  stream.end()
}
