import { Project } from "@/domain/project";

export const LOCAL_PROJECTS: Project[] = [
  {
    id: "proj-01",
    slug: "rumah-cilandak",
    title: "Rumah Cilandak",
    year: 2024,
    city: "Jakarta Selatan",
    type: "rumah",
    status: "selesai",
    summaryId:
      "Hunian tropis dengan dinding kerawang terakota dan ventilasi silang bertingkat yang mereduksi panas perkotaan tanpa ketergantungan pendingin udara.",
    summaryEn:
      "A tropical residence utilizing terracotta breeze walls and multi-level cross ventilation to reduce urban heat island effect without AC reliance.",
    bodyId: `Rumah Cilandak dirancang di atas lahan berkontur seluas 380 meter persegi di Jakarta Selatan. Tantangan utama tapak perkotaan yang padat adalah menjaga privasi sekaligus memastikan aliran sirkulasi udara dan cahaya alami tetap leluasa masuk ke seluruh ruang utama.

Konsep arsitektur berpusat pada selubung ganda (*double skin facade*) menggunakan kerawang terakota buatan pengrajin lokal. Selubung ini menyaring paparan terik matahari barat, menciptakan pola bayangan dinamis di ruang keluarga sepanjang hari, dan mengalirkan hembusan angin konstan melintasi kolam refleksi di dasar rumah.

Ruang-ruang privat di lantai atas ditopang struktur beton ekspos yang kokoh, dipadukan dengan lantai kayu ulin daur ulang yang memberikan kehangatan bersahaja pada interior.`,
    bodyEn: `Rumah Cilandak is sited on a 380 sqm urban plot in South Jakarta. The core design requirement was to reconcile privacy with optimal tropical ventilation and natural illumination.

The facade employs a custom terracotta screen crafted by local artisans. Acting as a protective double-skin, it deflects severe western radiation while inducing a continuous breeze across the ground reflection pool.`,
    landAreaM2: 380,
    floorAreaM2: 290,
    mainMaterials: [
      "Dinding Kerawang Terakota",
      "Kayu Ulin Daur Ulang",
      "Beton Ekspos Bertulang",
      "Batu Andesit Alami",
    ],
    climateNotesId:
      "Ventilasi silang 2 lapis, overstek atap peneduh 2.4 meter, peredam radiasi barat via terracotta screen, dan sumur resapan tanah 8.000 liter.",
    climateNotesEn:
      "Dual-layer cross ventilation, 2.4m shading roof eaves, west-facing terracotta radiation screen, and 8,000L rainwater retention pit.",
    credits: {
      fotografer: "Kala Documentation Team",
      kontraktor: "PT Graha Rekatama Mandiri",
      struktur: "Ir. Hendra Wijaya",
    },
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,
    createdAt: "2024-03-15T08:00:00Z",
    updatedAt: "2024-03-15T08:00:00Z",
    images: [
      {
        id: "img-01-cover",
        projectId: "proj-01",
        path: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop",
        altId: "Fasad depan Rumah Cilandak dengan naungan terakota dan vegetasi tropis",
        altEn: "Front facade of Rumah Cilandak featuring terracotta screen and tropical vegetation",
        width: 2400,
        height: 1600,
        dominant: "#2D2A26",
        isCover: true,
        sortOrder: 1,
      },
      {
        id: "img-01-02",
        projectId: "proj-01",
        path: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop",
        altId: "Ruang keluarga lantai dasar dengan bukaan kaca lebar menghadap taman belakang",
        altEn: "Ground level living pavilion with floor-to-ceiling glass doors facing private garden",
        width: 2400,
        height: 1600,
        dominant: "#E3DDD2",
        isCover: false,
        sortOrder: 2,
      },
      {
        id: "img-01-03",
        projectId: "proj-01",
        path: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop",
        altId: "Detail pertemuan dinding beton ekspos dan kisi kayu ulin",
        altEn: "Architectural junction between fair-faced concrete and ironwood louvers",
        width: 2400,
        height: 1600,
        dominant: "#736E65",
        isCover: false,
        sortOrder: 3,
      },
    ],
  },
  {
    id: "proj-02",
    slug: "paviliun-ulin",
    title: "Paviliun Ulin",
    year: 2023,
    city: "Bandung",
    type: "renovasi",
    status: "selesai",
    summaryId:
      "Transformasi hunian era kolonial menjadi paviliun terbuka bertulang kayu ulin kalimantan dengan inner courtyard sebagai paru-paru rumah.",
    summaryEn:
      "Transformation of a colonial residence into a light-filled pavilion structured with salvaged ironwood and a microclimate central courtyard.",
    bodyId: `Paviliun Ulin adalah proyek revitalisasi rumah tinggal tua di kawasan Dago, Bandung. Bangunan eksisting yang tertutup dan lembap dibongkar bagian tengahnya untuk menyisipkan *inner courtyard* bervegetasi rimbun sebagai pusat pencahayaan dan sirkulasi udara mikro.

Struktur baru memanfaatkan kayu ulin bekas bantalan rel yang telah berusia puluhan tahun, mempertahankan patina alaminya yang tahan cuaca tropis tanpa perlu lapisan kimia beracun. Lantai teraso hitam dibuat di lokasi oleh pengrajin senior Bandung, memberikan pijakan sejuk yang selaras dengan suhu dataran tinggi.`,
    bodyEn: `A careful adaptive reuse in the Dago highlands of Bandung. By carving out a central courtyard from an otherwise damp colonial footprint, the home gained a microclimate lung that breathes cool mountain air throughout the living zones.`,
    landAreaM2: 520,
    floorAreaM2: 340,
    mainMaterials: [
      "Kayu Ulin Bekas Bantalan Rel",
      "Baja Profil WF Hitam",
      "Lantai Teraso Hitam Cor Lokal",
      "Kaca Rendah Emisi",
    ],
    climateNotesId:
      "Courtyard vegetasi pakis haji penurun suhu 2°C, koridor angin terlindung hujan lebat, dan lantai teraso pendingin pasif.",
    climateNotesEn:
      "Fern courtyard providing 2°C temperature drop, rain-sheltered wind corridor, and passive cooling terrazzo floor.",
    credits: {
      fotografer: "Kala Documentation Team",
      kontraktor: "Studio Tukang Bandung",
    },
    isFeatured: true,
    isPublished: true,
    sortOrder: 2,
    createdAt: "2023-11-20T08:00:00Z",
    updatedAt: "2023-11-20T08:00:00Z",
    images: [
      {
        id: "img-02-cover",
        projectId: "proj-02",
        path: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2400&auto=format&fit=crop",
        altId: "Paviliun Ulin dengan struktur kayu ulin ekspos menghadap courtyard",
        altEn: "Pavilion Ulin courtyard view displaying exposed salvaged timber beams",
        width: 2400,
        height: 1600,
        dominant: "#3E3B36",
        isCover: true,
        sortOrder: 1,
      },
      {
        id: "img-02-02",
        projectId: "proj-02",
        path: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop",
        altId: "Ruang makan semi-terbuka dengan pemandangan kanopi pohon pinus",
        altEn: "Semi-outdoor dining terrace framing surrounding pine tree forest",
        width: 2400,
        height: 1600,
        dominant: "#C9C3B6",
        isCover: false,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "proj-03",
    slug: "studio-teras-sawah",
    title: "Studio Teras Sawah",
    year: 2024,
    city: "Gianyar",
    type: "komersial",
    status: "selesai",
    summaryId:
      "Studio kerja kreatif dan bengkel seni arsitektur beratap pelana curam sirap bambu laminasi dengan pemandangan terbuka kontur sawah berundak.",
    summaryEn:
      "An architecture and craft studio crowned with a steep bamboo shingle gable roof, framing stepped rice terraces.",
    bodyId: `Berada di pinggiran lembah Gianyar, studio ini dirancang sebagai tempat berkarya yang lebur dengan lansekap agraris sekitarnya. Orientasi memanjang utara-selatan dipilih secara presisi untuk menghindari panas terik langsung matahari khatulistiwa.

Atap pelana curam terinspirasi dari arsitektur lumbung padi tradisional, dibentuk dari susunan sirap bambu laminasi yang dirawat secara organik. Kisi-kisi ventilasi di puncak atap memungkinkan udara hangat naik dan terbuang secara alami melalui prinsip efek cerobong (*stack effect*).`,
    bodyEn: `Located along a Gianyar valley ridge, this atelier was designed to breathe seamlessly with agrarian contours. A north-south linear orientation avoids harsh direct sunlight while capturing gentle valley drafts.`,
    landAreaM2: 750,
    floorAreaM2: 210,
    mainMaterials: [
      "Bambu Petung Laminasi",
      "Pondasi Batu Kali Sungai Ayung",
      "Lantai Semen Poles Tanpa Nat",
      "Partisi Rotan Anyam",
    ],
    climateNotesId:
      "Ventilasi atap efek cerobong (stack effect), zero run-off rainwater retention, dan kanopi kantilever 3 meter penahan tampias hujan monsun.",
    climateNotesEn:
      "Ridge stack ventilation, zero runoff catchment, and 3-meter cantilever eaves protecting against monsoon rains.",
    credits: {
      fotografer: "Kala Documentation Team",
      lansekap: "Tirta Flora Studio",
    },
    isFeatured: true,
    isPublished: true,
    sortOrder: 3,
    createdAt: "2024-05-10T08:00:00Z",
    updatedAt: "2024-05-10T08:00:00Z",
    images: [
      {
        id: "img-03-cover",
        projectId: "proj-03",
        path: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop",
        altId: "Atap pelana bambu Studio Teras Sawah di tengah lanskap hijau",
        altEn: "Steep bamboo shingle roofline of Studio Teras Sawah amidst verdant fields",
        width: 2400,
        height: 1600,
        dominant: "#2C342A",
        isCover: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "proj-04",
    slug: "rumah-bata-salatiga",
    title: "Rumah Bata Salatiga",
    year: 2025,
    city: "Salatiga",
    type: "rumah",
    status: "dibangun",
    summaryId:
      "Eksperimen susunan bata merah bakar lokal bertingkat dengan cantilever gantung yang memanfaatkan angin sejuk lereng Gunung Merbabu.",
    summaryEn:
      "An ongoing residential inquiry into locally fired red brick tectonic layering, elevated over cool mountain breezes.",
    bodyId: `Rumah tinggal bertingkat dua di lereng barat laut Merbabu. Proyek ini mengeksplorasi potensi bata merah lokal Salatiga yang disusun secara berongga (*cavity brickwork*) untuk menciptakan isolasi suhu alami: menahan hangat saat malam pegunungan yang dingin, dan tetap sejuk di siang hari.

Saat ini proyek berada dalam fase konstruksi struktur atas dan pemasangan pasangan bata artistik. Seluruh tahap pembangunan didokumentasikan secara transparan untuk klien.`,
    bodyEn: `A residence on the slopes of Mount Merbabu. Exploring double-leaf cavity brickwork that insulates against highland cold nights while keeping interiors airy at midday. Currently under structural completion.`,
    landAreaM2: 420,
    floorAreaM2: 310,
    mainMaterials: [
      "Bata Merah Bakar Salatiga",
      "Kayu Jati Perhutani Bersertifikat",
      "Baja Hitam Finish Matte",
      "Roster Terakota Custom",
    ],
    climateNotesId:
      "Dinding bata berongga ganda (cavity wall) penstabil fluktuasi suhu ekstrim pegunungan dan penangkap angin lembah lereng.",
    climateNotesEn:
      "Cavity brick wall stabilizing highland temperature swings and valley draft wind-catchers.",
    credits: {
      fotografer: "Kala Atelier Studio",
      kontraktor: "CV Rekatama Mandiri",
    },
    isFeatured: true,
    isPublished: true,
    sortOrder: 4,
    createdAt: "2024-08-01T08:00:00Z",
    updatedAt: "2024-10-10T08:00:00Z",
    images: [
      {
        id: "img-04-cover",
        projectId: "proj-04",
        path: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2400&auto=format&fit=crop",
        altId: "Progres pembangunan dinding bata berongga Rumah Bata Salatiga",
        altEn: "Construction progress of cavity brickwork at Rumah Bata Salatiga",
        width: 2400,
        height: 1600,
        dominant: "#693522",
        isCover: true,
        sortOrder: 1,
      },
    ],
    stages: [
      {
        id: "stage-01",
        projectId: "proj-04",
        labelId: "Sketsa Desain & Perizinan PBG",
        labelEn: "Schematic Design & Building Permit",
        progress: 100,
        stageDate: "2024-03-01",
        sortOrder: 1,
      },
      {
        id: "stage-02",
        projectId: "proj-04",
        labelId: "Pondasi & Struktur Beton Bertulang",
        labelEn: "Foundation & Reinforced Concrete Structure",
        progress: 100,
        stageDate: "2024-06-15",
        sortOrder: 2,
      },
      {
        id: "stage-03",
        projectId: "proj-04",
        labelId: "Pasangan Bata Merah & Rangka Atap",
        labelEn: "Brick Masonry & Roof Framing",
        progress: 75,
        stageDate: "2024-10-01",
        sortOrder: 3,
      },
      {
        id: "stage-04",
        projectId: "proj-04",
        labelId: "Finishing Material & Pekerjaan Kayu",
        labelEn: "Interior Finishes & Joinery",
        progress: 15,
        stageDate: "2025-01-15",
        sortOrder: 4,
      },
    ],
  },
  {
    id: "proj-05",
    slug: "kafe-daun-lebar",
    title: "Kafe Daun Lebar",
    year: 2023,
    city: "Tangerang Selatan",
    type: "komersial",
    status: "selesai",
    summaryId:
      "Restoran semi-terbuka dengan naungan kanopi bentang lebar di bawah keteduhan pohon trembesi tua yang dipertahankan.",
    summaryEn:
      "A semi-outdoor dining pavilion sheltered beneath a vast canopy, preserving existing heritage rain trees.",
    bodyId: `Alih-alih menebang pohon-pohon trembesi tua berumur 40 tahun di tapak, Kafe Daun Lebar didesain merangkul pepohonan tersebut melalui lubang-lubang kanopi melingkar (*oculus*). 

Struktur kanopi tipis dari baja tubular dipadukan dengan dinding semen ekspos dan lantai batu agregat kasar, menciptakan atmosfer keteduhan alami di tengah panas iklim penyangga ibukota.`,
    bodyEn: `Rather than clearing the site's 40-year-old rain trees, this hospitality project built around them with organic oculus canopy cutouts.`,
    landAreaM2: 890,
    floorAreaM2: 450,
    mainMaterials: [
      "Struktur Baja Tubular Hitam",
      "Beton Semen Ekspos Non-Reflektif",
      "Paving Grassblock Porous",
      "Batu Koral Hitam Bengkulu",
    ],
    climateNotesId:
      "Pelindung kanopi peneduh 100% alami dari pohon trembesi, resapan tanah 60% luas lahan, dan sirkulasi udara bebas hambatan.",
    climateNotesEn:
      "Natural shade from heritage canopy, 60% site soil permeability, and open continuous air movement.",
    credits: {
      fotografer: "Kala Documentation Team",
      kontraktor: "PT Cipta Ruang Selaras",
    },
    isFeatured: false,
    isPublished: true,
    sortOrder: 5,
    createdAt: "2023-09-12T08:00:00Z",
    updatedAt: "2023-09-12T08:00:00Z",
    images: [
      {
        id: "img-05-cover",
        projectId: "proj-05",
        path: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2400&auto=format&fit=crop",
        altId: "Suasana semi-terbuka Kafe Daun Lebar di bawah naungan pohon rimbun",
        altEn: "Semi-outdoor dining terrace of Kafe Daun Lebar under canopy trees",
        width: 2400,
        height: 1600,
        dominant: "#1B221B",
        isCover: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "proj-06",
    slug: "apartemen-senopati",
    title: "Apartemen Senopati",
    year: 2024,
    city: "Jakarta Selatan",
    type: "interior",
    status: "selesai",
    summaryId:
      "Penataan ulang interior griya tawang modern dengan partisi kisi kayu jati dan aksen batu kapur alam untuk menciptakan oase hening di pusat kota.",
    summaryEn:
      "Interior architecture of an urban penthouse featuring teak timber screens and tactile limestone surfaces.",
    bodyId: `Hunian apartemen di lantai 22 kawasan Senopati ditata ulang untuk menghadirkan ketenangan di tengah hiruk-pikuk metropolitan Jakarta. Tata ruang terbuka ditata menggunakan partisi kisi-kisi kayu jati geser yang fleksibel, menggantikan dinding masif yang kaku.

Cahaya matahari dipantulkan secara lembut oleh bidang batu kapur matte, menghindari silau pada ruang kerja dan membaca.`,
    bodyEn: `A 22nd-floor penthouse reconfigured for spatial calm. Rigid partition walls were replaced with sliding teak screens, framing diffused skyline light.`,
    floorAreaM2: 185,
    mainMaterials: [
      "Kayu Jati Solid Finishing Matte",
      "Batu Kapur Beige Lokal",
      "Kain Linen Alami Netral",
      "Besi Hitam Tempa",
    ],
    climateNotesId:
      "Pemaksimalan pantulan cahaya alami tidak langsung (indirect daylighting) yang mereduksi konsumsi listrik pencahayaan hingga 85%.",
    climateNotesEn:
      "Diffused indirect natural daylighting reducing daytime artificial illumination demand by 85%.",
    credits: {
      fotografer: "Kala Documentation Team",
      kontraktor: "Atelier Kayu Jepara",
    },
    isFeatured: false,
    isPublished: true,
    sortOrder: 6,
    createdAt: "2024-02-18T08:00:00Z",
    updatedAt: "2024-02-18T08:00:00Z",
    images: [
      {
        id: "img-06-cover",
        projectId: "proj-06",
        path: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop",
        altId: "Ruang santai Apartemen Senopati dengan kisi kayu jati dan pencahayaan lembut",
        altEn: "Living lounge of Apartemen Senopati showing teak screens and soft ambient illumination",
        width: 2400,
        height: 1600,
        dominant: "#8E7D6B",
        isCover: true,
        sortOrder: 1,
      },
    ],
  },
];

