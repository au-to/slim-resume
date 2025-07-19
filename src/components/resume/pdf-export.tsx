'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useResumeStore } from '@/store/resume-store'

export function PDFExport() {
  const { currentResume } = useResumeStore()

  const handleExportPDF = async () => {
    if (!currentResume) return

    try {
      // 使用浏览器的打印功能来生成PDF
      window.print()
    } catch (error) {
      console.error('PDF导出失败:', error)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleExportPDF}
      disabled={!currentResume}
    >
      <Download className="h-4 w-4 mr-2" />
      导出PDF
    </Button>
  )
} 