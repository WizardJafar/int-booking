// src/pages/Auth/Login.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../Redux/Slices/AuthSlice";


import BackgroundLogos from "../../Components/RegisterComponents/BackgroundLogos";
import TextType from "../../Components/ReactBits/TextType";

// Optional GSAP micro-animations (will only run if gsap is installed)
let gsap;
try {
    // dynamic import to avoid crash if gsap is not installed
    // eslint-disable-next-line global-require
    gsap = require("gsap");
} catch (e) {
    gsap = null;
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        surname: "",
        tellegrammUsername: "",
        phone: "",
    });

    const wrapperRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        // small GSAP entrance animation if available
        if (gsap && cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { y: 24, opacity: 0, scale: 0.995 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
            );
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e?.preventDefault?.();
        const isLocalhost = window.location.hostname === "localhost";

        const loginURL = isLocalhost
            ? `http://localhost:8000/api/booking/login`
            : `https://int-server-1.onrender.com/api/booking/login`;

        try {
            setLoading(true);
            const res = await fetch(loginURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    surname: form.surname.trim(),
                    tellegrammUsername: form.tellegrammUsername.trim(),
                    phone: form.phone.trim(),
                }),
            });

            const data = await res.json();

            // backend might return { user } or { message }
            if (!res.ok) {
                const message = data?.message || "Ошибка сервера";
                toast.error(message);
                return;
            }

            // support both shapes: { user } or { user: {...} } or { success: true, user }
            const user = data?.user || (data?.success && data?.user) || null;

            if (!user) {
                toast.error(data?.message || "Пользователь не найден");
                return;
            }

            // dispatch to redux (persist should handle storage)
            dispatch(login({
                user: data.user,
                token: data.token,
            }));


            toast.success(`Добро пожаловать, ${user.name || user.tellegrammUsername || "пользователь"}!`);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Ошибка при подключении к серверу");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden ">
            {/* background logos from your project */}
            <BackgroundLogos />



            <div className="relative w-full max-w-2xl z-50 p-4">
                <div ref={cardRef} className="bg-base-100/90 rounded-3xl shadow-2xl">
                    {/* Header */}
                    <div className="bg-primary p-8 text-primary-content rounded-t-3xl flex justify-center flex-col">
                        <TextType
                            text={[
                                "Вход в личный кабинет",
                                "Используйте Telegram и телефон",
                                "Данные проверяются руководством",
                            ]}
                            typingSpeed={60}
                            pauseDuration={1200}
                            showCursor={true}
                            cursorCharacter="|"
                            className="text-3xl font-bold text-center mb-1"
                        />
                        <p className="text-center opacity-70">Войдите, чтобы управлять профилем</p>
                    </div>

                    {/* Form */}
                    <form className="p-8 space-y-5" >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input
                                name="name"
                                placeholder="Имя"
                                className="input input-bordered w-full"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="name"
                                disabled={loading}
                            />

                            <input
                                name="surname"
                                placeholder="Фамилия"
                                className="input input-bordered w-full"
                                value={form.surname}
                                onChange={handleChange}
                                autoComplete="family-name"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input
                                name="tellegrammUsername"
                                placeholder="Telegram username (с @)"
                                className="input input-bordered w-full"
                                value={form.tellegrammUsername}
                                onChange={handleChange}
                                autoComplete="username"
                                disabled={loading}
                            />

                            <input
                                name="phone"
                                placeholder="Номер телефона"
                                className="input input-bordered w-full"
                                value={form.phone}
                                onChange={handleChange}
                                autoComplete="tel"
                                disabled={loading}
                            />
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <div className="flex text-primary font-mono ">
                                <Link to="/Register">Нету акаунта Зарегистрируйтесь</Link>
                            </div>
                            <div className="ml-auto flex gap-3">
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? "Вход..." : "Войти"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
