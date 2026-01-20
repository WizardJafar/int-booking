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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 🔥 Background logos */}
      <BackgroundLogos />

      {/* 🔥 Form card */}
      <div className="relative w-full max-w-2xl z-50 p-4">
        <div className="bg-base-100/80 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="bg-primary p-8 text-primary-content rounded-t-3xl flex justify-center flex-col">
            <TextType
              text={["Регистрация на Собеседоване", "Вводите данные верно", "Их проверяет руководство"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-3xl font-bold text-center mb-1"
            />
            <p className="text-center opacity-70">Шаг {step} из 2</p>

            <div className="mt-6 bg-primary-content bg-opacity-20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary-content h-full transition-all duration-500 rounded-full"
                style={{ width: `${(step / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    name="name"
                    placeholder="Имя"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <input
                    name="surname"
                    placeholder="Фамилия"
                    className="input input-bordered w-full"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* SELECT для выбора учителя */}
                  <select
                    name="mentor"
                    className="select select-bordered w-full"
                    value={formData.mentor}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">
                      {loading ? "Загрузка..." : "Выберите учителя"}
                    </option>

                    {mentors.map((mentor) => (
                      <option key={mentor._id} value={mentor._id}>
                        {mentor.name}
                      </option>
                    ))}
                  </select>


                  <input
                    name="tellegrammUsername"
                    placeholder="Username который отмечен собачкой"
                    className="input input-bordered w-full"
                    value={formData.tellegrammUsername}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    name="phone"
                    placeholder="Номер"
                    className="input input-bordered w-full"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full"
                    value={formData.date}
                    onChange={handleChange}
                    min={formatDate(tomorrow)}
                    max={formatDate(endOfMonth)}
                  />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* SELECT для выбора филиала */}
                  <select
                    name="branch"
                    className="select  select-bordered w-full"
                    value={formData.branch}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">
                      {loading ? "Загрузка..." : "Выберите филиал"}
                    </option>
                    {branches.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>

                  <input
                    name="grade"
                    placeholder="Грейд"
                    className="input input-bordered w-full"
                    value={formData.grade}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    name="yearsOfStudy"
                    placeholder="Лет обучения"
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.yearsOfStudy}
                    onChange={handleChange}
                  />

                  <select
                    name="direction"
                    className="select select-bordered w-full"
                    value={formData.direction}
                    onChange={handleChange}
                  >
                    <option value="backend">Backend</option>
                    <option value="frontend">Frontend</option>
                    <option value="fullstack">FullStack</option>
                  </select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <textarea
                  name="aboutYourself"
                  placeholder="Расскажите о себе"
                  className="textarea textarea-bordered w-full h-32"
                  value={formData.aboutYourself}
                  onChange={handleChange}
                ></textarea>

                <textarea
                  name="whatYouKnow"
                  placeholder="Что вы умеете"
                  className="textarea textarea-bordered w-full h-32"
                  value={formData.whatYouKnow}
                  onChange={handleChange}
                ></textarea>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <div className="flex text-primary font-mono ">
                <Link to="/Login">Уже есть акаунт</Link>
              </div>

              <button className="btn btn-primary ml-auto" onClick={handleNextStep}>
                {step === 1 ? "Далее →" : "✓ Завершить регистрацию"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


