'use client'

import { useResumeStore } from '@/store/resume-store'
import { CalendarDays, MapPin, GraduationCap } from 'lucide-react'

export function Education() {
  const { currentResume } = useResumeStore()
  const educationSection = currentResume?.sections.find(section => section.type === 'EDUCATION')

  if (!educationSection || !educationSection.isVisible || !educationSection.content?.length) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-1">
        {educationSection.title || '教育背景'}
      </h2>
      
      <div className="space-y-6">
        {educationSection.content.map((education: any, index: number) => (
          <div key={index} className="flex gap-4">
            {/* 教育图标 */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </div>
            
            <div className="flex-1">
              {/* 学位和时间 */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {education.degree}
                </h3>
                <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                  {education.startDate && (
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {education.startDate}
                      {education.endDate && ` - ${education.endDate}`}
                      {education.current && ' - 在读'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <span className="font-medium text-blue-600">
                  {education.school}
                </span>
                {education.location && (
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {education.location}
                  </span>
                )}
              </div>
              
              {/* GPA 和描述 */}
              <div className="space-y-2">
                {education.gpa && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">GPA:</span> {education.gpa}
                  </p>
                )}
                
                {education.description && (
                  <div className="text-gray-700">
                    {Array.isArray(education.description) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {education.description.map((desc: string, descIndex: number) => (
                          <li key={descIndex} className="text-sm leading-relaxed">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-relaxed">
                        {education.description}
                      </p>
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