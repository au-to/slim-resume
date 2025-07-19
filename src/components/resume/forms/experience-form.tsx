'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, Briefcase } from 'lucide-react'

interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export function ExperienceForm() {
  const { currentResume, updateSection } = useResumeStore()
  const experienceSection = currentResume?.sections.find(section => section.type === 'EXPERIENCE')
  
  const [newExperience, setNewExperience] = useState<Experience>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ['']
  })

  const handleAddExperience = () => {
    if (!newExperience.title.trim() || !newExperience.company.trim()) return

    const experience = {
      ...newExperience,
      description: newExperience.description.filter(desc => desc.trim() !== '')
    }

    const newContent = [...(experienceSection?.content || []), experience]
    updateSection(experienceSection?.id || 'experience', { content: newContent })
    
    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    })
  }

  const handleRemoveExperience = (index: number) => {
    const newContent = experienceSection?.content.filter((_: any, i: number) => i !== index) || []
    updateSection(experienceSection?.id || 'experience', { content: newContent })
  }

  const handleUpdateExperience = (index: number, field: string, value: any) => {
    const newContent = [...(experienceSection?.content || [])]
    newContent[index] = { ...newContent[index], [field]: value }
    updateSection(experienceSection?.id || 'experience', { content: newContent })
  }

  const addDescriptionItem = (descriptions: string[], setDescriptions: (desc: string[]) => void) => {
    setDescriptions([...descriptions, ''])
  }

  const removeDescriptionItem = (descriptions: string[], setDescriptions: (desc: string[]) => void, index: number) => {
    setDescriptions(descriptions.filter((_: string, i: number) => i !== index))
  }

  const updateDescriptionItem = (descriptions: string[], setDescriptions: (desc: string[]) => void, index: number, value: string) => {
    const newDescriptions = [...descriptions]
    newDescriptions[index] = value
    setDescriptions(newDescriptions)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="experience-title">标题</Label>
        <Input
          id="experience-title"
          value={experienceSection?.title || ''}
          onChange={(e) => updateSection(experienceSection?.id || 'experience', { title: e.target.value })}
          placeholder="工作经历"
        />
      </div>

      {/* 现有的工作经历 */}
      {experienceSection?.content?.map((experience: Experience, index: number) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="h-4 w-4" />
              工作经历 {index + 1}
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveExperience(index)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>职位名称</Label>
                <Input
                  value={experience.title}
                  onChange={(e) => handleUpdateExperience(index, 'title', e.target.value)}
                  placeholder="软件工程师"
                />
              </div>
              <div className="space-y-2">
                <Label>公司名称</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => handleUpdateExperience(index, 'company', e.target.value)}
                  placeholder="公司名称"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>工作地点</Label>
              <Input
                value={experience.location}
                onChange={(e) => handleUpdateExperience(index, 'location', e.target.value)}
                placeholder="北京, 中国"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>开始时间</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleUpdateExperience(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>结束时间</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleUpdateExperience(index, 'endDate', e.target.value)}
                  disabled={experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${index}`}
                checked={experience.current}
                onCheckedChange={(checked: boolean) => handleUpdateExperience(index, 'current', checked)}
              />
              <Label htmlFor={`current-${index}`}>目前在职</Label>
            </div>

            <div className="space-y-2">
              <Label>工作描述</Label>
              {experience.description?.map((desc: string, descIndex: number) => (
                <div key={descIndex} className="flex gap-2">
                  <Textarea
                    value={desc}
                    onChange={(e) => {
                      const newDesc = [...experience.description]
                      newDesc[descIndex] = e.target.value
                      handleUpdateExperience(index, 'description', newDesc)
                    }}
                    placeholder="描述您的主要工作内容和成就..."
                    rows={2}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newDesc = experience.description.filter((_: string, i: number) => i !== descIndex)
                      handleUpdateExperience(index, 'description', newDesc)
                    }}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDesc = [...experience.description, '']
                  handleUpdateExperience(index, 'description', newDesc)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                添加描述
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 添加新的工作经历 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            添加工作经历
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>职位名称 *</Label>
              <Input
                value={newExperience.title}
                onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                placeholder="软件工程师"
              />
            </div>
            <div className="space-y-2">
              <Label>公司名称 *</Label>
              <Input
                value={newExperience.company}
                onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                placeholder="公司名称"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>工作地点</Label>
            <Input
              value={newExperience.location}
              onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
              placeholder="北京, 中国"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>开始时间</Label>
              <Input
                type="month"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>结束时间</Label>
              <Input
                type="month"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                disabled={newExperience.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-current"
              checked={newExperience.current}
              onCheckedChange={(checked: boolean) => setNewExperience({...newExperience, current: checked})}
            />
            <Label htmlFor="new-current">目前在职</Label>
          </div>

          <div className="space-y-2">
            <Label>工作描述</Label>
            {newExperience.description.map((desc, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={desc}
                  onChange={(e) => updateDescriptionItem(
                    newExperience.description,
                    (newDesc) => setNewExperience({...newExperience, description: newDesc}),
                    index,
                    e.target.value
                  )}
                  placeholder="描述您的主要工作内容和成就..."
                  rows={2}
                />
                {newExperience.description.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDescriptionItem(
                      newExperience.description,
                      (newDesc) => setNewExperience({...newExperience, description: newDesc}),
                      index
                    )}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addDescriptionItem(
                newExperience.description,
                (newDesc) => setNewExperience({...newExperience, description: newDesc})
              )}
            >
              <Plus className="h-4 w-4 mr-2" />
              添加描述
            </Button>
          </div>

          <Button
            onClick={handleAddExperience}
            disabled={!newExperience.title.trim() || !newExperience.company.trim()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加工作经历
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 