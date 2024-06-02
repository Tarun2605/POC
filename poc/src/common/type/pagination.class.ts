export interface PaginationOptions {
    limit: number;
    page: number;
    sortBy?: string;
    order?: 'ASC' | 'DESC';
    searchBy?: string; // { [key:string]: any }
}