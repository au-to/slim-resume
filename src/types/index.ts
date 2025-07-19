import { Descendant } from 'slate'

// 数据库模型类型
export interface User {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Resume {
  id: string
  title: string
  content: any // Slate.js content as JSON
  templateId: string
  isPublic: boolean
  shareToken?: string
  userId: string
  personalInfo?: PersonalInfo
  sections: ResumeSection[]
  createdAt: Date
  updatedAt: Date
}

export interface PersonalInfo {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  website?: string
  linkedin?: string
  github?: string
  avatar?: string
  resumeId: string
  createdAt: Date
  updatedAt: Date
}

export interface ResumeSection {
  id: string
  type: SectionType
  title: string
  content: any // 结构化内容作为JSON
  order: number
  isVisible: boolean
  resumeId: string
  createdAt: Date
  updatedAt: Date
}

export enum SectionType {
  SUMMARY = 'SUMMARY',
  EXPERIENCE = 'EXPERIENCE',
  EDUCATION = 'EDUCATION',
  SKILLS = 'SKILLS',
  PROJECTS = 'PROJECTS',
  CERTIFICATIONS = 'CERTIFICATIONS',
  LANGUAGES = 'LANGUAGES',
  INTERESTS = 'INTERESTS',
  CUSTOM = 'CUSTOM'
}

// 前端使用的简化类型
export interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview: string
  category: string
}

export interface ExperienceItem {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
}

export interface EducationItem {
  id: string
  degree: string
  school: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: string
  description?: string[]
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate?: string
  endDate?: string
}

export interface SkillGroup {
  id: string
  category: string
  skills: string[]
}

export interface Language {
  id: string
  name: string
  proficiency: 'BASIC' | 'CONVERSATIONAL' | 'FLUENT' | 'NATIVE'
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
} 