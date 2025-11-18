import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCoursesStore } from "../store/useCoursesStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function EditCoursePage() {
  const navigate = useNavigate()
  const { courseIndex } = useParams()
  const {
    courses,
    addCourse,
    updateCourse
  } = useCoursesStore()

  const editing = courseIndex !== undefined
  const existing = editing ? courses[courseIndex] : null

  const [form, setForm] = useState(
    existing ?? {
      title: "",
      subtitle: "",
      description: "",
      difficulty: "BEGINNER",
      topics: [],
      coverImageUrl: "",
    }
  )

  const update = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }))

  const addTopic = () =>
    setForm((f) => ({
      ...f,
      topics: [...f.topics, { title: "", subtopics: [] }],
    }))

const addSubtopic = (ti) =>
  setForm((f) => {
    const topics = [...f.topics]
    topics[ti] = {
      ...topics[ti],
      subtopics: [...topics[ti].subtopics, { title: "", content: "" }]
    }
    return { ...f, topics }
  })

  const save = () => {
    if (editing) updateCourse(Number(courseIndex), form)
    else addCourse(form)

    navigate("/admin")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="bg-[#0A0A0A] border-white/10">
        <CardHeader>
          <CardTitle className="text-white">
            {editing ? "Edit Course" : "New Course"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white">

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
          <Input
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
          />
          <Input
            placeholder="Cover Image URL"
            value={form.coverImageUrl}
            onChange={(e) => update("coverImageUrl", e.target.value)}
          />
          <textarea
            className="w-full p-2 bg-[#111] rounded-md text-sm"
            rows={3}
            placeholder="Description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />

          {/* Topics */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Topics</h3>

            {form.topics.map((topic, ti) => (
              <div key={ti} className="bg-[#111] p-3 rounded-md space-y-2">
                <Input
                  placeholder="Topic name"
                  value={topic.title}
                  onChange={(e) =>
                    setForm((f) => {
                      const topics = [...f.topics]
                      topics[ti].title = e.target.value
                      return { ...f, topics }
                    })
                  }
                />

                {/* Subtopics */}
                {topic.subtopics.map((sub, si) => (
  <div key={si} className="space-y-2 pl-2 border-l border-white/10">
    
    {/* Subtopic Title */}
    <Input
      placeholder="Subtopic title"
      value={sub.title}
      onChange={(e) =>
        setForm((f) => {
          const topics = [...f.topics]
          topics[ti].subtopics[si].title = e.target.value
          return { ...f, topics }
        })
      }
    />

    {/* Subtopic Content */}
    <textarea
      placeholder="Subtopic Markdown content..."
      rows={4}
      className="w-full p-2 bg-[#111] rounded-md text-xs text-gray-200 focus:ring-1 focus:ring-white/20 border border-white/10"
      value={sub.content}
      onChange={(e) =>
        setForm((f) => {
          const topics = [...f.topics]
          topics[ti].subtopics[si].content = e.target.value
          return { ...f, topics }
        })
      }
    />
  </div>
))}


                <Button size="sm" onClick={() => addSubtopic(ti)}>
                  + Add Subtopic
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={addTopic}>+ Add Topic</Button>

          <div className="flex gap-3 mt-4">
            <Button onClick={save} className="bg-primary text-black">
              Save Course
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin")}>
              Cancel
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
