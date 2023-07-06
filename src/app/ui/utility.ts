import { APP_BASE_HREF, Location } from "@angular/common"
import { Inject, Injectable } from "@angular/core"

/**
 * 工具
 */
@Injectable()
export class Utility {

    constructor(
        private location:Location
        ,@Inject(APP_BASE_HREF) private baseHref:string
    ){}

    private _fullBaseUrl:string|null=null
    private _bHref:string | null = null
    /**
     * 取得網站執行位置位置(by base href)
     * @returns 
     */
    getFullUrlWithBaseHref(){
        if(!this._fullBaseUrl) {
            const proto:string = location.protocol
            const host:string = location.host
            const baseHref:string = this.location.prepareExternalUrl("")
            const fullPrefixPath:string = `${proto}//${host}${baseHref}`
            this._fullBaseUrl = fullPrefixPath
        }
        return this._fullBaseUrl
    }

    /**
     * 取得webside base href (if default is / then return empty string)
     * @returns 
     */
    getHandleBaseHref() {
        if(!this._bHref) {
            const t = this.baseHref === "/" ? "" : this.baseHref
            this._bHref = t
        }
        return this._bHref
    }
}
