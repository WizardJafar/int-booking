import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";
import axios from "axios";

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import LogoLoop from "../../Components/ReactBits/LogoLoop";
import BackgroundLogos from "../../Components/RegisterComponents/BackgroundLogos";
import TextType from "../../Components/ReactBits/TextType";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [mentors, setMentors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

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

  // Загрузка менторов и филиалов при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Загружаем менторов
        const mentorsRes = await axios.get(`http://localhost:8000/api/mentors`);
        setMentors(mentorsRes.data);

        // Загружаем филиалы
        const branchesRes = await axios.get(`http://localhost:8000/api/branches`);
        setBranches(branchesRes.data);

        setLoading(false);
      } catch (error) {
        toast.error("Ошибка загрузки данных");
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async () => {
    try {
      const isLocalhost = window.location.hostname === "localhost";

      const loginURL = isLocalhost
        ? `http://localhost:8000/api/booking/stepOne`
        : `https://int-server-1.onrender.com/api/booking/stepTwo`;
      
      switch (step) {
        case 1:
          const required = ["name", "surname", "mentor", "branch", "grade", "yearsOfStudy", "date", "tellegrammUsername", "phone"];
          for (let f of required) {
            if (!formData[f]) return toast.error(`Заполните: ${f}`);
          }

          const r1 = await fetch("http://localhost:8000/api/booking/stepOne", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const d1 = await r1.json();

          if (!d1.success) return toast.error(d1.message || "Ошибка регистрации");

          setFormData((p) => ({ ...p, userId: d1.userId }));
          toast.success("Шаг 1 завершён!");
          setStep(2);
          break;

        case 2:
          if (formData.aboutYourself.length < 10)
            return toast.error("Напишите хотя бы 10 символов о себе");

          if (formData.whatYouKnow.length < 10)
            return toast.error("Опишите навыки (мин. 10 символов)");

          const r2 = await fetch("http://localhost:8000/api/booking/stepTwo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const d2 = await r2.json();

          if (!d2.success) return toast.error(d2.message || "Ошибка");

          dispatch(login(d2));

          toast.success("Регистрация завершена!");
          navigate("/Login");
          break;
      }
    } catch (err) {
      toast.error("Ошибка сервера");
      console.error(err);
    }
  };




  const formatDate = (date) => {
    const pad = (n) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;
  };


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