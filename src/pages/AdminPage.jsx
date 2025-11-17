import data from "../data/users.json"
import courses from "../data/courses.json"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Course name finder
const getCourseName = (courseId) => {
  const index = courseId - 1
  const course = courses.courses?.[index]
  return course ? course.title : `Course ${courseId}`
}

export default function AdminPage() {
  const users = data.users || []

  const students = users.filter((u) => u.role === "student")
  const teachers = users.filter((u) => u.role === "teacher")

  return (
    <div className="space-y-6 px-4 py-6 max-w-6xl mx-auto">

      {/* STUDENTS TABLE */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>All enrolled students and course progress</CardDescription>
        </CardHeader>

        <CardContent>
          {!students.length ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              No students found
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Enrolled Courses</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {students.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    {/* Enrolled Courses */}
                    <TableCell>
                      {user.enrolledCourses?.length ? (
                        user.enrolledCourses.map((id) => (
                          <div key={id} className="text-xs ">
                            {getCourseName(id)}
                          </div>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No courses
                        </span>
                      )}
                    </TableCell>

                    {/* Progress */}
                    <TableCell>
                      {Object.keys(user.progress || {}).length > 0 ? (
                        <div className="space-y-2 min-w-[180px]">
                          {Object.entries(user.progress).map(
                            ([courseId, progress]) => (
                              <div key={courseId}>
                                <p className="text-xs font-medium">
                                  {getCourseName(Number(courseId))}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Progress value={progress * 100} className="flex-1" />
                                  <span className="text-xs font-medium w-10 text-right">
                                    {Math.round(progress * 100)}%
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* TEACHERS TABLE */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
          <CardDescription>Course instructors and authored courses</CardDescription>
        </CardHeader>

        <CardContent>
          {!teachers.length ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              No teachers found
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Authored Courses</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {teachers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    {/* Authored Courses */}
                    <TableCell>
                      {user.authoredCourses?.length ? (
                        user.authoredCourses.map((id) => (
                          <div key={id} className="text-xs text-muted-foreground">
                            {getCourseName(id)}
                          </div>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
