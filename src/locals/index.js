import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const messages = {
    en,
    zh
}

// 这是获取当前浏览器的语言
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('language') || 'en', // 首先从缓存里拿，没有的话就用浏览器语言
    fallbackLocale: 'en', // 设置备用语言
    messages
})

export default i18n
