const works = [
  {
    id: 1,
    title: "Жилой дом",
    description: "Кладка кирпичных стен, монтаж перекрытий",
    src: "https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/87c24507-5eec-4f71-b157-859553aa608e.jpg",
  },
  {
    id: 2,
    title: "Фундаментные работы",
    description: "Армирование и заливка монолитного фундамента",
    src: "https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/c77b5519-ee10-45e6-b9e0-02f8c1a2138b.jpg",
  },
  {
    id: 3,
    title: "Финишная отделка",
    description: "Штукатурка, выравнивание стен и потолков",
    src: "https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/6ba7cb0c-c1bc-46e2-8c0c-0295ab7ab1c5.jpg",
  },
  {
    id: 4,
    title: "Коммерческий объект",
    description: "Многоэтажное здание под ключ",
    src: "https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/2b2f4d22-2c1a-415a-a79e-e40774939d64.jpg",
  },
  {
    id: 5,
    title: "Кровельные работы",
    description: "Монтаж кровли и водосточной системы",
    src: "https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/472c26e4-d82b-4611-bd8f-c7a3bd1e1015.jpg",
  },
  {
    id: 6,
    title: "Готовый объект",
    description: "Сдача дома под ключ с благоустройством",
    src: "https://cdn.poehali.dev/projects/7ee54374-8ebc-4619-af96-0e4b7e7ad11c/files/29c3ab08-31aa-4d94-aac1-7b688006af31.jpg",
  },
];

export default function Works() {
  return (
    <section id="projects" className="bg-neutral-950 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">Портфолио</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 uppercase">Наши работы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work) => (
            <div key={work.id} className="group relative overflow-hidden aspect-[4/3] bg-neutral-800">
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-lg uppercase tracking-wide">{work.title}</h3>
                <p className="text-neutral-300 text-sm mt-1">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
