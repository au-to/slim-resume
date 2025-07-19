'use client'

import { useResumeStore } from '@/store/resume-store'
import { PersonalInfo } from './sections/personal-info'
import { WorkExperience } from './sections/work-experience'
import { Education } from './sections/education'
import { Skills } from './sections/skills'
import { Projects } from './sections/projects'
import { Summary } from './sections/summary'

export function ResumeTemplate() {
  const { currentResume } = useResumeStore()

  if (!currentResume) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        请开始编辑您的简历内容
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm print:shadow-none">
      {/* A4 纸张尺寸的容器 - hacknical 风格 */}
      <div className="min-h-[297mm] p-10 print:p-8 font-light">
        {/* 个人信息部分 */}
        <PersonalInfo />
        
        {/* 分割线 - 使用更细的线条 */}
        <div className="border-b border-gray-100 my-8"></div>
        
        {/* 主要内容区域 */}
        <div className="space-y-8">
          {/* 个人简介 */}
          <Summary />
          
          {/* 工作经历 */}
          <WorkExperience />
          
          {/* 教育背景 */}
          <Education />
          
          {/* 技能专长 */}
          <Skills />
          
          {/* 项目经验 */}
          <Projects />
        </div>
      </div>
    </div>
  )
} 