import data from "../data/users.json";
import courses from "../data/courses.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useCoursesStore } from "@/store/useCoursesStore";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";

// Course name finder
const getCourseName = (courseId) => {
  const index = courseId - 1;
  const course = courses.courses?.[index];
  return course ? course.title : `Course ${courseId}`;
};

export default function AdminPage() {
  const users = data.users || [];
  const students = users.filter((u) => u.role === "student");
  const teachers = users.filter((u) => u.role === "teacher");
  const navigate = useNavigate();
  const { courses, resetToDefaults, importCourses } = useCoursesStore(); // Make sure importCourses is imported from store

  return (
    <div className="space-y-6 px-4 py-6 max-w-6xl mx-auto">
      {/* STUDENTS TABLE */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            All enrolled students and course progress
          </CardDescription>
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
                                  <Progress
                                    value={progress * 100}
                                    className="flex-1"
                                  />
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
          <CardDescription>
            Course instructors and authored courses
          </CardDescription>
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
                          <div
                            key={id}
                            className="text-xs text-muted-foreground"
                          >
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

      <div className="border rounded-xl p-6 bg-muted/20 border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Manage Courses</h2>
        </div>

        <div className="space-y-3">
          {courses.map((course, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-3 py-2 bg-muted/40 rounded-md border border-white/10"
            >
              <span className="text-sm text-gray-300">{course.title}</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/admin/edit/${i}`)}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="default" onClick={() => navigate("/admin/new")}>
            Add Course
          </Button>
          <Button variant="destructive" onClick={resetToDefaults}>
            Reset Data
          </Button>

          {/* 📤 Export */}
          <Button
            variant="secondary"
            onClick={() => {
              const blob = new Blob([JSON.stringify(courses, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "courses-export.json";
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>

          {/* 📥 Import */}
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const parsed = JSON.parse(reader.result);
                    if (Array.isArray(parsed)) {
                      importCourses(parsed); // This should now work
                      alert("Courses imported successfully!");
                    } else {
                      alert("Invalid format! Expected an array of courses.");
                    }
                  } catch {
                    alert("Invalid JSON file!");
                  }
                };
                reader.readAsText(file);
              }}
            />
            <Button variant="secondary" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Import JSON
              </span>
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
}
