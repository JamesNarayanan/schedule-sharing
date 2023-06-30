CREATE OR REPLACE FUNCTION register_class(
		IN subject_abbrev TEXT,
		IN course_number INTEGER,
		IN course_name TEXT,
		IN crn INTEGER,
		IN semester_id INTEGER,
		IN section_name TEXT,
		IN user_id UUID
	) RETURNS VOID AS $$ #variable_conflict use_variable
DECLARE subject_id INTEGER;
course_id INTEGER;
section_id INTEGER;
BEGIN -- Get the subject ID
SELECT id INTO subject_id
FROM subjects
WHERE abbreviation = subject_abbrev;
-- Get the course ID, or insert a new course if it doesn't exist
SELECT id into course_id
FROM courses
WHERE courses.subject_id = subject_id
	AND courses.course_number = course_number;
IF NOT FOUND THEN
INSERT INTO courses (subject_id, course_number, name)
VALUES (subject_id, course_number, course_name)
RETURNING id INTO course_id;
END IF;
-- Get the section ID, or insert a new section if it doesn't exist
SELECT id INTO section_id
FROM sections
WHERE sections.crn = crn
	AND sections.semester_id = semester_id;
IF NOT FOUND THEN
INSERT INTO sections (crn, name, semester_id, course_id)
VALUES (crn, section_name, semester_id, course_id)
RETURNING id INTO section_id;
END IF;
-- Insert the user section if it doesn't exist
INSERT INTO users_sections (user_id, section_id)
VALUES (user_id, section_id) ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;