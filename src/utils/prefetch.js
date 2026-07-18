const prefetched = new Set()

const pageImports = {
  '/': () => import('../pages/HomePage'),
  '/about': () => import('../pages/AboutPage'),
  '/gallery': () => import('../pages/GalleryPage'),
  '/collections': () => import('../pages/CollectionsPage'),
  '/exhibitions': () => import('../pages/ExhibitionsPage'),
  '/events': () => import('../pages/EventsPage'),
  '/magazine': () => import('../pages/MagazinePage'),
  '/contact': () => import('../pages/ContactPage'),
  '/artists': () => import('../pages/ArtistsPage'),
  'artist-profile': () => import('../pages/ArtistProfilePage'),
  'artwork-detail': () => import('../pages/ArtworkPage'),
}

export function prefetchPage(path) {
  let importer = pageImports[path]
  if (!importer) {
    if (path.startsWith('/artists/') && path !== '/artists') importer = pageImports['artist-profile']
    else if (path.startsWith('/artwork/')) importer = pageImports['artwork-detail']
  }
  if (!importer || prefetched.has(path)) return
  prefetched.add(path)
  importer().catch(() => prefetched.delete(path))
}

export function prefetchDynamic(type) {
  const key = type === 'artist' ? 'artist-profile' : type === 'artwork' ? 'artwork-detail' : null
  if (!key || prefetched.has(key)) return
  prefetched.add(key)
  pageImports[key]().catch(() => prefetched.delete(key))
}
