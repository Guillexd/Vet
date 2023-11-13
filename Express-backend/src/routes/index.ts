import { Router } from "express"
import { readdirSync } from "fs"

export const router = Router()

const cleanFile = (fileName: string): string => {
    const file = fileName.split('.').shift()
    return file!
}

readdirSync(__dirname).forEach( (fileName) => {
    const cleanName = cleanFile(fileName);
    if(cleanName !== "index"){
        import(`./${cleanName}`).then( routerModule => {
            console.log(`Charging route ${cleanName}`)
            router.use(`/${cleanName}`, routerModule.router)
        })
    }
})
