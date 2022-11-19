require('dotenv').config();

const { Readable } = require('stream');
const { data } = require('./courses');

(async () => {
  try {
    const adminApiGlobalPrefix = process.env.ADMIN_API_GLOBAL_PREFIX;
    const adminApiPort = process.env.ADMIN_API_PORT;
    const createCourseUrl = `http://localhost:${adminApiPort}/${adminApiGlobalPrefix}/course`;
    const createStudentUrl = `http://localhost:${adminApiPort}/${adminApiGlobalPrefix}/student`;
    const createCoursesPromises = data.map((courseRequest) =>
      fetch(createCourseUrl, {
        method: 'POST',
        body: JSON.stringify(courseRequest),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    const responses = await Promise.all(createCoursesPromises);
    const responseToJsonPromises = responses.map((response) => response.json());
    const courses = await Promise.all(responseToJsonPromises);
    const studentRequest = {
      name: 'Jhon Doe',
      courseIds: courses.map((course) => course.id),
    };
    const studentResponse = await fetch(createStudentUrl, {
      method: 'POST',
      body: JSON.stringify(studentRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (studentResponse.ok) {
      const student = await studentResponse.json();

      console.log(`
      Estudante criado com os seguintes cursos:
      - Estudante
        id: ${student.id}
        nome: ${student.name}
        - Cursos
          ${student.courses
            .map(
              (course) => `
            - id: ${course.id}
            - nome: ${course.name}

          `
            )
            .join('')}
    `);
    }
  } catch (error) {
    console.log(error);
  }
})();
