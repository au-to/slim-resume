import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Descendant } from 'slate'

// 简历内容类型定义
export interface PersonalInfo {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  website?: string
  linkedin?: string
  github?: string
  avatar?: string
}

export interface ResumeSection {
  id: string
  type: string
  title: string
  content: any[]
  order: number
  isVisible: boolean
}

export interface Resume {
  id?: string
  title: string
  content: Descendant[]
  templateId: string
  isPublic: boolean
  shareToken?: string
  personalInfo?: PersonalInfo
  sections: ResumeSection[]
}

interface ResumeStore {
  // 当前编辑的简历
  currentResume: Resume | null
  
  // 简历列表
  resumes: Resume[]
  
  // 加载状态
  isLoading: boolean
  
  // 当前选中的模板
  selectedTemplate: string
  
  // Actions
  setCurrentResume: (resume: Resume | null) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  updateResumeTitle: (title: string) => void
  updateResumeContent: (content: Descendant[]) => void
  addSection: (section: Omit<ResumeSection, 'id'>) => void
  updateSection: (id: string, updates: Partial<ResumeSection>) => void
  removeSection: (id: string) => void
  reorderSections: (sections: ResumeSection[]) => void
  setTemplate: (templateId: string) => void
  toggleSectionVisibility: (id: string) => void
  setResumes: (resumes: Resume[]) => void
  setLoading: (loading: boolean) => void
  resetResume: () => void
}

const initialResumeState: Resume = {
  title: '新建简历',
  content: [
    {
      type: 'paragraph',
      children: [{ text: '开始编辑您的简历内容...' }],
    },
  ],
  templateId: 'default',
  isPublic: false,
  personalInfo: {},
  sections: [],
}

export const useResumeStore = create<ResumeStore>()(
  devtools(
    (set, get) => ({
      currentResume: null,
      resumes: [],
      isLoading: false,
      selectedTemplate: 'default',

      setCurrentResume: (resume) => {
        set({ currentResume: resume }, false, 'setCurrentResume')
      },

      updatePersonalInfo: (info) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        set(
          {
            currentResume: {
              ...currentResume,
              personalInfo: {
                ...currentResume.personalInfo,
                ...info,
              },
            },
          },
          false,
          'updatePersonalInfo'
        )
      },

      updateResumeTitle: (title) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        set(
          {
            currentResume: {
              ...currentResume,
              title,
            },
          },
          false,
          'updateResumeTitle'
        )
      },

      updateResumeContent: (content) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        set(
          {
            currentResume: {
              ...currentResume,
              content,
            },
          },
          false,
          'updateResumeContent'
        )
      },

      addSection: (section) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        const newSection: ResumeSection = {
          ...section,
          id: Math.random().toString(36).substr(2, 9),
        }

        set(
          {
            currentResume: {
              ...currentResume,
              sections: [...currentResume.sections, newSection],
            },
          },
          false,
          'addSection'
        )
      },

      updateSection: (id, updates) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        set(
          {
            currentResume: {
              ...currentResume,
              sections: currentResume.sections.map((section) =>
                section.id === id ? { ...section, ...updates } : section
              ),
            },
          },
          false,
          'updateSection'
        )
      },

      removeSection: (id) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        set(
          {
            currentResume: {
              ...currentResume,
              sections: currentResume.sections.filter((section) => section.id !== id),
            },
          },
          false,
          'removeSection'
        )
      },

      reorderSections: (sections) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        set(
          {
            currentResume: {
              ...currentResume,
              sections,
            },
          },
          false,
          'reorderSections'
        )
      },

      setTemplate: (templateId) => {
        const currentResume = get().currentResume
        
        set({ selectedTemplate: templateId }, false, 'setTemplate')
        
        if (currentResume) {
          set(
            {
              currentResume: {
                ...currentResume,
                templateId,
              },
            },
            false,
            'updateResumeTemplate'
          )
        }
      },

      toggleSectionVisibility: (id) => {
        const currentResume = get().currentResume
        if (!currentResume) return

        set(
          {
            currentResume: {
              ...currentResume,
              sections: currentResume.sections.map((section) =>
                section.id === id
                  ? { ...section, isVisible: !section.isVisible }
                  : section
              ),
            },
          },
          false,
          'toggleSectionVisibility'
        )
      },

      setResumes: (resumes) => {
        set({ resumes }, false, 'setResumes')
      },

      setLoading: (loading) => {
        set({ isLoading: loading }, false, 'setLoading')
      },

      resetResume: () => {
        set({ currentResume: { ...initialResumeState } }, false, 'resetResume')
      },
    }),
    {
      name: 'resume-store',
    }
  )
) 