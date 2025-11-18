import { useState } from "react"
import { useCoursesStore } from "../store/useCoursesStore"
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { cn } from "../lib/utils"

export default function Sidebar() {
  const {
    courses,
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

const toggleCourse = (index) => {
  setExpandedCourses(new Set([index])); // only open selected
};

const toggleTopic = (courseIndex, topicIndex) => {
  setExpandedTopics(new Set([`${courseIndex}-${topicIndex}`])); // only open selected
};

  return (
    <aside className="w-80 bg-[#0A0A0A] border-r border-white/5 text-white flex flex-col overflow-y-auto">
      <div className="sticky top-0 bg-[#0A0A0A] p-4 border-b border-white/10 backdrop-blur">
        <h2 className="text-sm font-bold tracking-wide text-gray-200">
          Your Learning
        </h2>
      </div>

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
  
  const state = useCoursesStore.getState()
  const realIndex = state.courses.indexOf(course)

  setCourseIndex(realIndex)
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

  const state = useCoursesStore.getState()
  const realCourseIndex = state.courses.indexOf(course)
  const realTopicIndex =
    state.courses[realCourseIndex].topics.indexOf(topic)

  setCourseIndex(realCourseIndex)
  setTopicIndex(realTopicIndex)
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
                          <div className="ml-5 mt-1 space-y-1">
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
                                    const state = useCoursesStore.getState();
                                    const realCourseIndex =
                                      state.courses.indexOf(course);
                                    const realTopicIndex =
                                      state.courses[
                                        realCourseIndex
                                      ].topics.indexOf(topic);
                                    const realSubIndex =
                                      state.courses[realCourseIndex].topics[
                                        realTopicIndex
                                      ].subtopics.indexOf(sub);

                                    setCourseIndex(realCourseIndex);
                                    setTopicIndex(realTopicIndex);
                                    setSubtopicIndex(realSubIndex);
                                  }}
                                >
                                  {sub.title}
                                  {completed ? (
                                    <CheckCircle2 className={cn("h-3 w-3", activeSub ? "text-black" : "text-emerald-400")} />
                                  ) : (
                                    <Circle className={cn("h-3 w-3", activeSub ? "text-black" : "opacity-40")} />
                                  )}
                                </button>
                              );
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
