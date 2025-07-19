'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, Code, Tag } from 'lucide-react'

interface SkillGroup {
  category: string
  skills: string[]
}

export function SkillsForm() {
  const { currentResume, updateSection } = useResumeStore()
  const skillsSection = currentResume?.sections.find(section => section.type === 'SKILLS')
  
  const [newSkillGroup, setNewSkillGroup] = useState<SkillGroup>({
    category: '',
    skills: []
  })
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkillGroup = () => {
    if (!newSkillGroup.category.trim() || newSkillGroup.skills.length === 0) return

    const newContent = [...(skillsSection?.content || []), newSkillGroup]
    updateSection(skillsSection?.id || 'skills', { content: newContent })
    
    setNewSkillGroup({
      category: '',
      skills: []
    })
  }

  const handleRemoveSkillGroup = (index: number) => {
    const newContent = skillsSection?.content.filter((_, i) => i !== index) || []
    updateSection(skillsSection?.id || 'skills', { content: newContent })
  }

  const handleUpdateSkillGroup = (index: number, field: string, value: any) => {
    const newContent = [...(skillsSection?.content || [])]
    newContent[index] = { ...newContent[index], [field]: value }
    updateSection(skillsSection?.id || 'skills', { content: newContent })
  }

  const addSkillToGroup = (groupIndex: number, skill: string) => {
    if (!skill.trim()) return
    const skillGroup = skillsSection?.content[groupIndex]
    if (skillGroup) {
      const newSkills = [...skillGroup.skills, skill.trim()]
      handleUpdateSkillGroup(groupIndex, 'skills', newSkills)
    }
  }

  const removeSkillFromGroup = (groupIndex: number, skillIndex: number) => {
    const skillGroup = skillsSection?.content[groupIndex]
    if (skillGroup) {
      const newSkills = skillGroup.skills.filter((_, i) => i !== skillIndex)
      handleUpdateSkillGroup(groupIndex, 'skills', newSkills)
    }
  }

  const addSkillToNewGroup = () => {
    if (!newSkill.trim()) return
    setNewSkillGroup({
      ...newSkillGroup,
      skills: [...newSkillGroup.skills, newSkill.trim()]
    })
    setNewSkill('')
  }

  const removeSkillFromNewGroup = (index: number) => {
    setNewSkillGroup({
      ...newSkillGroup,
      skills: newSkillGroup.skills.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skills-title">标题</Label>
        <Input
          id="skills-title"
          value={skillsSection?.title || ''}
          onChange={(e) => updateSection(skillsSection?.id || 'skills', { title: e.target.value })}
          placeholder="技能专长"
        />
      </div>

      {/* 现有的技能组 */}
      {skillsSection?.content?.map((skillGroup: SkillGroup, index: number) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Code className="h-4 w-4" />
              技能组 {index + 1}
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveSkillGroup(index)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>分类名称</Label>
              <Input
                value={skillGroup.category}
                onChange={(e) => handleUpdateSkillGroup(index, 'category', e.target.value)}
                placeholder="编程语言"
              />
            </div>

            <div className="space-y-2">
              <Label>技能列表</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skillGroup.skills.map((skill: string, skillIndex: number) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="text-xs py-1 px-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkillFromGroup(index, skillIndex)}
                      className="h-3 w-3 p-0 ml-1 text-red-500 hover:text-red-700"
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="添加技能"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkillToGroup(index, (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addSkillToGroup(index, input.value)
                    input.value = ''
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 添加新的技能组 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            添加技能组
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>分类名称 *</Label>
            <Input
              value={newSkillGroup.category}
              onChange={(e) => setNewSkillGroup({...newSkillGroup, category: e.target.value})}
              placeholder="编程语言、框架、工具等"
            />
          </div>

          <div className="space-y-2">
            <Label>技能列表</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {newSkillGroup.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs py-1 px-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {skill}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkillFromNewGroup(index)}
                    className="h-3 w-3 p-0 ml-1 text-red-500 hover:text-red-700"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="输入技能名称"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkillToNewGroup()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSkillToNewGroup}
                disabled={!newSkill.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleAddSkillGroup}
            disabled={!newSkillGroup.category.trim() || newSkillGroup.skills.length === 0}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加技能组
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 