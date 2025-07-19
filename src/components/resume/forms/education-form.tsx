'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, GraduationCap } from 'lucide-react'

interface Education {
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  description?: string[]
}

export function EducationForm() {
  const { currentResume, updateSection } = useResumeStore()
  const educationSection = currentResume?.sections.find(section => section.type === 'EDUCATION')
  
  const [newEducation, setNewEducation] = useState<Education>({
    degree: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: []
  })

  const handleAddEducation = () => {
    if (!newEducation.degree.trim() || !newEducation.school.trim()) return

    const education = {
      ...newEducation,
      description: newEducation.description?.filter(desc => desc.trim() !== '') || []
    }

    const newContent = [...(educationSection?.content || []), education]
    updateSection(educationSection?.id || 'education', { content: newContent })
    
    setNewEducation({
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: []
    })
  }

  const handleRemoveEducation = (index: number) => {
    const newContent = educationSection?.content.filter((_, i) => i !== index) || []
    updateSection(educationSection?.id || 'education', { content: newContent })
  }

  const handleUpdateEducation = (index: number, field: string, value: any) => {
    const newContent = [...(educationSection?.content || [])]
    newContent[index] = { ...newContent[index], [field]: value }
    updateSection(educationSection?.id || 'education', { content: newContent })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="education-title">标题</Label>
        <Input
          id="education-title"
          value={educationSection?.title || ''}
          onChange={(e) => updateSection(educationSection?.id || 'education', { title: e.target.value })}
          placeholder="教育背景"
        />
      </div>

      {/* 现有的教育经历 */}
      {educationSection?.content?.map((education: Education, index: number) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4" />
              教育经历 {index + 1}
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveEducation(index)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>学位/专业</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => handleUpdateEducation(index, 'degree', e.target.value)}
                  placeholder="计算机科学学士"
                />
              </div>
              <div className="space-y-2">
                <Label>学校名称</Label>
                <Input
                  value={education.school}
                  onChange={(e) => handleUpdateEducation(index, 'school', e.target.value)}
                  placeholder="清华大学"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>学校地点</Label>
                <Input
                  value={education.location}
                  onChange={(e) => handleUpdateEducation(index, 'location', e.target.value)}
                  placeholder="北京, 中国"
                />
              </div>
              <div className="space-y-2">
                <Label>GPA</Label>
                <Input
                  value={education.gpa}
                  onChange={(e) => handleUpdateEducation(index, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>开始时间</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => handleUpdateEducation(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>结束时间</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => handleUpdateEducation(index, 'endDate', e.target.value)}
                  disabled={education.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`edu-current-${index}`}
                checked={education.current}
                onCheckedChange={(checked) => handleUpdateEducation(index, 'current', checked)}
              />
              <Label htmlFor={`edu-current-${index}`}>目前在读</Label>
            </div>

            {education.description && education.description.length > 0 && (
              <div className="space-y-2">
                <Label>描述</Label>
                {education.description.map((desc: string, descIndex: number) => (
                  <div key={descIndex} className="flex gap-2">
                    <Textarea
                      value={desc}
                      onChange={(e) => {
                        const newDesc = [...(education.description || [])]
                        newDesc[descIndex] = e.target.value
                        handleUpdateEducation(index, 'description', newDesc)
                      }}
                      placeholder="相关课程、荣誉、活动等..."
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newDesc = (education.description || []).filter((_, i) => i !== descIndex)
                        handleUpdateEducation(index, 'description', newDesc)
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
                    const newDesc = [...(education.description || []), '']
                    handleUpdateEducation(index, 'description', newDesc)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加描述
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* 添加新的教育经历 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            添加教育经历
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>学位/专业 *</Label>
              <Input
                value={newEducation.degree}
                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                placeholder="计算机科学学士"
              />
            </div>
            <div className="space-y-2">
              <Label>学校名称 *</Label>
              <Input
                value={newEducation.school}
                onChange={(e) => setNewEducation({...newEducation, school: e.target.value})}
                placeholder="清华大学"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>学校地点</Label>
              <Input
                value={newEducation.location}
                onChange={(e) => setNewEducation({...newEducation, location: e.target.value})}
                placeholder="北京, 中国"
              />
            </div>
            <div className="space-y-2">
              <Label>GPA</Label>
              <Input
                value={newEducation.gpa}
                onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
                placeholder="3.8/4.0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>开始时间</Label>
              <Input
                type="month"
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>结束时间</Label>
              <Input
                type="month"
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                disabled={newEducation.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-edu-current"
              checked={newEducation.current}
              onCheckedChange={(checked) => setNewEducation({...newEducation, current: checked as boolean})}
            />
            <Label htmlFor="new-edu-current">目前在读</Label>
          </div>

          <Button
            onClick={handleAddEducation}
            disabled={!newEducation.degree.trim() || !newEducation.school.trim()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加教育经历
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 