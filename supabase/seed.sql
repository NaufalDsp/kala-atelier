-- Seed Data for Kala Atelier
-- Studio: Kala Atelier
-- Run this in Supabase SQL Editor to populate initial data

-- 1. ADMIN ALLOWLIST
insert into admins (email) values
  ('halo@kalaatelier.com')
on conflict (email) do nothing;

-- 2. SITE SETTINGS
insert into site_settings (id, email, phone, whatsapp, address, opening_hours, enquiry_note_id, enquiry_note_en, instagram)
values (
  1,
  'halo@kalaatelier.com',
  '+62 812 3456 7890',
  '+6281234567890',
  'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
  '{"mon":["08:30","17:00"],"tue":["08:30","17:00"],"wed":["08:30","17:00"],"thu":["08:30","17:00"],"fri":["08:30","17:00"],"sat":["09:00","14:00"],"sun":null}',
  'Kami membatasi penerimaan maksimal 3 proyek baru per semester demi menjaga kualitas desain.',
  'We limit onboarding to a maximum of 3 new commissions per semester to ensure rigorous design quality.',
  'https://instagram.com/kalaatelier'
)
on conflict (id) do nothing;

-- 3. PROYEK 1: RUMAH CILANDAK
insert into projects (id, slug, title, year, city, type, status, summary_id, summary_en, body_id, body_en, land_area_m2, floor_area_m2, main_materials, climate_notes_id, climate_notes_en, credits, is_featured, is_published, sort_order)
values (
  'e1a0b3c4-0001-4000-8000-000000000001',
  'rumah-cilandak',
  'Rumah Cilandak',
  2024,
  'Jakarta Selatan',
  'rumah',
  'selesai',
  'Hunian tropis dengan dinding kerawang terakota dan ventilasi silang bertingkat yang mereduksi panas perkotaan tanpa ketergantungan pendingin udara.',
  'A tropical residence utilizing terracotta breeze walls and multi-level cross ventilation to reduce urban heat island effect without AC reliance.',
  'Rumah Cilandak dirancang di atas lahan berkontur seluas 380 meter persegi di Jakarta Selatan. Tantangan utama tapak perkotaan yang padat adalah menjaga privasi sekaligus memastikan aliran sirkulasi udara dan cahaya alami tetap leluasa masuk ke seluruh ruang utama.

Konsep arsitektur berpusat pada selubung ganda menggunakan kerawang terakota buatan pengrajin lokal. Selubung ini menyaring paparan terik matahari barat, menciptakan pola bayangan dinamis di ruang keluarga sepanjang hari, dan mengalirkan hembusan angin konstan melintasi kolam refleksi di dasar rumah.',
  'Rumah Cilandak is sited on a 380 sqm urban plot in South Jakarta. The core design requirement was to reconcile privacy with optimal tropical ventilation and natural illumination.',
  380,
  290,
  array['Dinding Kerawang Terakota', 'Kayu Ulin Daur Ulang', 'Beton Ekspos Bertulang', 'Batu Andesit Alami'],
  'Ventilasi silang 2 lapis, overstek atap peneduh 2.4 meter, peredam radiasi barat via terracotta screen, dan sumur resapan tanah 8.000 liter.',
  'Dual-layer cross ventilation, 2.4m shading roof eaves, west-facing terracotta radiation screen, and 8,000L rainwater retention pit.',
  '{"fotografer": "Kala Documentation Team", "kontraktor": "PT Graha Rekatama Mandiri", "struktur": "Ir. Hendra Wijaya"}',
  true,
  true,
  1
) on conflict (slug) do nothing;

insert into project_images (project_id, path, alt_id, alt_en, width, height, dominant, is_cover, sort_order)
values
  ('e1a0b3c4-0001-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop', 'Fasad depan Rumah Cilandak dengan naungan terakota dan vegetasi tropis', 'Front facade of Rumah Cilandak', 2400, 1600, '#2D2A26', true, 1),
  ('e1a0b3c4-0001-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop', 'Ruang keluarga lantai dasar dengan bukaan kaca lebar menghadap taman belakang', 'Ground level living pavilion', 2400, 1600, '#E3DDD2', false, 2)
on conflict do nothing;

-- 4. PROYEK 2: PAVILIUN ULIN
insert into projects (id, slug, title, year, city, type, status, summary_id, summary_en, body_id, body_en, land_area_m2, floor_area_m2, main_materials, climate_notes_id, climate_notes_en, credits, is_featured, is_published, sort_order)
values (
  'e1a0b3c4-0002-4000-8000-000000000002',
  'paviliun-ulin',
  'Paviliun Ulin',
  2023,
  'Bandung',
  'renovasi',
  'selesai',
  'Transformasi hunian era kolonial menjadi paviliun terbuka bertulang kayu ulin kalimantan dengan inner courtyard sebagai paru-paru rumah.',
  'Transformation of a colonial residence into a light-filled pavilion structured with salvaged ironwood and a microclimate central courtyard.',
  'Paviliun Ulin adalah proyek revitalisasi rumah tinggal tua di kawasan Dago, Bandung. Bangunan eksisting yang tertutup dan lembap dibongkar bagian tengahnya untuk menyisipkan inner courtyard bervegetasi rimbun sebagai pusat pencahayaan dan sirkulasi udara mikro.',
  'A careful adaptive reuse in the Dago highlands of Bandung.',
  520,
  340,
  array['Kayu Ulin Bekas Bantalan Rel', 'Baja Profil WF Hitam', 'Lantai Teraso Hitam Cor Lokal', 'Kaca Rendah Emisi'],
  'Courtyard vegetasi pakis haji penurun suhu 2°C, koridor angin terlindung hujan lebat, dan lantai teraso pendingin pasif.',
  'Fern courtyard providing 2°C temperature drop, rain-sheltered wind corridor, and passive cooling terrazzo floor.',
  '{"fotografer": "Kala Documentation Team", "kontraktor": "Studio Tukang Bandung"}',
  true,
  true,
  2
) on conflict (slug) do nothing;

