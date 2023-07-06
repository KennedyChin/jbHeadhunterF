export interface KeyValue<T,K> {
    id:T
    ,text:K
    /** 被選擇 */
    ,selected?:boolean 
    /** 是否跟其他人互斥 */
    ,exclusive?:boolean 
    /** 禁止使用  */
    ,disable?:boolean
}