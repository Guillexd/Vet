export interface fecthData {
    status: number,
    name: string,
    message: string,
}

export interface UserI {
    _id: string,
    name: string,
    last_name: string,
    nick_name?: string,
    age: number,
    profile_image?: string,
    email: string,
    createdAt: string,
}
  
export interface DataWithDocs<T> {
    docs: T[],
    totalDocs: number,
    offset: number,
    limit: number,
    totalPages: number,
    page: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number | null,
    nextPage: number | null,
}

// export interface UsersData {
//     docs: UserI[],
//     totalDocs: number,
//     offset: number,
//     limit: number,
//     totalPages: number,
//     page: number,
//     pagingCounter: number,
//     hasPrevPage: boolean,
//     hasNextPage: boolean,
//     prevPage: number | null,
//     nextPage: number | null,
// }