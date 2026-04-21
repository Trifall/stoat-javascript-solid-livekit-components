// @livekit/components-react@2.0.4
// Apache-2.0

// @ts-ignore
import type { Observable } from 'rxjs'
import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js'

type ObservableSource<T> = Observable<T> | Accessor<Observable<T> | undefined> | undefined

/**
 * @internal
 */
export function useObservableState<T>(observable: ObservableSource<T>, startWith: T) {
  const [state, setState] = createSignal<T>(startWith)

  createEffect(() => {
    const currentObservable = typeof observable === 'function' ? observable() : observable

    // observable state doesn't run in SSR
    if (typeof window === 'undefined' || !currentObservable) return

    const subscription = currentObservable.subscribe(setState)
    onCleanup(() => subscription.unsubscribe())
  })

  return state
}
