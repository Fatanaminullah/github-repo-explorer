import { fetcher } from "./fetcher";

export const searchUsers = async (username: string): Promise<{ data: any[] | null; errors: any | null }> => {
    try {
        const response = await fetcher.get(`/search/users?q=${username}&per_page=5`);
        const users = response.data.items;
        return { data: users, errors: null };
    } catch (error) {
        return { data: null, errors: error };
    }
};

export const fetchRepositoriesByUser = async (user: string): Promise<{ data: any[] | null; errors: any | null }> => {
    try {
        const response = await fetcher.get(`/users/${user}/repos`);
        const repositories = response.data;
        return { data: repositories, errors: null };
    } catch (error) {
        return { data: null, errors: error };
    }
};
