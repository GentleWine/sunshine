import jsrsasign from 'jsrsasign'
export const decodeToken = (token) => {
	let obj = null
	if (token !== '') {
		const payload = jsrsasign.KJUR.jws.JWS.parse(token)
		if (payload.hasOwnProperty('payloadObj')) {
			obj = payload.payloadObj
		}
	}
	return obj
}
