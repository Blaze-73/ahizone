export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-ivory dark:bg-charcoal z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-stone/20 dark:border-mist/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-hero text-primary text-sm">أ</span>
        </div>
      </div>
    </div>
  )
}
