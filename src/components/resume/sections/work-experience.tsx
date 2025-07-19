'use client'

import { useResumeStore } from '@/store/resume-store'
import { CalendarDays, MapPin } from 'lucide-react'

export function WorkExperience() {
  const { currentResume } = useResumeStore()
  const experienceSection = currentResume?.sections.find(section => section.type === 'EXPERIENCE')

  if (!experienceSection || !experienceSection.isVisible || !experienceSection.content?.length) {
    return null
  }

  return (
    <div className="mb-10">
      {/* 标题 - 更简洁的样式 */}
      <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
        {experienceSection.title || '工作经历'}
      </h2>
      
      <div className="space-y-8">
        {experienceSection.content.map((experience: any, index: number) => (
          <div key={index} className="relative">
            {/* 简化的时间线设计 */}
            <div className="flex gap-6">
              <div className="flex-1">
                {/* 职位和公司信息 */}
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h3 className="text-xl font-medium text-gray-900">
                      {experience.title || experience.position}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                      {experience.startDate && (
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {experience.startDate}
                          {experience.endDate && ` - ${experience.endDate}`}
                          {experience.current && ' - 至今'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                    <span className="font-medium text-gray-700">
                      {experience.company}
                    </span>
                    {experience.location && (
                      <span className="text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {experience.location}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 工作描述 */}
                {experience.description && (
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {Array.isArray(experience.description) ? (
                      <ul className="space-y-2">
                        {experience.description.map((desc: string, descIndex: number) => (
                          <li key={descIndex} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span className="flex-1">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{experience.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 