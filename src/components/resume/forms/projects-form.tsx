'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, FolderOpen, Tag } from 'lucide-react'

interface Project {
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate?: string
  endDate?: string
}

export function ProjectsForm() {
  const { currentResume, updateSection } = useResumeStore()
  const projectsSection = currentResume?.sections.find(section => section.type === 'PROJECTS')
  
  const [newProject, setNewProject] = useState<Project>({
    name: '',
    description: '',
    technologies: [],
    url: '',
    github: '',
    startDate: '',
    endDate: ''
  })
  const [newTech, setNewTech] = useState('')

  const handleAddProject = () => {
    if (!newProject.name.trim() || !newProject.description.trim()) return

    const project = {
      ...newProject,
      technologies: newProject.technologies.filter(tech => tech.trim() !== '')
    }

    const newContent = [...(projectsSection?.content || []), project]
    updateSection(projectsSection?.id || 'projects', { content: newContent })
    
    setNewProject({
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      startDate: '',
      endDate: ''
    })
  }

  const handleRemoveProject = (index: number) => {
    const newContent = projectsSection?.content.filter((_, i) => i !== index) || []
    updateSection(projectsSection?.id || 'projects', { content: newContent })
  }

  const handleUpdateProject = (index: number, field: string, value: any) => {
    const newContent = [...(projectsSection?.content || [])]
    newContent[index] = { ...newContent[index], [field]: value }
    updateSection(projectsSection?.id || 'projects', { content: newContent })
  }

  const addTechToProject = (projectIndex: number, tech: string) => {
    if (!tech.trim()) return
    const project = projectsSection?.content[projectIndex]
    if (project) {
      const newTechs = [...project.technologies, tech.trim()]
      handleUpdateProject(projectIndex, 'technologies', newTechs)
    }
  }

  const removeTechFromProject = (projectIndex: number, techIndex: number) => {
    const project = projectsSection?.content[projectIndex]
    if (project) {
      const newTechs = project.technologies.filter((_, i) => i !== techIndex)
      handleUpdateProject(projectIndex, 'technologies', newTechs)
    }
  }

  const addTechToNewProject = () => {
    if (!newTech.trim()) return
    setNewProject({
      ...newProject,
      technologies: [...newProject.technologies, newTech.trim()]
    })
    setNewTech('')
  }

  const removeTechFromNewProject = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="projects-title">标题</Label>
        <Input
          id="projects-title"
          value={projectsSection?.title || ''}
          onChange={(e) => updateSection(projectsSection?.id || 'projects', { title: e.target.value })}
          placeholder="项目经验"
        />
      </div>

      {/* 现有的项目 */}
      {projectsSection?.content?.map((project: Project, index: number) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <FolderOpen className="h-4 w-4" />
              项目 {index + 1}
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveProject(index)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>项目名称</Label>
              <Input
                value={project.name}
                onChange={(e) => handleUpdateProject(index, 'name', e.target.value)}
                placeholder="项目名称"
              />
            </div>

            <div className="space-y-2">
              <Label>项目描述</Label>
              <Textarea
                value={project.description}
                onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                placeholder="详细描述项目的功能、特点和您的贡献..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>项目链接</Label>
                <Input
                  value={project.url}
                  onChange={(e) => handleUpdateProject(index, 'url', e.target.value)}
                  placeholder="https://project-demo.com"
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub 链接</Label>
                <Input
                  value={project.github}
                  onChange={(e) => handleUpdateProject(index, 'github', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>开始时间</Label>
                <Input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => handleUpdateProject(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>结束时间</Label>
                <Input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => handleUpdateProject(index, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>技术栈</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies?.map((tech: string, techIndex: number) => (
                  <Badge
                    key={techIndex}
                    variant="outline"
                    className="text-xs py-1 px-2"
                  >
                    {tech}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTechFromProject(index, techIndex)}
                      className="h-3 w-3 p-0 ml-1 text-red-500 hover:text-red-700"
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="添加技术"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTechToProject(index, (e.target as HTMLInputElement).value)
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
                    addTechToProject(index, input.value)
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

      {/* 添加新的项目 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            添加项目
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>项目名称 *</Label>
            <Input
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              placeholder="项目名称"
            />
          </div>

          <div className="space-y-2">
            <Label>项目描述 *</Label>
            <Textarea
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              placeholder="详细描述项目的功能、特点和您的贡献..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>项目链接</Label>
              <Input
                value={newProject.url}
                onChange={(e) => setNewProject({...newProject, url: e.target.value})}
                placeholder="https://project-demo.com"
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub 链接</Label>
              <Input
                value={newProject.github}
                onChange={(e) => setNewProject({...newProject, github: e.target.value})}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>开始时间</Label>
              <Input
                type="month"
                value={newProject.startDate}
                onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>结束时间</Label>
              <Input
                type="month"
                value={newProject.endDate}
                onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>技术栈</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {newProject.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs py-1 px-2"
                >
                  {tech}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTechFromNewProject(index)}
                    className="h-3 w-3 p-0 ml-1 text-red-500 hover:text-red-700"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="输入技术名称"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTechToNewProject()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTechToNewProject}
                disabled={!newTech.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleAddProject}
            disabled={!newProject.name.trim() || !newProject.description.trim()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加项目
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 