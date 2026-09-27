import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import toast from 'react-hot-toast'
import { ErrorState, Loading } from '../components/shared'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { skillsAPI } from '../utils/apiResponse.util'

export default function SkillsPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [totalSkills, setTotalSkills] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSkills, setNewSkills] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 50 // 6 rows x 7 columns
  const totalPages = Math.ceil(skills.length / itemsPerPage)

  const fetchAllSkills = async () => {
    try {
      let allSkills: string[] = []
      let page = 1
      let hasMore = true
      const limit = 100 // Fetch 100 at a time

      while (hasMore) {
        const response = await skillsAPI.getSkills(page, limit)

        const skillsData = response.data?.skills || []
        allSkills = [...allSkills, ...skillsData]

        hasMore = response.data?.has_next || false
        page++

        // Safety limit
        if (page > 50) break
      }

      setSkills(allSkills)
      setTotalSkills(allSkills.length)
      setError('')
    } catch {
      setError('Failed to fetch skills')
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllSkills()
  }, [])

  const handleAddSkills = async (e: Event) => {
    e.preventDefault()
    if (!newSkills.trim()) {
      toast.error('Please enter at least one skill')
      return
    }

    setSubmitting(true)
    try {
      const skillsArray = newSkills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      await skillsAPI.addSkills({ skills: skillsArray })
      toast.success('Skills added successfully')
      setIsAddDialogOpen(false)
      setNewSkills('')
      // Refetch all skills
      await fetchAllSkills()
    } catch {
      toast.error('Failed to add skills')
    } finally {
      setSubmitting(false)
    }
  }

  // Note: Backend doesn't support delete skill operation
  // Skills are derived from projects, so manage them through projects

  const paginatedSkills = skills.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  if (loading) {
    return <Loading title="Loading Skills" description="Fetching your skills..." />
  }

  if (error && !skills.length) {
    return <ErrorState title="Failed to Load Skills" message={error} onRetry={fetchAllSkills} />
  }

  return (
    <div className="space-y-8">
      <header className="text-center space-y-6">
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold bg-linear-to-r from-[#f3ebdd] via-[#d9a55b] to-[#e6b56c] bg-clip-text text-transparent leading-tight">
          Skills - Manage your technical skills and competencies
        </h1>
        <p className="text-sm text-muted-foreground">Total Skills: {skills.length}</p>
        <Alert>
          <AlertDescription className="text-sm text-muted-foreground text-center">
            💡 Skills are automatically extracted from your projects. Add skills here to include
            them in your profile.
          </AlertDescription>
        </Alert>
      </header>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 border-b pb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger>
            <Button className="bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold">
              Add Skills
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Skills</DialogTitle>
              <DialogDescription>
                Enter skills separated by commas (e.g., React, TypeScript, Node.js)
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSkills} className="space-y-4">
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  value={newSkills}
                  onInput={(e) => setNewSkills((e.target as HTMLInputElement).value)}
                  placeholder="React, TypeScript, Node.js"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold"
                >
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {submitting ? 'Adding...' : 'Add Skills'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && skills.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-card rounded-xl border shadow-lg">
          <h3 className="text-3xl font-semibold">No skills yet</h3>
          <p className="text-lg text-muted-foreground max-w-md text-center">
            Get started by adding your first skill.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="inline-flex px-6 py-3 rounded-full bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] shadow-lg font-semibold"
          >
            Add Skill
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-2 min-h-80">
            {paginatedSkills.map((skill) => (
              <div
                key={skill}
                className="group relative bg-[#1e1a16] hover:bg-[#27221c] p-2 rounded border border-border hover:border-primary/50 transition-all duration-150 h-12.5 flex items-center justify-center"
              >
                <p className="text-center font-medium text-xs text-foreground line-clamp-2">
                  {skill}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4 py-3 bg-background/90 backdrop-blur-sm rounded-lg border">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                variant="outline"
                disabled={currentPage === 0}
                className="flex items-center gap-1 h-8 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>

              <span className="text-sm font-medium min-w-35 text-center">
                Page {currentPage + 1} of {totalPages} ({totalSkills})
              </span>

              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                variant="outline"
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 h-8 text-sm"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
