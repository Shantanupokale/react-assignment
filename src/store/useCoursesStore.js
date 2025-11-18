import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import rawCourses from "../data/courses.json";

const initialCourses = rawCourses.courses || [];

function makeKey(courseIndex, topicIndex, subtopicIndex) {
  return `${courseIndex}-${topicIndex}-${subtopicIndex}`;
}

export const useCoursesStore = create(
  persist(
    (set, get) => ({
      courses: initialCourses,

      selectedCourseIndex: 0,
      selectedTopicIndex: null,
      selectedSubtopicIndex: null,

      progress: {},

      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      filteredCourses: () => {
        const q = get().searchQuery.toLowerCase();
        const courses = get().courses;

        if (!q) return courses;

        return courses
          .map((course) => {
            const courseMatch = course.title.toLowerCase().includes(q);

            const filteredTopics = course.topics.filter((topic) =>
              topic.title.toLowerCase().includes(q)
            );

            return {
              ...course,
              topics:
                courseMatch || filteredTopics.length > 0
                  ? filteredTopics.length > 0
                    ? filteredTopics
                    : course.topics
                  : [],
            };
          })
          .filter(
            (course) =>
              course.title.toLowerCase().includes(q) || course.topics.length > 0
          );
      },

      importCourses: (newCourses) => {
        set({ courses: newCourses })
      },

      // NEW: Reset only courses back to defaults JSON
      resetCoursesOnly: () => {
        set({ courses: initialCourses })
      },

      
      setCourseIndex: (courseIndex) =>
        set({
          selectedCourseIndex: courseIndex,
          selectedTopicIndex: null,
          selectedSubtopicIndex: null,
        }),

      setTopicIndex: (topicIndex) =>
        set({
          selectedTopicIndex: topicIndex,
          selectedSubtopicIndex: null,
        }),

      setSubtopicIndex: (subtopicIndex) =>
        set({ selectedSubtopicIndex: subtopicIndex }),

      toggleSubtopicProgress: (courseIndex, topicIndex, subtopicIndex) => {
        const key = makeKey(courseIndex, topicIndex, subtopicIndex);
        const current = get().progress[key];
        set((state) => ({
          progress: { ...state.progress, [key]: !current },
        }));
      },

      isSubtopicCompleted: (courseIndex, topicIndex, subtopicIndex) => {
        const key = makeKey(courseIndex, topicIndex, subtopicIndex);
        return !!get().progress[key];
      },

      getCourseProgress: (courseIndex) => {
        const { courses, progress } = get();
        const course = courses[courseIndex];
        if (!course) return { completed: 0, total: 0, pct: 0 };

        let completed = 0;
        let total = 0;

        course.topics.forEach((topic, ti) => {
          topic.subtopics.forEach((_, si) => {
            total++;
            if (progress[makeKey(courseIndex, ti, si)]) completed++;
          });
        });

        const pct = total ? Math.round((completed / total) * 100) : 0;
        return { completed, total, pct };
      },

      getTopicProgress: (courseIndex, topicIndex) => {
        const { courses, progress } = get();
        const topic = courses[courseIndex]?.topics?.[topicIndex];
        if (!topic) return { completed: 0, total: 0, pct: 0 };

        const total = topic.subtopics.length;
        const completed = topic.subtopics.filter(
          (_, si) => progress[makeKey(courseIndex, topicIndex, si)]
        ).length;

        const pct = total ? Math.round((completed / total) * 100) : 0;
        return { completed, total, pct };
      },

      addCourse: (course) =>
        set((state) => ({
          courses: [...state.courses, course],
        })),

      updateCourse: (index, updatedCourse) =>
        set((state) => {
          const courses = [...state.courses];
          courses[index] = updatedCourse;
          return { courses };
        }),

      removeCourse: (index) =>
        set((state) => ({
          courses: state.courses.filter((_, i) => i !== index),
        })),

      resetToDefaults: () => {
        localStorage.removeItem("course-progress-storage");
        window.location.reload();
      },
    }),
    {
      name: "course-progress-storage",
      storage: createJSONStorage(() => window.localStorage),
     partialize: (state) => ({
        // persist newCourses too
        courses: state.courses,
        selectedCourseIndex: state.selectedCourseIndex,
        selectedTopicIndex: state.selectedTopicIndex,
        selectedSubtopicIndex: state.selectedSubtopicIndex,
        progress: state.progress,
        searchQuery: state.searchQuery,
      }),

    }
  )
);
