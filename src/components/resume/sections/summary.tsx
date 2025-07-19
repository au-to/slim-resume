'use client'

import { useResumeStore } from '@/store/resume-store'

export function Summary() {
  const { currentResume } = useResumeStore()
  const summarySection = currentResume?.sections.find(section => section.type === 'SUMMARY')

  if (!summarySection || !summarySection.isVisible || !summarySection.content?.length) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
        {summarySection.title || '个人简介'}
      </h2>
      <div className="text-gray-700 leading-relaxed">
        {summarySection.content.map((item: any, index: number) => (
          <p key={index} className="mb-2">
            {item.content || item.text || item}
          </p>
        ))}
      </div>
    </div>
  )
} 