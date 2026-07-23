import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-ivory dark:bg-charcoal z-50">
          <div className="text-center max-w-md px-6">
            <span className="font-hero text-6xl text-primary block mb-4">أ</span>
            <h1 className="font-display text-2xl font-bold text-secondary dark:text-white mb-3">
              حدث خطأ غير متوقع
            </h1>
            <p className="text-stone dark:text-mist mb-8 font-body text-sm">
              نأسف على هذا الإزعاج. يرجى المحاولة مرة أخرى.
            </p>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="inline-flex px-8 py-3.5 bg-primary text-secondary text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors font-body"
            >
              العودة إلى الرئيسية
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
