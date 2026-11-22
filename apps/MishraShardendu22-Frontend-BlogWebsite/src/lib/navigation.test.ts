import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { navigateBack, navigateTo } from './navigation'

const resetHistory = () => {
  window.history.replaceState(null, '', '/')
}

describe('blog navigation', () => {
  beforeEach(resetHistory)

  afterEach(() => {
    vi.restoreAllMocks()
    resetHistory()
  })

  it('marks SPA navigation entries and notifies the router', () => {
    const dispatchEvent = vi.spyOn(window, 'dispatchEvent')

    navigateTo('/read/42')

    expect(window.location.pathname).toBe('/read/42')
    expect(window.history.state).toEqual({
      __blogNavigation: true,
      from: '/',
    })
    expect(dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'popstate' }),
    )
  })

  it('does not create duplicate entries for the current path', () => {
    navigateTo('/read')
    const pushState = vi.spyOn(window.history, 'pushState')

    navigateTo('/read')

    expect(pushState).not.toHaveBeenCalled()
  })

  it('uses browser history when the current entry was created by the blog router', () => {
    window.history.replaceState(
      { __blogNavigation: true, from: '/read' },
      '',
      '/read/42',
    )
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {})

    navigateBack()

    expect(back).toHaveBeenCalledOnce()
  })

  it('returns direct post visits to the blog index without leaving the site', () => {
    window.history.replaceState(null, '', '/read/42')
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {})
    const replaceState = vi.spyOn(window.history, 'replaceState')

    navigateBack()

    expect(back).not.toHaveBeenCalled()
    expect(replaceState).toHaveBeenCalledWith(null, '', '/read')
    expect(window.location.pathname).toBe('/read')
  })
})
