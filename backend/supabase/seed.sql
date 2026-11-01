-- Test accounts (testing only). Password for every account: Password123
INSERT INTO users (id, name, email, password_hash, role) VALUES
  ('usr_01', 'Test Student', 'student@test.edu.my', '$2b$12$OO.bYj2EfZX8fIxP9NC.NuGspA4XEKo1eq41z5KQKfbW4U7BomCBe', 'student'),
  ('usr_02', 'Test Student 2', 'student2@test.edu.my', '$2b$12$OO.bYj2EfZX8fIxP9NC.NuGspA4XEKo1eq41z5KQKfbW4U7BomCBe', 'student'),
  ('usr_03', 'Test Admin', 'admin@test.edu.my', '$2b$12$OO.bYj2EfZX8fIxP9NC.NuGspA4XEKo1eq41z5KQKfbW4U7BomCBe', 'admin')
ON CONFLICT DO NOTHING;

-- Sample appointments in each status
INSERT INTO appointments (id, student_id, preferred_date, preferred_time, purpose_category, status, processed_by, processed_at) VALUES
  ('apt_01', 'usr_01', '2026-12-01', '10:00', 'Academic', 'Pending', NULL, NULL),
  ('apt_02', 'usr_01', '2026-12-03', '14:30', 'Career', 'Pending', NULL, NULL),
  ('apt_03', 'usr_01', '2026-11-20', '09:00', 'Personal', 'Approved', 'usr_03', NOW()),
  ('apt_04', 'usr_02', '2026-11-22', '11:00', 'Other', 'Rejected', 'usr_03', NOW()),
  ('apt_05', 'usr_02', '2026-12-05', '15:00', 'Academic', 'Pending', NULL, NULL)
ON CONFLICT DO NOTHING;
