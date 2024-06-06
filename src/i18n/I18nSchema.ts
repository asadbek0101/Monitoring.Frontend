export type I18nCode = keyof I18nSchema;

export interface I18nSchema {
    
    readonly UZBEK_LANGUAGE: string;
    readonly ENGLISH_LANGUAGE: string;
    readonly RUSSIAN_LANGUAGE: string;
    readonly SHORT_EN_LANGUAGE: string;
    readonly SHORT_RU_LANGUAGE: string;
    readonly SHORT_UZ_LANGUAGE: string;

    // Side bar menu 

    readonly SIDE_MENU_DASHBOARD_TITLE: string
    readonly SIDE_MENU_LESSONS_TITLE: string
    readonly SIDE_MENU_USERS_TITLE: string
    readonly SIDE_MENU_RESULTS_TITLE: string
    readonly SIDE_MENU_SETTINGS_TITLE: string

    // Buttons

    readonly ADD_BUTTON_TITLE: string;
    readonly BACK_BUTTON_TITLE: string;
    readonly SAVE_BUTTON_TITLE: string;
    readonly SEND_BUTTON_TITLE: string;

    readonly LOGOUT_BUTTON_TITLE: string;
    readonly YES_BUTTON_TITLE: string;
    readonly NO_BUTTON_TITLE: string;
    readonly ADD_QUESTION_BUTTON_TITLE: string;
    readonly REMOVE_QUESTION_BUTTON_TITLE: string;
    readonly ADD_ANSWER_BUTTON_TITLE: string;
    readonly UPLOAD_EXCEL_BUTTON_TITLE: string;
    readonly SHOW_BUTTON_TITLE: string;
    readonly WRITE_BUTTON_TITLE: string;

    // Select Pricker

    readonly SELECT_PICKER_PLACEHOLDER_TITLE: string;
    readonly SELECT_PICKER_NO_OPTIONS_MESSAGE: string;

    readonly STATUS_SELECT_PICKER_ACTIVE_TITLE: string;
    readonly STATUS_SELECT_PICKER_NON_ACTIVE_TITLE: string;
    readonly STATUS_SELECT_PICKER_DELETED_TITLE: string;

    readonly DASHBOARD_LESSONS_CARD_TITLE: string;
    readonly DASHBOARD_USERS_CARD_TITLE: string;
    readonly DASHBOARD_TESTS_CARD_TITLE: string;
    readonly DASHBOARD_PRACTICAL_CARD_TITLE: string;
    readonly DASHBOARD_LABORATORY_CARD_TITLE: string;
    readonly DASHBOARD_VIDEOS_CARD_TITLE: string;
    readonly DASHBOARD_PPTS_CARD_TITLE: string;
    readonly DASHBOARD_RESULTS_CARD_TITLE: string;

    // Users Container

    readonly USERS_TABLE_USER_ID_COLUMN_TITLE: string;
    readonly USERS_TABLE_USER_NAME_COLUMN_TITLE: string;
    readonly USERS_TABLE_USER_EMAIL_COLUMN_TITLE: string;
    readonly USERS_TABLE_USER_ROLE_COLUMN_TITLE: string;

    readonly USERS_FORM_CRATE_USER_TITLE: string;
    readonly USERS_FORM_USER_EMAIL_FIELD_TITLE: string;
    readonly USERS_FORM_USER_NAME_FIELD_TITLE: string;
    readonly USERS_FORM_USER_ROLE_FIELD_TITLE: string;
    readonly USERS_FORM_USER_PASSWORD_FIELD_TITLE: string;
    // readonly USERS_TABLE_USER_COLUMN_TITLE: string;

    // Lessons Container

    readonly LESSONS_TABLE_ID_COLUMN_TITLE: string;
    readonly LESSONS_TABLE_LESSON_NUMBER_COLUMN_TITLE: string;
    readonly LESSONS_TABLE_LESSON_TITLE_COLUMN_TITLE: string;

    readonly LESSONS_TABLE_DELETE_LESSONS_QUESTION_TITLE: string;
    // readonly LESSONS_TABLE_LE_COLUMN_TITLE: string;
    // readonly LESSONS_TABLE_ID_COLUMN_TITLE: string;

    readonly LESSON_FORM_CREATE_LESSON_TITLE: string;
    readonly LESSON_FORM_LESSON_TITLE_FIELD_TITLE: string;
    readonly LESSON_FORM_LESSON_NUMBER_FIELD_TITLE: string;
    readonly LESSON_FORM_LESSON_THEMES_FIELD_TITLE: string;
    readonly LESSON_FORM_LESSON_DESCRIPTION_FIELD_TITLE: string;

    readonly LESSON_THEME_AA_TITLE: string;
    readonly LESSON_THEME_AB_TITLE: string;
    readonly LESSON_THEME_AC_TITLE: string;
    readonly LESSON_THEME_AD_TITLE: string;
    readonly LESSON_THEME_AE_TITLE: string;

    // Lessons Tabs 

    readonly LESSONS_TAB_LESSONS_TAB_TITLE: string;
    readonly LESSONS_TAB_PRACTICAL_TAB_TITLE: string;
    readonly LESSONS_TAB_LABORATORY_TAB_TITLE: string;
    readonly LESSONS_TAB_PPT_TAB_TITLE: string;
    readonly LESSONS_TAB_VIDEOS_TAB_TITLE: string;
    readonly LESSONS_TAB_TESTS_TAB_TITLE: string;

    readonly EMPTY_TITLE: string;

    // Settings Container

    readonly SETTINGS_FORM_USER_INFO_TITLE: string;
    readonly SETTINGS_FORM_USER_LANGUAGE_TITLE: string;
    readonly SETTINGS_FORM_RESET_PASSWORD_TITLE: string;
    readonly SETTINGS_FORM_USER_EMAIL_FIELD_TITLE: string;
    readonly SETTINGS_FORM_USER_NAME_FIELD_TITLE: string;
    readonly SETTINGS_FORM_USER_PASSWORD_FIELD_TITLE: string;
    readonly SETTINGS_FORM_USER_OLD_PASSWORD_FIELD_TITLE: string;
    readonly SETTINGS_FORM_USER_NEW_PASSWORD_FIELD_TITLE: string;
    readonly SETTINGS_FORM_USER_CONFIRM_PASSWORD_FIELD_TITLE: string;

    readonly SETTINGS_FORM_LANGUAGE_QUESTION_TITLE: string;

    readonly SETTINGS_TABLE_USER_ROLES_TITLE: string;
    readonly SETTINGS_TABLE_CREATE_LESSON_COLUMN_TITLE: string;
    readonly SETTINGS_TABLE_CREATE_USER_COLUMN_TITLE: string;
    readonly SETTINGS_TABLE_CREATE_TEACHER_COLUMN_TITLE: string;
    readonly SETTINGS_TABLE_CREATE_ADMIN_COLUMN_TITLE: string;
    

    // Auth Container

    readonly AUTH_ADMIN_TITLE: string;

    readonly AUTH_REQUIRED_USERNAME_TITLE: string;
    readonly AUTH_REQUIRED_PASSWORD_TITLE: string;
    readonly AUTH_FORM_USERNAME_FIELD_TITLE: string;
    readonly AUTH_FORM_PASSWORD_FIELD_TITLE: string;

    // Some title for global site

    readonly EMPTY_TABLE_TITLE: string;
}