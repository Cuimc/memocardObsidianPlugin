import { ItemView, WorkspaceLeaf } from 'obsidian';
import { createApp, App as VueApp } from 'vue';
import App from './App.vue';

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/element/element-style.scss'
import './styles/element/element-dark.scss'
import './styles/theme-style.scss'
import './styles/public-style.scss'

import i18n from './locals'
import {
    ElButton,
    ElInput,
    ElSlider,
    ElSwitch,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon,
    ElDialog,
    ElTooltip,
    ElNotification,
    ElDrawer,
    ElPopover
} from 'element-plus'

const elementPlusArray = [
    ElButton,
    ElInput,
    ElSlider,
    ElSwitch,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon,
    ElDialog,
    ElTooltip,
    ElNotification,
    ElDrawer,
    ElPopover
]

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWeixin, faAppStore, faMedapps } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPuzzlePiece, faMoon, faSun, faExpand, faCopy, faDownload, faEraser, faImages } from '@fortawesome/free-solid-svg-icons'

library.add(faWeixin, faAppStore, faEnvelope, faPuzzlePiece, faMedapps, faMoon, faSun, faExpand, faCopy, faDownload, faEraser, faImages)

export const VIEW_TYPE: string = 'my-view';

export class MyView extends ItemView {
    vueapp: VueApp;
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }
    getViewType(): string {
        return VIEW_TYPE;
    }
    getDisplayText(): string {
        return "Memo Card";
    }
    getIcon(): string {
        return "image-plus";
    }
    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        let content = container.createEl("div", {
            cls: "memo-card-plugin-view"
        });

        this.vueapp = createApp(App);
        elementPlusArray.forEach((item) => {
            this.vueapp.use(item)
        })
        this.vueapp.use(i18n)
        this.vueapp.component('font-awesome-icon', FontAwesomeIcon)
        this.vueapp.mount(content);
    }
    async onClose() {
        this.vueapp.unmount();
    }

}