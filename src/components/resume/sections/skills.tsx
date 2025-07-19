'use client'

import { useResumeStore } from '@/store/resume-store'
import { Badge } from '@/components/ui/badge'

export function Skills() {
  const { currentResume } = useResumeStore()
  const skillsSection = currentResume?.sections.find(section => section.type === 'SKILLS')

  if (!skillsSection || !skillsSection.isVisible || !skillsSection.content?.length) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-1">
        {skillsSection.title || '技能专长'}
      </h2>
      
      <div className="space-y-4">
        {skillsSection.content.map((skillGroup: any, index: number) => (
          <div key={index}>
            {skillGroup.category && (
              <h3 className="text-base font-medium text-gray-800 mb-2">
                {skillGroup.category}
              </h3>
            )}
            
            <div className="flex flex-wrap gap-2">
              {(skillGroup.skills || skillGroup.items || [skillGroup]).map((skill: any, skillIndex: number) => {
                const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill
                return (
                  <Badge 
                    key={skillIndex} 
                    variant="secondary" 
                    className="text-xs py-1 px-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {skillName}
                  </Badge>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 