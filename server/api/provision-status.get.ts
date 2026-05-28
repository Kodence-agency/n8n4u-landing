import { getProvisionStatus } from '../utils/statusStore'

export default defineEventHandler((event) => {
  const { session_id } = getQuery(event) as { session_id?: string }
  if (!session_id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing session_id' })
  }
  return getProvisionStatus(session_id)
})
