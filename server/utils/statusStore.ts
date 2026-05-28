export interface ProvisionStatus {
  step: number // 0=waiting, 1=webhook received, 2=provisioning, 3=done, 4=email sent
  instanceUrl?: string
  error?: string
}

const store = new Map<string, ProvisionStatus>()

export function setProvisionStatus(sessionId: string, status: ProvisionStatus) {
  store.set(sessionId, status)
}

export function getProvisionStatus(sessionId: string): ProvisionStatus {
  return store.get(sessionId) ?? { step: 0 }
}
