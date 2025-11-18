import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { useCoursesStore } from "../store/useCoursesStore.js"
import Sidebar from "../components/sidebar.jsx"
import Breadcrumbs from "../components/course/Breadcrumbs.jsx"
import EmptyState from "../components/course/EmptyState.jsx"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import MarkdownRenderer from "@/components/course/MarkdownRenderer.jsx"

export default function CoursesPage() {
  const {
    courses,
    selectedCourseIndex,
    selectedTopicIndex,
    selectedSubtopicIndex,
    toggleSubtopicProgress,
    isSubtopicCompleted,
    getCourseProgress,
  } = useCoursesStore()

  const course = courses[selectedCourseIndex] || null
  const topic = course?.topics?.[selectedTopicIndex] || null
  const subtopic = topic?.subtopics?.[selectedSubtopicIndex] || null

  const completed = subtopic &&
    isSubtopicCompleted(selectedCourseIndex, selectedTopicIndex, selectedSubtopicIndex)

  const handlePrevNext = (dir) => {
    if (!topic || !subtopic) return
    const current = selectedSubtopicIndex
    const total = topic.subtopics.length

    if (dir === "prev" && current > 0) {
      useCoursesStore.setState({ selectedSubtopicIndex: current - 1 })
    }
    if (dir === "next" && current < total - 1) {
      useCoursesStore.setState({ selectedSubtopicIndex: current + 1 })
    }
  }

  return (
    <main className="flex h-screen bg-background text-foreground">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumbs course={course} topic={topic} subtopic={subtopic} />

        {!course ? (
          <EmptyState title="Choose a Course" message="Pick a topic from the left sidebar." />
        ) : !topic || !subtopic ? (
          // 🎯 COURSE OVERVIEW PAGE
          <div className="space-y-10">
            <img
              src={course.coverImageUrl}
              alt={course.title}
              className="w-full h-60 object-cover rounded-xl shadow-md"
            />

            <header className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-medium">{course.title}</h1>
                <Badge>{course.difficulty}</Badge>
              </div>

              <p className="text-lg text-muted-foreground">{course.subtitle}</p>
              <p className="text-sm text-muted-foreground/80">{course.description}</p>
            </header>

            {/* Your Progress */}
            <div className="bg-muted rounded-lg p-6 shadow-sm">
              <h3 className="font-normal flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00BC7D]" />
                Your Progress
              </h3>
              <div className="flex items-center gap-3 mt-3">
                <Progress value={getCourseProgress(selectedCourseIndex).pct} className="flex-1" />
                <span className="text-sm font-semibold min-w-[50px]">
                  {getCourseProgress(selectedCourseIndex).pct}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          // 📘 SUBTOPIC PAGE (lesson content)
          <article className="rounded-lg border bg-card shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center gap-3">
              <div>
                <h2 className="text-3xl font-medium">{subtopic.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {course.title} → {topic.title}
                </p>
              </div>

              <Button
                variant={completed ? "default" : "outline"}
                className="gap-2"
                onClick={() =>
                  toggleSubtopicProgress(selectedCourseIndex, selectedTopicIndex, selectedSubtopicIndex)
                }
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 " /> Completed
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" /> Mark Complete
                  </>
                )}
                  </Button>
                 
            </div>

                <div className=' border rounded-lg px-4 py-2 bg-muted'>
                  
                <MarkdownRenderer content={subtopic.content} />
</div>
                <div>
                  {console.log(subtopic.content.split('\n'))}
                </div>

            {/* Prev / Next Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                onClick={() => handlePrevNext("prev")}
                disabled={selectedSubtopicIndex === 0}
                variant="outline"
                size="icon"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handlePrevNext("next")}
                disabled={
                  selectedSubtopicIndex === topic.subtopics.length - 1
                }
                variant="outline"
                size="icon"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </article>
        )}
      </section>
    </main>
  )
}
