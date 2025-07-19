'use client'

import { useEffect, useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { PersonalInfoForm } from './forms/personal-info-form'
import { SummaryForm } from './forms/summary-form'
import { ExperienceForm } from './forms/experience-form'
import { EducationForm } from './forms/education-form'
import { SkillsForm } from './forms/skills-form'
import { ProjectsForm } from './forms/projects-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, FileText, Briefcase, GraduationCap, Code, FolderOpen } from 'lucide-react'

export function ResumeEditor() {
  const { currentResume, setCurrentResume } = useResumeStore()

  useEffect(() => {
    // 如果没有当前简历，创建一个新的
    if (!currentResume) {
      const initialResume = {
        title: '我的简历',
        content: [],
        templateId: 'hacknical',
        isPublic: false,
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          website: '',
          github: '',
          linkedin: ''
        },
        sections: [
          {
            id: 'summary',
            type: 'SUMMARY' as const,
            title: '个人简介',
            content: [],
            order: 1,
            isVisible: true
          },
          {
            id: 'experience',
            type: 'EXPERIENCE' as const,
            title: '工作经历',
            content: [],
            order: 2,
            isVisible: true
          },
          {
            id: 'education',
            type: 'EDUCATION' as const,
            title: '教育背景',
            content: [],
            order: 3,
            isVisible: true
          },
          {
            id: 'skills',
            type: 'SKILLS' as const,
            title: '技能专长',
            content: [],
            order: 4,
            isVisible: true
          },
          {
            id: 'projects',
            type: 'PROJECTS' as const,
            title: '项目经验',
            content: [],
            order: 5,
            isVisible: true
          }
        ]
      }
      setCurrentResume(initialResume)
    }
  }, [currentResume, setCurrentResume])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal" className="flex items-center gap-1">
            <User className="h-3 w-3" />
            个人
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            简介
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            经历
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-1">
            <GraduationCap className="h-3 w-3" />
            教育
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-1">
            <Code className="h-3 w-3" />
            技能
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-1">
            <FolderOpen className="h-3 w-3" />
            项目
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>个人信息</CardTitle>
              <CardDescription>
                填写您的基本个人信息，这些信息将显示在简历的顶部
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>个人简介</CardTitle>
              <CardDescription>
                写一段简洁的个人介绍，突出您的专业背景和核心优势
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SummaryForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>工作经历</CardTitle>
              <CardDescription>
                添加您的工作经历，包括职位、公司、时间和主要工作内容
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExperienceForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>教育背景</CardTitle>
              <CardDescription>
                添加您的教育经历，包括学校、专业、学位和时间
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EducationForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>技能专长</CardTitle>
              <CardDescription>
                列出您的专业技能，可以按类别进行分组
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>项目经验</CardTitle>
              <CardDescription>
                展示您参与过的重要项目，包括技术栈和项目成果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 