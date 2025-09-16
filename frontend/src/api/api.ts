import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiService {
	private axios: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl?: string) {
		this.baseUrl = baseUrl || import.meta.env.VITE_API_URL;

    this.axios = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
	}

	makeFullUrl(endpoint: string): string {
		return `${this.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
	}

	async get<T, D = unknown>(endpoint: string, config?: AxiosRequestConfig<D>) {
		const res = await this.axios.get<T, AxiosResponse<T>>(this.makeFullUrl(endpoint), config);

    return res.data
	}

	async post<T, D = unknown>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>) {
		const res = await this.axios.post<T, AxiosResponse<T>, D>(this.makeFullUrl(endpoint), data, config);

    return res.data
	}

	async put<T, D = unknown>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>) {
		const res = await this.axios.put<T, AxiosResponse<T>, D>(this.makeFullUrl(endpoint), data, config);

    return res.data
	}

	async patch<T, D = unknown>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>) {
		const res = await this.axios.patch<T, AxiosResponse<T>, D>(this.makeFullUrl(endpoint), data, config);

    return res.data
	}

	async delete<T, D = unknown>(endpoint: string, config?: AxiosRequestConfig<D>) {
		const res = await this.axios.delete<T, AxiosResponse<T>>(this.makeFullUrl(endpoint), config);

    return res.data
	}
}
