import { useLazyImage } from '../../hooks/useLazyImage'

export default function LazyBackground({ src, className, style, children, ...props }) {
  const { ref, isLoaded } = useLazyImage({ rootMargin: '100px' })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundImage: isLoaded ? `url(${src})` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
