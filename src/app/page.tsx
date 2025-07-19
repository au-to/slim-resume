import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, FileText, Download, Share2, Palette, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Slim Resume</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/templates" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              模板
            </Link>
            <Link href="/examples" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              示例
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              定价
            </Link>
            <Button asChild variant="outline">
              <Link href="/auth/signin">登录</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">开始制作</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          ✨ 全新在线简历制作平台
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          制作专业简历
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            只需几分钟
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          使用我们的智能简历编辑器，轻松创建令人印象深刻的专业简历。支持多种精美模板、实时预览、一键导出PDF，让您在求职路上脱颖而出。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="text-lg px-8 py-3">
            <Link href="/editor">
              开始制作简历
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
            <Link href="/templates">
              浏览模板
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            为什么选择 Slim Resume？
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            我们提供最专业的简历制作工具，帮助您快速创建出色的简历
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>精美模板</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                提供多种专业设计的简历模板，适合不同行业和职位需求，让您的简历更加出色
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>智能编辑</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                使用先进的编辑器技术，支持实时预览、智能格式化，让简历编辑变得简单高效
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>一键导出</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                支持高质量PDF导出，确保简历在任何设备和平台上都能完美显示
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>便捷分享</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                生成专属分享链接，方便向招聘方展示您的简历，提升求职效率
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle>安全可靠</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                采用企业级安全标准，保护您的个人信息和简历内容安全
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle>多种格式</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                支持多种简历格式和版式，满足不同求职场景的需求
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-gray-950 border-t">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            准备开始制作您的专业简历吗？
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            加入数千名用户，使用 Slim Resume 创建令人印象深刻的简历
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-3">
            <Link href="/editor">
              立即开始
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">Slim Resume</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
                隐私政策
              </Link>
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">
                服务条款
              </Link>
              <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white">
                联系我们
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 Slim Resume. 保留所有权利。
          </div>
        </div>
      </footer>
    </div>
  )
} 