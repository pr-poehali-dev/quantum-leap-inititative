const services = [
  {
    number: "01",
    title: "Фундаментные работы",
    description: "Ленточные, свайные, плитные фундаменты. Геологическое исследование грунта, расчёт нагрузок, гидроизоляция.",
    items: ["Ленточный фундамент", "Свайно-ростверковый", "Монолитная плита", "Гидроизоляция"],
  },
  {
    number: "02",
    title: "Возведение конструкций",
    description: "Кирпичная кладка, монолитное строительство, каркасные конструкции. Работаем с любыми материалами.",
    items: ["Кирпичная кладка", "Монолит", "Газоблок / пеноблок", "Металлоконструкции"],
  },
  {
    number: "03",
    title: "Кровельные работы",
    description: "Монтаж любых типов кровли под ключ — от проектирования до финишного покрытия с гарантией герметичности.",
    items: ["Двускатная кровля", "Плоская кровля", "Мансардная", "Утепление и гидроизоляция"],
  },
  {
    number: "04",
    title: "Инженерные сети",
    description: "Проектирование и монтаж инженерных систем: водоснабжение, канализация, электрика, отопление.",
    items: ["Водоснабжение и канализация", "Электроснабжение", "Отопление", "Вентиляция"],
  },
  {
    number: "05",
    title: "Чистовая отделка",
    description: "Полная внутренняя отделка помещений под ключ. Любые материалы, любая сложность планировки.",
    items: ["Штукатурка и шпаклёвка", "Укладка плитки", "Монтаж напольных покрытий", "Покраска и обои"],
  },
  {
    number: "06",
    title: "Фасадные работы",
    description: "Утепление и облицовка фасадов, монтаж навесных вентилируемых фасадов, декоративная штукатурка.",
    items: ["Мокрый фасад", "Вентфасад", "Декоративная штукатурка", "Утепление"],
  },
];

export default function Services() {
  return (
    <div id="about" className="bg-neutral-50 px-6 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="uppercase text-sm tracking-widest text-neutral-500 mb-3">Что мы делаем</p>
            <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              Полный спектр<br />строительных работ
            </h2>
          </div>
          <p className="text-neutral-500 max-w-sm lg:text-right text-sm lg:text-base">
            Берёмся за объект на любом этапе — ведём до полной сдачи по договору с фиксированной ценой
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
          {services.map((service) => (
            <div
              key={service.number}
              className="bg-white p-8 lg:p-10 flex flex-col gap-6 group hover:bg-neutral-900 transition-colors duration-500"
            >
              <div className="flex items-start justify-between">
                <span className="text-neutral-300 text-sm font-mono group-hover:text-neutral-600 transition-colors duration-500">
                  {service.number}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors duration-500">
                  {service.description}
                </p>
              </div>
              <ul className="mt-auto flex flex-col gap-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs text-neutral-400 uppercase tracking-wide border-t border-neutral-100 pt-2 group-hover:border-neutral-800 group-hover:text-neutral-500 transition-colors duration-500"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-neutral-900 text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors duration-300 cursor-pointer">
            Рассчитать стоимость
          </button>
        </div>
      </div>
    </div>
  );
}
