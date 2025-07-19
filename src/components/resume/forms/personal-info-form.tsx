'use client'

import { useResumeStore } from '@/store/resume-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PersonalInfoForm() {
  const { currentResume, updatePersonalInfo } = useResumeStore()
  const personalInfo = currentResume?.personalInfo || {}

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">名</Label>
          <Input
            id="firstName"
            value={personalInfo.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="请输入名字"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">姓</Label>
          <Input
            id="lastName"
            value={personalInfo.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="请输入姓氏"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">电话</Label>
        <Input
          id="phone"
          type="tel"
          value={personalInfo.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="+86 138 0000 0000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">地址</Label>
        <Input
          id="address"
          value={personalInfo.address || ''}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="城市, 省份"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">个人网站</Label>
        <Input
          id="website"
          type="url"
          value={personalInfo.website || ''}
          onChange={(e) => handleInputChange('website', e.target.value)}
          placeholder="https://your-website.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={personalInfo.github || ''}
          onChange={(e) => handleInputChange('github', e.target.value)}
          placeholder="https://github.com/username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={personalInfo.linkedin || ''}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/username"
        />
      </div>
    </div>
  )
} 