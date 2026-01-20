import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import BackgroundLogos from "../../Components/RegisterComponents/BackgroundLogos";
import TextType from "../../Components/ReactBits/TextType";

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [mentors, setMentors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    mentor: "",
    branch: "",
    grade: "",
    date: "",
    yearsOfStudy: "",
    direction: "backend",
    tellegrammUsername: "",
    phone: "",
    aboutYourself: "",
    whatYouKnow: "",
    userId: "",
  });

  /* -------------------- API BASE -------------------- */
  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:8000/api"
      : "https://int-server-1.onrender.com/api";

  /* -------------------- LOAD MENTORS & BRANCHES -------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [mentorsRes, branchesRes] = await Promise.all([
          axios.get(`${API_BASE}/mentors`),
          axios.get(`${API_BASE}/branches`),
        ]);

        setMentors(mentorsRes.data);
        setBranches(branchesRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* -------------------- HELPERS -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (date) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;
  };

  /* -------------------- NEXT STEP -------------------- */
  const handleNextStep = async () => {
    try {
      /* ---------- STEP 1 ---------- */
      if (step === 1) {
        const required = [
          "name",
          "surname",
          "mentor",
          "branch",
          "grade",
          "yearsOfStudy",
          "date",
          "tellegrammUsername",
          "phone",
        ];

        for (let field of required) {
          if (!formData[field]) {
            toast.error(`Заполните: ${field}`);
            return;
          }
        }

        // ❗ Отправляем ТОЛЬКО поля шага 1
        const payload = {
          name: formData.name,
          surname: formData.surname,
          mentor: formData.mentor,
          branch: formData.branch,
          grade: formData.grade,
          yearsOfStudy: formData.yearsOfStudy,
          direction: formData.direction,
          tellegrammUsername: formData.tellegrammUsername,
          phone: formData.phone,
          date: formData.date,
        };

        const res = await fetch(`${API_BASE}/booking/stepOne`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          toast.error(data.message || "Ошибка шага 1");
          return;
        }

        setFormData((prev) => ({ ...prev, userId: data.userId }));
        toast.success("Шаг 1 завершён");
        setStep(2);
      }

      /* ---------- STEP 2 ---------- */
      if (step === 2) {
        if (formData.aboutYourself.trim().length < 10) {
          toast.error("Минимум 10 символов о себе");
          return;
        }

        if (formData.whatYouKnow.trim().length < 10) {
          toast.error("Минимум 10 символов навыков");
          return;
        }

        const payload = {
          userId: formData.userId,
          aboutYourself: formData.aboutYourself,
          whatYouKnow: formData.whatYouKnow,
        };

        const res = await fetch(`${API_BASE}/booking/stepTwo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          toast.error(data.message || "Ошибка шага 2");
          return;
        }

        toast.success("Регистрация завершена");
        navigate("/Login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ошибка сервера");
    }
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundLogos />

      <div className="relative z-50 w-full max-w-2xl p-4">
        <div className="bg-base-100/80 rounded-3xl shadow-2xl">
          {/* HEADER */}
          <div className="bg-primary p-8 rounded-t-3xl text-primary-content">
            <TextType
              text={[
                "Регистрация на собеседование",
                "Заполняйте данные внимательно",
              ]}
              typingSpeed={70}
              pauseDuration={1200}
              showCursor
            />
            <p className="text-center opacity-70 mt-2">
              Шаг {step} из 2
            </p>
          </div>

          {/* FORM */}
          <div className="p-8 space-y-5">
            {step === 1 && (
              <>
                <input name="name" placeholder="Имя" className="input input-bordered w-full" value={formData.name} onChange={handleChange} />
                <input name="surname" placeholder="Фамилия" className="input input-bordered w-full" value={formData.surname} onChange={handleChange} />

                <select name="mentor" className="select select-bordered w-full" value={formData.mentor} onChange={handleChange}>
                  <option value="">Выберите ментора</option>
                  {mentors.map((m) => (
                    <option key={m._id} value={m._id}>{m.name}</option>
                  ))}
                </select>

                <select name="branch" className="select select-bordered w-full" value={formData.branch} onChange={handleChange}>
                  <option value="">Выберите филиал</option>
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>

                <input name="tellegrammUsername" placeholder="Telegram username" className="input input-bordered w-full" value={formData.tellegrammUsername} onChange={handleChange} />
                <input name="phone" placeholder="Телефон" className="input input-bordered w-full" value={formData.phone} onChange={handleChange} />
                <input type="date" name="date" className="input input-bordered w-full" min={formatDate(tomorrow)} max={formatDate(endOfMonth)} value={formData.date} onChange={handleChange} />
                <input name="grade" placeholder="Грейд" className="input input-bordered w-full" value={formData.grade} onChange={handleChange} />
                <input type="number" name="yearsOfStudy" placeholder="Лет обучения" className="input input-bordered w-full" value={formData.yearsOfStudy} onChange={handleChange} />
              </>
            )}

            {step === 2 && (
              <>
                <textarea name="aboutYourself" placeholder="О себе" className="textarea textarea-bordered w-full h-32" value={formData.aboutYourself} onChange={handleChange} />
                <textarea name="whatYouKnow" placeholder="Что вы знаете" className="textarea textarea-bordered w-full h-32" value={formData.whatYouKnow} onChange={handleChange} />
              </>
            )}

            <div className="flex justify-between">
              <Link to="/Login">Уже есть аккаунт</Link>
              <button className="btn btn-primary" onClick={handleNextStep}>
                {step === 1 ? "Далее →" : "Завершить"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
