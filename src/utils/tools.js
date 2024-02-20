/**
 * 验证URL格式
 */
export function isUrl(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(
        value
    )
}

// 深度拷贝
/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj, cache = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj
    if (cache.has(obj)) return cache.get(obj)
    let clone
    if (obj instanceof Date) {
        clone = new Date(obj.getTime())
    } else if (obj instanceof RegExp) {
        clone = new RegExp(obj)
    } else if (obj instanceof Map) {
        clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]))
    } else if (obj instanceof Set) {
        clone = new Set(Array.from(obj, (value) => deepClone(value, cache)))
    } else if (Array.isArray(obj)) {
        clone = obj.map((value) => deepClone(value, cache))
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        clone = Object.create(Object.getPrototypeOf(obj))
        cache.set(obj, clone)
        for (const [key, value] of Object.entries(obj)) {
            clone[key] = deepClone(value, cache)
        }
    } else {
        clone = Object.assign({}, obj)
    }
    cache.set(obj, clone)
    return clone
}
