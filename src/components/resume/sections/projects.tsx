'use client'

import { useResumeStore } from '@/store/resume-store'
import { CalendarDays, ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function Projects() {
  const { currentResume } = useResumeStore()
  const projectsSection = currentResume?.sections.find(section => section.type === 'PROJECTS')

  if (!projectsSection || !projectsSection.isVisible || !projectsSection.content?.length) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-1">
        {projectsSection.title || '项目经验'}
      </h2>
      
      <div className="space-y-6">
        {projectsSection.content.map((project: any, index: number) => (
          <div key={index} className="border-l-2 border-blue-200 pl-4">
            {/* 项目名称和时间 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                {project.name || project.title}
              </h3>
              <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                {project.startDate && (
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {project.startDate}
                    {project.endDate && ` - ${project.endDate}`}
                  </span>
                )}
              </div>
            </div>
            
            {/* 项目链接 */}
            <div className="flex gap-4 mb-3">
              {project.url && (
                <a 
                  href={project.url} 
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                  在线预览
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github} 
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3 w-3" />
                  源码
                </a>
              )}
            </div>
            
            {/* 项目描述 */}
            {project.description && (
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {project.description}
              </p>
            )}
            
            {/* 技术栈 */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <Badge 
                    key={techIndex} 
                    variant="outline" 
                    className="text-xs py-1 px-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 