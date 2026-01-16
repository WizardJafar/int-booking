import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function BookingLinkForm() {
  const [projectLink, setProjectLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔥 Берём MongoDB _id
  const bookingID = useSelector(
    (state) => state.auth.user?._id
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingID) {
      setMessage({
        type: "error",
        text: "ID пользователя не найден",
      });
      return;
    }

    if (!projectLink.trim()) {
      setMessage({
        type: "error",
        text: "Введите ссылку",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      await axios.post(
        `http://localhost:8000/api/booking/add-link/${bookingID}`,
        {
          projectLink: projectLink.trim(),
        }
      );

      setMessage({
        type: "success",
        text: "Ссылка успешно сохранена",
      });

      setProjectLink("");
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Ошибка сервера",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 flex bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex-col gap-6 justify-center items-center">
      <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-2 border-primary/20 p-6 sm:p-8 max-w-md w-full backdrop-blur-sm">
        {/* Заголовок */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 mb-6 border border-primary/30 flex items-center gap-3 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h2 className="text-2xl font-bold text-primary">
            Project Link
          </h2>
        </div>

        {/* Поле ввода */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text font-bold text-primary flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              URL адрес проекта
            </span>
          </label>
          <input
            type="url"
            placeholder="https://example.com"
            className="input input-bordered w-full bg-base-200/50 border-primary/10 hover:border-primary/30 focus:border-primary transition-all"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
        </div>

        {/* Сообщение */}
        {message && (
          <div className="mb-4">
            {message.type === "success" ? (
              <div className="alert alert-success shadow-xl border-2 border-success/30 bg-gradient-to-r from-success/20 to-success/10 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">{message.text}</span>
              </div>
            ) : (
              <div className="alert alert-error shadow-xl border-2 border-error/30 bg-gradient-to-r from-error/20 to-error/10 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">{message.text}</span>
              </div>
            )}
          </div>
        )}

        {/* Разделитель */}
        <div className="divider divider-primary"></div>

        {/* Кнопка */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              <span className="font-bold">Сохранение...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold">Сохранить</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
