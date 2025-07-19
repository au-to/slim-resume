import { Metadata } from 'next'
import { SignInForm } from '@/components/auth/signin-form'

export const metadata: Metadata = {
  title: '登录 - Slim Resume',
  description: '登录您的 Slim Resume 账户',
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            登录您的账户
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            还没有账户？{' '}
            <a href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              立即注册
            </a>
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
} 