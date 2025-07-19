'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X } from 'lucide-react'

export function SummaryForm() {
  const { currentResume, updateSection } = useResumeStore()
  const summarySection = currentResume?.sections.find(section => section.type === 'SUMMARY')
  const [summaryText, setSummaryText] = useState('')

  const handleAddSummary = () => {
    if (!summaryText.trim()) return

    const newContent = [...(summarySection?.content || []), summaryText.trim()]
    updateSection(summarySection?.id || 'summary', { content: newContent })
    setSummaryText('')
  }

  const handleRemoveSummary = (index: number) => {
    const newContent = summarySection?.content.filter((_: any, i: number) => i !== index) || []
    updateSection(summarySection?.id || 'summary', { content: newContent })
  }

  const handleUpdateSummary = (index: number, value: string) => {
    const newContent = [...(summarySection?.content || [])]
    newContent[index] = value
    updateSection(summarySection?.id || 'summary', { content: newContent })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary-title">标题</Label>
        <Input
          id="summary-title"
          value={summarySection?.title || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSection(summarySection?.id || 'summary', { title: e.target.value })}
          placeholder="个人简介"
        />
      </div>

      {/* 现有的简介内容 */}
      {summarySection?.content?.map((item: string, index: number) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>简介段落 {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveSummary(index)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={item}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdateSummary(index, e.target.value)}
            placeholder="写一段简洁的个人介绍..."
            rows={3}
          />
        </div>
      ))}

      {/* 添加新的简介段落 */}
      <div className="space-y-2">
        <Label htmlFor="new-summary">添加新段落</Label>
        <Textarea
          id="new-summary"
          value={summaryText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSummaryText(e.target.value)}
          placeholder="写一段简洁的个人介绍，突出您的专业背景和核心优势..."
          rows={3}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleAddSummary}
          disabled={!summaryText.trim()}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加段落
        </Button>
      </div>
    </div>
  )
} 