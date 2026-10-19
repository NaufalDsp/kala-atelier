import { Testimonial } from "@/domain/testimonial";

export const LOCAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-01",
    projectId: "proj-01",
    projectSlug: "rumah-cilandak",
    projectTitle: "Rumah Cilandak",
    quoteId:
      "Kala Atelier memahami bagaimana angin dan bayangan bekerja di iklim Jakarta. Rumah kami tetap sejuk sepanjang siang tanpa menyalakan AC di ruang tengah.",
    quoteEn:
      "Kala Atelier understands how air and shade work in Jakarta's tropical climate. Our living space stays naturally temperate all day.",
    author: "Bambang & Dian Suwandi",
    authorNote: "Pemilik Rumah Cilandak",
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: "testi-02",
    projectId: "proj-02",
    projectSlug: "paviliun-ulin",
    projectTitle: "Paviliun Ulin",
    quoteId:
      "Proses renovasi sangat jujur terhadap material lama. Kayu ulin tua diselamatkan dan kini menjadi pusat karakter ruang keluarga kami.",
    quoteEn:
      "The adaptive renovation honored the original materials. The old salvaged timber is now the soul of our home.",
    author: "Arif Wicaksono",
    authorNote: "Pemilik Paviliun Ulin, Bandung",
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: "testi-03",
    projectId: "proj-03",
    projectSlug: "studio-teras-sawah",
    projectTitle: "Studio Teras Sawah",
    quoteId:
      "Struktur bambunya presisi dan menyatu harmonis dengan bentang alam Gianyar. Ruang kerja terbaik yang pernah kami miliki.",
    quoteEn:
      "The bamboo structure is engineered with precision, flowing in harmony with Gianyar's agrarian landscape.",
    author: "Sarah Jenkins & Wayan Sudarta",
    authorNote: "Pendiri Studio Teras Sawah, Bali",
    isPublished: true,
    sortOrder: 3,
  },
];

