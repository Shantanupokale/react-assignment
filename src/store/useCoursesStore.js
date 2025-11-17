import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import rawCourses from "../data/courses.json"

// we only need the array of courses
const initialCourses = rawCourses.courses || []

function makeKey(courseIndex, topicIndex, subtopicIndex) {
  return `${courseIndex}-${topicIndex}-${subtopicIndex}`
}

export const useCoursesStore = create(
  persist(
    (set, get) => ({
      // static data from JSON
      courses: initialCourses,

      // selection (by index)
      selectedCourseIndex: 0, // default to first
      selectedTopicIndex: null,
      selectedSubtopicIndex: null,

      // progress: { "0-1-2": true }
      progress: {},

      // actions
      setCourseIndex: (courseIndex) => {
        set({
          selectedCourseIndex: courseIndex,
          selectedTopicIndex: null,
          selectedSubtopicIndex: null,
        })
      },

      setTopicIndex: (topicIndex) => {
        set({
          selectedTopicIndex: topicIndex,
          selectedSubtopicIndex: null,
        })
      },

      setSubtopicIndex: (subtopicIndex) => {
        set({ selectedSubtopicIndex: subtopicIndex })
      },

      toggleSubtopicProgress: (courseIndex, topicIndex, subtopicIndex) => {
        const key = makeKey(courseIndex, topicIndex, subtopicIndex)
        const current = get().progress[key]
        set((state) => ({
          progress: {
            ...state.progress,
            [key]: !current,
          },
        }))
      },

      isSubtopicCompleted: (courseIndex, topicIndex, subtopicIndex) => {
        const key = makeKey(courseIndex, topicIndex, subtopicIndex)
        return !!get().progress[key]
      },

      getCourseProgress: (courseIndex) => {
  const { courses, progress } = get()
  const course = courses[courseIndex]
  if (!course) return { completed: 0, total: 0, pct: 0 }

  let completed = 0
  let total = 0

  course.topics?.forEach((topic, ti) => {
    topic.subtopics?.forEach((_, si) => {
      total++
      const key = `${courseIndex}-${ti}-${si}`
      if (progress[key]) completed++
    })
  })

  const pct = total ? Math.round((completed / total) * 100) : 0
  return { completed, total, pct }
},

getTopicProgress: (courseIndex, topicIndex) => {
  const { courses, progress } = get()
  const topic = courses[courseIndex]?.topics?.[topicIndex]
  if (!topic) return { completed: 0, total: 0, pct: 0 }

  const total = topic.subtopics.length
  let completed = topic.subtopics.filter((_, si) =>
    progress[`${courseIndex}-${topicIndex}-${si}`]
  ).length

  const pct = total ? Math.round((completed / total) * 100) : 0
  return { completed, total, pct }
},

    }),
    {
      name: "course-progress-storage",
      storage: createJSONStorage(() => window.localStorage),
      // only persist selection + progress, not full JSON
      partialize: (state) => ({
        selectedCourseIndex: state.selectedCourseIndex,
        selectedTopicIndex: state.selectedTopicIndex,
        selectedSubtopicIndex: state.selectedSubtopicIndex,
        progress: state.progress,
      }),
    }
  )
)
