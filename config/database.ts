import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'pg',
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: env.get('PG_HOST'),
        port: Number(env.get('PG_PORT')),
        user: env.get('PG_USER'),
        password: env.get('PG_PASSWORD'),
        database: env.get('PG_DB_NAME'),
      },
      debug: false,
    },
  },
})

export default dbConfig
