type Res = {
    success: boolean,
    data: any,
    message: string
}

/** 校验卡密 */
export const checkKey = async (key: string): Promise<boolean> => {
    const res = await fetch('api/check.php?key=' + key)
    const data = await res.json() as Res
    return data.success
}

export const removeKey = async (key: string): Promise<boolean> => {
    const params = new URLSearchParams()
    params.set('key', key)
    params.set('password', localStorage.getItem('password') || '')
    const res = await fetch('api/remove.php', {
        method: 'POST',
        body: params
    })
    const data = await res.json() as Res
    alert(data.message)
    return data.success
}

/** 生成卡密 */
export const createKey = async (): Promise<string> => {
    const params = new URLSearchParams()
    params.set('password', localStorage.getItem('password') || '')
    const res = await fetch('api/create.php', {
        method: 'POST',
        body: params
    })
    const data = await res.json() as Res
    if (!data.success) alert(data.message)
    return data.data
}