import React from 'react'
import { useSelector } from "react-redux";
import { User, MessageCircle, Phone, Briefcase, Star, GraduationCap, Calendar, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';


const Profile = () => {

    const { user } = useSelector((state) => state.auth);
    return (
        <div className="min-h-screen p-4 sm:p-6 flex bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex-col gap-6 justify-center items-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary drop-shadow-lg">
                Информация о стажёре
            </h1>

            {user && (
                <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-2 border-primary/20 p-6 sm:p-8 max-w-3xl w-full backdrop-blur-sm">
                    {/* Заголовок */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 mb-6 border border-primary/30 flex items-center gap-3">
                        <User className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                            {user.name} {user.surname}
                        </h2>
                    </div>

                    {/* Основная информация */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-base-200/50 p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                                <span className="text-primary font-bold text-sm">Телеграм</span>
                                <p className="font-semibold">{user.tellegrammUsername}</p>
                            </div>
                        </div>
                        <div className="bg-base-200/50 p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-2">
                            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                                <span className="text-primary font-bold text-sm">Телефон</span>
                                <p className="font-semibold">{user.phone}</p>
                            </div>
                        </div>
                        <div className="bg-base-200/50 p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                                <span className="text-primary font-bold text-sm">Направление</span>
                                <p className="font-semibold">{user.direction}</p>
                            </div>
                        </div>
                        <div className="bg-base-200/50 p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                                <span className="text-primary font-bold text-sm">Грейд</span>
                                <p className="font-semibold">{user.grade}</p>
                            </div>
                        </div>
                        <div className="bg-base-200/50 p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                                <span className="text-primary font-bold text-sm">Годы учебы</span>
                                <p className="font-semibold">{user.yearsOfStudy}</p>
                            </div>
                        </div>
                        <div className="bg-base-200/50 p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                            <div className='flex flex-col'>
                                <span className="text-primary font-bold text-sm">Ваш проэкт</span>
                                <a href={user.projectLink} className="text-xs hover:underline" target='_blank' >{user.projectLink}</a>
                            </div>
                        </div>
                    </div>

                    {/* Разделитель */}
                    <div className="divider divider-primary"></div>

                    {/* О себе */}
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl mb-4 border border-primary/20 ">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-primary">О себе</h3>
                        </div>
                        <p className="text-base leading-relaxed">{user.aboutYourself.slice(0, 80) || "—"}</p>
                    </div>

                    {/* Что умеешь */}
                    <div className="bg-gradient-to-br from-secondary/5 to-accent/5 p-4 rounded-xl mb-4 border border-secondary/20">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-secondary" />
                            <h3 className="text-lg font-bold text-secondary">Навыки</h3>
                        </div>
                        <p className="text-base leading-relaxed">{user.whatYouKnow.slice(0, 80) || "—"}</p>
                    </div>

                    {/* Разделитель */}
                    <div className="divider divider-secondary"></div>

                    {/* Даты */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className="bg-base-200/70 p-3 rounded-lg text-center border border-info/20">
                            <div className="flex justify-center mb-2">
                                <Calendar className="w-5 h-5 text-info" />
                            </div>
                            <p className="text-xs text-info font-semibold mb-1">Дата регистрации</p>
                            <p className="text-sm font-bold">{new Date(user.date).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-base-200/70 p-3 rounded-lg text-center border border-success/20">
                            <div className="flex justify-center mb-2">
                                <CheckCircle className="w-5 h-5 text-success" />
                            </div>
                            <p className="text-xs text-success font-semibold mb-1">Создано</p>
                            <p className="text-sm font-bold">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-base-200/70 p-3 rounded-lg text-center border border-warning/20">
                            <div className="flex justify-center mb-2">
                                <Clock className="w-5 h-5 text-warning" />
                            </div>
                            <p className="text-xs text-warning font-semibold mb-1">Обновлено</p>
                            <p className="text-sm font-bold">{new Date(user.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Разделитель */}
                    <div className="divider divider-accent"></div>

                    {/* Статус */}
                    <div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            Статус заявки
                        </h3>
                        <div className="mt-2">
                            {(() => {
                                switch (user.status) {
                                    case "approved":
                                        return (
                                            <div className="alert alert-success shadow-xl border-2 border-success/30 bg-gradient-to-r from-success/20 to-success/10 flex items-center gap-3">
                                                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                                                <span className="text-lg font-bold">Ваша заявка одобрена</span>
                                            </div>
                                        );

                                    case "pending":
                                        return (
                                            <div className="alert alert-warning shadow-xl border-2 border-warning/30 bg-gradient-to-r from-warning/20 to-warning/10 flex items-center gap-3">
                                                <Clock className="w-6 h-6 flex-shrink-0" />
                                                <span className="text-lg font-bold">Ваша заявка находится в рассмотрении</span>
                                            </div>
                                        );

                                    case "canceled":
                                        return (
                                            <div className="alert alert-error shadow-xl border-2 border-error/30 bg-gradient-to-r from-error/20 to-error/10 flex items-center gap-3">
                                                <XCircle className="w-6 h-6 flex-shrink-0" />
                                                <span className="text-lg font-bold">Ваша заявка отклонена</span>
                                            </div>
                                        );

                                    default:
                                        return (
                                            <div className="alert shadow-xl border-2 border-base-300 flex items-center gap-3">
                                                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                                                <span className="text-lg font-bold">Статус неизвестен</span>
                                            </div>
                                        );
                                }
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile