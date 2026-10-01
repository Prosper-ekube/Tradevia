import { useEffect, useState } from 'react'
import { marketService } from '@/services/marketService'
import type { Market } from '@/types'

const POLL_INTERVAL = 45_000 // 45 seconds, matches backend cache TTL

export function useLiveMarkets() {
  const [data, setData] = useState<Market[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchMarkets() {
      try {
        const result = await marketService.getLiveMarkets()
        if (!cancelled) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load live markets')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    // Initial fetch
    fetchMarkets()

    // Set up polling
    const timer = setInterval(fetchMarkets, POLL_INTERVAL)

    // Cleanup
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  return { data, error, loading }
}