import { useEffect, useRef, useState } from 'react'
import type { RequestState } from '@/types'

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [state, setState] = useState<RequestState>('loading')
  const [error, setError] = useState<string | null>(null)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    let cancelled = false
    setState('loading')
    setError(null)

    fetcherRef
      .current()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setState('success')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setState('error')
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, state, error }
}
