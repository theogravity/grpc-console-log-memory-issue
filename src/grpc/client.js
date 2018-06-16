import { credentials, Metadata } from 'grpc'
import helloPkg from './proto'
import {SERVER_PORT} from './server'

export function getGrpcClientStream() {
  const client = new helloPkg.HelloService(
    `localhost:${SERVER_PORT}`,
    credentials.createInsecure()
  )

  return client.HelloStream(new Metadata())
}
