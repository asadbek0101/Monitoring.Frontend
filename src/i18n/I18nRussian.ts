import { I18nSchema } from "./I18nSchema";
import { I18nEnglish } from "./I18nEnglish";

export const I18nRussian: I18nSchema = {
  ...I18nEnglish,

  ENGLISH_LANGUAGE: "Английский",
  RUSSIAN_LANGUAGE: "Русский",
  UZBEK_LANGUAGE: "Узбекский",
  SHORT_EN_LANGUAGE: "EN",
  SHORT_RU_LANGUAGE: "RU",
  SHORT_UZ_LANGUAGE: "UZ",

  SIDE_MENU_DASHBOARD_TITLE: "Панель приборов",
  SIDE_MENU_LESSONS_TITLE: "Уроки",
  SIDE_MENU_RESULTS_TITLE: "Результаты",
  SIDE_MENU_USERS_TITLE: "Пользователи",
  SIDE_MENU_SETTINGS_TITLE: "Настройки",

  ADD_BUTTON_TITLE: "Добавить",
  BACK_BUTTON_TITLE: "Назад",
  SAVE_BUTTON_TITLE: "Cохранять",
  SEND_BUTTON_TITLE: "Отправлять",
  LOGOUT_BUTTON_TITLE: "Выйти",

  SELECT_PICKER_PLACEHOLDER_TITLE: "Все",
  SELECT_PICKER_NO_OPTIONS_MESSAGE: "Нет опций",

  STATUS_SELECT_PICKER_ACTIVE_TITLE: "Активно",
  STATUS_SELECT_PICKER_NON_ACTIVE_TITLE: "Неактивно",
  STATUS_SELECT_PICKER_DELETED_TITLE: "Удален",

  YES_BUTTON_TITLE: "Да",
  NO_BUTTON_TITLE: "Нет",

  ADD_QUESTION_BUTTON_TITLE: "Добавить вопрос",
  REMOVE_QUESTION_BUTTON_TITLE: "Удалить этот вопрос",
  ADD_ANSWER_BUTTON_TITLE: "Добавить ответ",

  SHOW_BUTTON_TITLE: "Показывать",
  WRITE_BUTTON_TITLE: "Письмо",

  EMPTY_TITLE: "Пустой",

  DASHBOARD_LESSONS_CARD_TITLE: "Уроки",
  DASHBOARD_USERS_CARD_TITLE: "Пользователи",
  DASHBOARD_TESTS_CARD_TITLE: "Тесты",
  DASHBOARD_PRACTICAL_CARD_TITLE: "Практические работы",
  DASHBOARD_LABORATORY_CARD_TITLE: "Лабораторные работы",
  DASHBOARD_VIDEOS_CARD_TITLE: "Видео",
  DASHBOARD_PPTS_CARD_TITLE: "Презентации",

  USERS_TABLE_USER_ID_COLUMN_TITLE: "Идентификатор",
  USERS_TABLE_USER_NAME_COLUMN_TITLE: "Имя пользователя",
  USERS_TABLE_USER_EMAIL_COLUMN_TITLE: "Электронная почта",
  USERS_TABLE_USER_ROLE_COLUMN_TITLE: "Роль",

  USERS_FORM_CRATE_USER_TITLE: "Создать нового пользователя",
  USERS_FORM_USER_EMAIL_FIELD_TITLE: "Электронная почта пользователя",
  USERS_FORM_USER_NAME_FIELD_TITLE: "Имя пользователя",
  USERS_FORM_USER_ROLE_FIELD_TITLE: "Роль пользователя",
  USERS_FORM_USER_PASSWORD_FIELD_TITLE: "Пароль пользователя",

  LESSONS_TABLE_ID_COLUMN_TITLE: "Ид",
  LESSONS_TABLE_LESSON_NUMBER_COLUMN_TITLE: "Номер урока",
  LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE: "Название урока",

  LESSONS_TABLE_DELETE_LESSONS_QUESTION_TITLE: "Вы уверены, что хотите удалить курсы?",
  
  LESSON_FORM_CREATE_LESSON_TITLE: "Создать новый урок",
  LESSON_FORM_LESSON_TITLE_FIELD_TITLE: "Название урока",
  LESSON_FORM_LESSON_NUMBER_FIELD_TITLE: "Номер урока",
  LESSON_FORM_LESSON_DESCRIPTION_FIELD_TITLE: "Описание урока",

  LESSON_THEME_AA_TITLE: "Практическая работа",
  LESSON_THEME_AB_TITLE: "Лабораторная работа",
  LESSON_THEME_AC_TITLE: "Текст отчета",
  LESSON_THEME_AD_TITLE: "Видеоурок",
  LESSON_THEME_AE_TITLE: "Тест",

  LESSONS_TAB_LESSONS_TAB_TITLE: "Уроки",
  LESSONS_TAB_PRACTICAL_TAB_TITLE: "Практические работы по урокам",
  LESSONS_TAB_LABORATORY_TAB_TITLE: "Лабораторные работы Уроков",
  LESSONS_TAB_PPT_TAB_TITLE: "Презентации уроков",
  LESSONS_TAB_VIDEOS_TAB_TITLE: "Видео уроков",
  LESSONS_TAB_TESTS_TAB_TITLE: "Тесты уроков",

  SETTINGS_FORM_USER_INFO_TITLE: "Информация о пользователе",
  SETTINGS_FORM_USER_LANGUAGE_TITLE: "Язык",
  SETTINGS_FORM_RESET_PASSWORD_TITLE: "Сбросить пароль",
  SETTINGS_FORM_USER_EMAIL_FIELD_TITLE: "Электронная почта",
  SETTINGS_FORM_USER_NAME_FIELD_TITLE: "Имя пользователя",
  SETTINGS_FORM_USER_PASSWORD_FIELD_TITLE: "Пароль",
  SETTINGS_FORM_USER_OLD_PASSWORD_FIELD_TITLE: "Старый пароль",
  SETTINGS_FORM_USER_NEW_PASSWORD_FIELD_TITLE: "Новый пароль",
  SETTINGS_FORM_USER_CONFIRM_PASSWORD_FIELD_TITLE: "Подтвердите пароль",

  SETTINGS_FORM_LANGUAGE_QUESTION_TITLE: "Вы уверены, что хотите изменить язык?",

  SETTINGS_TABLE_USER_ROLES_TITLE: "Роли пользователей",
  SETTINGS_TABLE_CREATE_LESSON_COLUMN_TITLE: "Создать урок",
  SETTINGS_TABLE_CREATE_USER_COLUMN_TITLE: "Создать пользователя",
  SETTINGS_TABLE_CREATE_TEACHER_COLUMN_TITLE: "Создать учителя",
  SETTINGS_TABLE_CREATE_ADMIN_COLUMN_TITLE: "Создать администратора",

  AUTH_ADMIN_TITLE: "Админ СТСТА",

  AUTH_REQUIRED_USERNAME_TITLE: "Введите Имя пользователя",
  AUTH_REQUIRED_PASSWORD_TITLE: "Введите пароль",
  AUTH_FORM_USERNAME_FIELD_TITLE: "Имя пользователя",
  AUTH_FORM_PASSWORD_FIELD_TITLE: "Пароль"
}