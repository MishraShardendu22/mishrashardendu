interface BlogNavigationState {
  __blogNavigation: true
  from: string
}

/**
 * Navigate to a path using pushState (no full page reload).
 * Mark entries created by the blog router so Back can distinguish them from direct visits.
 */
export function navigateTo(path: string): void {
  const targetPath = path.startsWith('/') ? path : `/${path}`
  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (targetPath === currentPath) {
    return
  }

  window.history.pushState(
    { __blogNavigation: true, from: currentPath } satisfies BlogNavigationState,
    '',
    targetPath,
  )
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/**
 * Go back within the blog, or return to the blog index for a direct visit.
 */
export function navigateBack(fallbackPath = '/read'): void {
  const state = window.history.state as Partial<BlogNavigationState> | null

  if (state?.__blogNavigation === true && typeof state.from === 'string') {
    window.history.back()
    return
  }

  const targetPath = fallbackPath.startsWith('/') ? fallbackPath : `/${fallbackPath}`
  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (targetPath === currentPath) {
    return
  }

  window.history.replaceState(null, '', targetPath)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
