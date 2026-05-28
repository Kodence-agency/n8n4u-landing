import { Client } from 'ssh2'

export function runOnVps(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const config = useRuntimeConfig()
    const conn = new Client()

    const timeout = setTimeout(() => {
      conn.end()
      reject(new Error('[ssh] Timeout: command exceeded 60 seconds'))
    }, 60_000)

    conn.on('ready', () => {
      conn.exec(command, (err, stream) => {
        if (err) {
          clearTimeout(timeout)
          conn.end()
          reject(err)
          return
        }

        let stdout = ''
        let stderr = ''

        stream.on('close', (code: number) => {
          clearTimeout(timeout)
          conn.end()
          if (code === 0) {
            resolve(stdout.trim())
          } else {
            console.error('[ssh] Command failed', { command, code, stderr })
            reject(new Error(`[ssh] Exit code ${code}: ${stderr.trim()}`))
          }
        })

        stream.on('data', (data: Buffer) => { stdout += data.toString() })
        stream.stderr.on('data', (data: Buffer) => { stderr += data.toString() })
      })
    })

    conn.on('error', (err: Error) => {
      clearTimeout(timeout)
      console.error('[ssh] Connection error', err)
      reject(err)
    })

    const privateKey = config.vpsSshKey.replace(/\\n/g, '\n')
    const passphrase = (config as Record<string, string>).vpsSshPassphrase || undefined

    conn.connect({
      host: config.vpsHost,
      port: parseInt(config.vpsPort, 10),
      username: config.vpsUser,
      privateKey,
      ...(passphrase ? { passphrase } : {}),
    })
  })
}
