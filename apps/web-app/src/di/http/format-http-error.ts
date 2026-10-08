export function formatHttpErrorBody(response: unknown): string {
    if (response === null || response === undefined) {
        return "(empty body)"
    }

    if (typeof response === "string") {
        const trimmed = response.trim()

        return trimmed.length > 0 ? trimmed : "(empty body)"
    }

    if (typeof response === "object") {
        const record = response as Record<string, unknown>

        if (typeof record.message === "string" && record.message.trim().length > 0) {
            return record.message.trim()
        }

        if (typeof record.error === "string" && record.error.trim().length > 0) {
            return record.error.trim()
        }

        if (typeof record.detail === "string" && record.detail.trim().length > 0) {
            return record.detail.trim()
        }

        if (Array.isArray(record.errors) && record.errors.length > 0) {
            return JSON.stringify(record.errors)
        }

        try {
            return JSON.stringify(response)
        } catch {
            return String(response)
        }
    }

    return String(response)
}

export function formatUnknownError(error: unknown): string {
    if (error instanceof Error) {
        return error.message.trim() || error.name
    }

    if (typeof error === "string") {
        return error
    }

    try {
        return JSON.stringify(error)
    } catch {
        return String(error)
    }
}
