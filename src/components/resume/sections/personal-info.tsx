'use client'

import { useResumeStore } from '@/store/resume-store'
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react'

export function PersonalInfo() {
  const { currentResume } = useResumeStore()
  const personalInfo = currentResume?.personalInfo

  if (!personalInfo) return null

  const fullName = `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim()

  return (
    <div className="text-center space-y-6">
      {/* 姓名 - hacknical 风格，更大更突出 */}
      <h1 className="text-5xl font-thin text-gray-900 tracking-wide leading-tight">
        {fullName || '请输入姓名'}
      </h1>
      
      {/* 联系信息 - 更紧凑的布局 */}
      <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm">
        {personalInfo.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{personalInfo.email}</span>
          </div>
        )}
        
        {personalInfo.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{personalInfo.phone}</span>
          </div>
        )}
        
        {personalInfo.address && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{personalInfo.address}</span>
          </div>
        )}
        
        {personalInfo.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <a 
              href={personalInfo.website} 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {personalInfo.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        
        {personalInfo.github && (
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-gray-400" />
            <a 
              href={personalInfo.github} 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
            </a>
          </div>
        )}
        
        {personalInfo.linkedin && (
          <div className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-gray-400" />
            <a 
              href={personalInfo.linkedin} 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  )
} 