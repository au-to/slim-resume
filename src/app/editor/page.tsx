'use client'

import { ResumeEditor } from '@/components/resume/resume-editor'
import { ResumeTemplate } from '@/components/resume/resume-template'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FileText, Download, Eye, Settings } from 'lucide-react'
import Link from 'next/link'

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部工具栏 */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Slim Resume
                </h1>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                简历编辑器
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                预览
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出PDF
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                设置
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要编辑区域 */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* 左侧编辑面板 */}
        <div className="w-1/2 bg-white dark:bg-gray-800 border-r overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                编辑简历内容
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                填写您的个人信息和经历，右侧将实时预览简历效果
              </p>
            </div>
            <ResumeEditor />
          </div>
        </div>

        {/* 右侧预览面板 */}
        <div className="w-1/2 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                简历预览
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                这是您简历的最终效果预览
              </p>
            </div>
            
            {/* 简历预览容器 */}
            <div className="bg-white rounded-lg shadow-sm">
              <ResumeTemplate />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 