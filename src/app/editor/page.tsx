import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '简历编辑器 - Slim Resume',
  description: '使用我们的专业简历编辑器创建您的完美简历',
}

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            简历编辑器
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            开始创建您的专业简历
          </p>
          
          {/* 编辑器组件将在这里渲染 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-gray-500 dark:text-gray-400">
              简历编辑器功能即将上线...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 