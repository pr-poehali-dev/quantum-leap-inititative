import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_WORKS_URL = "https://functions.poehali.dev/018d7a8c-28b9-4529-9370-7bc1bd3effdd";

interface Work {
  id: number;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", sort_order: "0" });
  const fileRef = useRef<HTMLInputElement>(null);

  const login = async () => {
    setError("");
    setLoading(true);
    const res = await fetch(ADMIN_WORKS_URL, { headers: { "X-Admin-Token": password } });
    if (res.ok) {
      setToken(password);
      const data = await res.json();
      setWorks(data.works);
    } else {
      setError("Неверный пароль");
    }
    setLoading(false);
  };

  const loadWorks = async (t: string) => {
    const res = await fetch(ADMIN_WORKS_URL, { headers: { "X-Admin-Token": t } });
    const data = await res.json();
    setWorks(data.works);
  };

  const deleteWork = async (id: number) => {
    if (!confirm("Удалить фото?")) return;
    await fetch(ADMIN_WORKS_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: JSON.stringify({ id }),
    });
    await loadWorks(token);
  };

  const uploadWork = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return setError("Выберите фото");
    if (!form.title) return setError("Введите название");
    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop() || "jpg";
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.readAsDataURL(file);
    });

    const res = await fetch(ADMIN_WORKS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        sort_order: parseInt(form.sort_order) || 0,
        image_data: base64,
        image_ext: ext,
      }),
    });

    if (res.ok) {
      setForm({ title: "", description: "", sort_order: "0" });
      if (fileRef.current) fileRef.current.value = "";
      await loadWorks(token);
    } else {
      setError("Ошибка загрузки");
    }
    setUploading(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="bg-neutral-900 border border-neutral-800 p-8 w-full max-w-sm">
          <h1 className="text-white text-2xl font-bold uppercase mb-6">Вход в админку</h1>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 mb-4 outline-none focus:border-white"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-white text-black py-3 uppercase tracking-widest text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-white text-3xl font-bold uppercase">Наши работы — Управление</h1>
          <a href="/" className="text-neutral-400 hover:text-white text-sm transition-colors">← На сайт</a>
        </div>

        {/* Форма добавления */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 mb-10">
          <h2 className="text-white text-lg font-semibold uppercase mb-4">Добавить фото</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Название (обязательно)"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 outline-none focus:border-white"
            />
            <input
              type="text"
              placeholder="Описание"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 outline-none focus:border-white"
            />
            <input
              type="number"
              placeholder="Порядок (0 = первое)"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 outline-none focus:border-white"
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="bg-neutral-800 border border-neutral-700 text-neutral-300 px-4 py-3 file:bg-neutral-700 file:text-white file:border-0 file:mr-4 file:px-3 file:py-1 cursor-pointer"
            />
          </div>
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={uploadWork}
            disabled={uploading}
            className="bg-white text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {uploading ? "Загружаю..." : "Добавить"}
          </button>
        </div>

        {/* Список работ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work) => (
            <div key={work.id} className="bg-neutral-900 border border-neutral-800 overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img src={work.image_url} alt={work.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold">{work.title}</h3>
                {work.description && <p className="text-neutral-400 text-sm mt-1">{work.description}</p>}
                <p className="text-neutral-600 text-xs mt-1">Порядок: {work.sort_order}</p>
                <button
                  onClick={() => deleteWork(work.id)}
                  className="mt-3 flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors cursor-pointer"
                >
                  <Icon name="Trash2" size={14} />
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {works.length === 0 && (
          <p className="text-neutral-500 text-center py-20">Нет ни одной работы. Добавьте первое фото.</p>
        )}
      </div>
    </div>
  );
}
