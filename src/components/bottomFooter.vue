<template>
    <div class="footer">
        <div class="footer-left">
            <div class="footer-item">
                <font-awesome-icon
                    class="icon"
                    icon="fa-brands fa-weixin"
                />
                codivone
            </div>
            <div class="footer-item">
                <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-envelope"
                />
                i@ivone.me
            </div>
        </div>
        <div class="footer-right">
            <div class="footer-item">
                <font-awesome-icon
                    class="icon"
                    icon="fa-brands fa-medapps"
                />
                <a
                    target="_blank"
                    href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MjM5ODc5NjQyOQ==&action=getalbum&album_id=3188138854582337550&scene=173&subscene=91&sessionid=1703906531&enterid=1703906538&from_msgid=2649888756&from_itemidx=1&count=3&nolastread=1#wechat_redirect"
                    >「独立开发的100个想法」专栏</a
                >
            </div>
            <div class="footer-item">
                <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-puzzle-piece"
                />
                <a
                    target="_blank"
                    href="https://highlight.fang-cun.net"
                    >Highlight浏览器插件</a
                >
            </div>
            <div class="footer-item">
                <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-puzzle-piece"
                />
                <a
                    target="_blank"
                    href="https://www.grabox.net"
                    >Grabox浏览器插件</a
                >
            </div>
            <div class="footer-item">
                <font-awesome-icon
                    class="icon"
                    icon="fa-brands fa-app-store"
                />
                <a
                    target="_blank"
                    href="https://www.fang-cun.net"
                    >方寸笔迹</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        // align-items: flex-start;
        // justify-content: center;
        font-size: 12px;
        // background: #999;
        margin-top: 30px;
        padding: 20px 0;

        &-left {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-bottom: 10px;
        }

        &-right {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        }
        .footer-item {
            display: flex;
            align-items: center;
            color: var(--current-font-color);
            margin: 5px 20px;

            a {
                color: var(--current-font-color);
            }

            .icon {
                margin-right: 4px;
            }
        }
    }
</style>
