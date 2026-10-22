const probes = new Map<string,Promise<boolean>>()

export function probeImage(url:string):Promise<boolean>{
    const known= probes.get(url)
    if(known){
        return known
    }

    const probe =new Promise<boolean>((resolve)=>{
        const image =new Image()
        image.onload=()=>resolve(true);
        image.onerror=()=>resolve(false)
        image.src=url
    })

    probes.set(url,probe)
    return probe
}