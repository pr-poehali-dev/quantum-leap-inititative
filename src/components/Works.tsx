import { useEffect, useState } from "react";

const GET_WORKS_URL = "https://functions.poehali.dev/741c39b2-d24b-4d83-880c-cc9ad3c85115";

interface Work {
  id: number;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
}

export default function Works() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    fetch(GET_WORKS_URL)
      .then((r) => r.json())
      .then((data) => setWorks(data.works || []))
      .catch(() => {});
  }, []);

  if (works.length === 0) return null;

  return (
    <section id="projects" className="bg-neutral-950 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">Портфолио</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 uppercase">Наши работы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work) => (
            <div key={work.id} className="group relative overflow-hidden aspect-[4/3] bg-neutral-800">
              <img
                src={work.image_url}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-lg uppercase tracking-wide">{work.title}</h3>
                {work.description && <p className="text-neutral-300 text-sm mt-1">{work.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
