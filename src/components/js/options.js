import { ref, computed } from 'vue'
import i18n from '../../locals'
import html2canvas from 'html2canvas'
import { ElMessage } from 'element-plus'
import { deepClone } from '../../utils/tools'
const { t } = i18n.global

// const winWidth = ref(document.documentElement.clientWidth)
// export const isMobile = computed(() => {
//     return winWidth.value < 500
// })
// export const isMobile = {
//     value: false
// }

// const clearedOnce = localStorage.getItem('clearedOnce')
// if (!clearedOnce || clearedOnce === 'false') {
//     localStorage.clear()
//     localStorage.setItem('clearedOnce', 'true')
// }

export const defaultConfigData = [
    {
        label: t('options.zhuti'),
        key: 'background',
        children: [
            {
                label: '',
                key: 'color',
                type: 'switch',
                value: true
            },
            {
                label: t('options.toumingdu'),
                key: 'opacity',
                value: 80
            }
        ]
    },
    {
        label: t('options.yuanjiao'),
        key: 'borderRadius',
        value: 12,
        max: 50
    },
    {
        label: t('options.waibianju'),
        key: 'margin',
        children: [
            {
                label: t('options.shangxia'),
                key: ['marginTop', 'marginBottom'],
                value: 75,
                max: 200,
                min: 20
            },
            {
                label: t('options.zuoyou'),
                key: ['marginLeft', 'marginRight'],
                value: 30,
                max: 200,
                min: 20
            }
        ]
    },
    {
        label: t('options.neibianju'),
        key: 'padding',
        children: [
            {
                label: t('options.shangxia'),
                key: ['paddingTop', 'paddingBottom'],
                value: 34
            },
            {
                label: t('options.zuoyou'),
                key: ['paddingLeft', 'paddingRight'],
                value: 16
            }
        ]
    }
]

export const fontItem = ref(localStorage.getItem('selectFontItem') || 'xinxihei')
export const backgroundItem = ref(localStorage.getItem('selectBackgroundItem') || 1)
export const configData = ref(localStorage.getItem('configData') ? JSON.parse(localStorage.getItem('configData')) : deepClone(defaultConfigData))
configData.value.forEach((config, index) => {
    config.label = defaultConfigData[index].label
    if (config.children) {
        config.children.forEach((child, childIndex) => {
            child.label = defaultConfigData[index].children[childIndex].label
        })
    }
})
localStorage.setItem('configData', JSON.stringify(configData.value))

export const downloadLoading = ref(false)
export const copyLoading = ref(false)
export const imageUrl = ref('')
export const html2Image = async (type, dom) => {
    if (dom) {
        if (type === 1) {
            downloadLoading.value = true
        } else {
            copyLoading.value = true
        }

        const canvas = await html2canvas(dom, {
            dpi: window.devicePixelRatio * 3,
            scale: 3,
            backgroundColor: null
        })
        if (type === 1) {
            downloadCallback(canvas)
        } else {
            copyCallback(canvas)
        }
    }
}

// 重置配置项
export const handleReset = () => {
    configData.value = deepClone(defaultConfigData)
    localStorage.setItem('configData', JSON.stringify(defaultConfigData))
}

const downloadCallback = (canvas) => {
    let imgUrl = canvas.toDataURL('image/png')
    // if (isMobile.value) {
    //     imageUrl.value = imgUrl
    //     downloadLoading.value = false
    //     return false
    // }
    // 创建一个a标签
    let tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = imgUrl
    // 给a标签添加下载属性
    tempLink.setAttribute('download', 'memocard')
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
    }
    // 将a标签添加到body当中
    document.body.appendChild(tempLink)
    // 启动下载
    tempLink.click()
    // 下载完毕删除a标签
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(imgUrl)

    downloadLoading.value = false
}

const copyCallback = async (canvas) => {
    try {
        let imgUrl = canvas.toDataURL('image/png')
        const res = await fetch(imgUrl)
        const blob = await res.blob()
        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ])
        ElMessage.success(t('tips.fuzhichenggong'))
    } catch (err) {
        console.log(err)
        ElMessage.error(t('tips.fuzhishibai'))
    }

    copyLoading.value = false
}
