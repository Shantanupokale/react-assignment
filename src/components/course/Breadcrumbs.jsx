function Breadcrumbs({ course, topic, subtopic }) {
  return (
    <nav
      className="mb-2 text-[11px] text-slate-500"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1">
        <li>Courses</li>
        {course && (
          <>
            <li aria-hidden="true">/</li>
            <li className="truncate max-w-40">{course.title}</li>
          </>
        )}
        {topic && (
          <>
            <li aria-hidden="true">/</li>
            <li className="truncate max-w-40">{topic.title}</li>
          </>
        )}
        {subtopic && (
          <>
            <li aria-hidden="true">/</li>
            <li className="truncate max-w-40 font-medium text-slate-700">
              {subtopic.title}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
