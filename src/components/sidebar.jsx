import { Search, ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { useCoursesStore } from "../store/useCoursesStore"
import { cn } from "../lib/utils"
import { useState } from "react"

export default function Sidebar() {
  const {
    filteredCourses,
    searchQuery,
    setSearchQuery,
    selectedCourseIndex,
    selectedTopicIndex,
    selectedSubtopicIndex,
    setCourseIndex,
    setTopicIndex,
    setSubtopicIndex,
    isSubtopicCompleted,
    getCourseProgress,
    getTopicProgress,
  } = useCoursesStore()

  const [expandedCourses, setExpandedCourses] = useState(new Set([0]))
  const [expandedTopics, setExpandedTopics] = useState(new Set())

  const courses = filteredCourses()
const toggleCourse = (index) => {
  setExpandedCourses((prev) => {
    const newSet = new Set(prev)
    if (newSet.has(index)) {
      newSet.delete(index)
    } else {
      newSet.clear()
      newSet.add(index)
    }
    return newSet
  })
}

const toggleTopic = (cIndex, tIndex) => {
  const key = `${cIndex}-${tIndex}`

  setExpandedTopics((prev) => {
    const newSet = new Set(prev)
    if (newSet.has(key)) {
      newSet.delete(key)
    } else {
      newSet.clear()
      newSet.add(key)
    }
    return newSet
  })
}


  return (
    <aside className="w-80 bg-[#0A0A0A] border-r border-white/5 text-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0A0A] p-4 border-b border-white/10 backdrop-blur">
        <h2 className="text-sm font-bold tracking-wide text-gray-200">
          Your Learning
        </h2>

        {/* SEARCH INPUT (added) */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-md bg-[#111] border border-white/10 py-1.5 pl-8 pr-3 text-xs text-gray-300 placeholder-gray-500 focus:ring-1 focus:ring-white/30 outline-none"
          />
        </div>
      </div>

      {/* Courses list */}
      <nav className="p-3 space-y-2">
        {courses.map((course, cIndex) => {
          const expanded = expandedCourses.has(cIndex)
          const activeCourse = cIndex === selectedCourseIndex
          const { pct } = getCourseProgress(cIndex)

          return (
            <div key={cIndex}>
              {/* Course */}
              <button
                className={cn(
                  "w-full flex items-center gap-2 p-2 rounded-md text-left text-[13px] font-medium transition-all duration-200",
                  activeCourse
                    ? "bg-[#1E1E1E] shadow-md shadow-black/30"
                    : "hover:bg-[#1A1A1A] text-gray-300"
                )}
                onClick={() => {
                  toggleCourse(cIndex)
                  setCourseIndex(cIndex)
                  setTopicIndex(null)
                  setSubtopicIndex(null)
                }}
              >
                {expanded ? (
                  <ChevronDown className="h-4 w-4 opacity-70" />
                ) : (
                  <ChevronRight className="h-4 w-4 opacity-70" />
                )}
                <span className="truncate flex-1">{course.title}</span>
                {pct > 0 && (
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    {pct}%
                  </span>
                )}
              </button>

              {/* Topics */}
              {expanded && (
                <div className="space-y-1 mt-1 ml-6 border-l border-white/5 pl-3">
                  {course.topics.map((topic, tIndex) => {
                    const expandedTopic = expandedTopics.has(`${cIndex}-${tIndex}`)
                    const activeTopic = tIndex === selectedTopicIndex
                    const { pct: tPct } = getTopicProgress(cIndex, tIndex)

                    return (
                      <div key={tIndex}>
                        <button
                          className={cn(
                            "flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-[12px] transition-all",
                            activeTopic
                              ? "bg-[#222222] text-white shadow-inner"
                              : "text-gray-300 hover:bg-[#1A1A1A]"
                          )}
                          onClick={() => {
                            toggleTopic(cIndex, tIndex)
                            setCourseIndex(cIndex)
                            setTopicIndex(tIndex)
                            setSubtopicIndex(null)
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {expandedTopic ? (
                              <ChevronDown className="h-3 w-3 opacity-50" />
                            ) : (
                              <ChevronRight className="h-3 w-3 opacity-50" />
                            )}
                            <span className="truncate">{topic.title}</span>
                          </div>
                          {tPct > 0 && (
                            <span className="text-[10px] text-emerald-400">
                              {tPct}%
                            </span>
                          )}
                        </button>

                        {/* Subtopics */}
                         {expandedTopic && (
  <div className="ml-5 mt-1 space-y-1 border-l border-white/5 pl-3">

                            {topic.subtopics.map((sub, sIndex) => {
                              const activeSub =
                                activeTopic && sIndex === selectedSubtopicIndex
                              const completed = isSubtopicCompleted(
                                cIndex,
                                tIndex,
                                sIndex
                              )

                              return (
                                <button
                                  key={sIndex}
                                  className={cn(
                                    "flex w-full justify-between items-center px-2 py-1 rounded-md text-left text-[11px] transition",
                                    activeSub
                                      ? "bg-emerald-500 text-black font-semibold"
                                      : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
                                  )}
                                  onClick={() => {
                                    setCourseIndex(cIndex)
                                    setTopicIndex(tIndex)
                                    setSubtopicIndex(sIndex)
                                  }}
                                >
                                  {sub.title}
                                  {completed ? (
                                    <CheckCircle2 className={cn("h-3 w-3", activeSub ? "text-black" : "text-emerald-400")} />
                                  ) : (
                                    <Circle className="h-3 w-3 opacity-40" />
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
