import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICES = [
  "Фундаментные работы",
  "Возведение конструкций",
  "Кровельные работы",
  "Инженерные сети",
  "Чистовая отделка",
  "Фасадные работы",
  "Другое",
];

export default function LeadModal({ open, onClose, defaultService = "" }: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/86d9c037-b1d9-4f9a-9c03-b58d0c4064fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setPhone(""); setService(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={handleClose} />
          <motion.div
            className="relative bg-white w-full max-w-lg z-10"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            <div className="p-8 lg:p-10">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center mx-auto mb-6">
                    <Icon name="Check" size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">Заявка принята!</h3>
                  <p className="text-neutral-500 mb-8">Мы свяжемся с вами в течение 1 рабочего дня</p>
                  <button
                    onClick={handleClose}
                    className="bg-neutral-900 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <>
                  <p className="uppercase text-xs tracking-widest text-neutral-400 mb-2">Бесплатный расчёт</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-8 leading-tight">
                    Оставьте заявку —<br />мы перезвоним
                  </h3>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Ваше имя *"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Телефон *"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <select
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors text-neutral-700 bg-white"
                      >
                        <option value="">Выберите услугу</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <textarea
                        placeholder="Описание объекта (необязательно)"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={3}
                        className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm">Ошибка отправки. Попробуйте ещё раз.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-neutral-900 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors disabled:opacity-50 cursor-pointer mt-2"
                    >
                      {status === "loading" ? "Отправка..." : "Получить расчёт"}
                    </button>
                    <p className="text-xs text-neutral-400 text-center">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
