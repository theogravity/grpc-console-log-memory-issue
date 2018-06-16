import { getGrpcClientStream } from './grpc/client'
import { wrapStream } from './utils'

const s = wrapStream(getGrpcClientStream(), { logPrefix: 'grpc-client' })

s.stream.on('end', () => {
  s.end()
})

s.write({
  command: 'LOG_ENABLED'
})
