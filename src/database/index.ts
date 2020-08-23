import { createConnection, Connection, getConnectionOptions } from 'typeorm'

export const connect = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions()
  return createConnection(connectionOptions)
}