insert into project_images (project_id, path, alt_id, alt_en, width, height, dominant, is_cover, sort_order)
values
  ('e1a0b3c4-0002-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2400&auto=format&fit=crop', 'Paviliun Ulin dengan struktur kayu ulin ekspos menghadap courtyard', 'Pavilion Ulin courtyard view', 2400, 1600, '#3E3B36', true, 1)
on conflict do nothing;

-- 5. PROYEK 4: RUMAH BATA SALATIGA (DIBANGUN)
insert into projects (id, slug, title, year, city, type, status, summary_id, summary_en, body_id, body_en, land_area_m2, floor_area_m2, main_materials, climate_notes_id, climate_notes_en, credits, is_featured, is_published, sort_order)
values (
  'e1a0b3c4-0004-4000-8000-000000000004',
  'rumah-bata-salatiga',
  'Rumah Bata Salatiga',
  2025,
  'Salatiga',
  'rumah',
  'dibangun',
  'Eksperimen susunan bata merah bakar lokal bertingkat dengan cantilever gantung yang memanfaatkan angin sejuk lereng Gunung Merbabu.',
  'An ongoing residential inquiry into locally fired red brick tectonic layering, elevated over cool mountain breezes.',
  'Rumah tinggal bertingkat dua di lereng barat laut Merbabu. Proyek ini mengeksplorasi potensi bata merah lokal Salatiga yang disusun secara berongga untuk menciptakan isolasi suhu alami.',
  'A residence on the slopes of Mount Merbabu.',
  420,
  310,
  array['Bata Merah Bakar Salatiga', 'Kayu Jati Perhutani Bersertifikat', 'Baja Hitam Finish Matte', 'Roster Terakota Custom'],
  'Dinding bata berongga ganda penstabil fluktuasi suhu ekstrim pegunungan dan penangkap angin lembah lereng.',
  'Cavity brick wall stabilizing highland temperature swings and valley draft wind-catchers.',
  '{"fotografer": "Kala Atelier Studio", "kontraktor": "CV Rekatama Mandiri"}',
  true,
  true,
  4
) on conflict (slug) do nothing;

insert into project_images (project_id, path, alt_id, alt_en, width, height, dominant, is_cover, sort_order)
values
  ('e1a0b3c4-0004-4000-8000-000000000004', 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2400&auto=format&fit=crop', 'Progres pembangunan dinding bata berongga Rumah Bata Salatiga', 'Construction progress of cavity brickwork', 2400, 1600, '#693522', true, 1)
on conflict do nothing;

insert into project_stages (project_id, label_id, label_en, progress, stage_date, sort_order)
values
  ('e1a0b3c4-0004-4000-8000-000000000004', 'Sketsa Desain & Perizinan PBG', 'Schematic Design & Building Permit', 100, '2024-03-01', 1),
  ('e1a0b3c4-0004-4000-8000-000000000004', 'Pondasi & Struktur Beton Bertulang', 'Foundation & Reinforced Concrete Structure', 100, '2024-06-15', 2),
  ('e1a0b3c4-0004-4000-8000-000000000004', 'Pasangan Bata Merah & Rangka Atap', 'Brick Masonry & Roof Framing', 75, '2024-10-01', 3),
  ('e1a0b3c4-0004-4000-8000-000000000004', 'Finishing Material & Pekerjaan Kayu', 'Interior Finishes & Joinery', 15, '2025-01-15', 4)
on conflict do nothing;

-- 6. TESTIMONIALS
insert into testimonials (id, quote_id, quote_en, author, author_note, is_published, sort_order)
values (
  'f1a0b3c4-0001-4000-8000-000000000001',
  'Kala Atelier memahami bagaimana angin dan bayangan bekerja di iklim Jakarta. Rumah kami tetap sejuk sepanjang siang tanpa menyalakan AC di ruang tengah.',
  'Kala Atelier understands how air and shade work in Jakarta tropical climate.',
  'Bambang & Dian Suwandi',
  'Pemilik Rumah Cilandak',
  true,
  1
) on conflict (id) do nothing;

-- 7. TEAM MEMBERS
insert into team_members (id, name, role_id, role_en, photo_path, bio_id, bio_en, sort_order)
values
  ('a1a0b3c4-0001-4000-8000-000000000001', 'Rian Pramudya, IAI', 'Prinsipal Arsitek', 'Principal Architect', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', 'Lulusan Arsitektur ITB dengan pengalaman lebih dari 12 tahun dalam eksplorasi tektonika arsitektur tropis modern.', 'ITB Architecture graduate with over 12 years investigating modern tropical tectonics.', 1),
  ('a1a0b3c4-0002-4000-8000-000000000002', 'Tara Mahadewi, HDII', 'Kepala Desain Interior', 'Lead Interior Architect', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', 'Berfokus pada interaksi material taktil, proporsi ruang, dan pencahayaan alami tak langsung.', 'Specializes in tactile material palettes and spatial proportions.', 2)
on conflict (id) do nothing;

