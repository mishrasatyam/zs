import {dev} from '$app/env'
export const api_url = dev?'http://localhost:8000':import.meta.env.BACKEND_URL
